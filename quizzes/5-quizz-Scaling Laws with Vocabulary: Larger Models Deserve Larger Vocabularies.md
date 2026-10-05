# Quiz — Scaling Laws with Vocabulary: Larger Models Deserve Larger Vocabularies

## Pregunta 1

**Enunciado:** El paper argumenta que la pérdida (loss) de un modelo no se puede comparar directamente entre modelos con distinto tamaño de vocabulario. ¿Por qué, y qué usan en su lugar?

**Calificación:** 5.5 / 7 pts

### Respuesta

Porque mucho de eso va a depender del tokenizador que se use en cada modelo, por tanto, la perdida estará sujeta a ello, y además del vocabulario en si. Cuando estos cambian van a cambiar claramente las predicciones, por tanto, no siempre una perdida mayor implicará un peor modelo, no son necesariamente medidas comparables de por si.

En su lugar usan una perdida normalizada por unigramas, lo que busca esta medida es ver cuanto mejora el modelo en términos de su predicción usando el contexto en relación a una referencia basada en la frecuencia del token en cuestión.
