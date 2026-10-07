# Deck v3 · Sufficient Context (ICLR 2025, arXiv:2411.06037v3)

Tercera versión del deck, construida al pie de la letra desde `../guion-visual-sufficient-context.md` (fuente de verdad: principios, dirección de arte, texto visible literal, datos verificados y guion oral). Tema oscuro tech-talk, lienzo 1280×720, 16 slides lógicas → **18 páginas PDF** (slide 2 con 3 builds; cada build es una página donde lo previo queda atenuado y lo nuevo entra destacado).

## Archivos

| Archivo | Qué es |
|---|---|
| `deck.html` | Fuente editable: 18 secciones `.slide` con `data-logical`/`data-build`. Guion oral en los `aside.notes` (en el build 1 de cada slide lógica); tiempo por slide en `data-seconds`. |
| `deck.css` | Tema oscuro: fondo `#0e1116`, superficie `#161b22`, texto `#e8ecf1`/`#9aa4b2`, acentos cian `#22d3ee` / violeta `#a78bfa` / ámbar `#fbbf24`; semánticos verde `#34d399` correcta, azul `#60a5fa` abstención, rojo `#f87171` alucinación. Portada y cierre sin fotografía (revisión del autor): mismo fondo plano del resto. |
| `deck.js` | Navegación (flechas/espacio/Home/End, `#N` en la URL) y escala al viewport. Sin dependencias. |
| `exportar.mjs` | Verifica (18 páginas, 16 lógicas, 510 s, sin desbordes), captura `verificacion/pagina-NN.png`, exporta `sufficient-context.pdf` y regenera `notas-expositor.md`. |
| `sufficient-context.pdf` | Entregable final: 18 páginas, 960×540 pt (1280×720 px), fuentes incrustadas, texto seleccionable. |
| `notas-expositor.md` | Pauta de tiempos (9:15) + guion por slide. Generado desde `deck.html`; no editar a mano. |
| `verificacion/` | Captura de cada página, regenerada en cada exportación. |

## Exportar

```bash
node exportar.mjs
```

Requiere Playwright con Chromium. Si no está en `node_modules`, definir `PLAYWRIGHT_PATH` (en este entorno: `~/.codex/skills/playwright-skill/node_modules/playwright`). El script falla si alguna página desborda el lienzo, si dejan de ser 18 páginas / 16 slides lógicas o si la pauta deja de sumar 510 s.

## Trazabilidad: qué respalda cada slide

| Slide | Página(s) PDF | Respaldo en el paper |
|---:|---|---|
| 1 | 1 | Portada. Enunciado-contexto + la pregunta central del abstract del paper («whether errors arise because LLMs fail to utilize the context or the context itself is insufficient»). Sin foto de fondo (revisión del autor). |
| 2 | 2–4 | Analogía del expositor (inspirada en la intuición del paper, NO es un experimento; así se declara en el guion oral). Las mini-capturas de Encarta/Wikipedia/Stack Overflow/Papers son maquetas vectoriales estilizadas (sin logos ni capturas reales). |
| 3 | 5 | §1 (qué es RAG, inferencia). La mención a variantes de RAG se eliminó en revisión del autor (la taxonomía de Gao et al. no aporta a esta explicación); ya no hay fuentes externas al paper. |
| 4 | 6 | §1, tres comportamientos indeseados de RAG. |
| 5 | 7 | §2, trabajo relacionado (Shi 2023, Xie 2024, Yoran 2024, Cuconasu 2024; Self-RAG/Asai 2023, Speculative RAG/Wang 2024, Liu 2024). |
| 6 | 8 | §3.1, definición de sufficient context; suficiente ≠ verdadero. |
| 7 | 9 | §3.2, autorater (no requiere respuesta de referencia). |
| 8 | 10 | §3.2 · Tabla 1: se muestran cuatro métodos (93,0 / 87,8 / 87,0 / 82,6 %) sobre 115 instancias etiquetadas a mano. |
| 9 | 11 | §4.1 · Figura 2, valores impresos exactos: FreshQA 63,7/77,4/77,4 · HotpotQA 45,4/46,2/46,2 · Musique 33,4/44,6/44,6 (a 2.000/6.000/10.000 tokens). |
| 10 | 12 | §4.2 · Figuras 3 y 6 (HotpotQA, valores IMPRESOS de la figura 6, p.18): Gemini 67,5/6,5/26,0 y 49,4/16,7/33,8 · GPT-4o 71,9/8,2/19,9 y 59,5/11,5/29,0 · Gemma 64,1/1,7/34,2 y 37,9/11,9/50,2. Claude 3.5 Sonnet se omite por legibilidad (declararlo si preguntan). Abstención sin/con RAG (guion oral): Gemini 100% → 18,6%. |
| 11 | 13 | §4.3 · Tabla 2: rango 35–62% de aciertos con contexto insuficiente; se muestran los 8 tipos identificados (en el orden del paper). |
| 12 | 14 | §5, dos intervenciones. |
| 13 | 15 | §5.1 · Figura 4, panel Gemini/HotpotQA. **Las curvas son aproximación visual de tendencia** (series editables en el SVG); la anotación «+5 pts cerca de 70% de cobertura» y la mejora 2–10% sí son del paper. El pie declara el eje Y truncado (60–100). |
| 14 | 16 | §5.2 · Apéndice B.1 · Tabla 3 (Mistral-7B-Instruct-v0.3, Musique): 28,8/11,8/59,4 · 31,4/0,0/68,6 · 23,0/1,2/75,8 · 23,0/2,2/74,8. |
| 15 | 17 | Conclusiones: responde explícitamente la pregunta de la portada con la evidencia expuesta — "no encontró" (Figura 2), "no aprovechó" (Figuras 3/6), "la salida" (autorater §3 + generación selectiva §5.1). |
| 16 | 18 | Cierre; mismo estilo plano de la portada. |

Las figuras están recreadas como SVG inline en `deck.html` (texto seleccionable, ejes en español, valores impresos sobre las barras). No hay capturas del paper.

**Nota sobre pies de fuente:** por decisión del autor (revisión v3.1) las slides NO llevan pies `§x · Figura/Tabla`; la trazabilidad vive en esta tabla. El contexto imprescindible se movió a la propia slide: «HotpotQA» dentro del gráfico de la slide 10, «(eje Y desde 60)» en el de la slide 13, «Mistral 7B con LoRA · Musique» bajo el título de la slide 14.

## Créditos y fuentes tipográficas

- Sin fotografías: la foto de estudio de v1/v2 se descartó en la revisión v3.1 (portada y cierre planos). Las mini-capturas de la slide 2 son SVG propios.
- **Manrope** (OFL, `assets/Manrope-OFL.txt`): `manrope.ttf` (Regular 400) y `manrope-bold.ttf` (Bold 700) heredadas de v2, más `manrope-extrabold-var.ttf` (fuente variable wght 200–800, descargada del repo oficial google/fonts) usada con `font-weight:800` para los títulos ExtraBold.
- **IBM Plex Mono** (OFL, `assets/IBMPlexMono-OFL.txt`): `plex-mono.ttf`.
- Instrument Serif NO se usa en v3 (era del estilo claro de v2) y no se copió a esta carpeta.
- Glifos sin cobertura en Plex/Manrope (⟺, ∃, ✓, ✗) caen a fuentes del sistema (Noto Sans Math / DejaVu), también incrustadas en el PDF.

## Verificaciones realizadas

- PDF de 21 páginas (`pdfinfo`), tamaño de página 960×540 pt, fuentes todas incrustadas (`pdffonts`, emb=yes), texto seleccionable (`pdftotext` recupera todas las cifras).
- Cada página rasterizada y revisada visualmente; chequeo automático de desbordes en `exportar.mjs`.
- Todas las cifras cotejadas contra la sección 5 («Datos verificados») del guion maestro.
- Contraste: texto principal 15,9:1; secundario 7,5:1; cian 10,5:1; violeta 7,0:1; texto oscuro sobre banda cian 10,5:1 y sobre violeta 7,0:1 (umbrales: ≥7:1 principal, ≥4,5:1 secundario).

## Pendiente de revisión manual

- Ensayar en voz alta contra `notas-expositor.md` (objetivo 8:30; recortes sugeridos si pasa de 9:00: referencias orales de slide 5, detalle LoRA de slide 14).
- La línea inferior de la portada («Sebastián Palma Masabeu · IA Generativa · 7 de octubre de 2026») interpreta el campo «nombre del expositor · curso · fecha» del guion: confirmar nombre del curso.
