# Task Plan: Sufficient Context Presentation

## Goal
Create a concise, visual 8-10 minute presentation and speaker guide for the paper "Sufficient Context".

## Phases
- [x] Phase 1: Read current guion, paper notes, and oral-presentation tips.
- [x] Phase 2: Lock narrative structure, slide count, and visual direction.
- [x] Phase 3: Rewrite `guion-visual-sufficient-context.md` with slide plan, visual specs, and speaker notes.
- [ ] Phase 4: Build or hand off deck creation.
- [ ] Phase 5: Review timing, readability, and factual claims.

## Key Questions
1. Final implementation path: HTML/CSS export to PDF, unless user chooses Figma Slides.
2. Should generated raster assets be created now or replaced with CSS/SVG-style diagrams first?

## Decisions Made
- Use the tips PDF as constraints: one main message per slide, clear story, strong opening, minimal text, readable figures, planned pacing.
- Reuse the "Reuse, Don't Retrain" deck only as visual inspiration, not as a direct copy.
- Keep RAG intro short and frame the paper as diagnostic, not as a new retriever.
- Build in Spanish for a mixed audience, with RAG baseline included.
- Target 9:00-9:30 so the talk stays below the 10 minute cap.
- Include explicit critique/limitations before the final closing.
- Recommend HTML/CSS -> PDF for the final deck because the required deliverable is PDF and the deck needs recreated charts.

## Errors Encountered
- None.

## v3 (2026-10-06)
- Guion reescrito completo tras feedback: v1/v2 simplificaron demasiado y no contaban la historia.
- Decisiones v3: 8-10 min estricto (pauta 9:15), tema oscuro tech-talk, solo PDF (builds = páginas duplicadas), variantes RAG como mención breve citando Gao et al. 2023.
- Datos exactos extraídos del PDF del paper (tablas 1-3 completas, figuras 1/2/5/6 con valores impresos); slide de figura 3 ahora usa valores exactos de la figura 6 (HotpotQA) en vez de lecturas visuales.
- Guion incluye: arco narrativo por actos, campos Mensaje/Puente/Al-salir por slide, texto visible literal, spec de arte cerrada, pauta de tiempos, preparación personal (métricas + 8 tipos tabla 2) e instrucciones para constructor (deck-v3/).

## Status
**Fases 4 y 5 completadas (v3.3, 2026-10-06).** `deck-v3/` construido e iterado en 12 rondas de feedback (v3.5): 16 slides lógicas / 18 páginas PDF / pauta 8:30, con cierre circular (portada plantea la pregunta del abstract, conclusiones la responden con datos). Eliminadas en iteración: slide de remarks (v3.3) y mock de chat (v3.5); su contenido quedó como respaldo oral en notas. Verificado: cifras cotejadas contra el paper, sin desbordes, contraste, fuentes incrustadas. Guion maestro reescrito íntegro a v3.3 — guion, deck, notas y LEEME consistentes entre sí. Pendiente solo: ensayo oral con cronómetro.
