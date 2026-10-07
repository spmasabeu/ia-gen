// Exporta deck-v3: verifica (21 páginas, 18 slides lógicas, 555 s, sin desbordes),
// captura verificacion/pagina-NN.png, genera sufficient-context.pdf y regenera notas-expositor.md.
// Uso: node exportar.mjs  (requiere Playwright; si no está en node_modules, definir PLAYWRIGHT_PATH).
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

// Títulos cortos de la pauta de tiempos (sección 4 del guion maestro).
const titulosCortos = ['Portada', 'Analogía ensayo', 'Qué es RAG', 'Tres fallas', 'Related work',
  'Definición', 'Autorater', 'Validación 93%', 'Figura 2', 'Figura 3', 'Giro 35-62%', 'Dos caminos',
  'Selectiva (fig. 4)', 'Fine-tuning', 'Conclusiones', 'Gracias'];

const browser = await playwright.chromium.launch({headless: true, ...(process.env.CHROME_PATH ? {executablePath: process.env.CHROME_PATH} : {})});
try {
  const page = await browser.newPage({viewport: {width: 1280, height: 720}, deviceScaleFactor: 1});
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', request => errors.push(request.url()));
  await page.goto(pathToFileURL(join(dir, 'deck.html')).href);
  await page.evaluate(() => document.fonts.ready);
  assert.deepEqual(errors, [], 'Errores de carga');
  const pages = await page.locator('.slide').evaluateAll(nodes => nodes.map(node => ({
    logical: Number(node.dataset.logical), build: Number(node.dataset.build), builds: Number(node.dataset.builds),
    seconds: Number(node.dataset.seconds), notes: node.querySelector('.notes').textContent.trim()
  })));
  assert.equal(pages.length, 18, 'Deben ser 18 páginas PDF');
  const logicas = [...new Set(pages.map(p => p.logical))];
  assert.equal(logicas.length, 16, 'Deben ser 16 slides lógicas');
  const porLogica = logicas.map(n => pages.find(p => p.logical === n && p.build === 1));
  assert.equal(porLogica.reduce((sum, s) => sum + s.seconds, 0), 510, 'La pauta suma 8:30 (510 s)');

  const preview = join(dir, 'verificacion');
  await mkdir(preview, {recursive: true});
  const overflows = [];
  for (let index = 0; index < pages.length; index++) {
    await page.evaluate(i => { location.hash = `#${i + 1}`; }, index);
    await page.waitForFunction(i => document.querySelectorAll('.slide')[i].classList.contains('active'), index);
    const problems = await page.locator('.slide.active').evaluate(slide => {
      const bounds = slide.getBoundingClientRect();
      return [...slide.querySelectorAll('h1,h2,h3,p,td,th,svg,span,footer,table')].filter(el => {
        if (el.closest('.notes')) return false;
        const r = el.getBoundingClientRect();
        return r.width && (r.left < bounds.left - 1 || r.right > bounds.right + 1 || r.bottom > bounds.bottom + 1 || r.top < bounds.top - 1 || el.scrollWidth > el.clientWidth + 2);
      }).map(el => `${el.tagName}: ${el.textContent.trim().slice(0, 80)}`);
    });
    overflows.push(...problems.map(text => ({pagina: index + 1, text})));
    await page.screenshot({path: join(preview, `pagina-${String(index + 1).padStart(2, '0')}.png`)});
  }
  assert.deepEqual(overflows, [], 'Contenido fuera del lienzo');

  await page.keyboard.press('Home');
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.evaluate(() => location.hash), '#2');
  await page.emulateMedia({media: 'print'});
  await page.evaluate(() => { document.title = '¿No encontró lo necesario, o no supo aprovecharlos? · Sufficient Context (ICLR 2025)'; });
  await page.pdf({path: join(dir, 'sufficient-context.pdf'), preferCSSPageSize: true, printBackground: true, displayHeaderFooter: false, tagged: true});

  const time = seconds => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  let elapsed = 0;
  const filas = [];
  const cuerpos = [];
  porLogica.forEach((slide, i) => {
    const start = elapsed; elapsed += slide.seconds;
    filas.push(`| ${i + 1} | ${titulosCortos[i]} | ${time(slide.seconds)} | ${time(elapsed)} |`);
    const builds = slide.builds > 1 ? ` · ${slide.builds} builds (páginas PDF sucesivas)` : '';
    cuerpos.push(`## Slide ${String(i + 1).padStart(2, '0')} · ${titulosCortos[i]}\n\n**${time(start)}–${time(elapsed)} · ${slide.seconds} s**${builds}\n\n${slide.notes}\n`);
  });
  const words = porLogica.reduce((sum, slide) => sum + slide.notes.split(/\s+/).length, 0);
  await writeFile(join(dir, 'notas-expositor.md'), `# Guion del expositor · Sufficient Context (deck v3)

Objetivo: **8:30** (510 s) a ~125 palabras/minuto; ${words} palabras de guion. Ensayar con cronómetro contra la pauta. Si el ensayo pasa de 9:30, recortar en este orden: referencias orales de la slide 5 (−10 s), detalle LoRA de la slide 14 (−10 s).

Fuente editable: los \`aside.notes\` de \`deck.html\`. Regenerar con \`node exportar.mjs\`.

## Pauta de tiempos

| Slide | Título corto | Duración | Acumulado |
|---:|---|---:|---:|
${filas.join('\n')}

---

${cuerpos.join('\n')}`);
  console.log(JSON.stringify({paginasPDF: pages.length, slidesLogicas: logicas.length, segundos: elapsed, palabrasGuion: words, errors, overflows, pdf: join(dir, 'sufficient-context.pdf')}, null, 2));
} finally { await browser.close(); }
