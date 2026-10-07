'use strict';

const ns = 'http://www.w3.org/2000/svg';
function draw(parent, tag, attrs, text) {
  const el = document.createElementNS(ns, tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  if (text !== undefined) el.textContent = text;
  parent.append(el);
  return el;
}
const label = (svg, x, y, text, attrs = {}) => draw(svg, 'text', {x, y, 'font-size': 24, ...attrs}, text);
const line = (svg, x1, y1, x2, y2, attrs = {}) => draw(svg, 'line', {x1, y1, x2, y2, ...attrs});
const decimal = value => value.toFixed(1).replace('.', ',');
const blue = '#3651d9', cyan = '#087b98', rose = '#c02158', yellow = '#edc66b';

// Figura 2: valores impresos en el artículo, p. 6; orden: 2k, 6k, 10k.
const sufficiency = [
  {name: 'FreshQA', values: [63.7, 77.4, 77.4], detail: 'Información reciente'},
  {name: 'HotpotQA', values: [45.4, 46.2, 46.2], detail: 'Wikipedia'},
  {name: 'Musique-Ans', values: [33.4, 44.6, 44.6], detail: 'Razonamiento en varios pasos'}
];
const f2 = document.querySelector('#figure2');
const baseline = 315, chartHeight = 250;
label(f2, 60, 25, 'Entradas con contexto suficiente (%)', {'font-size': 22});
for (const tick of [0, 20, 40, 60, 80, 100]) {
  const y = baseline - tick / 100 * chartHeight;
  line(f2, 60, y, 945, y, {class: 'grid'});
  label(f2, 45, y + 7, tick, {'text-anchor': 'end', class: 'axis'});
}
sufficiency.forEach((dataset, i) => {
  const start = 108 + i * 292;
  dataset.values.forEach((value, j) => {
    const x = start + j * 67, h = value / 100 * chartHeight;
    draw(f2, 'rect', {x, y: baseline - h, width: 48, height: h, fill: ['#7b8496', blue, cyan][j]});
    label(f2, x + 24, baseline - h - 12, decimal(value), {'text-anchor': 'middle', 'font-size': 23, class: j === 1 ? 'strong' : ''});
  });
  label(f2, start + 91, 353, dataset.name, {'text-anchor': 'middle', 'font-size': 28, class: 'strong'});
  label(f2, start + 91, 385, dataset.detail, {'text-anchor': 'middle', 'font-size': 19, class: 'axis'});
});

// Figura 3: lectura aproximada de barras de HotpotQA, p. 7, redondeada a enteros.
// Orden: correcta, abstención, incorrecta. Cada fila tiene su propio denominador.
const performance = [
  {name: 'Gemini 1.5 Pro', sufficient: [67, 6, 27], insufficient: [49, 16, 35]},
  {name: 'GPT-4o', sufficient: [72, 8, 20], insufficient: [59, 11, 30]},
  {name: 'Gemma 27B', sufficient: [64, 2, 34], insufficient: [38, 12, 50]}
];
const f3 = document.querySelector('#figure3');
label(f3, 0, 115, 'Contexto', {'font-size': 25});
label(f3, 0, 157, 'suficiente', {'font-size': 25, class: 'strong'});
label(f3, 0, 260, 'Contexto', {'font-size': 25});
label(f3, 0, 302, 'insuficiente', {'font-size': 25, class: 'strong'});
performance.forEach((model, i) => {
  const left = 225 + i * 400, width = 365;
  label(f3, left + width / 2, 40, model.name, {'text-anchor': 'middle', 'font-size': 28, class: 'strong'});
  [0, 50, 100].forEach(tick => {
    const x = left + tick / 100 * width;
    line(f3, x, 95, x, 325, {class: 'grid'});
    label(f3, x, 85, `${tick}%`, {'text-anchor': tick === 0 ? 'start' : tick === 100 ? 'end' : 'middle', class: 'axis'});
  });
  [model.sufficient, model.insufficient].forEach((values, row) => {
    let x = left;
    values.forEach((value, j) => {
      const y = 105 + row * 145, w = value / 100 * width;
      draw(f3, 'rect', {x, y, width: w, height: 66, fill: [cyan, yellow, rose][j]});
      if (j === 1) {
        line(f3, x + w / 2, y + 66, x + w / 2, y + 85, {stroke: '#936000', 'stroke-width': 2});
        label(f3, x + w / 2, y + 110, `${value}%`, {'text-anchor': 'middle', 'font-size': 23});
      } else {
        label(f3, x + w / 2, y + 43, `${value}%`, {'text-anchor': 'middle', 'font-size': 26, style: 'fill:white'});
      }
      x += w;
    });
  });
});

// Figura 4: panel superior izquierdo, p. 10. Puntos aproximados por lectura gráfica.
// No son resultados nuevos ni se usa esta curva para calcular el rango 2-10%.
const coverage = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];
const confidence = [96,96,90,90,90,91,87,85,82,80,77,75,73,73,72,72,70,70,68,67];
const combined = [100,98,92,92,92,92,87,85,84,82,80,78,78,76.5,76,75,72,70,68,67];
const f4 = document.querySelector('#figure4');
const fx = value => 85 + value / 100 * 815;
const fy = value => 290 - (value - 60) / 40 * 230;
label(f4, 85, 24, 'Exactitud entre respuestas emitidas (%)', {'font-size': 22});
for (const tick of [60,70,80,90,100]) {
  line(f4, 85, fy(tick), 900, fy(tick), {class: 'grid'});
  label(f4, 65, fy(tick) + 7, tick, {'text-anchor': 'end', class: 'axis'});
}
for (const tick of [0,20,40,60,80,100]) {
  label(f4, fx(tick), 320, tick, {'text-anchor': 'middle', class: 'axis'});
}
label(f4, 495, 359, 'Cobertura: consultas que reciben respuesta (%)', {'text-anchor': 'middle', 'font-size': 22});
[confidence, combined].forEach((series, i) => {
  const points = series.map((v, j) => `${fx(coverage[j])},${fy(v)}`).join(' ');
  draw(f4, 'polyline', {points, fill: 'none', stroke: i ? blue : '#686e76', 'stroke-width': 4, ...(i ? {} : {'stroke-dasharray': '9 6'})});
  series.forEach((v, j) => draw(f4, 'circle', {cx: fx(coverage[j]), cy: fy(v), r: 4, fill: i ? blue : '#686e76'}));
});

const slides = [...document.querySelectorAll('.slide')];
slides.forEach((slide, i) => {
  slide.id = `slide-${i + 1}`;
  slide.setAttribute('aria-label', `Diapositiva ${i + 1} de ${slides.length}`);
  const page = document.createElement('span');
  page.textContent = `${String(i + 1).padStart(2, '0')} / ${slides.length}`;
  slide.querySelector('footer').append(page);
});
let current = 0;
function show(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
  history.replaceState(null, '', `#${current + 1}`);
  document.title = `${current + 1}/${slides.length} · Contexto suficiente`;
}
function fromHash() {
  const n = Number(location.hash.slice(1));
  show(Number.isInteger(n) && n > 0 ? n - 1 : 0);
}
function fit() {
  document.documentElement.style.setProperty('--scale', Math.min(innerWidth / 1600, innerHeight / 900));
}
addEventListener('keydown', event => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); show(current + 1); }
  if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); show(current - 1); }
  if (event.key === 'Home') { event.preventDefault(); show(0); }
  if (event.key === 'End') { event.preventDefault(); show(slides.length - 1); }
});
addEventListener('hashchange', fromHash);
addEventListener('resize', fit);
fromHash();
fit();
