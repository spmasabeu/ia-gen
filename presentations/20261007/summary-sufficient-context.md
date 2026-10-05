# Sufficient Context: A New Lens on Retrieval Augmented Generation Systems

**Autores:** Hailey Joren, Jianyi Zhang, Chun-Sung Ferng, Da-Cheng Juan, Ankur Taly y Cyrus Rashtchian.  
**Año y versión:** ICLR 2025; PDF consultado: arXiv:2411.06037v3, 23 de abril de 2025.  
**Fuente:** [PDF del paper](Sufficient%20Context%3A%20A%20New%20Lens%20on%20Retrieval%20Augmented%20Generation%20Systems.pdf).  
**Formato:** basado en [summaries/template.md](../../summaries/template.md), con lenguaje accesible.  
**Uso:** documento de preparación; el recorrido para una charla de unos 7½ minutos está en [guion-visual-sufficient-context.md](guion-visual-sufficient-context.md). Las preguntas sirven para preparar la conversación posterior, no para proyectarlas todas.

## 1. Abstract

Dar documentos a un modelo de lenguaje suele mejorar sus respuestas, pero cuando falla no siempre sabemos si faltaba información o si el modelo no supo utilizarla. El paper introduce el concepto de **contexto suficiente** y un método automático para reconocer cuándo los textos permiten responder una pregunta. Al separar los casos según este criterio, observa que modelos como Gemini 1.5 Pro, GPT-4o y Claude 3.5 aprovechan bien el contexto suficiente, pero suelen responder incorrectamente cuando falta información; modelos de menor rendimiento también fallan o se abstienen aunque la información esté disponible. Además, un contexto incompleto puede ayudar a acertar. A partir de estos hallazgos, propone combinar señales de suficiencia y confianza para decidir cuándo responder. El abstract reporta mejoras del 2–10% en la proporción de respuestas correctas entre las respuestas emitidas, bajo las condiciones estudiadas; no es una mejora sobre todas las consultas ni una eliminación de las alucinaciones.

## 2. Resumen por secciones

La numeración de este bloque sigue la del paper. **RAG**, o generación aumentada por recuperación, significa buscar información y dársela al modelo para ayudarlo a responder. Podemos imaginarlo como un examen con apuntes: importa qué contienen los apuntes y cómo se usan. Esta analogía es explicativa, no un experimento del paper.

### 1. Introduction

Un asistente puede responder con seguridad y equivocarse incluso después de consultar documentos. La pregunta central es: **¿no encontró lo necesario o no supo aprovecharlo?**

Los autores distinguen entre información relacionada con una pregunta e información suficiente para resolverla. Un texto sobre una persona puede ser relevante sin decir dónde nació. Separar esos casos permite diagnosticar mejor los errores y estudiar cuándo conviene responder o abstenerse. Mejorar la búsqueda por sí sola no resuelve los fallos que ocurren cuando la evidencia ya estaba disponible (§1; figura 1).

### 2. Related Work

Trabajos anteriores estudiaron documentos irrelevantes, contradictorios o difíciles de aprovechar, además de técnicas para reducir respuestas inventadas. Sin embargo, “relevante” no siempre significaba lo mismo: podía describir un texto que contiene la respuesta o uno que solo trata del tema.

La contribución aquí es una definición explícita de suficiencia y su uso para analizar resultados. No presenta RAG como una técnica nueva ni propone simplemente recuperar más documentos (§2).

### 3. Sufficient Context

#### 3.1. Definition of Sufficient Context

Un contexto es suficiente cuando permite construir una respuesta plausible a la pregunta a partir de la información disponible. Puede exigir conectar varios hechos; lo que no vale es inventar una conexión ausente. Que la madre de alguien haya nacido en Nueva York no permite concluir que esa persona nació allí.

La evaluación recibe **pregunta y contexto**, sin necesitar la respuesta oficial. Esto permite usarla cuando todavía no conocemos la solución. Si hay ambigüedades o alternativas, la información debe permitir distinguir las interpretaciones pertinentes.

Un matiz decisivo: **suficiente no significa verdadero**. Un documento equivocado puede ofrecer una respuesta perfectamente identificable. La suficiencia evalúa si los textos permiten responder, no verifica que describan correctamente el mundo (§3.1).

#### 3.2. Sufficient Context AutoRater

Los autores prueban un **evaluador automático**: otro modelo revisa si la información alcanza. En un conjunto de 115 casos difíciles etiquetados por humanos, Gemini 1.5 Pro, con instrucciones y un ejemplo, obtiene **93,0% de exactitud** al clasificar suficiencia. Es exactitud del evaluador, no de las respuestas del asistente.

Lo comparan con FLAMe y con métodos que utilizan la respuesta oficial: uno verifica si el texto la respalda y otro busca si aparece literalmente. Gemini obtiene el mejor resultado global de la tabla y no necesita esa respuesta de referencia. El conjunto es pequeño; el 93% no garantiza igual rendimiento en cualquier dominio (§3.2; tabla 1).

### 4. A New Lens on RAG Performance

#### 4.1. Do Benchmark Datasets Have High Sufficient Context?

Analizan tres conjuntos de preguntas: FreshQA, sobre información que puede cambiar; HotpotQA, con preguntas que pueden requerir conectar hechos; y Musique-Ans, centrado en razonamiento de varios pasos. Evalúan 452 preguntas de FreshQA y muestras de 500 de cada uno de los otros dos.

Con un límite de 6.000 tokens —unidades de texto procesadas por el modelo—, el evaluador clasifica como suficientes estos porcentajes de pares pregunta-contexto:

| Conjunto | Contexto suficiente | Cómo obtienen el contexto |
|---|---:|---|
| FreshQA | 77,4% | Páginas de apoyo indicadas por el dataset |
| HotpotQA | 46,2% | Cinco fragmentos recuperados |
| Musique-Ans | 44,6% | Veinte fragmentos proporcionados por el dataset |

No es un ranking de buscadores: las tareas y fuentes difieren. Incluso un conjunto llamado “respondible” puede entregar un contexto insuficiente según este criterio. Aumentar el límite de 6.000 a 10.000 tokens no cambia estos porcentajes; esto describe truncar las fuentes disponibles, no una búsqueda adicional de documentos (§4.1; figura 2; apéndice A.3).

#### 4.2. Initial Findings Based on Sufficient Context

Las respuestas se clasifican como correctas, abstenciones o alucinaciones. En esta evaluación, “alucinación” corresponde a una respuesta juzgada incorrecta: no necesariamente una historia totalmente inventada. Usan coincidencias con respuestas de referencia y evaluación mediante otro modelo para admitir formulaciones equivalentes.

RAG mejora el rendimiento general, pero los modelos siguen fallando con contexto suficiente. Ante contexto insuficiente también producen muchas respuestas incorrectas en lugar de abstenerse. Los modelos de mayor rendimiento aprovechan mejor la información disponible; Gemma 2 27B presenta más dificultades en los escenarios analizados.

Los autores plantean que recibir contexto puede aumentar la disposición a contestar. Es una interpretación del comportamiento observado, no una medición directa de una supuesta confianza interna (§4.2; figura 3).

#### 4.3. Qualitatively Analyzing Responses with Insufficient Context

El resultado más contraintuitivo es que **información insuficiente puede seguir siendo útil**. El modelo puede completar un dato con conocimiento aprendido, aprovechar una pista o acertar una pregunta con pocas opciones. También pueden equivocarse los evaluadores.

El paper reporta aciertos del 35–62% con contexto insuficiente en los escenarios destacados, y estudia casos donde el modelo falla sin documentos pero acierta con información incompleta. Esto no demuestra que todos esos aciertos estén respaldados por las fuentes ni que el rango aplique universalmente. La tabla 2 distingue ocho tipos de explicación, entre ellos ambigüedad, conocimiento previo y errores de evaluación (§4.3; tabla 2).

### 5. Techniques to Reduce Hallucinations with RAG

#### 5.1. Selective RAG Using Sufficient Context Signal

Una regla como “si falta información, nunca respondas” descartaría también aciertos. La propuesta combina **suficiencia del contexto** con **confianza declarada por el modelo**. Un clasificador sencillo, una regresión logística, aprende a combinar ambas señales; un umbral determina qué respuestas se entregan y cuáles se retienen.

FLAMe evalúa suficiencia sobre fragmentos de hasta 1.600 tokens; basta con que uno se marque como suficiente. Para estimar confianza usan autoevaluación de probabilidades o varias muestras, según el modelo. No modifican el generador para aplicar esta selección.

Hay dos métricas inseparables: **cobertura**, proporción de consultas que reciben respuesta, y **exactitud selectiva**, proporción correcta entre las respuestas entregadas. Responder menos puede elevar la segunda; la comparación útil enfrenta métodos con cobertura comparable.

Frente a usar solo confianza, añadir suficiencia mejora ese equilibrio en varios experimentos, especialmente HotpotQA. Pero no siempre ayuda: con Gemma 27B en Musique, el peso aprendido de suficiencia es cero y ambas curvas coinciden. La figura 4 respalda una mejora condicionada, no una receta infalible (§5.1; figura 4).

#### 5.2. Fine-Tuning

También entrenan Mistral-7B-Instruct-v0.3 con ejemplos donde la respuesta se reemplaza por “no lo sé”. No consiguen una estrategia fiable para reducir errores.

En Musique, RAG sin ese ajuste alcanza 28,8% de respuestas correctas y 59,4% incorrectas. El ajuste con respuestas originales aumenta los aciertos a 31,4%, pero también las incorrectas a 68,6%, porque desaparecen las abstenciones. Añadir ejemplos de “no lo sé” tampoco supera de forma consistente al RAG sin ajuste. Enseñar a abstenerse puede alterar otros comportamientos (§5.2; apéndices A.2 y B.1; tabla 3).

### 6. Conclusion

El aporte central es una forma de observar y diagnosticar RAG: distinguir si la evidencia alcanzaba antes de interpretar el éxito o fracaso del modelo. Esa señal también puede ayudar a decidir qué respuestas entregar.

El estudio se concentra en preguntas y respuestas, con modelos y configuraciones concretas. No evalúa exhaustivamente recuperadores ni demuestra que los resultados se trasladen a resúmenes, imágenes o documentos multimodales. Propone explorar evaluaciones de suficiencia más graduales y búsqueda iterativa; son líneas futuras, no capacidades ya demostradas (§6).

### Apéndices relevantes

El apéndice A identifica modelos, recuperación y entrenamiento; B amplía resultados y compara evaluación semántica con coincidencias textuales; C–D documentan los prompts. La tabla 4 repite el análisis con etiquetas humanas: aun con contexto suficiente, GPT-4o registra 82,5% de aciertos, 4,8% de abstenciones y 12,7% de respuestas incorrectas en ese conjunto curado. Los porcentajes pertenecen al subconjunto suficiente, no a todo el dataset. Sirve como comprobación complementaria de que el patrón no depende únicamente del evaluador automático.

## 3. Key points

- **Finalidad y problema:** distinguir falta de evidencia de fallos al aprovecharla (§1).
- **Idea central:** relacionado con la pregunta y suficiente para contestarla son criterios distintos (§3).
- **Cómo lo hicieron:** definieron suficiencia, validaron un evaluador sobre 115 casos y separaron resultados de tres datasets por esa condición (§3–4).
- **Hallazgos principales:** persisten errores con evidencia suficiente y aparecen aciertos con evidencia incompleta; ambos impiden reglas simplistas (§4).
- **Contribución principal:** un marco de diagnóstico y una señal adicional para selección de respuestas, no un nuevo buscador (§3–5).
- **Conceptos introducidos o refinados:** formalizan suficiencia; aplican generación selectiva y distinguen cobertura de exactitud entre respuestas entregadas (§3.1; §5.1).
- **Aporte al área:** permite evaluar conjuntamente la información disponible, su aprovechamiento y la decisión de responder (§6).
- **Limitaciones y preguntas abiertas:** evaluadores imperfectos, validación pequeña, costes adicionales y resultados dependientes del modelo y la tarea. Suficiencia tampoco verifica veracidad (§3.1–3.2; §5–6; apéndice B.1).

## 4. Preguntas y respuestas

### Pregunta 1

**Enunciado:** ¿Por qué medir solo si la respuesta final fue correcta deja incompleto el diagnóstico?

**Respuesta:** Porque mezcla casos donde faltaban datos con otros donde los datos estaban disponibles y el modelo no los aprovechó. Cada situación requiere investigar causas diferentes.

**Referencia:** §1 y §4.2.

### Pregunta 2

**Enunciado:** ¿Cómo puede un documento relevante ser insuficiente?

**Respuesta:** Puede hablar de la persona o el tema correcto sin incluir el hecho preguntado. Coincidencia temática no equivale a capacidad de responder.

**Referencia:** §1 y §3.

### Pregunta 3

**Enunciado:** ¿Por qué contexto suficiente no garantiza una respuesta verdadera?

**Respuesta:** La definición comprueba si los textos permiten formular una respuesta. Esos textos pueden contener información falsa, y el modelo también puede interpretarlos mal.

**Referencia:** §3.1 y §4.3.

### Pregunta 4

**Enunciado:** ¿Qué mide el 93% del evaluador automático?

**Respuesta:** Su exactitud al clasificar suficiencia en 115 casos etiquetados por humanos. No mide la exactitud general del sistema RAG.

**Referencia:** §3.2, tabla 1.

### Pregunta 5

**Enunciado:** ¿Por qué evaluar sin conocer la respuesta oficial es útil?

**Respuesta:** Porque permite juzgar la información disponible cuando llega una pregunta nueva, antes de tener una solución de referencia.

**Referencia:** §3.1–3.2.

### Pregunta 6

**Enunciado:** ¿Qué permite concluir la comparación de contextos de 6.000 y 10.000 tokens?

**Respuesta:** Ampliar ese límite sobre las mismas fuentes no aumentó la suficiencia medida. No demuestra que buscar otras fuentes o aumentar contexto nunca sirva.

**Referencia:** §4.1, figura 2.

### Pregunta 7

**Enunciado:** ¿Cómo puede ayudar un contexto que no contiene todo lo necesario?

**Respuesta:** Puede aportar una pista que se combina con conocimiento aprendido. Algunos aciertos también se explican por azar entre pocas opciones o errores del evaluador.

**Referencia:** §4.3, tabla 2.

### Pregunta 8

**Enunciado:** ¿Qué añade el método selectivo frente a usar solo confianza?

**Respuesta:** Incorpora si la evidencia permite responder. La combinación mejora la selección en varios escenarios, aunque en Gemma con Musique no aporta beneficio adicional.

**Referencia:** §5.1, figura 4.

### Pregunta 9

**Enunciado:** ¿Por qué mayor exactitud selectiva no implica resolver más preguntas?

**Respuesta:** Porque su denominador incluye solo respuestas entregadas. Retener respuestas puede mejorar esa proporción y reducir simultáneamente la cobertura.

**Referencia:** §5.1, figura 4.

### Pregunta 10

**Enunciado:** ¿Qué decisión práctica inspira este trabajo?

**Respuesta:** Evaluar tanto la evidencia disponible como la capacidad de responder correctamente y ajustar cuándo abstenerse. Es una orientación de diseño, no una garantía de respuestas sin errores.

**Referencia:** §5–6.

## 5. Conclusiones principales

El paper ofrece una pregunta sencilla para entender un sistema complejo: **¿la información disponible alcanzaba para responder?** Separar los casos con ese criterio revela que recuperar documentos, usarlos correctamente y decidir cuándo contestar son problemas relacionados pero distintos.

La suficiencia resulta útil como diagnóstico y, combinada con confianza, como señal para seleccionar respuestas. Su valor depende de la tarea, del modelo y del evaluador. Para la charla, el mensaje a recordar es: un asistente fiable necesita reconocer qué puede respaldar con la información disponible y cuándo conviene detenerse.
