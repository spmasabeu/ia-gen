import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {writeFile, mkdir} from 'node:fs/promises';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {dirname, join} from 'node:path';
import {homedir} from 'node:os';

const require = createRequire(import.meta.url);
const dir = dirname(fileURLToPath(import.meta.url));
let playwright;
for (const path of [process.env.PLAYWRIGHT_PATH, 'playwright', join(homedir(), '.codex/skills/playwright-skill/node_modules/playwright')].filter(Boolean)) {
  try { playwright = require(path); break; } catch (error) { if (error.code !== 'MODULE_NOT_FOUND') throw error; }
}
if (!playwright) throw new Error('Se necesita Playwright. Instálalo o indica PLAYWRIGHT_PATH; consulta LEEME.md.');
// La exportación PDF de Chromium requiere ejecución sin interfaz.
const browser = await playwright.chromium.launch({headless: true, ...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
try {
  const page = await browser.newPage({viewport: {width: 1600, height: 900}, deviceScaleFactor: 1});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => errors.push(request.url()));
  await page.goto(pathToFileURL(join(dir, 'deck.html')).href);
  await page.evaluate(() => document.fonts.ready);
  assert.deepEqual(errors, [], 'Errores de carga');
  const slides = await page.locator('.slide').evaluateAll(nodes => nodes.map(node => ({
    title: node.querySelector('h1,h2').innerText.replace(/\n/g, ' '),
    seconds: Number(node.dataset.seconds), notes: node.querySelector('.notes').textContent.trim()
  })));
  assert.equal(slides.length, 18);
  assert.equal(slides.reduce((sum, slide) => sum + slide.seconds, 0), 555);
  const preview = join(dir, 'verificacion');
  await mkdir(preview, {recursive: true});
  const overflows = [];
  for (let index = 0; index < slides.length; index++) {
    await page.evaluate(i => { location.hash = `#${i + 1}`; }, index);
    await page.waitForFunction(i => document.querySelectorAll('.slide')[i].classList.contains('active'), index);
    const problems = await page.locator('.slide.active').evaluate(slide => {
      const bounds = slide.getBoundingClientRect();
      return [...slide.querySelectorAll('h1,h2,h3,p,td,th,svg,footer,.bottom-line,.rail .num,.rail .tag')].filter(el => {
        if (el.closest('.notes')) return false;
        const r = el.getBoundingClientRect();
        return r.width && (r.left < bounds.left - 1 || r.right > bounds.right + 1 || r.bottom > bounds.bottom + 1 || r.top < bounds.top - 1 || el.scrollWidth > el.clientWidth + 2);
      }).map(el => el.textContent.slice(0, 100));
    });
    overflows.push(...problems.map(text => ({slide: index + 1, text})));
    await page.screenshot({path: join(preview, `slide-${String(index + 1).padStart(2, '0')}.png`)});
  }
  assert.deepEqual(overflows, [], 'Contenido fuera del lienzo');
  await page.keyboard.press('Home');
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.evaluate(() => location.hash), '#2');
  await page.setViewportSize({width: 390, height: 844});
  // El manejador de resize aplica la escala en el siguiente ciclo; esperar a que main quepa.
  await page.waitForFunction(() => document.querySelector('main').getBoundingClientRect().width <= 391);
  const mobile = await page.locator('main').boundingBox();
  assert.ok(mobile.width <= 391 && mobile.x >= -1 && mobile.y >= -1);
  await page.screenshot({path: join(preview, 'movil.png')});
  await page.setViewportSize({width: 1600, height: 900});
  await page.emulateMedia({media: 'print'});
  await page.evaluate(() => { document.title = 'Contexto suficiente · Una nueva mirada a RAG'; });
  await page.pdf({path: join(dir, 'sufficient-context.pdf'), preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false, tagged: true});
  const time = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  let elapsed = 0;
  const notes = slides.map((slide, i) => {
    const start = elapsed; elapsed += slide.seconds;
    return `## ${String(i + 1).padStart(2, '0')} · ${slide.title}\n\n**${time(start)}–${time(elapsed)} · ${slide.seconds} s**\n\n${slide.notes}\n`;
  }).join('\n');
  const words = slides.reduce((sum, slide) => sum + slide.notes.split(/\s+/).length, 0);
  await writeFile(join(dir, 'notas-expositor.md'), `# Guion del expositor · Contexto suficiente (deck v2)\n\nObjetivo: **9:15** (555 s), con pausas y lectura visual de gráficos. ${words} palabras. El cronograma es una pauta; confirmar la duración mediante ensayo oral. No incluye preguntas.\n\nFuente editable de estas notas: elementos \`aside.notes\` de \`deck.html\`. Regenerar con \`node exportar.mjs\`.\n\n${notes}\n## Respaldo para preguntas\n\n- Exactitud: aciertos de clasificación / casos evaluados.\n- Precisión: verdaderos positivos / positivos predichos.\n- Exhaustividad: verdaderos positivos / positivos reales.\n- F1: media armónica de precisión y exhaustividad; 0,935 para Gemini con un ejemplo.\n- Cobertura: consultas respondidas / consultas totales.\n- Exactitud selectiva: respuestas correctas / respuestas emitidas.\n- §5.1 usa FLAMe para suficiencia, no el Gemini de la validación de §3.2. FLAMe examina fragmentos de hasta 1.600 tokens.\n- La señal de confianza es declarada por el modelo; no garantiza calibración.\n- Figura 2: 452 entradas de FreshQA y 500 de HotpotQA y Musique-Ans.\n- Figura 3: valores aproximados, solo HotpotQA; no extrapolar a todos los conjuntos.\n- Figura 4: panel de Gemini/HotpotQA; con Gemma/Musique, la señal de suficiencia no añade beneficio.\n- El rango 2–10% conserva la formulación del resumen; no se convierte en puntos porcentuales ni en mejora sobre todas las consultas.\n\nSi el ensayo se acerca a 10:00, abreviar comentarios de las diapositivas 6, 9 y 17. Mantener las definiciones de ambos ejes de la diapositiva 16.\n`);
  console.log(JSON.stringify({pages: slides.length, plannedSeconds: elapsed, scriptWords: words, errors, overflows, pdf: join(dir, 'sufficient-context.pdf')}, null, 2));
} finally { await browser.close(); }
