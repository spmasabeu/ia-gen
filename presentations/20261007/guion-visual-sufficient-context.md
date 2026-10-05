# Tener apuntes no significa tener la respuesta

**Base:** [resumen del paper](summary-sufficient-context.md).  
**Estado:** propuesta narrativa y visual para iterar; todavía no es una presentación diseñada.  
**Audiencia asumida:** personas interesadas en IA, sin necesidad de conocer cómo funciona RAG.  
**Duración objetivo:** 7 min 30 s, con pausas incluidas; validar mediante ensayo. Deja 2 min 30 s de margen respecto del tope de 10 minutos.  
**Estilo:** charla cercana, una pequeña experiencia con el público, una metáfora recurrente y evidencia fácil de leer.  
**Mensaje central:** encontrar textos sobre un tema no garantiza tener la información para responder; la fiabilidad también exige reconocer cuándo falta evidencia.

## Recorrido de ocho diapositivas

Los textos entre comillas son propuestas para decir, no citas del paper. El ejemplo de Ana es inventado para enseñar la distinción. Los tiempos son un presupuesto para la exposición, no una duración medida de lectura.

| # | Tiempo | Mensaje en pantalla | Recurso principal |
|---|---|---|---|
| 1 | 0:00–0:50 | Tener apuntes no significa tener la respuesta | Foto de un examen con libros abiertos |
| 2 | 0:50–1:40 | Un asistente también puede consultar apuntes | Secuencia visual: pregunta, documentos, respuesta |
| 3 | 1:40–2:45 | Hablar del tema no alcanza para responder | Pregunta al público y dos tarjetas de evidencia |
| 4 | 2:45–3:40 | A menudo falta la pieza que permite responder | Gráfico de suficiencia de la figura 2 |
| 5 | 3:40–4:40 | Tener la información tampoco garantiza acertar | Un dato de la tabla 4 y un libro abierto |
| 6 | 4:40–5:35 | Una pista incompleta todavía puede ayudar | Foto de un recuerdo parcialmente revelado |
| 7 | 5:35–6:40 | Decidir cuándo responder también es parte del trabajo | Dos señales que orientan responder o abstenerse |
| 8 | 6:40–7:30 | La confianza también se gana diciendo «no alcanza» | Regreso al examen inicial y cierre |

## 1. Apertura: el examen con apuntes

**Para decir:** “Imaginen que mañana tienen un examen. Les permiten llevar todos sus apuntes. Incluso una biblioteca entera. Suena bastante tranquilizador. Pero llega la primera pregunta y descubren que las páginas hablan del tema… sin darles el dato que necesitan. ¿Qué harían? ¿Responder igual o reconocer que falta algo? A los asistentes de inteligencia artificial les pasa algo parecido. Y este paper parte de una pregunta muy humana: ¿tenían cómo saberlo?”

**Visual:** fotografía a pantalla completa de un escritorio con cuadernos y libros abiertos. Una sola frase grande. Sin robots ni cerebros luminosos. La foto ilustra la metáfora, no un experimento real.

**Entrega:** pausa breve tras la pregunta; no abrir una discusión larga.

## 2. Explicar RAG sin entrar en arquitectura

**Para decir:** “Una forma de ayudar a estos asistentes es dejar que consulten documentos antes de contestar. Buscan fragmentos y los usan para preparar una respuesta. Eso se llama RAG. Si preguntamos por una política de vacaciones, por ejemplo, queremos que consulte el documento de la empresa. Es una idea útil. Pero consultar un documento y encontrar una respuesta son dos pasos distintos. El estudio se pregunta qué ocurre entre esos dos momentos.”

**Visual:** tres elementos grandes que aparecen de forma sucesiva: pregunta, página, respuesta. La página reutiliza la estética de los apuntes. Sin embeddings, bases vectoriales ni fórmulas.

**Fuente:** §1. La política de vacaciones es una aplicación ilustrativa propia.

## 3. El público experimenta la diferencia

**Pregunta en pantalla:** “¿En qué ciudad nació Ana?”

**Tarjeta A:** “Ana vive en Valparaíso. Su madre nació en Santiago.”

**Para decir:** “Tenemos dos ciudades y dos datos que suenan muy relacionados. ¿Quién se atreve a responder? [Pausa breve.] Nos falta el dato: vivir en una ciudad no es haber nacido allí. Y el lugar de nacimiento de su madre tampoco lo resuelve.”

**Revelar tarjeta B:** “Ana nació en Concepción.”

**Continuación:** “Ahora sí. Esa diferencia tan pequeña es el centro del paper: contexto relevante y contexto suficiente. No necesitamos más palabras; necesitamos información que permita responder.”

**Visual:** resaltar únicamente el dato decisivo de la tarjeta B. Ejemplo ficticio, inspirado en §3.1; no presentarlo como una pregunta del benchmark.

## 4. Mostrar el tamaño del problema

**Para decir:** “Los investigadores buscaron esta diferencia en tres conjuntos de preguntas. En uno de ellos, el contexto alcanzaba en aproximadamente 77 de cada 100 casos. En los otros dos, en menos de la mitad. Estos conjuntos tienen tareas y fuentes diferentes; no estamos comparando tres buscadores. Lo sorprendente es que tener documentos disponibles no asegura tener la pieza que falta.”

**Gráfico a reconstruir:** tres barras horizontales, eje de 0 a 100%, etiquetas directas y una referencia discreta en 50%. FreshQA 77,4%; HotpotQA 46,2%; Musique-Ans 44,6%. Resaltar visualmente los dos valores menores de 50%.

**Pie legible:** “Pares pregunta-contexto clasificados como suficientes; límite de 6.000 tokens. FreshQA n=452; otros n=500 cada uno. Figura 2.”

**Cuidado:** son proporciones de suficiencia, no de respuestas correctas. No usar una captura del gráfico completo si resulta ilegible al proyectar.

## 5. El segundo giro: los apuntes sí estaban

**Para decir:** “Podríamos pensar: entonces arreglemos la búsqueda. Pero aparece otro problema. En una prueba con etiquetas humanas, GPT-4o respondió incorrectamente en un 12,7% de los casos donde el contexto sí era suficiente. La información estaba. El resultado falló. Tener un libro abierto no equivale a entenderlo bien. Por eso el diagnóstico cambia: a veces falta evidencia; otras veces falla la forma de usarla.”

**Visual:** “12,7%” destacado y la frase “Respuestas incorrectas aun con contexto suficiente”. Una referencia visual pequeña al libro abierto; evitar un gráfico con cien personas que sugiera un tamaño de muestra inexistente.

**Pie:** “GPT-4o, subconjunto suficiente del conjunto curado con etiquetas humanas. Tabla 4a, apéndice B.2. Aciertos: 82,5%; abstenciones: 4,8%.”

**Cuidado:** este porcentaje ilustra un caso del paper, no representa todos los asistentes ni los modelos actuales. Suficiencia tampoco garantiza veracidad de las fuentes (§3.1).

## 6. El tercer giro: una pista también sirve

**Para decir:** “Y ahora el giro contrario: un contexto incompleto puede ayudar. Imaginen que intentan recordar una película. Alguien les dice el nombre de un actor y de pronto la recuerdan. La pista no contenía el título, pero activó algo que ustedes ya sabían. En el estudio, algunos modelos también aciertan con información incompleta. Otros aciertos pueden ser casualidad o errores de evaluación. Por eso bloquear automáticamente todo contexto insuficiente sería demasiado rígido.”

**Visual:** imagen de un cine o entradas, parcialmente revelada y luego completa. Debe representar recordar a partir de una pista; no identificar una película real ni inventar un resultado experimental.

**Fuente:** §4.3 y tabla 2. La metáfora del cine es propia.

## 7. Responder menos, pero elegir mejor

**Para decir:** “La propuesta combina dos señales: ¿alcanza la información?, y ¿qué confianza declara el modelo en su respuesta? Juntas ayudan a decidir cuándo entregar una respuesta y cuándo abstenerse. Eso mejora la proporción de aciertos entre las respuestas entregadas en varios experimentos, frente a usar solo confianza. Pero hay un precio que debemos mirar: cuántas preguntas dejamos sin responder. Un asistente que nunca responde evita errores y también deja de ser útil. La meta es equilibrar ambas cosas.”

**Visual:** dos señales que convergen en una decisión con dos salidas: “responder” y “abstenerse”. Debajo, dos etiquetas: “cuántas responde” y “cuántas de esas acierta”. Esquema conceptual, sin curvas ni cifras inventadas.

**Fuente:** §5.1, figura 4. Señalar oralmente que no mejora en todos los escenarios. La confianza declarada tampoco garantiza corrección.

## 8. Cierre: volver al examen

**Para decir:** “Volvamos al examen. Al principio parecía que la ventaja era tener muchos apuntes. Ahora vemos tres tareas: conseguir la información necesaria, interpretarla y reconocer cuándo no alcanza. Para quienes construimos o usamos asistentes, el paper deja una pregunta útil: ¿esta respuesta tiene cómo sostenerse? Mi conclusión es que la confianza también se gana cuando un sistema puede decir: ‘Con esto todavía no alcanza’. Ese puede ser el comienzo de una mejor búsqueda, o de una mejor pregunta.”

**Visual:** misma fotografía del inicio, ahora con un solo pasaje destacado. Cierre con la frase principal y referencia corta al paper.

**Cuidado:** buscar de nuevo o pedir aclaraciones son posibles implicaciones de diseño; este paper no demuestra aquí un sistema completo que ejecute ambas acciones (§6).

## Dirección visual para la siguiente iteración

- **Formato:** 16:9, contraste alto y composición espaciosa. Apertura y cierre fotográficos; diapositivas de evidencia claras y limpias.
- **Paleta propuesta:** carbón `#172026`, blanco `#FFFFFF`, turquesa oscuro `#087F8C` para evidencia suficiente y naranja oscuro `#B84A12` para información faltante. Añadir siempre etiquetas; no depender solo del color.
- **Tipografía:** títulos de 40–48 pt, texto principal de 28–32 pt y fuentes de al menos 16–18 pt, sujeto a prueba de proyección. Máximo dos familias; priorizar legibilidad.
- **Contenido:** una idea por pantalla. El desarrollo va en notas del expositor. Evitar trasladar los párrafos del resumen a las slides.
- **Fotos:** dos motivos bastan —examen y recuerdo/cine—, reutilizados con intención. En la producción, seleccionar fotos con permiso de uso o generar ilustraciones fotográficas; registrar procedencia. Los activos todavía no están elegidos ni generados.
- **Gráficos:** reconstruir la figura 2 con los datos indicados y verificar etiquetas contra el PDF. Reservar tablas y curvas completas para material de apoyo.
- **Movimiento:** revelar la tarjeta de Ana y los pasos de RAG gradualmente. Transiciones discretas; cada aparición debe apoyar la explicación.

## Ensayo y control de calidad

- Ensayar con cronómetro; objetivo 7:30 y límite de ensayo 8:30 para absorber pausas e interacción.
- Si se alarga, abreviar la explicación del método selectivo; conservar el ejemplo de Ana y los dos matices del paper.
- Comprobar que alguien sin experiencia en RAG pueda explicar la diferencia entre “relacionado” y “suficiente”.
- Conservar denominadores y referencias; no convertir el 93% del evaluador en exactitud de RAG ni anunciar “10% menos errores” como mejora universal.
- Llevar el resumen y su quiz como respaldo para preguntas. La charla no necesita recorrer las seis secciones académicas.

**Revisión narrativa realizada:** tesis definida, secuencia construida, anotaciones y comparaciones previstas, y afirmaciones contrastadas con el PDF. La revisión visual y el tiempo real quedan para cuando se construya y ensaye la presentación.
