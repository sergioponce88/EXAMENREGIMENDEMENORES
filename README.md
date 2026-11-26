# Evaluación de aplicación · Régimen Penal Juvenil (Ley 27.801 · Ley 10.011 · CPP Tucumán)

- **Examen para oficiales sumariantes:** `index.html`. Son 4 casos que avanzan paso a paso, con 5 decisiones del responsable de la causa en cada uno, sobre situaciones que en la práctica generan dudas o debate (padres ausentes, el adolescente que quiere hablar, celular, reconocimiento, CAD sin lugar, entrega a los padres, arreglos, parte de prensa, fichas, abogado, edad límite, menor de 14, lesiones, sujeción, traslado, comunicación al juez, órdenes telefónicas, efectos, medidas incumplidas y elevación). La respuesta correcta nunca es la opción más larga. Los casos van en orden y las opciones se mezclan para cada evaluado.
- **Examen para suboficiales:** `suboficiales.html`. Tiene 20 situaciones de servicio. El orden de las preguntas y de las opciones se mezcla para cada evaluado.
- Los dos exámenes envían a la misma planilla. En el monitor se distinguen por jerarquía y por el detalle de cada pregunta (las del examen de oficiales empiezan con C1 a C4).
- En los dos: Salir de la pantalla anula la pregunta en curso. La nota va de 1 a 10.
- **Monitor docente:** `monitor.html`. Se entra con clave. Muestra los resultados en vivo, cada 20 segundos: KPIs, distribución de notas, situaciones más falladas, filtros y CSV.

## Activar el monitor (una sola vez)
1. Abrir la planilla de resultados y entrar a Extensiones > Apps Script.
2. Reemplazar el código por `apps-script/Codigo.gs` y cambiar `CLAVE_DOCENTES`.
3. Ir a Implementar > Gestionar implementaciones > Editar (lápiz) > Versión: **Nueva versión** > Implementar. Así la URL no cambia.
