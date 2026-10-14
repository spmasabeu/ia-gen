# Quiz — Improving language models by retrieving from trillions of tokens

## Pregunta 1

**Enunciado:** ¿Cómo encuentra RETRO los vecinos en una base de datos de 2 trillions tokens (billions en español)? Describe cómo se construyen los chunks de la base de datos y cómo se seleccionan los vecinos de cada chunk de consulta. ¿Por qué cada vecino tiene el doble de largo que el chunk de consulta?

**Estado:** Aún no calificado / 0 pts

### Respuesta

RETRO divide los documentos de la base de datos en chunks de 64 tokens. Para cada uno guarda como clave el promedio de sus representaciones obtenidas con un BERT congelado y, como valor, el chunk junto con los 64 tokens que le siguen en el documento original. Cuando recibe un chunk de consulta, calcula su representación de la misma forma y usa SCaNN para buscar vecinos aproximados según la distancia entre esas representaciones. Así puede buscar en una base de datos de aproximadamente 2 billones de tokens sin comparar la consulta con cada chunk. Durante el entrenamiento excluye los vecinos del mismo documento que la consulta, para evitar que el modelo vea la respuesta que debe predecir.

Cada vecino tiene 128 tokens, el doble que la consulta, porque incluye tanto el fragmento similar encontrado como su continuación. Esa continuación le entrega al modelo información útil para predecir el siguiente chunk de la secuencia.
