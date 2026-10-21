# Quiz — Why Language Models Hallucinate

## Pregunta 1

**Enunciado:** El paper sostiene que la persistencia de las alucinaciones tras el post-entrenamiento no se debe principalmente a una limitación técnica, sino a los incentivos que enfrentan los modelos durante el entrenamiento y la evaluación. Explique este argumento y describa brevemente qué cambio podría reducir las alucinaciones.

**Estado:** Aún no calificado / 0 pts

### Respuesta

En el paper se explica que muchas evaluaciones usan un puntaje binario: una respuesta correcta recibe 1 y tanto una respuesta incorrecta como un "no sé" reciben 0. Esto da un incentivo a responder aun sin mucha certeza, porque adivinar entrega alguna posibilidad de acertar y obtener un mayor puntaje, mientras que reconocer la incertidumbre asegura un 0. Por tanto, aunque durante el post training se enseñe al modelo a abstenerse, si luego se optimiza o selecciona según estos benchmarks, se sigue favoreciendo que dé una respuesta plausible antes que reconocer que no sabe.

Para reducir las alucinaciones, los autores proponen cambiar la puntuación de los benchmarks existentes, penalizando las respuestas incorrectas más que la abstención y explicitando en las instrucciones el nivel de confianza requerido para responder. Así, cuando la certeza es baja, reconocer la incertidumbre puede obtener un mejor resultado esperado que adivinar. No basta con agregar una evaluación aislada de alucinaciones si las principales evaluaciones y rankings siguen premiando ese comportamiento.
