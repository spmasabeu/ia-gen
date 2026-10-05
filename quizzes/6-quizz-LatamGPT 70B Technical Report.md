# Quiz — LatamGPT 70B Technical Report

## Pregunta 1

**Enunciado:** ¿Por qué LatamGPT se construye por CPT sobre Llama 3.1 70B en vez de entrenarse desde cero, y qué función cumplen los 35B tokens de replay?

**Estado:** Aún no calificado / 7 pts

### Respuesta

Esto porque latamgpt se construye mediante cpt, continual pre training, sobre Llama 3.1 70B para aprovechar las capacidades lingüisticas y el conocimiento en general que el modelo ya absorvió durante el preentrenamiento, esto reduce el costo computacional y la cantidad de datos que se necesitan a lo que sería si se entrenara desde 0. La finalidad es poder continuar actualizando sus pesos pero con información de Latinoamérica, de esta forma se adapta el modelo al conocimiento factual, cultural y lingüistico de la región usando una base pre concebida.

Los 35B tokens de replay se usan para mitigar el olvido catastrófico, es decir, evitar que cuando se aprende información regional el modelo pierda capacidad que ya tenía. Para ello se intercalan datos representativos del entrenamiento original, donde se incluye conocimiento general, contenido multilingüe y STEM, asi se equilibra la adaptación regional preservando anteriores capacidades.
