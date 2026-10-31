# Fase 2 — Clarificación (ambigüedades resueltas)

Preguntas que surgieron al revisar la especificación y la decisión tomada antes de planear.

| # | Pregunta | Decisión |
|---|----------|----------|
| 1 | ¿Hay backend o base de datos para los pedidos? | No. El taller pide un frontend/landing; los pedidos se guardan en `localStorage` y se dice claramente que son simulados. (Lección de la clase: la persistencia se debe especificar desde el inicio; aquí se declara su alcance.) |
| 2 | ¿Se cobra en línea? | No. Solo se registra el pedido; el pago sería contraentrega y el texto lo aclara. |
| 3 | ¿Imágenes reales? | No. Se usan ilustraciones SVG propias para evitar derechos de autor y mantener la página liviana. |
| 4 | ¿Moneda y formato de precios? | Pesos colombianos, formato `es-CO` (por ejemplo, $38.000). |
| 5 | ¿Idioma? | Español de Colombia. |
| 6 | ¿Qué se considera pedido válido? | Al menos un producto y todos los campos obligatorios correctos. |
| 7 | ¿Las marcas y municipios son reales? | La marca y los productos son ficticios; los municipios cafeteros (Jardín, Urrao, Andes, Támesis, Venecia, Salgar) son reales, con datos de altura aproximados y descriptivos, no cifras certificadas. |
| 8 | ¿Se necesita modo oscuro? | No (fuera de alcance). |
