# Quiz — Learning Transferable Visual Models From Natural Language Supervision

## Pregunta 1

**Enunciado:** Según las razones y experimentos indicados en el paper, ¿por qué los autores eligieron un objetivo contrastivo en vez de entrenar el modelo para generar el texto que acompaña a cada imagen?

**Estado:** Aún no calificado / 0 pts

### Respuesta

Los autores encontraron que predecir o generar las palabras exactas de un texto asociado a una imagen era una tarea difícil: las descripciones, comentarios y otros textos que aparecen junto a las imágenes son muy variados. En lugar de aprender a reproducir ese texto, CLIP resuelve una tarea más sencilla: identificar cuál de los textos de un lote corresponde a cada imagen. Para ello, acerca las representaciones de las parejas correctas de imagen y texto y aleja las de las parejas incorrectas.

La elección también se basó en la eficiencia observada en sus experimentos. El modelo de lenguaje de 63 millones de parámetros que generaba captions aprendía a reconocer clases de ImageNet tres veces más lento que una alternativa que predecía una representación bag-of-words del texto. Al cambiar esa alternativa de predicción por un objetivo contrastivo, observaron una mejora adicional de 4 veces en la velocidad de transferencia zero-shot a ImageNet. Además, investigaciones previas citadas por los autores indicaban que los objetivos contrastivos podían aprender mejores representaciones que sus equivalentes predictivos, y que los modelos generativos de imágenes podían requerir más de diez veces el cómputo para alcanzar un rendimiento similar al de modelos contrastivos. Por estas razones, el objetivo contrastivo ofrecía una forma más eficiente de aprender representaciones visuales transferibles a partir de pares de imagen y texto.
