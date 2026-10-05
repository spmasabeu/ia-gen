# Quiz — Language Models are Few-Shot Learners

## Pregunta 1

**Enunciado:** Justifique brevemente el termino "few shot" en el titulo de la lectura asignada.

**Estado:** Aún no calificado / 0 pts

### Respuesta

En el paper estudiado few shot hace referencia a una nueva forma trabajar con modelos de lenguaje generativos, principalmente se engloba en el concepto in-context learning donde se trata de validar que a mayores escalas de modelos autoregresivos se puede obtener mejores resultados sin aplicar fine tuning; en términos prácticos few shot alude a que, a diferencia de fine tuning, puedes darle más contexto al modelo en una fase de inferencia, es decir, entregarle instrucciones detalladas y ejemplos del caso estudiado, sin modificar pesos del modelo. A diferencia de "one shot" y "zero shot", donde el primero entrega un ejemplo y el segundo ninguno en absoluto más allá de una instrucción detallada, "few shot" busca entregar N ejemplos para la tarea a desarrollar, de esta forma en el paper se logra evidenciar que a mayor escala de modelos, se logran obtener resultados bastante precisos en distintas pruebas de benchmark realizadas como respuestas cortas, alternativas múltiples, entre otras.

## Pregunta 2

**Enunciado:** Indique un ejemplo incluido en el paper que respalda el concepto "few shot".

**Estado:** Aún no calificado / 0 pts

### Respuesta

Si hablamos de un modelo que busca traducir en un lenguaje en especifico, se podría realizar un fine tuning sobre ese idioma y alimentarlo con muchos casos asociados, supongamos inglés, se especificarían reglas, modismos en ese idioma, pero con few shot, se podría buscar un modelo generalizado de mayor escala y entregarle contexto sobre lo que buscamos para ese idioma especifico con un prompt del tipo:

```text
Traduce las siguientes palabras

hola -> hello

como estas ? -> how are you ?

....
```

De esta manera estariamos enriqueciendo el proceso de inferencia del modelo y sería mas preciso en sus respuestas sin fine tuning, esto se engloba de igual manera en el concepto de meta learning donde pasa de un mecanismo "outer loop" (ajustar pesos) a uno "inner loop" (in context learning).
