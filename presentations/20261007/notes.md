pregunta central: no encontro lo necesario o no supo aprovecharlo ?

autores reconocen -> info relacionada a la pregunta 
		  -> informacion suficiente para resolverla
		  
la PRINCIPAL CONTRIBUCION -> definicion explicita de SUFICIENCIA y su uso para analizar resultados

## definicion de sufficient context

un contexto es suficiente cuando permite construir una respuesta plausible a la pregunta a partir de la info disponible 

matix importante -> suficiente no significa verdadero

la suficiencia evalua si los textos permiten responder, no verifica que describan correctametne el mundo

## sufficient context auto rater

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

















