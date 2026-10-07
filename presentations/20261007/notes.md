pregunta central: no encontro lo necesario o no supo aprovecharlo ?

autores reconocen -> info relacionada a la pregunta 
		  -> informacion suficiente para resolverla
		  
la PRINCIPAL CONTRIBUCION -> definicion explicita de SUFICIENCIA y su uso para analizar resultados


### intro

comportamiento indeseados de RAG
1- respuesta incorrecta con info recuperada incorrecta
2.- distraccion por info no relacionada
3.- falla en la extracion apropiada de respuestas de trozos de texto largo

1 major contribution, 2 categories para instancias basados en que si el contexto provee info suficiente para construir una respuesta para la query, sin contener una respuesta  explicitamente valida

sufficient vs insufficient

autorater -> model que evalua instancia basados en un propiedad, como el sufficient context autorater



## definicion de sufficient context

un contexto es suficiente cuando permite construir una respuesta plausible a la pregunta a partir de la info disponible 

matix importante -> suficiente no significa verdadero

la suficiencia evalua si los textos permiten responder, no verifica que describan correctametne el mundo

## sufficient context auto rater

“Ya definimos qué es sufficient context. ¿Pero cómo etiquetamos muchos ejemplos sin hacerlo manualmente uno por uno?”
Un **autorater** es simplemente otro modelo usado como evaluador.

> “¿Podemos confiar razonablemente en un modelo para etiquetar sufficiency?”

La respuesta del paper es: sí, al menos en este conjunto desafiante, Gemini 1.5 Pro con 1 ejemplo en el prompt logra **93% accuracy**.

summary :
“Después de definir qué significa que un contexto sea suficiente, los autores necesitaban etiquetar muchos pares pregunta-contexto. Para eso probaron si un modelo podía actuar como evaluador automático: recibe una pregunta y su contexto, y responde si ese contexto alcanza o no para contestar. Lo validaron contra 115 ejemplos etiquetados por humanos. El mejor evaluador fue Gemini 1.5 Pro con un ejemplo en el prompt, que alcanzó 93% de exactitud. Con eso, lo usaron después para analizar datasets más grandes.”

“La gracia es que el evaluador no necesita conocer la respuesta correcta; solo mira pregunta y contexto.”

prueban un evaluador automatico, es decir, otro modelo revisa si la info alcanza 


# New Lens on RAG performance

benchmark datasets have high sufficient context ? 

3 conjuntos tope 6000 tokens:
1 freshqa , contexto suf 77.4%
2 hotpoqa , 46.2%
3 musique-ans 44.6%

* aumentar de 6000 a 10000 tokens no cambia los porcentajes 

## initial findings based on sufficient context

3 tipos de clasificaciones, correctas - abstenciones - alucinaciones

alucinacion : respuesta juzgada incorrecta no necesariamente historial totalmente inventada

- RAG mejora el rendimiento general, pero los modelos siguen fallando con contexto suficiente,
- en contexto insuficiente siguen cometiendo erroes en lugar de abstenerse
- modelos de mayor rendimiento aprovechan mejor la info disponible

## qualitatively analyzing respones with insufficient context 

resultado mas contraintuitivo -> info insuficiente puede seguir siendo util, el modelo puede completar un dato con conocimiento aprendido, aprovechar una pista o acertar una pregunta con pocas opciones

el paper reporta 35-62% de aciertos con contexto insuficiente en los escenarios destacados, y estudia casos donde el modelo falla sin documentos pero acierta con info incompleta 

No basta con una regla rígida como “si el contexto es insuficiente, siempre abstenerse”.

“Pero aparece un giro interesante: un contexto insuficiente puede seguir siendo útil. Puede no contener toda la respuesta, pero sí una pista que el modelo combina con conocimiento previo. Por eso la solución no es simplemente bloquear toda respuesta cuando el contexto no alcanza; hay que decidir con más señales.”

Contexto insuficiente ≠ contexto inútil

Un modelo puede acertar con contexto insuficiente porque:

- ya sabía la respuesta por entrenamiento,
- el contexto le dio una pista parcial,
- la pregunta tenía pocas alternativas,
- el contexto ayudó a desambiguar,
- o hubo error del evaluador.

# Techniques to reduce hallucinations with RAG

## selective rag using sufficient context signal

una regla como "si falta info no respondas" descartaria aciertos

la propuesta combina suficiencia del contexto con confianza declarada por el modelo 
un clasificador sencillo, una reg log aprende a combinar ambas señales, un umbral determina que respuestas se entregan y cuales se retienen

2 metricas inseparables: 
cobertura: proporcion de consultas q reciben respuesta
exactitud selecgiva: proporcion correcta entre las respuestas entregadas, 

frente a usar solo confianza, añadir suficiencia mejora ese equilibrio en varios experimentos, especialmente hotpoqa 


## fine tuning

entrenanr mistral 7b instruct v0.3 con ejemplos donde la respuesta se reemplaza por no lo se, no consigue una estrategia fiable para reducir errores

musique rag sin ese ajuste alcanza 28.8% de correctas 59.4% incorrectas, el ajuste con respuestas originales aumenta a 31.4% e incorectas a 68.8%, añadir ejemplos de no lo se tampoco supera de forma consistente al rag sin ajuste, 

enseñar a abstenerse puede alterar otros comportamientos

# Conclusion

aporte central es una forma de observar y diagnosticar RAG, distinguir si la ecvidencia alcanzaba antes de interpretar el exito o fracaso del modelo 

















