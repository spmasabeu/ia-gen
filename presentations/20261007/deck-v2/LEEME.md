# Deck v2 · Contexto suficiente (Sufficient Context, ICLR 2025)

Presentación de 18 diapositivas (16:9, 1600×900), en español, pensada para 9:00–9:30 y nunca más de 10 minutos. Rediseño del deck v1 con papel cálido, riel lateral de sección numerada y gráficos recompuestos (Figura 2 en barras horizontales).

## Archivos

| Archivo | Qué es |
|---|---|
| `deck.html` | Fuente editable del deck. Las notas del expositor viven en los `aside.notes` de cada slide; el tiempo por slide en `data-seconds`. |
| `deck.css` | Estilo: fondo claro cálido `#faf6ee`, tipografías Instrument Serif / Manrope / IBM Plex Mono (locales, en `assets/`). |
| `deck.js` | Dibuja las figuras 2, 3 y 4 recreadas en SVG (los valores están comentados con su fuente en el paper) y maneja la navegación por teclado. |
| `exportar.mjs` | Verifica (18 slides, 555 s, sin desbordes, navegación, escala móvil), captura `verificacion/slide-NN.png`, exporta `sufficient-context.pdf` y regenera `notas-expositor.md`. |
| `sufficient-context.pdf` | PDF final listo para presentar (18 páginas). |
| `notas-expositor.md` | Guion por slide con cronograma acumulado + respaldo para preguntas. Generado desde `deck.html`; no editar a mano. |
| `verificacion/` | Capturas de cada slide y vista móvil, regeneradas en cada exportación. |

## Usar

- **Presentar:** abrir `deck.html` en un navegador. Flechas / espacio / PageUp-PageDown / Home / End. `#N` en la URL salta a la slide N. O presentar el PDF directamente.
- **Editar:** cambiar texto en `deck.html`, datos de gráficos en `deck.js`, estilo en `deck.css`. Luego re-exportar.
- **Exportar:** `node exportar.mjs` (requiere Playwright con Chromium; si no está en `node_modules`, definir `PLAYWRIGHT_PATH`, p. ej. `~/.codex/skills/playwright-skill/node_modules/playwright`). El script falla si algo desborda el lienzo o si el total de segundos deja de ser 555.

## Cifras clave (verificadas contra el paper, arXiv:2411.06037v3)

- Figura 2 (contexto suficiente, 2k/6k/10k tokens): FreshQA 63,7/77,4/77,4 · HotpotQA 45,4/46,2/46,2 · Musique-Ans 33,4/44,6/44,6.
- Autorater: Gemini 1.5 Pro 1-shot, 93,0 % de exactitud (F1 0,935) sobre 115 casos etiquetados por humanos.
- Generación selectiva: mejora de 2–10 % en la fracción de respuestas correctas **entre las emitidas**; no es una mejora universal de todo RAG.
- Figura 3: porcentajes aproximados por lectura gráfica (solo HotpotQA); Figura 4: panel Gemini/HotpotQA con puntos aproximados.

## Pendiente de revisión manual

- Ensayar en voz alta contra el cronograma de `notas-expositor.md` (objetivo 9:15). Si se acerca a 10:00, abreviar slides 6, 9 y 17.
- Las fuentes tipográficas son locales (licencias OFL en `assets/`); la imagen de portada `assets/mesa-estudio.jpg` viene del deck v1 — confirmar su licencia si la presentación se publica.
