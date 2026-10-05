# Quiz — The Pile: An 800GB Dataset of Diverse Text for Language Modeling

## Pregunta 1

**Estado:** Aún no calificado / 0 pts

### Enunciado

Elija 1 de las 2 preguntas a continuación, señale al principio de su respuesta que pregunta va a responder.

1. The Pile pone especial énfasis en la idea de la diversidad diversidad del corpus de datos. ¿Qué acción sostiene esa decisión y cómo la ponen a prueba los autores?

2. The Pile asigna a cada componente un número distinto de épocas, y esa ponderación es lo que determina la mezcla efectiva de dominios sobre la que se entrena. ¿Qué evidencia entrega el paper de que esa ponderación es adecuada? Si considera que no la entrega, señale qué experimento habría hecho falta.

### Respuesta

Para el presente control se abordará la pregunta n°1.

The pile pone énfasis en la idea de que la diversidad del corpus de datos para mejorar el benchmark de los modelos que usan los llms, esto ya que consideran que alimentar modelos solamente con información de CC no es suficiente para cubrir un mayor alcance de tópicos. Para eso es que toman la acción de crear the pile, un conglomerado de información que cubre 22 origenes diferentes y la creación de 14 nuevos datasets, dentro de los cuales se encuentran origenes como Arxiv, pubmed, github, freelaw, youtube subtitles, exchange stack, the pile cc, entre otras. Para poder comparar diferentes modelos y tener una medida estandar se usa bites per byte, bpb, esto ya que diferentes modelos usan distintos tokenizers por lo que esto permite tener una medida mas uniforme para comparar el performance entre modelos a nivel de predicciones. Lo que se hace es entrenar 3 modelos de 1.3 billion parameters con data de the pile, raw cc y cc-100, obteniendo finalmente que los mejores resultados de bpb se obtienen en el modelo entrenado con data de the pile, esto quiere decir que en terminos promedios se requieren una menor cantidad de bits para representar la informacion evaluada. Con las pruebas que realizaron pudieron dar cuenta que, si bien the pile contiene información donde su mayoría son documentos cortos y tiene una cola larga de textos largos como libros, la diversidad de información especializada en diferentes áreas permite que el modelo responda mejor para diferentes tópicos, esto medido en pruebas como wikitext y lambada.
