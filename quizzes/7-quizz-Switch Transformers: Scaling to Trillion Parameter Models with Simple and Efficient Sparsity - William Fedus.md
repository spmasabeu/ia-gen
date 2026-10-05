# Quiz - Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity

## Pregunta 1

**Estado:** Aun no calificado / 0 pts

**Enunciado:** En Switch Transformer, ¿que es la capacidad del experto y como se calcula? ¿Que pasa con un token cuando el experto al que fue enviado ya esta lleno?

### Respuesta

En Switch Transformer, la capacidad del experto corresponde al numero maximo de tokens que cada experto puede procesar dentro de un batch. Esta capacidad se fija para mantener tensores de tamano estatico y poder ejecutar el modelo eficientemente, especialmente en TPU.

Se calcula como:

```text
capacidad del experto = (tokens por batch / numero de expertos) * factor de capacidad
```

El factor de capacidad funciona como un margen adicional: si es mayor que 1, deja espacio extra para absorber desbalances del router, porque no todos los expertos reciben exactamente la misma cantidad de tokens.

Cada token se envia solo al experto con mayor probabilidad segun el router. Si ese experto ya alcanzo su capacidad, el token se considera overflow o dropped para esa capa: no es procesado por el experto seleccionado y pasa directamente a la siguiente capa mediante la conexion residual. Es decir, el token no desaparece de la secuencia, pero en esa capa se salta el bloque experto/feed-forward.
