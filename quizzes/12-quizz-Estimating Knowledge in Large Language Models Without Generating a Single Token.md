# Quiz — Estimating Knowledge in Large Language Models Without Generating a Single Token

## Pregunta 1

**Enunciado:** ¿Permitiría KEEN anticipar cuánto alucinaría el modelo sobre una entidad antes de generar texto? Señale si algun resultado del paper sustenta su respuesta.

**Estado:** Aún no calificado / 0 pts

### Respuesta

Sí, KEEN permite estimar qué proporción de las afirmaciones que generaría el modelo sobre una entidad estarían respaldadas por evidencia. Para ello usa las representaciones internas del último token del nombre de la entidad, antes de generar texto, y obtiene un puntaje que estima cuánto conocimiento tiene el modelo sobre ella. Un menor puntaje indicaría una mayor tendencia a generar información incorrecta.

Esto se sustenta en el experimento de generación de biografías, donde comparan las predicciones de KEEN con FActScore, que mide la proporción de afirmaciones respaldadas por evidencia. La variante basada en estados ocultos obtiene una correlación de Pearson de 0.77 para Pythia 12B y 0.66 para Vicuna 13B. Estos resultados respaldan que puede anticipar la factualidad general sobre la entidad, aunque no permite identificar de antemano qué afirmación específica será una alucinación.
