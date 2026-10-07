# Guion del expositor · Sufficient Context (deck v3)

Objetivo: **8:30** (510 s) a ~125 palabras/minuto; 1545 palabras de guion. Ensayar con cronómetro contra la pauta. Si el ensayo pasa de 9:30, recortar en este orden: referencias orales de la slide 5 (−10 s), detalle LoRA de la slide 14 (−10 s).

Fuente editable: los `aside.notes` de `deck.html`. Regenerar con `node exportar.mjs`.

## Pauta de tiempos

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

---

## Slide 01 · Portada

**0:00–0:15 · 15 s**

Cuando un modelo responde mal incluso con los documentos en la mano, hay dos sospechosos posibles. Esa es la única pregunta de hoy — y un paper de ICLR 2025 construyó toda una lente para responderla. Al final de la charla la vamos a contestar.

## Slide 02 · Analogía ensayo

**0:15–0:55 · 40 s** · 3 builds (páginas PDF sucesivas)

Puente: «Antes de hablar de modelos, hablemos de nosotros». — Si nos piden un ensayo sobre un tópico, partimos de nuestro banco de memoria. Pero muchas veces ese conocimiento no alcanza para responder de la forma más plausible. ¿Qué hacíamos? Encarta, Wikipedia, Stack Overflow, papers: incorporábamos contexto externo para responder mejor. Y noten algo: nadie reentrenó su cerebro para escribir ese ensayo. A los modelos de lenguaje les pasa exactamente lo mismo: fueron entrenados con un volumen de datos que les da capacidades, pero muchas veces no tienen el contexto suficiente para una respuesta correcta y precisa.

## Slide 03 · Qué es RAG

**0:55–1:35 · 40 s**

Puente: «Esa solución humana tiene nombre en los modelos: RAG». — RAG significa Retrieval-Augmented Generation. Ante una pregunta, el sistema busca documentos o fragmentos relevantes, los pone dentro del prompt, y el modelo genera usando ese contexto. Punto clave: esto ocurre a nivel de inferencia; los pesos del modelo no cambian, no hay reentrenamiento. Existen muchas formas de implementar la recuperación — desde un buscador simple hasta pipelines con reranking, búsqueda iterativa o agentes — pero este paper no se casa con ninguna: lo que propone aplica a cualquier variante, porque mira solo el contexto que llega al modelo. El objeto de estudio de toda la charla es ese par: pregunta más contexto dentro del prompt. — Precisión si preguntan: en los experimentos del paper no hay búsqueda web en vivo ni chat conversacional; los benchmarks ya traen la pregunta y los pasajes recuperados (HotpotQA y Musique con sus fragmentos, FreshQA con el contenido de sus URLs de apoyo), recortados a un presupuesto de tokens y pasados por API dentro del prompt. El mecanismo que consiguió el contexto queda abstraído: por eso la lente aplica igual a un sistema con búsqueda en internet.

## Slide 04 · Tres fallas

**1:35–2:05 · 30 s**

Puente: «RAG suena a problema resuelto. No lo es». — La introducción del paper parte de tres comportamientos indeseados en sistemas RAG: responder incorrecto incluso con evidencia recuperada; distraerse con información no relacionada; y fallar al extraer respuestas desde fragmentos largos de texto. O sea: recuperar documentos no cierra el problema. Y acá nace la pregunta de diagnóstico: cuando falla, ¿no encontró lo necesario, o no supo aprovecharlos?

## Slide 05 · Related work

**2:05–2:30 · 25 s**

Puente: «¿Nadie había mirado esto antes? Casi». — El trabajo previo corre por dos ejes: robustez a contexto irrelevante — ruido, documentos contradictorios — y técnicas para reducir alucinaciones, como Self-RAG. Pero 'relevante' significaba cosas distintas en cada paper: desde 'habla del tema' hasta 'contiene la respuesta'. Nadie había definido con precisión la pregunta que importa: ¿esta evidencia permite construir la respuesta? Ese es el hueco que este paper llena. — Ejemplo didáctico de respaldo (propio, inspirado en §3.1) si hace falta aterrizar la diferencia: pregunto dónde nació Ana; un texto dice que Ana vive en Valparaíso y que su madre nació en Santiago — habla de ella y de ciudades, es RELEVANTE, pero no permite responder; otro texto dice 'Ana nació en Concepción' — ese sí es SUFICIENTE. No falta más texto en abstracto: falta un hecho específico. Esa diferencia es el corazón de la propuesta.

## Slide 06 · Definición

**2:30–3:15 · 45 s**

Puente: «Primera contribución: ponerle matemática a la pregunta». — En un dataset, cada instancia trae pregunta Q, contexto C y respuesta de referencia A. Pero la definición trabaja solo con el par Q y C: hay contexto suficiente si y solo si existe una respuesta A-prima que sea plausible para Q dada la información de C. Dos cosas potentes aquí. Uno: no necesitamos conocer la respuesta oficial para evaluarlo — sirve en producción, donde no hay respuesta de referencia. Dos: suficiente no significa verdadero. Un documento equivocado puede permitir construir una respuesta perfectamente identificable. La suficiencia mide si se puede responder, no si el mundo está bien descrito. — Respaldo si preguntan por casos borde (remarks de §3.1): en multi-hop se permite encadenar hechos del contexto pero no inventar la conexión que falta; si la pregunta es ambigua, el contexto debe desambiguarla; si hay varias respuestas posibles, C debe permitir distinguir cuál corresponde.

## Slide 07 · Autorater

**3:15–3:45 · 30 s**

Puente: «Definir está bien. Pero ¿quién etiqueta miles de instancias?». — Etiquetar suficiencia a mano no escala. La segunda contribución es un autorater: otro modelo que actúa como evaluador — recibe pregunta y contexto, y clasifica: suficiente o insuficiente. La necesidad que cubre es doble: etiquetar datasets completos para el análisis que viene, y servir de señal en producción. Y de nuevo: no necesita la respuesta correcta oficial. ¿Pero podemos confiar en un modelo para esto?

## Slide 08 · Validación 93%

**3:45–4:20 · 35 s**

Puente: «La respuesta del paper: sí, y lo midieron así». — Armaron un conjunto difícil de 115 instancias desde PopQA, FreshQA, Natural Questions y EntityQuestions, etiquetadas por humanos, y compararon métodos. Gemini 1.5 Pro con un ejemplo en el prompt gana: 93% de exactitud. FLAMe, más barato, queda en 87,8. Y noten las dos últimas filas: los métodos que sí usan la respuesta oficial — verificar entailment o buscar la respuesta literal en el texto — rinden peor. El 93% es la exactitud del juez, no del sistema RAG completo.

## Slide 09 · Figura 2

**4:20–4:55 · 35 s**

Puente: «Primera pregunta con la lente puesta: ¿los benchmarks que usamos traen la evidencia?». — Aplicaron el autorater a tres benchmarks. El eje vertical: porcentaje de instancias cuyo contexto alcanza. FreshQA, con URLs de apoyo del propio dataset, llega a 77%. Pero HotpotQA y Musique — multi-hop — quedan bajo la mitad: 46 y 44,6%. Dos hallazgos: pasar de 2.000 a 6.000 tokens ayuda, sobre todo en Musique; de 6.000 a 10.000, cero cambio — es truncar las mismas fuentes, no buscar más. Consecuencia incómoda: parte de los errores que le achacamos al modelo son del dataset.

## Slide 10 · Figura 3

**4:55–5:40 · 45 s**

Puente: «Segunda pregunta: separando por suficiencia, ¿cómo responden los modelos?». — Clasifican cada respuesta en correcta, abstención o alucinación — y ojo, alucinación aquí es respuesta juzgada incorrecta, no necesariamente una historia inventada. Fila de arriba: contexto suficiente; abajo: insuficiente. Tres hallazgos. Uno: con contexto suficiente los aciertos suben, pero la barra roja nunca desaparece — alucinan igual, miren Gemma con 34%. Dos: con contexto insuficiente deberían abstenerse, y sin embargo la barra roja supera a la azul: responden más de lo que callan. Y tres, el dato que más me impresionó: darle contexto reduce la abstención — Gemini sin RAG se abstenía el 100% de las veces; con RAG, 18,6%. Recibir cualquier documento los envalentona.

## Slide 11 · Giro 35-62%

**5:40–6:15 · 35 s**

Puente: «Y aquí el hallazgo contraintuitivo». — Los modelos aciertan entre 35 y 62% de las veces cuando el autorater dice que el contexto NO alcanza. ¿Cómo? El análisis cualitativo encuentra estos ocho tipos; los principales: el modelo ya sabía la respuesta por entrenamiento; el contexto da una pista parcial que puentea lo que falta; la pregunta tiene pocas opciones — un sí/no se acierta la mitad de las veces; o el evaluador se equivocó. ¿Por qué importa? Porque mata la regla fácil: 'si el contexto es insuficiente, abstenerse siempre' descartaría todos estos aciertos. Necesitamos decidir con más de una señal.

## Slide 12 · Dos caminos

**6:15–6:30 · 15 s**

Puente: «Con el diagnóstico listo, el paper prueba dos caminos». — Dos caminos. Uno externo: dejar el generador intacto y decidir cuáles respuestas entregar. Otro interno: reentrenar el modelo para que aprenda a decir 'no lo sé'. Veamos cada uno.

## Slide 13 · Selectiva (fig. 4)

**6:30–7:15 · 45 s**

Puente: «Camino uno: responder menos, pero elegir mejor». — Las dos señales: qué dice el autorater sobre el contexto, y la confianza que el propio modelo declara en su respuesta. Una regresión logística — un clasificador simple, a propósito — las combina, y un umbral decide qué respuestas se entregan. Las métricas, inseparables: cobertura, cuánto respondo; exactitud selectiva, qué tan correcto soy cuando respondo. Expliquemos el gráfico: a igual cobertura, la curva violeta — con suficiencia — queda por encima de usar confianza sola; aquí, unos 5 puntos cerca del 70% de cobertura, y el abstract reporta mejoras de 2 a 10% según escenario. No elimina alucinaciones, y en Gemma con Musique no aporta nada: ayuda a decidir, no hace magia.

## Slide 14 · Fine-tuning

**7:15–7:50 · 35 s**

Puente: «Camino dos: ¿y si el modelo aprende a callar?». — Ajustaron Mistral 7B con LoRA, reemplazando el 20% de las respuestas de entrenamiento por 'I don't know' — a veces al azar, a veces justo en las instancias insuficientes. Miren la tabla: el ajuste con respuestas originales sube los aciertos a 31,4%... pero las abstenciones caen a cero y las alucinaciones suben a 68,6. Y las mezclas con 'no lo sé' ni siquiera superan al RAG sin ajuste. Conclusión de los autores: enseñar a abstenerse mueve otros comportamientos de forma difícil de controlar; no hay todavía estrategia confiable.

## Slide 15 · Conclusiones

**7:50–8:25 · 35 s**

Cierro volviendo a la portada: cuando falla, ¿no encontró lo necesario, o no supo aprovecharlos? Lo que vimos responde: las dos cosas. No encontró: en los benchmarks multi-hop, más de la mitad de las instancias llega sin evidencia suficiente — falla del dataset, no del modelo. No supo aprovecharlo: con la evidencia al frente, igual alucinan más de lo que se abstienen. Y la salida del paper: medir la suficiencia — un juez validado al 93% — y usar esa señal para decidir cuándo responder. Recuperar la evidencia, aprovecharla, decidir cuándo no alcanza: un RAG confiable separa los tres problemas.

## Slide 16 · Gracias

**8:25–8:30 · 5 s**

Gracias. ¿Preguntas?
