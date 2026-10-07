# Guion del expositor · Contexto suficiente (deck v2)

Objetivo: **9:15** (555 s), con pausas y lectura visual de gráficos. 1151 palabras. El cronograma es una pauta; confirmar la duración mediante ensayo oral. No incluye preguntas.

Fuente editable de estas notas: elementos `aside.notes` de `deck.html`. Regenerar con `node exportar.mjs`.

## 01 · Tener contexto no significa tener respuesta.

**0:00–0:25 · 25 s**

La intuición inicial es simple: con más apuntes deberíamos responder mejor. Pero cualquiera que haya estudiado con demasiadas fuentes sabe que no siempre pasa. A veces hablan del tema, pero falta justo la pieza que necesitamos. Este paper lleva esa intuición a los modelos de lenguaje: tener documentos no significa tener respuesta.

## 02 · Cuando no basta conlo que recordamos

**0:25–0:55 · 30 s**

Si nos piden escribir un ensayo, partimos desde lo que sabemos. Cuando eso no alcanza, consultamos una enciclopedia, Wikipedia, Stack Overflow o artículos. No estamos reentrenando nuestro cerebro: incorporamos información externa para resolver una tarea concreta. Esta es una analogía propia para entrar a RAG. Consultar ayuda, pero todavía tenemos que encontrar el dato correcto y usarlo bien.

## 03 · RAG agrega contextoen inferencia

**0:55–1:25 · 30 s**

RAG significa generación aumentada por recuperación. Primero llega una pregunta. El sistema busca documentos, recupera fragmentos y los incorpora a las instrucciones que recibe el modelo. Finalmente, el modelo genera una respuesta. RAG ocurre a nivel de inferencia, no de entrenamiento. Los pesos no cambian para cada pregunta: cambia la información que el modelo tiene a mano al responder.

## 04 · Los documentos entranen las instrucciones del modelo

**1:25–1:45 · 20 s**

Aquí preguntamos en qué país nació el autor de Cien años de soledad. El sistema recupera un fragmento que conecta al autor con la obra y dice que nació en Colombia. El modelo recibe pregunta y contexto juntos. Lo importante para el paper es preguntar: ¿ese contexto realmente alcanza para responder?

## 05 · Más contextono elimina los errores

**1:45–2:10 · 25 s**

El artículo parte de tres problemas conocidos. Un modelo puede responder incorrectamente con evidencia recuperada, distraerse con información irrelevante o no extraer el dato desde un texto largo. Por eso, agregar documentos no cierra el problema. Si una respuesta falla, todavía falta saber si no encontró lo necesario o si no supo aprovecharlo.

## 06 · Relevante no siempresignifica suficiente

**2:10–2:40 · 30 s**

Los trabajos previos ya estudiaban ruido, recuperación imperfecta y alucinaciones. Pero relevante podía significar cosas distintas: un texto que habla del tema, o uno que permite contestar la pregunta. Esa diferencia importa al interpretar un error. Este paper propone hacer explícita la pregunta que faltaba: antes de evaluar al generador, ¿la información disponible realmente alcanzaba para construir una respuesta?

## 07 · ¿El contexto alcanzapara construir una respuesta?

**2:40–3:15 · 35 s**

Formalmente, cada entrada tiene una pregunta Q y un contexto C. Hay contexto suficiente si existe una respuesta A prima plausible para esa pregunta dada la información del contexto. No necesitan conocer la respuesta oficial de antemano. El matiz decisivo es que suficiente no significa verdadero: un documento equivocado puede permitir construir una respuesta muy clara. La suficiencia evalúa si se puede responder desde el texto, no verifica la verdad del texto.

## 08 · Hablar del tema no alcanza

**3:15–3:35 · 20 s**

Preguntamos dónde nació Ana. El primer texto habla de ella, de su madre y de ciudades. Es relevante, pero no da su lugar de nacimiento. El segundo sí permite responder. No falta más texto en abstracto: falta un hecho específico. Esa diferencia es el corazón de la propuesta.

## 09 · La suficiencia tambiénexige desambiguar

**3:35–4:00 · 25 s**

La definición contempla tres casos borde. Podemos conectar varios hechos, pero no inventar enlaces ausentes. Si la pregunta tiene varios referentes posibles, el contexto debe permitir distinguirlos y responder según la interpretación. Y si ofrece varias respuestas plausibles, debe incluir información para distinguirlas. No basta con encontrar una palabra que parezca una respuesta.

## 10 · Un juez parapregunta + contexto

**4:00–4:25 · 25 s**

Una vez definida la suficiencia, hay que etiquetar muchos ejemplos. Para escalar esa tarea usan otro modelo como evaluador automático, o autorater. Recibe pregunta y contexto y devuelve suficiente o insuficiente. La ventaja es que no necesita la respuesta oficial. Eso permite usar esta señal cuando llega una pregunta nueva y todavía no conocemos su solución.

## 11 · Primero lo comparancontra humanos

**4:25–5:00 · 35 s**

La validación usa 115 casos difíciles de cuatro conjuntos de preguntas, etiquetados por humanos. Comparan varios métodos. El mejor resultado es Gemini 1.5 Pro con un ejemplo en las instrucciones: 93 por ciento de exactitud. Fíjense en el denominador: mide clasificaciones de suficiencia, no respuestas correctas del asistente. Es evidencia útil, pero proviene de un conjunto pequeño y no garantiza el mismo rendimiento en cualquier dominio.

## 12 · Muchos conjuntos de evaluaciónno traen toda la evidencia

**5:00–5:50 · 50 s**

Ahora el evaluador analiza tres conjuntos. Las barras muestran qué porcentaje de entradas tiene contexto suficiente; los colores representan límites de dos mil, seis mil y diez mil tokens. Con seis mil, FreshQA llega a 77,4 por ciento. Usa páginas de apoyo seleccionadas. HotpotQA, basado en Wikipedia, queda en 46,2; Musique, que exige conectar hechos de veinte fragmentos, en 44,6. Pasar de dos mil a seis mil ayuda, pero de seis mil a diez mil no cambia estos resultados. Ojo: amplían el límite sobre las mismas fuentes, no buscan otras. Si falta evidencia, no todos los errores pueden atribuirse al generador.

## 13 · RAG ayuda, pero no basta

**5:50–6:40 · 50 s**

Esta es una versión reducida de la figura tres: solo HotpotQA y tres modelos. Cada barra suma cien por ciento dentro de su grupo. Arriba hay contexto suficiente; abajo, insuficiente. Azul indica aciertos, amarillo abstenciones y rosado respuestas incorrectas. Con evidencia suficiente suben los aciertos, pero el rosado no desaparece. Sin evidencia suficiente también hay aciertos, y las respuestas incorrectas superan a las abstenciones. El artículo llama alucinación a la respuesta juzgada incorrecta; no necesariamente es una historia inventada. Los valores están redondeados desde la figura. El patrón muestra dos problemas distintos: usar bien lo recuperado y decidir cuándo responder.

## 14 · Una pista incompletapuede ayudar

**6:40–7:15 · 35 s**

Aquí aparece el giro: insuficiente no significa inútil. Un modelo puede acertar porque ya conocía la respuesta, porque el contexto aporta una pista que completa con su conocimiento o porque hay pocas alternativas. También puede haber un error del evaluador. Los autores estudian incluso casos donde el modelo fallaba sin documentos y acierta con contexto incompleto. Por eso, abstenerse siempre que falta evidencia descartaría respuestas correctas. Necesitamos más de una señal.

## 15 · ¿Cómo guiar la decisiónde responder?

**7:15–7:35 · 20 s**

Después del diagnóstico prueban dos caminos. Uno mantiene el generador y aplica un filtro externo para decidir qué respuestas entregar. El otro ajusta el modelo con ejemplos de no lo sé, intentando que aprenda a abstenerse. La primera intervención selecciona respuestas; la segunda modifica cómo se generan.

## 16 · Responder menos,pero elegir mejor

**7:35–8:20 · 45 s**

Combinan suficiencia y confianza declarada por el modelo en una regresión logística. Un umbral decide qué entregar. El eje horizontal es cobertura: qué proporción de consultas recibe respuesta. El vertical es exactitud selectiva: qué proporción de lo entregado es correcta. A igual cobertura, sumar suficiencia mejora la selección en este panel de Gemini con HotpotQA. El resumen reporta mejoras del dos al diez por ciento entre respuestas emitidas, no sobre todas las preguntas. No siempre ayuda: con Gemma en Musique ambas curvas coinciden. No elimina alucinaciones; ayuda a decidir cuándo conviene responder.

## 17 · Enseñar «no lo sé»no fue una solución limpia

**8:20–8:50 · 30 s**

El ajuste fino intenta enseñar abstención reemplazando algunas respuestas por no lo sé. Los resultados no son robustos: puede subir el acierto, pero las respuestas incorrectas siguen siendo frecuentes y cambian otros comportamientos. Además, el estudio se concentra en preguntas y respuestas textuales, depende de evaluadores imperfectos y no optimiza los recuperadores. La señal sirve, pero todavía necesita validación en cada escenario.

## 18 · Un RAG confiablenecesita tres cosas

**8:50–9:15 · 25 s**

La contribución no es un nuevo buscador ni un nuevo modelo. Es una forma de diagnosticar RAG: preguntar si la evidencia alcanzaba antes de juzgar la respuesta. Eso ayuda a separar recuperación, uso de información y decisión de responder. Un sistema confiable también necesita reconocer: con esto todavía no alcanza. Gracias.

## Respaldo para preguntas

- Exactitud: aciertos de clasificación / casos evaluados.
- Precisión: verdaderos positivos / positivos predichos.
- Exhaustividad: verdaderos positivos / positivos reales.
- F1: media armónica de precisión y exhaustividad; 0,935 para Gemini con un ejemplo.
- Cobertura: consultas respondidas / consultas totales.
- Exactitud selectiva: respuestas correctas / respuestas emitidas.
- §5.1 usa FLAMe para suficiencia, no el Gemini de la validación de §3.2. FLAMe examina fragmentos de hasta 1.600 tokens.
- La señal de confianza es declarada por el modelo; no garantiza calibración.
- Figura 2: 452 entradas de FreshQA y 500 de HotpotQA y Musique-Ans.
- Figura 3: valores aproximados, solo HotpotQA; no extrapolar a todos los conjuntos.
- Figura 4: panel de Gemini/HotpotQA; con Gemma/Musique, la señal de suficiencia no añade beneficio.
- El rango 2–10% conserva la formulación del resumen; no se convierte en puntos porcentuales ni en mejora sobre todas las consultas.

Si el ensayo se acerca a 10:00, abreviar comentarios de las diapositivas 6, 9 y 17. Mantener las definiciones de ambos ejes de la diapositiva 16.
