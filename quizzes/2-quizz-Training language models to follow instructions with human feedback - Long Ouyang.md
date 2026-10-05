# Quiz — Training language models to follow instructions with human feedback

## Pregunta 1

**Enunciado:** Indique los 3 pasos de postraining propuestos por la lectura asignada, indicando para cada uno, en una frase, el rol que cumplen.

**Estado:** Aún no calificado / 0 pts

### Respuesta

Inicialmente se parte de un modelo gpt3 pre entrenado sin fine tuning con 175B parametros, para luego realizar 3 tipos de post entrenamientos que son:

1. **Supervised Fine Tune (SFT):** Tiene por objetivo realizar un tuning al modelo pre entrenado usando demostraciones realizadas por expertos contratas, es decir, realizar para una muestra de prompts los resultados esperados que les gustaría recibir, en otras palabras el label. Esta fase tiene por finalidad hacer del modelo mas preciso para una tarea especifica y mejorar su desempeño en términos de diferentes benchmarks.

2. **Proximal Policy Optimization (PPO):** Esta fase lo que hace es tomar distintas muestras para diferentes outputs del modelo y un grupo experto catalogo en una jerarquía las respuestas mas esperadas o mas acertadas y de esta forma de genera un Reward Model (RM), para este caso particular el modelo aprende a predecir la respuesta mas esperada por el grupo humano, de esta forma pasamos de optimizar en base a labels x->y a generar un escalar de recompensa r(prompt,respuesta).

3. **PPO ptx:** Esta fase tiene por finalidad sumarle al PPO la actualización de los datos de entrenamiento, el rol que cumple es que la policy con la que se actualiza el modelo es el SFT, el output alimenta un RM y con ello se actualiza el modelo en base a los datos de entrenamiento, esto tiene por finalidad robustecer el proceso de RL y disminuir el alignment tax asociado al alineamiento del modelo.
