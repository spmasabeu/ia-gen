# Sufficient Context — Guion visual v3

**Paper:** Joren et al., *Sufficient Context: A New Lens on Retrieval Augmented Generation Systems*, ICLR 2025, arXiv:2411.06037v3.
**Objetivo:** charla oral de 8-10 minutos (plan: 8:30), en español, entregable **solo PDF**.
**Audiencia:** mixta; se explica RAG desde cero, sin asumir conocimiento previo.
**Dirección visual:** oscuro tipo tech-talk (spec completa abajo).
**Decisiones cerradas con el autor de la charla:** 8-10 min estricto · estilo oscuro · solo PDF (builds = páginas duplicadas) · sin pies de fuente en las slides (trazabilidad en el LEEME.md del deck) · sin fotografías (portada y cierre planos) · sin mención en pantalla a variantes de RAG · título de portada = pregunta central del paper.

> **Nota de versión (v3.3, vigente):** este guion fue actualizado íntegramente tras construir y revisar el deck final (`deck-v3/`): todas las specs de slide, la pauta de tiempos y la numeración de abajo reflejan la versión vigente — **16 slides lógicas, 18 páginas PDF, 8:30** — y coinciden con `deck-v3/notas-expositor.md`. Resumen de la evolución respecto del plan original (v3.0):
> - v3.1 — sin fotografías (portada/cierre planos), sin pies de fuente (trazabilidad en `deck-v3/LEEME.md`), títulos reescritos para ser más explícitos, referencias de related work en formato `Título (Autor Año)`, mini-maquetas vectoriales en la analogía, tarjeta tachada del autorater centrada, precisión en notas sobre el alcance de "RAG" en los experimentos (recuperación fija de benchmarks, sin búsqueda web en vivo).
> - v3.2 — portada = pregunta central del abstract (`¿No encontró lo necesario, o no supo aprovecharlos?`); eliminada la mención en pantalla a variantes de RAG (sin citas externas al paper); el giro muestra los 8 tipos completos de la Tabla 2.
> - v3.3 — eliminada la antigua slide de remarks (casos borde); su contenido quedó como respaldo oral en la slide 7 (definición). Numeración corrida en deck, notas, LEEME y este guion.
> - v3.4 — cierre circular explícito: la portada gana un enunciado-contexto sobre la pregunta y las conclusiones la responden con la evidencia expuesta ("pasan las dos cosas"). Conclusiones pasa a 0:35.
> - v3.5 — eliminada la slide del mock de chat (para recuperar tiempo): el par (Q, C) y la precisión sobre el alcance de "RAG" en los experimentos quedaron como respaldo oral en la slide 3. Pauta total 8:30. Numeración corrida (ya reflejada abajo).

---

## 0. Principios rectores (del decálogo de charlas orales, tipsCharlasOrales.pdf)

Estos principios NO son decorativos: cada slide de este guion los aplica y el agente constructor debe respetarlos.

1. **Comunicar un mensaje, no presentar información.** Mensaje único de la charla: *"en RAG no basta recuperar documentos: hay que medir si el contexto alcanza, ver si el modelo lo aprovecha y decidir cuándo abstenerse"*.
2. **Un mensaje principal por slide.** Cada slide declara abajo su campo `Mensaje:`. Si un elemento visual no empuja ese mensaje, se elimina.
3. **Las slides apoyan al orador, no lo reemplazan.** Texto visible mínimo (key points, cifras, expresiones); el desarrollo vive en el guion oral. Nada de párrafos.
4. **Figuras como vehículo principal; ejes siempre explicables.** Cada gráfico recreado lleva ejes rotulados y el guion oral los explica antes de leer el resultado.
5. **Contar una historia.** Estructura clásica: problema → por qué importa → estado del arte → propuesta → resultados → conclusiones. Cada slide tiene campo `Puente:` que la conecta con la anterior.
6. **Apertura con pregunta/analogía, cierre reafirmando la contribución.**
7. **Contraste alto, fuente grande, sin colores rebuscados.** Paleta reducida y semántica (abajo).
8. **Practicar.** La pauta de tiempos por slide está para ensayar con cronómetro.

---

## 1. Dirección de arte (oscuro tech-talk)

### Paleta

| Rol | Hex | Uso |
|---|---|---|
| Fondo | `#0e1116` | base de todas las slides |
| Superficie | `#161b22` | tarjetas, paneles, bloques de código/chat |
| Borde sutil | `#2a313c` | separadores, contornos de tarjeta |
| Texto principal | `#e8ecf1` | títulos y texto |
| Texto secundario | `#9aa4b2` | etiquetas, pies, fuentes |
| Acento primario | `#22d3ee` (cian) | título de sección, resaltes, cifras clave |
| Acento método | `#a78bfa` (violeta) | la señal "sufficient context" en figuras (coincide con el morado del paper en figura 4) |
| Correcto | `#34d399` (verde) | barras/series "correcta" |
| Abstención | `#60a5fa` (azul) | barras/series "abstención" |
| Alucinación | `#f87171` (rojo) | barras/series "alucinación" |
| Cifra destacada | `#fbbf24` (ámbar) | números gigantes puntuales (93%, 44,6%, 35-62%) |

Reglas: máximo 2 acentos simultáneos por slide además de los 3 semánticos en gráficos. Los colores semánticos verde/azul/rojo se usan SOLO con ese significado en toda la charla (consistencia = la audiencia aprende el código una vez). Contraste texto/fondo ≥ 7:1 para texto principal, ≥ 4.5:1 para secundario.

### Tipografía

- **Títulos:** Manrope ExtraBold (ya local en `assets/`), tracking apretado, tamaño ≥ 54px en lienzo 1280×720.
- **Texto visible:** Manrope Regular/Medium, ≥ 28px.
- **Etiquetas, ejes, números de sección, código/chat:** IBM Plex Mono (ya local), ≥ 20px.
- No usar Instrument Serif en v3 (era del estilo claro anterior).

### Layout base

- Lienzo 16:9, 1280×720, márgenes internos 64px.
- Esquina superior izquierda: número y nombre de sección en mono cian: `01 / MOTIVACIÓN`.
- Esquina inferior derecha: paginación discreta `n/16` en texto secundario.
- Sin pies de fuente (decisión del autor): la trazabilidad paper↔slide vive en el `LEEME.md` del deck. El contexto imprescindible va dentro de la propia slide: dataset como etiqueta del gráfico, modelo bajo el título, declaración del eje truncado junto al eje.
- Una idea dominante por slide: o UNA cifra gigante, o UN gráfico, o UNA composición. Nunca dos protagonistas.

### Fotografía

Sin fotografías (decisión del autor): portada y cierre usan el mismo fondo plano `#0e1116` del resto. Las únicas piezas ilustrativas son maquetas vectoriales propias (mini-capturas estilizadas en la slide 2), sin logos ni capturas reales.

### Builds en PDF

Entregable solo PDF ⇒ las apariciones progresivas se implementan **duplicando la página**: la slide lógica N con 3 builds genera páginas N.1, N.2, N.3 donde cada página agrega un elemento (los anteriores quedan atenuados al 100% de visibilidad, el nuevo entra destacado). Avanzar página = "animación". Solo las slides marcadas con `Builds:` los tienen; el resto es 1 página. Total: 16 slides lógicas = 18 páginas PDF (slide 2 ×3 builds).

---

## 2. Arco narrativo

| Acto | Pregunta que lo abre | Slides | Tiempo |
|---|---|---:|---:|
| I. Motivación | ¿Qué hacemos cuando lo que sabemos no alcanza? | 1-3 | 0:00-1:35 |
| II. Problema | ¿Por qué sigue fallando un modelo con documentos en la mano? | 4-5 | 1:35-2:30 |
| III. Propuesta | ¿Cómo medimos si el contexto alcanza? | 6-8 | 2:30-4:20 |
| IV. Evidencia | ¿Qué revela esta nueva lente? | 9-11 | 4:20-6:15 |
| V. Intervención | ¿Sirve la señal para decidir cuándo responder? | 12-14 | 6:15-7:50 |
| VI. Cierre | ¿Qué nos llevamos? | 15-16 | 7:50-8:30 |

Ritmo: ~125 palabras/minuto hablando. Cada slide trae su presupuesto de tiempo y de palabras. Si el ensayo pasa de 9:30, recortar en este orden: referencias orales de slide 5 (related work), detalle LoRA de slide 14 (fine-tuning).

---

## 3. Slides

> Convención de campos: **Mensaje** = lo único que la audiencia debe retener. **Puente** = frase oral que conecta con la slide anterior (contar historia, no saltar de tema). **Texto visible** = TODO el texto que aparece en la slide, literal; nada más se agrega. **Al salir** = qué sabe la audiencia que antes no sabía.

---

### Slide 1 — Portada · 0:15

**Sección:** `00 / APERTURA`
**Mensaje:** esta charla va de una pregunta simple: ¿el contexto alcanza?

**Texto visible:**
- Enunciado-contexto (mono, sobre el título): `cuando un modelo responde mal con los documentos en la mano…`
- Título grande: `¿No encontró lo necesario, o no supo aprovecharlos?` (la pregunta central del abstract del paper; se responde explícitamente en la slide 15)
- Subtítulo mono: `Sufficient Context: A New Lens on RAG Systems · ICLR 2025`
- Línea inferior: nombre del expositor · curso · fecha

**Visual:** fondo plano `#0e1116`, título ExtraBold blanco, subtítulo mono cian. Sin fotografía. La pregunta se re-formula sobre RAG en la slide 4 y se responde en la 15 (cierre circular).

**Guion oral (~35 palabras):**
"Cuando un modelo responde mal incluso con los documentos en la mano, hay dos sospechosos posibles. Esa es la única pregunta de hoy — y un paper de ICLR 2025 construyó toda una lente para responderla. Al final de la charla la vamos a contestar."

**Al salir:** saben el tema y que habrá UNA pregunta central.

---

### Slide 2 — Analogía: el ensayo · 0:40 · Builds: 3

**Sección:** `01 / MOTIVACIÓN`
**Mensaje:** cuando la memoria propia no alcanza, incorporamos fuentes externas; no "reentrenamos" el cerebro.
**Puente:** "Antes de hablar de modelos, hablemos de nosotros."

**Texto visible (aparece por build):**
- Build 1: tarjeta `MEMORIA PROPIA` con icono cerebro + línea mono `lo que ya sabemos`
- Build 2: fila de tarjetas-fuente con nombres en mono: `Encarta` `Wikipedia` `Stack Overflow` `Papers` + flecha hacia el centro + etiqueta `contexto externo`
- Build 3: tarjeta `ENSAYO` destacada en cian + línea `mejor respuesta, mismo cerebro`

**Visual:** composición horizontal en tres zonas (memoria → fuentes → resultado). Tarjetas genéricas con nombre tipográfico, sin logos de marca; cada fuente lleva una mini-captura vectorial estilizada (ventana Win95 para Encarta, artículo para Wikipedia, Q&A con votos para Stack Overflow, página arXiv a dos columnas para Papers), arriba en la fila superior y abajo en la inferior. En build 3, flecha completa recorre las tres zonas.

**Guion oral (~85 palabras):**
"Si nos piden un ensayo sobre un tópico, partimos de nuestro banco de memoria. Pero muchas veces ese conocimiento no alcanza para responder de la forma más plausible. ¿Qué hacíamos? Encarta, Wikipedia, Stack Overflow, papers: incorporábamos contexto externo para responder mejor. Y noten algo: nadie reentrenó su cerebro para escribir ese ensayo. A los modelos de lenguaje les pasa exactamente lo mismo: fueron entrenados con un volumen de datos que les da capacidades, pero muchas veces no tienen el contexto suficiente para una respuesta correcta y precisa."

**Cuidado:** la analogía es del expositor (inspirada en la intuición del paper), no un experimento. No presentarla como resultado.

**Al salir:** tienen la intuición de "memoria + fuentes externas" instalada.

---

### Slide 3 — Qué es RAG · 0:40

**Sección:** `01 / MOTIVACIÓN`
**Mensaje:** RAG = recuperar documentos y ponerlos en el prompt, **en inferencia, no en entrenamiento**.
**Puente:** "Esa solución humana tiene nombre en los modelos: RAG."

**Texto visible:**
- Título: `RAG: recuperar antes de generar`
- Pipeline horizontal en 5 nodos mono: `pregunta → búsqueda → fragmentos → prompt enriquecido → respuesta`
- Frase destacada en cian (la única grande): `ocurre en inferencia, no en entrenamiento`

**Visual:** pipeline con nodos-tarjeta conectados por flechas; nodo `prompt enriquecido` resaltado en violeta (ahí se inyecta el contexto). Sin mención en pantalla a variantes de RAG.

**Guion oral (~85 palabras):**
"RAG significa Retrieval-Augmented Generation. Ante una pregunta, el sistema busca documentos o fragmentos relevantes, los pone dentro del prompt, y el modelo genera usando ese contexto. Punto clave: esto ocurre a nivel de inferencia; los pesos del modelo no cambian, no hay reentrenamiento. Existen muchas formas de implementar la recuperación — desde un buscador simple hasta pipelines con reranking, búsqueda iterativa o agentes — pero este paper no se casa con ninguna: mira solo el contexto que llega al modelo. El objeto de estudio de toda la charla es ese par: pregunta más contexto dentro del prompt."

**Cuidado (si preguntan):** en los experimentos del paper no hay búsqueda web en vivo ni chat: los benchmarks ya traen pregunta y pasajes (recortados a un presupuesto de tokens), pasados por API dentro del prompt. La lente abstrae el mecanismo de recuperación: solo importa el par (Q, C). (Este respaldo vivía en la antigua slide del mock de chat, eliminada en v3.5.)

**Al salir:** pueden definir RAG, saben que es inferencia (no entrenamiento) y que el objeto de estudio es el par (Q, C).

---

### Slide 4 — El problema: tres fallas conocidas · 0:30

**Sección:** `02 / PROBLEMA`
**Mensaje:** los LLM con RAG fallan de tres formas documentadas, incluso con evidencia en mano.
**Puente:** "RAG suena a problema resuelto. No lo es."

**Texto visible:**
- Título: `El modelo puede fallar tras la recuperación`
- Tres tarjetas numeradas, una línea cada una:
  1. `Responden mal aun con evidencia recuperada`
  2. `Se distraen con información no relacionada`
  3. `No extraen bien la respuesta de textos largos`

**Visual:** tres tarjetas en fila con número gigante en mono (1, 2, 3) y borde rojo sutil; iconos mínimos (alerta, ruido, documento largo). Nada más.

**Guion oral (~60 palabras):**
"La introducción del paper parte de tres comportamientos indeseados en sistemas RAG: responder incorrecto incluso con evidencia recuperada; distraerse con información no relacionada; y fallar al extraer respuestas desde fragmentos largos de texto. O sea: recuperar documentos no cierra el problema. Y acá nace la pregunta de diagnóstico: cuando falla, ¿no encontró lo necesario, o no supo aprovecharlos?"

**Al salir:** el problema está planteado y la pregunta de diagnóstico formulada.

---

### Slide 5 — Estado del arte: dos ejes y un hueco · 0:25

**Sección:** `02 / PROBLEMA`
**Mensaje:** se estudió "relevancia" y "alucinaciones", pero nadie definió si el contexto *alcanza*.
**Puente:** "¿Nadie había mirado esto antes? Casi."

**Texto visible:**
- Título: `"Relevante" no es "suficiente"`
- Dos columnas-tarjeta:
  - `CONTEXTO (IR)RELEVANTE` — mono, formato Título (Autor Año): `Easily Distracted (Shi 2023) · Knowledge Conflicts (Xie 2024) · Ret-Robust (Yoran 2024) · The Power of Noise (Cuconasu 2024)`
  - `REDUCIR ALUCINACIONES` — mono: `Self-RAG (Asai 2023) · Speculative RAG (Wang 2024) · "lost in the middle" (Liu 2024)`
- Banda inferior cian: `hueco: ¿la evidencia permite construir la respuesta?`

**Visual:** dos columnas simétricas arriba, banda del hueco cruzando abajo a todo el ancho. Las referencias son chips pequeños en mono: se ven, no se leen en voz alta.

**Guion oral (~55 palabras):**
"El trabajo previo corre por dos ejes: robustez a contexto irrelevante — ruido, documentos contradictorios — y técnicas para reducir alucinaciones, como Self-RAG. Pero 'relevante' significaba cosas distintas en cada paper: desde 'habla del tema' hasta 'contiene la respuesta'. Nadie había definido con precisión la pregunta que importa: ¿esta evidencia permite construir la respuesta? Ese es el hueco que este paper llena."

**Al salir:** entienden qué faltaba y por qué el paper existe.

---

### Slide 6 — Contribución 1: definición de sufficient context · 0:45

**Sección:** `03 / PROPUESTA`
**Mensaje:** suficiencia = existe una respuesta plausible construible desde el contexto; y **suficiente ≠ verdadero**.
**Puente:** "Primera contribución: ponerle matemática a la pregunta."

**Texto visible:**
- Título: `La definición de contexto suficiente`
- Centro, grande en mono: `q′ = (Q, C)` y debajo `suficiente ⟺ ∃ A′ plausible para Q dada C`
- Tres chips: `Q pregunta` · `C contexto` · `A′ respuesta plausible`
- Abajo, destacado en ámbar: `suficiente ≠ verdadero`

**Visual:** la expresión es la protagonista, tipografía mono gigante centrada; chips explicativos pequeños debajo. Sin párrafos.

**Guion oral (~90 palabras):**
"En un dataset, cada instancia trae pregunta Q, contexto C y respuesta de referencia A. Pero la definición trabaja solo con el par Q y C: hay contexto suficiente si y solo si existe una respuesta A-prima que sea plausible para Q dada la información de C. Dos cosas potentes aquí. Uno: no necesitamos conocer la respuesta oficial para evaluarlo — sirve en producción, donde no hay respuesta de referencia. Dos: suficiente no significa verdadero. Un documento equivocado puede permitir construir una respuesta perfectamente identificable. La suficiencia mide si se puede responder, no si el mundo está bien descrito."

**Respaldo:** los tres casos borde de §3.1 (multi-hop sin inventar conexiones, pregunta ambigua, varias respuestas posibles) van en las notas del expositor de esta slide; la antigua slide dedicada a ellos se eliminó.

**Al salir:** pueden enunciar la definición y su matiz clave.

---

### Slide 7 — Contribución 2: el autorater · 0:30

**Sección:** `03 / PROPUESTA`
**Mensaje:** un modelo-juez clasifica suficiencia a escala, sin ver la respuesta oficial.
**Puente:** "Definir está bien. Pero ¿quién etiqueta miles de instancias?"

**Texto visible:**
- Título: `Un juez automático de suficiencia`
- Diagrama central: `(Q, C) → AUTORATER → suficiente / insuficiente`
- Tarjeta tachada al costado: `respuesta oficial A` con etiqueta `no la necesita`

**Visual:** diagrama de flujo de 3 nodos, autorater como caja violeta. La tarjeta tachada de la respuesta oficial, centrada horizontalmente bajo el flujo, es el detalle memorable: comunica visualmente la gracia del método.

**Guion oral (~60 palabras):**
"Etiquetar suficiencia a mano no escala. La segunda contribución es un autorater: otro modelo que actúa como evaluador — recibe pregunta y contexto, y clasifica: suficiente o insuficiente. La necesidad que cubre es doble: etiquetar datasets completos para el análisis que viene, y servir de señal en producción. Y de nuevo: no necesita la respuesta correcta oficial. ¿Pero podemos confiar en un modelo para esto?"

**Al salir:** saben qué es un autorater, para qué sirve y qué necesidad cubre. La pregunta final engancha con la validación.

---

### Slide 8 — Validación: 115 casos contra humanos · 0:35

**Sección:** `03 / PROPUESTA`
**Mensaje:** el mejor autorater (Gemini 1.5 Pro, 1-shot) acierta 93% contra etiquetas humanas, sin respuesta de referencia.
**Puente:** "La respuesta del paper: sí, y lo midieron así."

**Texto visible:**
- Título: `93% de acuerdo con humanos`
- Línea mono: `115 instancias etiquetadas a mano · PopQA · FreshQA · Natural Questions · EntityQuestions`
- Tabla 1 recreada (reducida a 2 columnas y 4 métodos):

| Método | Exactitud |
|---|---:|
| **Gemini 1.5 Pro (1-shot)** | **93,0%** |
| FLAMe (PaLM 24B ajustado) | 87,8% |
| Gemini 1.5 Pro (0-shot) | 87,0% |
| TRUE-NLI (T5 11B) | 82,6% |

**Visual:** cifra `93%` gigante en ámbar a la izquierda; tabla recreada con el estilo del deck a la derecha, fila ganadora resaltada con fondo violeta sutil. Sin pie.

**Guion oral (~75 palabras):**
"Para validar el evaluador automático, reunieron 115 pares pregunta-contexto y personas etiquetaron cada uno como suficiente o insuficiente. Después compararon las etiquetas predichas por estos métodos con las humanas. La exactitud de la tabla mide ese acuerdo, no la calidad de las respuestas de un sistema RAG. Gemini 1.5 Pro con un ejemplo alcanza 93%; los otros métodos mostrados quedan por debajo. Esto respalda usar un evaluador automático para analizar los contextos de los benchmarks que veremos ahora."

**Al salir:** confían (con su matiz) en la herramienta; la historia puede usar el autorater como lente.

---

### Slide 9 — Lente sobre los benchmarks (figura 2) · 0:35

**Sección:** `04 / EVIDENCIA`
**Mensaje:** benchmarks estándar traen mucha instancia sin contexto suficiente; y más tokens no arregla todo.
**Puente:** "Primera pregunta con la lente puesta: ¿los benchmarks que usamos traen la evidencia?"

**Texto visible:**
- Título: `¿Los benchmarks traen la evidencia?`
- Gráfico de barras agrupadas (recreación figura 2): eje Y `% con contexto suficiente` 0-100, grupos por dataset, 3 barras por grupo (`2.000` / `6.000` / `10.000 tokens`):
  - FreshQA: `63,7 / 77,4 / 77,4`
  - HotpotQA: `45,4 / 46,2 / 46,2`
  - Musique-Ans: `33,4 / 44,6 / 44,6`
- Microdescripciones mono bajo cada grupo: `FreshQA: info reciente, URLs de apoyo` · `HotpotQA: wiki, 5 fragmentos` · `Musique: multi-hop, 20 fragmentos`

**Visual:** barras en cian con la de 6.000 tokens destacada; valores impresos sobre cada barra. Anotación-flecha entre 6.000 y 10.000: `+4.000 tokens = +0,0 pts`. Sin pie.

**Guion oral (~75 palabras):**
"Aplicaron el autorater a tres benchmarks. El eje vertical: porcentaje de instancias cuyo contexto alcanza. FreshQA, con URLs de apoyo del propio dataset, llega a 77%. Pero HotpotQA y Musique — multi-hop — quedan bajo la mitad: 46 y 44,6%. Dos hallazgos: pasar de 2.000 a 6.000 tokens ayuda, sobre todo en Musique; de 6.000 a 10.000, cero cambio — es truncar las mismas fuentes, no buscar más. Consecuencia incómoda: parte de los errores que le achacamos al modelo son del dataset."

**Al salir:** saben que "benchmark respondible" no garantiza evidencia suficiente.

---

### Slide 10 — Qué hacen los modelos con y sin evidencia (figura 3) · 0:45

**Sección:** `04 / EVIDENCIA`
**Mensaje:** tres hallazgos: con evidencia igual alucinan; sin evidencia responden más de lo que se abstienen; y RAG baja la abstención.
**Puente:** "Segunda pregunta: separando por suficiencia, ¿cómo responden los modelos?"

**Texto visible:**
- Título: `Alucinan más de lo que se abstienen`
- Recreación simplificada de figura 3: 2 filas (`contexto suficiente` / `contexto insuficiente`) × 3 columnas (Gemini 1.5 Pro, GPT-4o, Gemma 27B), barras apiladas o agrupadas con los 3 colores semánticos (`correcta` verde, `abstención` azul, `alucinación` roja). Dataset mostrado: **HotpotQA** (valores exactos impresos de la figura 6 del paper):
  - Gemini — suf: `67,5 / 6,5 / 26,0` · insuf: `49,4 / 16,7 / 33,8`
  - GPT-4o — suf: `71,9 / 8,2 / 19,9` · insuf: `59,5 / 11,5 / 29,0`
  - Gemma 27B — suf: `64,1 / 1,7 / 34,2` · insuf: `37,9 / 11,9 / 50,2`
- Leyenda de colores + etiqueta `HotpotQA` dentro del gráfico (sin pie)

**Visual:** SOLO el gráfico y la leyenda; cero bullets — los tres hallazgos los dice el orador (lineamiento: slide minimalista, discurso al frente). Gráfico ocupa ~75% del lienzo, etiquetas grandes.

**Guion oral (~95 palabras):**
"Clasifican cada respuesta en correcta, abstención o alucinación — y ojo, alucinación aquí es respuesta juzgada incorrecta, no necesariamente una historia inventada. Fila de arriba: contexto suficiente; abajo: insuficiente. Tres hallazgos. Uno: con contexto suficiente los aciertos suben, pero la barra roja nunca desaparece — alucinan igual, miren Gemma con 34%. Dos: con contexto insuficiente deberían abstenerse, y sin embargo la barra roja supera a la azul: responden más de lo que callan. Y tres, el dato que más me impresionó: darle contexto reduce la abstención — Gemini sin RAG se abstenía el 100% de las veces; con RAG, 18,6%. Recibir cualquier documento los envalentona."

**Al salir:** tienen los 3 hallazgos centrales del paper; tensión lista para el giro.

---

### Slide 11 — El giro: aciertos sin evidencia suficiente · 0:35

**Sección:** `04 / EVIDENCIA`
**Mensaje:** 35-62% de aciertos CON contexto insuficiente ⇒ insuficiente ≠ inútil ⇒ no sirve la regla "si falta, bloquear".
**Puente:** "Y aquí el hallazgo contraintuitivo."

**Texto visible:**
- Título: `El giro: aciertan igual sin evidencia`
- Cifra gigante ámbar: `35-62%`
- Subtítulo: `de aciertos con contexto insuficiente`
- Lista con los 8 tipos de la Tabla 2 (orden del paper), una línea cada uno:
  1. `Pregunta sí/no: 50% por azar`
  2. `Opciones limitadas`
  3. `Multi-hop: infiere el eslabón`
  4. `Multi-hop: pista parcial + memoria`
  5. `Demasiados saltos: razona igual`
  6. `Ambigua: adivina la interpretación`
  7. `Error del autorater`
  8. `Ya lo sabía (pre-entrenamiento)`

**Visual:** mitad izquierda la cifra gigante; mitad derecha la lista de 8 filas con numeración mono cian y separadores sutiles. Sin pie.

**Guion oral (~75 palabras):**
"Los modelos aciertan entre 35 y 62% de las veces cuando el autorater dice que el contexto NO alcanza. ¿Cómo? El análisis cualitativo encuentra ocho tipos; los principales: el modelo ya sabía la respuesta por entrenamiento; el contexto da una pista parcial que puentea lo que falta; la pregunta tiene pocas opciones — un sí/no se acierta la mitad de las veces; o el evaluador se equivocó. ¿Por qué importa? Porque mata la regla fácil: 'si el contexto es insuficiente, abstenerse siempre' descartaría todos estos aciertos. Necesitamos decidir con más de una señal."

**Al salir:** entienden por qué la intervención que viene combina señales en vez de usar un umbral duro.

---

### Slide 12 — Puente: dos caminos · 0:15

**Sección:** `05 / INTERVENCIÓN`
**Mensaje:** dos propuestas: seleccionar cuándo responder (sin tocar el modelo) o enseñarle a decir "no sé" (fine-tuning).
**Puente:** "Con el diagnóstico listo, el paper prueba dos caminos."

**Texto visible:**
- Título: `La suficiencia como señal: dos caminos`
- Bifurcación con dos tarjetas:
  - `GENERACIÓN SELECTIVA` — `decidir cuándo entregar la respuesta · no modifica el modelo`
  - `FINE-TUNING` — `entrenar con ejemplos "no lo sé" · modifica el modelo`

**Visual:** camino que se bifurca desde un nodo `señal de suficiencia` (violeta) hacia las dos tarjetas. Slide de transición: limpia y rápida.

**Guion oral (~30 palabras):**
"Dos caminos. Uno externo: dejar el generador intacto y decidir cuáles respuestas entregar. Otro interno: reentrenar el modelo para que aprenda a decir 'no lo sé'. Veamos cada uno."

**Al salir:** mapa mental de la sección 5.

---

### Slide 13 — Generación selectiva (figura 4) · 0:45

**Sección:** `05 / INTERVENCIÓN`
**Mensaje:** suficiencia + confianza > confianza sola: mejor exactitud entre lo respondido, a cobertura comparable.
**Puente:** "Camino uno: responder menos, pero elegir mejor."

**Texto visible:**
- Título: `Dos señales deciden: ¿respondo o me abstengo?`
- Fórmula mono arriba: `suficiencia (autorater) + confianza del modelo → regresión logística → umbral`
- Recreación figura 4, UN panel: `Gemini 1.5 Pro · HotpotQA`. Eje X `cobertura (% preguntas respondidas)` 0-100; eje Y `exactitud selectiva (% correcto entre lo respondido)` 60-100. Dos curvas: gris `solo confianza` vs violeta `confianza + suficiencia`, la violeta por encima en la zona media.
- Anotación en el gap: `+5 pts cerca de 70% de cobertura`
- Nota `(eje Y desde 60)` impresa dentro del gráfico, junto al eje X (sin pie; la mejora de 2-10% se dice en el guion oral)

**Visual:** panel único grande (no los 6 del paper); curvas gruesas, zona de mejora sombreada en violeta translúcido. La nota dentro del gráfico declara honestamente el eje truncado.

**Guion oral (~95 palabras):**
"Las dos señales: qué dice el autorater sobre el contexto, y la confianza que el propio modelo declara en su respuesta. Una regresión logística — un clasificador simple, a propósito — las combina, y un umbral decide qué respuestas se entregan. Las métricas, inseparables: cobertura, cuánto respondo; exactitud selectiva, qué tan correcto soy cuando respondo. Expliquemos el gráfico: a igual cobertura, la curva violeta — con suficiencia — queda por encima de usar confianza sola; aquí, unos 5 puntos cerca del 70% de cobertura, y el abstract reporta mejoras de 2 a 10% según escenario. No elimina alucinaciones, y en Gemma con Musique no aporta nada: ayuda a decidir, no hace magia."

**Al salir:** entienden el método, sus dos métricas y su alcance real (sin sobrepromesa).

---

### Slide 14 — Fine-tuning: enseñar "no lo sé" · 0:35

**Sección:** `05 / INTERVENCIÓN`
**Mensaje:** reemplazar respuestas por "I don't know" en el entrenamiento no logró una estrategia confiable.
**Puente:** "Camino dos: ¿y si el modelo aprende a callar?"

**Texto visible:**
- Título: `Enseñar "no lo sé" no salió gratis`
- Tabla 3 recreada y reducida (Mistral 7B · Musique), 3 columnas semánticas coloreadas:

| Variante | Correcta | Abstención | Alucinación |
|---|---:|---:|---:|
| RAG sin ajuste | 28,8 | 11,8 | 59,4 |
| FT respuestas originales | **31,4** | 0,0 | 68,6 |
| FT 20% "no lo sé" (aleatorio) | 23,0 | 1,2 | 75,8 |
| FT 20% "no lo sé" (insuficientes) | 23,0 | 2,2 | 74,8 |

- Línea mono bajo el título: `Mistral 7B con LoRA · Musique` (sin pie)

**Visual:** tabla con columnas tintadas (verde/azul/rojo suaves); fila "FT respuestas originales" con su 31,4 en negrita pero su 68,6 también resaltado en rojo — la tabla misma cuenta la paradoja.

**Guion oral (~75 palabras):**
"Todas las filas prueban Mistral 7B con RAG; cambia el entrenamiento. «Sin ajuste» es el modelo base. «FT respuestas originales» usa las respuestas correctas del conjunto de entrenamiento. Las otras dos variantes reemplazan el 20% por «no lo sé»: al azar o donde faltaba contexto. ¿Funcionó? Con respuestas originales, suben los aciertos (28,8% a 31,4%), pero desaparece la abstención. Con «no lo sé», caen los aciertos a 23% y tampoco mejora la abstención frente al modelo base. Conclusión: aquí el ajuste fino no logró enseñar a abstenerse sin perjudicar otras métricas."

**Al salir:** saben que el camino interno quedó abierto, no resuelto; la señal externa es el aporte práctico.

---

### Slide 15 — Conclusiones · 0:35

**Sección:** `06 / CIERRE`
**Mensaje:** la pregunta de la portada se responde con lo expuesto: pasan las dos cosas (falta evidencia Y no se aprovecha), y la salida es medir la suficiencia para decidir.

**Texto visible:**
- Título: `La respuesta: pasan las dos cosas`
- Tres líneas grandes, con sus etiquetas en cian (cierre circular: responden la pregunta de la portada):
  - `NO ENCONTRÓ — multi-hop: más de la mitad sin evidencia` (figura 2)
  - `NO APROVECHÓ — alucinan aun con la evidencia al frente` (figuras 3/6)
  - `LA SALIDA — medir la suficiencia y decidir cuándo responder` (autorater 93% + generación selectiva)
- (Sin banda inferior de síntesis; los tres verbos recuperar/aprovechar/decidir se dicen oralmente.)

**Guion oral (~95 palabras):**
"Cierro volviendo a la portada: cuando falla, ¿no encontró lo necesario, o no supo aprovecharlos? Lo que vimos responde: las dos cosas. No encontró: en los benchmarks multi-hop, más de la mitad de las instancias llega sin evidencia suficiente — falla del dataset, no del modelo. No supo aprovecharlo: con la evidencia al frente, igual alucinan más de lo que se abstienen. Y la salida del paper: medir la suficiencia — un juez validado al 93% — y usar esa señal para decidir cuándo responder. Recuperar la evidencia, aprovecharla, decidir cuándo no alcanza: un RAG confiable separa los tres problemas."

**Al salir:** la pregunta de la portada quedó respondida con la evidencia de la charla; pueden resumir el paper en una frase: "¿el contexto alcanzaba?".

---

### Slide 16 — Gracias · 0:05

**Sección:** `06 / CIERRE`
**Texto visible:** `Gracias — ¿preguntas?` + subtítulo mono `Sufficient Context: A New Lens on RAG Systems · ICLR 2025` + línea inferior `Sebastián Palma Masabeu · IA Generativa · 7 de octubre de 2026`.
**Visual:** fondo plano como el resto del deck (sin fotografía); subtítulo y línea inferior iguales a la portada.
**Guion oral:** "Gracias. ¿Preguntas?"

---

## 4. Pauta de tiempos (ensayar contra esto)

| Slide | Título corto | Duración | Acumulado |
|---:|---|---:|---:|
| 1 | Portada | 0:15 | 0:15 |
| 2 | Analogía ensayo | 0:40 | 0:55 |
| 3 | Qué es RAG | 0:40 | 1:35 |
| 4 | Tres fallas | 0:30 | 2:05 |
| 5 | Related work | 0:25 | 2:30 |
| 6 | Definición | 0:45 | 3:15 |
| 7 | Autorater | 0:30 | 3:45 |
| 8 | Validación 93% | 0:35 | 4:20 |
| 9 | Figura 2 | 0:35 | 4:55 |
| 10 | Figura 3 | 0:45 | 5:40 |
| 11 | Giro 35-62% | 0:35 | 6:15 |
| 12 | Dos caminos | 0:15 | 6:30 |
| 13 | Selectiva (fig. 4) | 0:45 | 7:15 |
| 14 | Fine-tuning | 0:35 | 7:50 |
| 15 | Conclusiones | 0:35 | 8:25 |
| 16 | Gracias | 0:05 | 8:30 |

Recortes si excede 9:00 (en orden): referencias orales de slide 5 (−10 s), detalle LoRA de slide 14 (−10 s).

---

## 5. Datos verificados (fuente: extracción directa del PDF del paper)

**Tabla 1 completa (§3.2, p.5)** — por si se quiere la versión extendida:
Gemini 1.5 Pro 1-shot: F1 0,935 · Acc 93,0 · Prec 0,935 · Rec 0,935. Gemini 0-shot: 0,878/87,0/0,885/0,871. FLAMe (PaLM 24B): 0,892/87,8/0,853/0,935. TRUE-NLI (T5 11B): 0,818/82,6/0,938/0,726. Contains GT: 0,810/80,9/0,870/0,758.

**Figura 2 (§4.1, p.6)** — valores impresos exactos (% suficiente a 2.000/6.000/10.000 tokens): FreshQA 63,7/77,4/77,4 · HotpotQA 45,4/46,2/46,2 · Musique 33,4/44,6/44,6. Muestras: FreshQA 452 (True Premise), HotpotQA y Musique 500 c/u.

**Slide 10** usa los valores IMPRESOS de la figura 6 del paper (HotpotQA, p.18), no lecturas visuales — mejora sobre v2. Claude 3.5 Sonnet existe en la figura 3 original pero se omite en la slide para legibilidad (declararlo si preguntan: Claude se abstiene más que el resto con contexto insuficiente). Equivalentes exactos disponibles para Musique (figura 1, p.3) y FreshQA (figura 5, p.18) si se prefiere otro dataset.

**Abstención sin/con RAG (§4.2):** Gemini 100% → 18,6% · Claude 84,1% → 52% · GPT-4o 34,4% → 31,2%.

**Rango 35-62% (§4.3, §1):** aciertos con contexto insuficiente, SOTA LLMs, sobre los tres datasets. En HotpotQA los tres modelos grandes superan 35%.

**Tabla 3 / fine-tuning (Apéndice B.1, p.17)** — Musique %C/%A/%H: closed book 6,6/29,8/63,6 · vanilla RAG 28,8/11,8/59,4 · FT GT 31,4/0/68,6 · FT idk-aleatorio 23,0/1,2/75,8 · FT idk-insuficiente 23,0/2,2/74,8. HotpotQA: vanilla RAG 46,6/9,2/44,2 gana en %C a todos los FT. LoRA rank 4, alpha 8, 2.000 ejemplos, 2 epochs.

**Figura 4 (§5.1, p.10):** 6 paneles (Gemini/GPT/Gemma × HotpotQA/Musique). Ganancias citadas: >10% Gemma-HotpotQA en zonas de alta exactitud; >5% Gemini-HotpotQA cerca de 70% cobertura; Gemma-Musique: coeficiente de suficiencia = 0, curvas idénticas. Eje Y 60-100 en la mayoría de paneles (truncado: declarado con la nota `(eje Y desde 60)` dentro del gráfico). El panel de la slide 13 es aproximación visual de tendencia; series editables.

**Variantes RAG:** eliminadas de la slide 3 en revisión del autor. (La taxonomía Naive/Advanced/Modular de Gao et al., arXiv:2312.10997, queda aquí solo como referencia; el deck ya no cita fuentes externas al paper.)

---

## 6. Preparación personal del expositor (no va en slides)

### Métricas de la tabla 1 (por si preguntan)

- **Accuracy (exactitud):** % total de clasificaciones correctas, sobre todo el conjunto. Engaña si las clases están desbalanceadas.
- **Precision:** de todo lo que el método marcó "suficiente", ¿qué fracción realmente lo era? Mide confiabilidad de los positivos. TRUE-NLI tiene la mayor (0,938) porque el entailment implica suficiencia: cuando marca, casi nunca falla — pero marca poco.
- **Recall:** de todo lo realmente suficiente, ¿qué fracción detectó? TRUE-NLI tiene el menor (0,726): se le escapan suficiencias que no son entailment literal.
- **F1:** media armónica de precision y recall; castiga desequilibrios entre ambas. Por eso es la métrica de cabecera de la tabla.

### Los 8 tipos de la tabla 2 (acierto con contexto insuficiente)

1. **Pregunta sí/no** — 50% de acierto por azar. Ej.: "¿Hay eclipse total en EE.UU. este año?"
2. **Opciones limitadas** — pocas alternativas plausibles. Ej.: "¿Qué banda tiene más integrantes, Chvrches o Goodbye Mr. Mackenzie?"
3. **Multi-hop: fragmento** — el contexto trae piezas y el modelo infiere el eslabón faltante con conocimiento paramétrico. Ej.: sabe que Mickey's Safari pertenece a la serie de Mickey Mouse aunque el texto no lo diga.
4. **Multi-hop: parcial** — el contexto resuelve un salto y el modelo pone el otro de memoria. Ej.: el texto lista actrices pero no sus roles en "Married... with Children".
5. **Demasiados saltos** — el contexto técnicamente trae todo pero exige razonamiento complejo (cruzar listas, contar por año); se etiqueta insuficiente y el modelo igual lo logra.
6. **Pregunta ambigua** — el modelo adivina la interpretación correcta. Ej.: "¿quién es el cónyuge de un miembro del elenco de King of the Mountain?" sin especificar cuál.
7. **Error del autorater** — la instancia sí era suficiente; mal etiquetada.
8. **Correcto a libro cerrado** — lo sabía desde pre-entrenamiento, sin contexto alguno.

Dato extra del paper: también existe el caso inverso — autorater dice "suficiente" y el evaluador marca "incorrecta": pasa cuando la respuesta de referencia contradice la fuente, o cuando la información está pero el modelo no la compone (multi-hop, aritmética).

### Otras preguntas probables

- **La pregunta-eje de la charla** ("¿no encontró lo necesario o no supo aprovecharlos?") viene directo del abstract: *"whether errors arise because LLMs fail to utilize the context from retrieval or the context itself is insufficient"*. Si alguien aprieta en la precisión: el paper no habla de "encontrar" (agencia de búsqueda) sino del par (Q, C) ya armado — versión precisa: **"¿lo que le dieron no alcanzaba, o no supo usar lo que le dieron?"** (falla de recuperación vs falla de generación).
- **¿Qué es multi-hop?** Preguntas que no se responden con un solo hecho sino encadenando dos o más, normalmente de documentos distintos; cada "hop" es un salto entre piezas de evidencia. Ejemplo: "¿en qué país nació el director de Inception?" — hop 1: Inception la dirigió Christopher Nolan (doc A); hop 2: Nolan nació en Londres (doc B); ninguno responde solo. Frase de bolsillo: *"multi-hop es cuando la respuesta exige conectar hechos de documentos distintos; ahí la recuperación más falla, porque basta que falte un eslabón para que todo el contexto quede insuficiente"*. Aparece 3 veces en la charla: figura 2 (HotpotQA/Musique son multi-hop, por eso <50% de suficiencia — Musique hasta 4 saltos y 20 fragmentos), definición (encadenar hechos presentes en C sí, inventar el eslabón que falta no — lo de la madre en Nueva York), y el giro (2 de los 8 tipos son el modelo puenteando el eslabón faltante con memoria de pre-entrenamiento).
- **¿Suficiencia garantiza respuesta verdadera?** No: mide si se puede responder desde C, no si C describe bien el mundo (§3.1).
- **¿Por qué no basta mejorar el retrieval?** Porque persisten errores con evidencia ya disponible (fila superior de figura 3) y porque benchmarks "respondibles" traen contexto insuficiente.
- **¿El 93% generaliza?** Conjunto de validación pequeño (115) y curado; el paper no garantiza igual rendimiento en otros dominios.
- **¿Qué pasa con contextos larguísimos?** De 6.000 a 10.000 tokens sin cambio — pero es truncamiento de las mismas fuentes; no prueba que recuperar MÁS documentos no sirva.
- **¿Cobertura vs exactitud selectiva?** Exactitud selectiva tiene denominador "respuestas entregadas": retener respuestas la sube mientras baja cobertura. Comparar métodos solo a cobertura comparable.
- **Modelos usados:** gpt-4o-2024-08-06 · gemini-1.5-pro-0514 · claude-3-5-sonnet-20240620 · gemma-2-27b-it · Mistral-7B-Instruct-v0.3 · FLAMe-RM-24B.

---

## 7. Instrucciones para el agente constructor

1. **Carpeta nueva `deck-v3/`** junto a `deck-v1/` y `deck-v2/`. No modificar las anteriores. Reutilizar de `deck-v2/`: `exportar.mjs` (adaptar), `assets/` (fuentes Manrope —incluida la variable para ExtraBold— + IBM Plex Mono; sin fotografías ni Instrument Serif).
2. **HTML/CSS/JS → PDF** con el pipeline existente (Playwright + Chromium). El entregable que importa es `sufficient-context.pdf`; el HTML es fuente editable, sin animaciones en vivo requeridas.
3. **Builds como páginas:** la slide 2 (3 builds) se exporta como páginas sucesivas donde cada página agrega un elemento. En el HTML, implementarlas como variantes de la misma slide (clases `build-1`, `build-2`, …). Total esperado: 18 páginas PDF para 16 slides lógicas.
4. **Tema oscuro según la spec de la sección 1** (paleta, tipografía, layout base; sin fotografías). Verificar contraste: texto principal ≥ 7:1, secundario ≥ 4,5:1, etiquetas de gráficos legibles sobre `#0e1116`.
5. **Texto visible = exactamente el declarado en cada slide.** No agregar bullets, subtítulos ni texto de relleno. Si algo no cabe, avisar en vez de reducir fuente bajo los mínimos (títulos 54px, texto 28px, mono 20px en lienzo 1280×720).
6. **Figuras recreadas en SVG** con texto seleccionable, datos exactos de la sección 5, ejes rotulados en español, valores impresos sobre barras. Prohibido pegar capturas del paper. Colores semánticos fijos: verde `#34d399` correcta, azul `#60a5fa` abstención, rojo `#f87171` alucinación, violeta `#a78bfa` señal de suficiencia, gris `#9aa4b2` baseline.
7. **Notas del expositor:** incluir el guion oral de cada slide como `aside.notes` en el HTML y regenerar `notas-expositor.md` con la pauta de tiempos de la sección 4.
8. **Sin pies de figura** (decisión del autor): la trazabilidad paper↔slide va en el `LEEME.md` del deck. Mantener dentro de las slides: la declaración del eje truncado en el gráfico de la slide 13, la etiqueta `HotpotQA` en la slide 10 y la línea `Mistral 7B con LoRA · Musique` en la slide 14.
9. **Verificación antes de entregar:** exportar PDF, rasterizar y revisar cada página (sin desbordes ni superposiciones), comprobar cifras contra la sección 5, fuentes incrustadas, texto seleccionable, y actualizar `LEEME.md` con trazabilidad v3.
10. **Idioma:** todo en español salvo nombres propios, títulos bibliográficos y términos técnicos consagrados (RAG, fine-tuning, multi-hop, autorater puede ir como "autorater (juez automático)" la primera vez).
