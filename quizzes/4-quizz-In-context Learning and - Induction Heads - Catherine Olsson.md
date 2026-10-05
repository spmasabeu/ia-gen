# Quiz — In-context Learning and Induction Heads

## Pregunta 1

**Enunciado:** El paper mide in-context learning con una cantidad específica que llama in-context learning score. ¿Cómo se calcula exactamente?

**Estado:** Aún no calificado / 0 pts

### Respuesta

Dentro del paper se hablan de dos mecánismos para el ICL, uno relacionado a few-shot y otro asociado a la perdida promedio asociada a la predicción del siguiente token, para esto se toma el token de la 50 y 500 posición, toman sus probabilidades y se pasan por logaritmo natural usando como unidad nats, es decir:

```text
score = E(500) - E(50)
```

Siendo E el valor calculado como `-ln(p)`, siendo "p" la probabilidad que le asigna el modelo en el contexto dado al siguiente token que debe predecir, como el valor esta entre 0 y 1 entonces con el negativo queda positivo y entrega un escalar. Valores menores indican menor perdida y por ende mejores predicciones, mientras que valores mayores indican mayor perdida y peores predicciones.

## Pregunta 2

**Enunciado:** ¿El foco del articulo es modelos pequeños, grandes, o ambos?, Explique.

**Estado:** Aún no calificado / 0 pts

### Respuesta

Modelos pequeños, para hacer pruebas e ir desglosando los mecanismos del transformer y fundamentar sus argumentos.

Dentro de los argumentos que presentan inicialmente se observa una fase que llaman "phase change" donde observan que durante entrenamiento hay un cambio pronunciado en el ICL que presentan los modelos aunque no explica causalidad, modifican como se forman las keys K para que la key considere su posicion actual y la de su posición anterior, así tiene la información sin tener que ir a buscarla desde otra capa y luego para seguir con su argumentación apagan algunas induction heads para medir si efectivamente el ICL se explica por ello.

En el paper se entiende que trabajar con modelos grandes puede ser mucho mas complejo mas con MLPs por lo que en el argumento 6 finalmente dicen que los comportamientos si bien son similares y podrían ser extrapolables, no necesariamente dominantes y que los modelos grandes podrían eventualmente desarrollar otros mecanismos propios.
