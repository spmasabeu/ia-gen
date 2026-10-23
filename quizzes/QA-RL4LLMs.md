# Preguntas y respuestas — RL4LLMs

Guía basada en la presentación **Policy Gradient Methods**, de Álvaro Soto. Los números de diapositiva corresponden al contador de la presentación: 1–37. El archivo `../RL4LLMs-estudio.pdf` contiene una sola versión completa por diapositiva.

Las fórmulas están escritas como texto para facilitar su lectura. Estas preguntas son una guía de estudio, no preguntas confirmadas del control. La fuente es la presentación; no un paper individual.

## Cómo estudiar

Primero responde sin mirar. Después contrasta tu explicación con la respuesta. Prioriza entender qué problema resuelve cada método y qué información utiliza para aprender.

## A. Fundamentos

### 1. ¿Cuál es la finalidad de la presentación?

Explicar cómo aprender directamente una política que maximice el retorno esperado y cómo aplicar esos métodos a modelos de lenguaje. El recorrido es: gradiente de política → REINFORCE → reducción de varianza y reutilización de datos → PPO → GRPO.

### 2. ¿Qué es aprendizaje por refuerzo o RL?

**Reinforcement Learning** es aprender un comportamiento mediante interacción y recompensas. Un agente observa un estado, ejecuta una acción y recibe una recompensa y un nuevo estado. Busca maximizar el resultado acumulado de sus decisiones, no únicamente el premio inmediato.

### 3. ¿En qué se diferencia del aprendizaje supervisado?

En supervisado se dispone de una respuesta objetivo para cada ejemplo. En RL el agente prueba acciones y recibe una evaluación de sus consecuencias. Esa evaluación no indica necesariamente cuál habría sido la acción correcta ni qué decisión concreta causó el resultado.

### 4. ¿Qué significan agente, entorno, estado y acción?

- **Agente:** sistema que decide, por ejemplo un robot.
- **Entorno:** sistema con el que interactúa, por ejemplo una habitación.
- **Estado, s:** descripción relevante de la situación, por ejemplo posición y orientación.
- **Acción, a:** decisión que puede ejecutar, por ejemplo avanzar o girar.

### 5. ¿Qué es un MDP y qué significa la propiedad de Markov?

**Markov Decision Process** significa proceso de decisión de Markov. Modela estados, acciones, transiciones, recompensas y una distribución inicial. La propiedad de Markov supone que, dado el estado actual y la acción, la distribución de lo que viene después no necesita información adicional de la historia. El estado debe representar suficiente información para que esto sea razonable.

### 6. ¿Qué diferencia hay entre episodio y trayectoria?

Un episodio es un intento completo, desde el inicio hasta una condición terminal. Una trayectoria es el registro de lo ocurrido: estados, acciones y recompensas. Por ejemplo: `(s0, a0, r0, s1, a1, r1, ..., sT)`. El estado `sT` es terminal.

### 7. ¿Qué diferencia hay entre recompensa y retorno?

La recompensa es un puntaje recibido en un paso. El retorno acumula recompensas de varios pasos. Por ejemplo, recompensas `−1, −1, +10` producen retorno total `8` si no hay descuento. Una acción puede dar recompensa inmediata negativa y aun así ser conveniente por sus beneficios futuros.

### 8. ¿Qué es gamma y qué hace el descuento?

`gamma` determina cuánto pesan las recompensas futuras: `G = r0 + gamma*r1 + gamma²*r2 + ...`. Con `gamma = 1` no se descuenta el futuro. Con valores entre 0 y 1, las recompensas más lejanas pesan menos. No es la tasa de aprendizaje: gamma modifica el objetivo; la tasa de aprendizaje modifica el tamaño de la actualización.

### 9. ¿Qué es una política?

Es la regla de comportamiento del agente. Una política determinista selecciona una acción para cada estado. Una política estocástica asigna probabilidades a las acciones. Por ejemplo, en un estado puede asignar 80 % a girar y 20 % a avanzar.

### 10. ¿Cómo se lee pi_theta(a | s)?

Probabilidad de elegir la acción `a` dado el estado `s`, con parámetros `theta`. Si la política es una red neuronal, theta son sus pesos. Cada estado tiene su propia distribución sobre acciones; la política es toda esa familia de distribuciones. En espacios continuos se trabaja con densidades.

## B. DQN, Q y aprendizaje directo de políticas — diapositivas 2–6

### 11. ¿Qué representa Q(s,a)?

El retorno esperado al ejecutar la acción `a` en el estado `s` y continuar siguiendo una política. Incluye consecuencias futuras, no solo la recompensa inmediata. `Q` depende del comportamiento posterior; `Q*` representa el valor de acción óptimo.

### 12. ¿Qué representa V(s) y en qué se diferencia de Q(s,a)?

`V(s)` es el retorno esperado desde un estado siguiendo la política. `Q(s,a)` fija además la primera acción. Para acciones discretas: `V(s) = suma sobre a de pi(a|s)*Q(s,a)`. V evalúa el estado; Q evalúa una acción particular dentro del estado.

### 13. ¿Qué significa argmax?

Devuelve el argumento que produce el mayor valor. Si los valores Q de avanzar, girar y esperar son `−8, 6, 0`, el máximo es `6` y el argmax es **girar**. Al decidir con Q nos interesa la acción, no solamente el número máximo.

### 14. ¿Qué es DQN?

**Deep Q-Network** utiliza una red neuronal para aproximar valores Q. En el caso usual de acciones discretas, recibe un estado y entrega un valor por acción. Aprende a partir de transiciones observadas. La política puede elegir acciones usando esos valores, incorporando exploración durante el entrenamiento.

### 15. ¿Qué es un replay buffer?

Una memoria de experiencias como `(estado, acción, recompensa, siguiente estado)`. DQN muestrea experiencias de esa memoria para entrenar y reutilizar datos. Almacenar y obtener experiencias puede ser costoso. No debe confundirse con el lote reciente que PPO reutiliza unas pocas épocas.

### 16. ¿Por qué aprender directamente la política en lugar de aprender Q primero?

Porque finalmente queremos elegir acciones. El enfoque directo evita usar una estimación Q como paso intermedio para decidir. Además, maximizar Q sobre acciones continuas puede requerir una optimización costosa. Esto motiva policy gradients; no significa que DQN carezca de usos ni que policy gradients siempre necesite menos datos.

## C. Gradiente de política y REINFORCE — diapositivas 3–16

### 17. ¿Qué es J(theta)?

El retorno esperado bajo la política con parámetros theta: `J(theta) = promedio esperado de G(trayectoria)`. Es el objetivo que buscamos maximizar. El promedio contempla la aleatoriedad de las acciones, los estados iniciales y, cuando corresponde, las transiciones del entorno.

### 18. ¿Qué es un gradiente de política?

Es el gradiente del retorno esperado respecto de los parámetros de la política. Indica una dirección local para modificar esos parámetros y mejorar el objetivo. No es la derivada de la acción elegida ni una garantía de mejora en cada muestra: se estima con datos y puede tener ruido.

### 19. ¿Qué significa ascenso por gradiente?

Actualizar `theta ← theta + alpha*gradiente`, donde alpha es la tasa de aprendizaje. El signo positivo busca aumentar J. Los programas suelen minimizar una pérdida equivalente usando descenso; entonces el signo de la pérdida cambia.

### 20. ¿Qué dificultad resuelve el log-derivative trick?

Permite reescribir una derivada de probabilidades usando `grad P = P*grad log P`. Al aplicarlo a las trayectorias, el gradiente del objetivo se convierte en una esperanza que podemos estimar mediante muestreo. El logaritmo también transforma el producto de probabilidades de la trayectoria en una suma.

### 21. ¿Por qué no necesitamos diferenciar el entorno?

La probabilidad de una trayectoria contiene factores de la política y de las transiciones. Si la dinámica del entorno no depende de theta, sus términos desaparecen al derivar el logaritmo respecto de theta. Quedan los gradientes de log-probabilidad de las acciones. Necesitamos experiencias del entorno, pero no un modelo diferenciable de sus transiciones.

### 22. ¿Cuál es la intuición del estimador de gradiente de política?

Multiplicar el retorno de una trayectoria por la suma de los gradientes de log-probabilidad de sus acciones. El gradiente de log-probabilidad indica cómo hacer más probable lo observado, y el retorno pondera ese cambio. Con retornos positivos se refuerzan acciones; con negativos se desfavorecen. Una baseline permite juzgar los resultados respecto de lo esperado.

### 23. ¿Qué es una estimación Monte Carlo?

Aproximar una esperanza usando el promedio de muestras. Aquí se generan episodios y se promedian sus contribuciones al gradiente. No implica enumerar todas las trayectorias. Más muestras suelen reducir el ruido, a cambio de mayor costo.

### 24. ¿Cómo funciona REINFORCE?

Genera un episodio con la política actual, calcula los retornos futuros desde cada paso y actualiza la política usando esos retornos como pesos de los gradientes de log-probabilidad. La presentación muestra una trayectoria por actualización; también se pueden usar lotes de trayectorias.

### 25. ¿Qué es reward-to-go y por qué se utiliza?

Es el retorno desde una acción hacia el futuro: `G_t = r_t + gamma*r_(t+1) + ...`. No incluye recompensas anteriores porque la acción no puede causarlas. Ayuda a asignar la señal de aprendizaje a decisiones temporalmente relevantes. No identifica perfectamente qué acción causó cada resultado futuro.

### 26. ¿Cómo se implementa la idea con una pérdida parecida a entropía cruzada?

Se utiliza una pérdida del tipo `L = −promedio(G_t * log pi_theta(a_t|s_t))`. El estado funciona como entrada, la acción muestreada ocupa el lugar de la etiqueta y G_t es su peso. Los retornos se tratan como constantes durante el gradiente del actor. Es una pérdida sustituta para obtener la dirección de actualización; su valor no es el retorno esperado real. La PPT presenta esta forma simplificada; la ponderación temporal exacta depende de la convención del objetivo descontado.

### 27. ¿Qué significa on-policy y por qué importa?

Que las muestras corresponden a la política que se optimiza. Si cambiamos la política, los datos antiguos ya no siguen exactamente la nueva distribución. Usarlos sin corrección puede producir estimaciones incorrectas. REINFORCE básico requiere nuevos datos para cada nueva política.

### 28. ¿Qué es la alta varianza en REINFORCE?

Que diferentes muestras pueden producir gradientes muy distintos. Una trayectoria mezcla decisiones, suerte y consecuencias posteriores. Con pocas muestras, una acción puede recibir una señal fuerte que no refleja bien su calidad promedio. El estimador puede ser correcto en promedio y aun así ser muy ruidoso.

## D. Reutilización, baseline y actor-crítico — diapositivas 17–24

### 29. ¿Qué hace importance sampling?

Corrige el uso de muestras obtenidas de otra distribución mediante cocientes de probabilidades. Para una trayectoria, el peso exacto es su probabilidad bajo la política actual dividida por su probabilidad bajo la política que la generó. Requiere que esa política pueda generar los eventos relevantes para la actual.

### 30. ¿Por qué el producto de cocientes de toda la trayectoria es problemático?

Muchos factores pueden producir pesos extremos. Por ejemplo, `1.02^100` es aproximadamente `7.2`, mientras `0.98^100` es aproximadamente `0.13`. Unas pocas trayectorias pueden dominar la estimación. La PPT usa una aproximación con un cociente por paso que resulta útil cerca de la política anterior; no es una corrección exacta de todos los cambios en la distribución de estados.

### 31. ¿Qué es una baseline?

Un nivel de referencia que se resta al retorno para evaluar si un resultado fue mejor o peor de lo esperado. No modifica las recompensas del entorno: modifica el peso usado para actualizar el actor. Una baseline adecuada puede reducir la varianza.

### 32. ¿Qué es la ventaja?

Conceptualmente, `A(s,a) = Q(s,a) − V(s)`. Con un retorno muestreado podemos estimarla como `A_t = G_t − V(s_t)`. Positiva significa mejor de lo esperado; negativa, peor; cero, igual. El retorno observado es una muestra, por lo que esa evaluación puede ser ruidosa.

### 33. ¿Cómo puede un retorno positivo producir una ventaja negativa?

Si el retorno observado es 100 y la referencia es 101, la ventaja es `−1`. El resultado es positivo en términos absolutos pero inferior a lo esperado. Esta distinción evita reforzar fuertemente cualquier acción solo porque la escala de recompensas es positiva.

### 34. ¿Por qué restar una baseline no cambia el gradiente esperado bajo las condiciones indicadas?

Para un estado fijo, el promedio de `b(s)*grad log pi(a|s)` sobre las acciones es cero. Esto ocurre porque b(s) no depende de la acción y las probabilidades de todas las acciones suman 1, cuya derivada es cero. La baseline se trata como constante al calcular el gradiente del actor. Una baseline arbitraria no garantiza reducir la varianza; debe ser adecuada.

### 35. ¿Qué hacen el actor y el crítico?

El actor es la política que elige acciones. El crítico estima V(s), el retorno esperado desde cada estado. El actor usa la diferencia entre retorno y predicción para obtener una ventaja. El crítico aprende reduciendo un error como `(V_predicho − G_t)²`. El crítico evalúa; no selecciona directamente el siguiente token o acción.

## E. PPO — diapositivas 25–28

### 36. ¿Qué significa PPO y qué problema aborda?

**Proximal Policy Optimization** significa optimización proximal de políticas. Busca actualizaciones útiles sin cambios demasiado bruscos respecto de la política que generó los datos. Combina ventajas y un objetivo con clipping. Puede entrenar varias épocas sobre un lote reciente y después recoger experiencias nuevas.

### 37. ¿Qué es el ratio de PPO?

`ratio_t = pi_actual(a_t|s_t) / pi_anterior(a_t|s_t)`. Compara la probabilidad de la misma acción en el mismo estado. Un ratio de 1 significa que no cambió; 1.5 significa un aumento relativo de 50 %, no de 50 puntos porcentuales. La PPT también llama r_t(theta) a este ratio: no confundirlo con una recompensa.

### 38. ¿Cómo funciona el clipping?

El objetivo por muestra toma el mínimo entre `ratio*A` y `clip(ratio, 1−epsilon, 1+epsilon)*A`. Se maximiza ese objetivo. Para ventaja positiva elimina el incentivo a aumentar demasiado el ratio. Para ventaja negativa elimina el incentivo a reducirlo demasiado. El mínimo conserva una evaluación conservadora del cambio propuesto.

### 39. ¿El clipping garantiza que las probabilidades queden dentro del intervalo?

No. El intervalo se aplica al ratio dentro del objetivo; no es una restricción rígida sobre cada probabilidad de la red. Los parámetros compartidos y otras muestras pueden producir cambios fuera de ese rango. La descripción correcta es que PPO limita ciertos incentivos a cambios excesivos.

### 40. ¿Cuál es el procedimiento de PPO y cómo se diferencia de REINFORCE básico?

Recoger un lote con una política congelada como anterior, estimar retornos y ventajas, entrenar actor y crítico durante K épocas sobre ese lote y repetir con datos nuevos. Frente a REINFORCE básico, incorpora una referencia aprendida para reducir varianza, reutilización limitada del lote y un objetivo que modera cambios. PPO suele clasificarse como on-policy pese a esa reutilización local; no utiliza libremente un replay buffer histórico.

## F. LLM y GRPO — diapositivas 29–36

### 41. ¿Cómo se representa un LLM como un problema de RL?

El estado es el prompt junto con los tokens generados. La acción es el siguiente token. La política es su distribución de probabilidades. La transición añade el token al contexto. El episodio termina al completar la respuesta y entonces puede recibirse una recompensa. En generación simple la transición es determinista; interacciones con herramientas o diálogo pueden añadir dinámica externa.

### 42. ¿Qué son token y softmax?

Un token es una unidad del texto, como una palabra, parte de ella o un signo. El modelo produce puntuaciones llamadas logits para los tokens posibles. Softmax transforma esos logits en probabilidades positivas que suman 1. Muestrear un token de esa distribución es ejecutar una acción de la política.

### 43. ¿De dónde sale la recompensa de un LLM?

Puede venir de un verificador, de pruebas automáticas o de un modelo de recompensa. Por ejemplo: respuesta matemática correcta o código que pasa tests. En el escenario central de la PPT se evalúa la respuesta completa al final. Un modelo de recompensa evalúa la salida; un crítico estima el retorno futuro desde un estado. No son lo mismo.

### 44. ¿Por qué puede ser costoso un crítico en un LLM?

Puede ser una red grande que requiere memoria y entrenamiento adicionales. Además, debe aprender a predecir el resultado final desde prefijos parciales aunque la señal llegue al terminar. El costo exacto depende de la arquitectura; no es una duplicación universal y exacta de todos los recursos del entrenamiento.

### 45. ¿Qué significa GRPO y cuál es su idea central?

**Group Relative Policy Optimization** significa optimización de políticas relativa a un grupo. Genera varias respuestas para el mismo prompt y compara sus recompensas. Construye la referencia mediante esas muestras en lugar de entrenar un crítico. Conserva la maquinaria de ratios y clipping de PPO.

### 46. ¿Cómo se calcula la ventaja de GRPO en la presentación?

`A_i = (recompensa_i − media del grupo) / desviación estándar del grupo`. La comparación es entre respuestas al mismo prompt, no entre preguntas arbitrarias. Una respuesta sobre la media tiene ventaja positiva. En esta formulación, todos sus tokens reciben la misma ventaja.

### 47. ¿Qué modelos debemos distinguir durante GRPO?

- **Actual:** recibe las actualizaciones.
- **Anterior:** generó el lote y proporciona el denominador del ratio; permanece fijo durante su reutilización.
- **Referencia:** modelo fijo que actúa como ancla para la penalización KL.

Al inicio pueden coincidir, pero cumplen funciones distintas. El modelo anterior se renueva entre lotes; la referencia se mantiene fija en el esquema presentado.

### 48. ¿Qué es SFT y por qué aparece antes de GRPO?

**Supervised Fine-Tuning** es ajuste fino supervisado con ejemplos de entradas y respuestas deseadas. En la PPT, GRPO parte de ese modelo en lugar de aprender lenguaje desde cero. Se conserva una copia congelada como referencia. El objetivo es mejorar el comportamiento mediante recompensas sobre una capacidad lingüística ya aprendida.

### 49. ¿Qué es la divergencia KL y para qué se penaliza?

La divergencia de Kullback–Leibler cuantifica una diferencia entre distribuciones de probabilidades; no es una distancia simétrica. La penalización desalienta que la política actual se aleje del modelo de referencia. Su peso beta controla la intensidad de esa presión. Busca moderar degradación o explotación de la recompensa, sin garantizar evitarlas.

### 50. ¿En qué se diferencian clipping y KL?

Clipping compara la política actual con la anterior para moderar actualizaciones sobre el lote. La KL de la PPT compara la actual con una referencia fija para moderar la desviación acumulada. No son intercambiables. PPO para RLHF también puede incorporar una penalización KL; no es exclusiva de GRPO.

### 51. ¿Cuál es el procedimiento completo de GRPO?

Partir de un modelo SFT y fijar la referencia. Copiar la política actual como política anterior. Muestrear prompts y varias respuestas por prompt con esa política anterior. Puntuar las respuestas y calcular ventajas grupales. Entrenar durante K épocas con ratios, clipping y penalización KL. Repetir con nuevos lotes. No se entrena un crítico separado.

### 52. ¿Qué gana y qué pierde GRPO respecto de PPO con crítico?

Elimina el entrenamiento del crítico y su costo asociado, pero necesita generar varias respuestas por prompt. Usa una evaluación relativa por respuesta, menos específica sobre la contribución de cada token. El costo se desplaza parcialmente hacia generación y evaluación. No significa que el entrenamiento sea gratis ni que su memoria total siempre se reduzca exactamente a la mitad.

## G. Limitaciones y variantes — diapositivas 35–37

### 53. ¿Qué ocurre si todas las respuestas del grupo reciben la misma recompensa?

No hay diferencias relativas para favorecer una sobre otra. Además, la desviación estándar es cero, así que la fórmula sin protección es indefinida. Una implementación debe manejarlo, por ejemplo con estabilización numérica y ventajas cero. El grupo no aporta señal de política por ventaja; una penalización KL separada todavía puede aportar señal. La PPT menciona remuestreo de grupos informativos.

### 54. ¿Por qué la baseline grupal introduce sesgo y qué hace RLOO?

El promedio contiene la recompensa de la propia respuesta evaluada, por lo que no es independiente de esa muestra. **RLOO**, leave-one-out, calcula la referencia con las otras respuestas. Eso corrige la dependencia de esa baseline en el estimador correspondiente. No vuelve automáticamente insesgadas todas las demás aproximaciones, normalizaciones o mecanismos de clipping.

### 55. ¿Qué problemas pueden introducir la desviación estándar y la normalización por longitud?

Dividir por la desviación estándar cambia el peso relativo de las preguntas: diferencias pequeñas dentro de un grupo poco variable pueden amplificarse. Promediar por longitud hace que cada token de una respuesta larga pese menos que uno de una corta. Ambas decisiones pueden introducir efectos o sesgos no deseados. Son decisiones del objetivo, no detalles meramente cosméticos.

### 56. ¿Qué modifican Dr. GRPO, DAPO y GSPO según la presentación?

- **Dr. GRPO:** elimina el escalado por desviación estándar y modifica la normalización por longitud.
- **DAPO:** modifica los límites de clipping, usa muestreo dinámico y una pérdida normalizada por tokens; el esquema resumido no usa KL.
- **GSPO:** utiliza un ratio definido a nivel de secuencia en lugar del ratio por token.

La última diapositiva presenta estas variantes como extensiones del mismo marco de gradiente de política.

## H. Ejercicios cortos con solución

### 57. Un episodio entrega −1, −1 y +10. ¿Cuál es el retorno inicial con gamma = 1? ¿Y con gamma = 0.9?

Con gamma 1: `−1 −1 +10 = 8`. Con gamma 0.9: `−1 + 0.9*(−1) + 0.9²*10 = 6.2`. El descuento reduce el peso de la recompensa final.

### 58. Con recompensas −1, −1 y +10, ¿cuál es el reward-to-go en cada paso sin descuento?

Desde el primero: `8`. Desde el segundo: `9`. Desde el tercero: `10`. Una acción posterior no recibe el peso de recompensas anteriores a ella.

### 59. Un crítico predice 7 y el retorno observado es 4. ¿Cuál es la ventaja estimada?

`A = 4 − 7 = −3`. El resultado fue peor de lo esperado, aunque el retorno sea positivo. La actualización del actor tiende a desfavorecer la acción observada.

### 60. Una acción pasa de probabilidad 0.2 a 0.3. ¿Cuál es el ratio de PPO?

`0.3 / 0.2 = 1.5`. Es un aumento relativo de 50 %, o de 10 puntos porcentuales en probabilidad. Son dos maneras distintas de expresar el cambio.

### 61. Si A = 2, ratio = 1.5 y epsilon = 0.2, ¿cuánto vale el objetivo recortado por muestra?

Sin recorte: `1.5*2 = 3`. Con recorte: `1.2*2 = 2.4`. El mínimo es `2.4`. Para esta muestra, superar el umbral favorable no aumenta el objetivo.

### 62. Si A = −2, ratio = 0.5 y epsilon = 0.2, ¿cuánto vale el objetivo recortado?

Sin recorte: `0.5*(−2) = −1`. Con recorte: `0.8*(−2) = −1.6`. El mínimo es `−1.6`. Como maximizamos, reducir aún más el ratio no sigue mejorando la contribución de esta muestra.

### 63. Un grupo tiene recompensas 0, 0, 1 y 1. ¿Qué ventajas produce GRPO?

La media es `0.5`. Usando desviación estándar poblacional, la desviación es `0.5`. Las ventajas normalizadas son `−1, −1, +1, +1`. Con una convención muestral de desviación estándar cambia la magnitud, pero no los signos. Las respuestas mejores que el promedio se favorecen.

### 64. Si una respuesta obtiene ventaja positiva, ¿significa que todos sus tokens eran correctos?

No. Significa que la respuesta completa recibió una evaluación favorable respecto del grupo. Al asignar la misma ventaja a sus tokens, el algoritmo puede reforzar partes que no fueron responsables del éxito. Este es un problema de asignación de crédito.

## Repaso final sin respuestas

1. Explica recompensa, retorno, V, Q, política y ventaja sin usar una definición circular.
2. Explica cómo se puede aprender aunque la recompensa no sea diferenciable.
3. Describe una iteración de REINFORCE, PPO y GRPO.
4. Explica por qué retorno positivo no implica ventaja positiva.
5. Distingue modelo de recompensa, crítico, política anterior y referencia.
6. Explica qué problema resuelven baseline, importance sampling, clipping y KL.
7. Explica qué ocurre cuando un grupo GRPO tiene recompensas idénticas.
8. Describe el intercambio entre costo del crítico y costo de generar varias respuestas.
