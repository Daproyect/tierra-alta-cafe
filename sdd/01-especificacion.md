# Fase 1 — Especificación (qué y por qué)

**Producto:** Tierra Alta Café — landing page de una tienda de café de origen local de Antioquia (marca ficticia).

## Objetivo
Permitir a un visitante conocer el café, entender de dónde viene y dejar un pedido simulado, todo desde una sola página.

## Usuarios
- **Comprador curioso (móvil, 70 %):** quiere ver qué hay, cuánto cuesta y pedir rápido.
- **Aficionado al café:** quiere saber origen, altura, proceso y notas de cata.

## Historias de usuario y requisitos

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| RF-01 | La página tiene una cabecera fija con navegación a Catálogo, Origen y Pedido; en móvil se muestra como menú desplegable. | Alta |
| RF-02 | Un *hero* presenta la marca y un botón que lleva al catálogo. | Alta |
| RF-03 | El catálogo muestra al menos 6 productos con nombre, municipio de origen, notas de cata, tostión, peso y precio en COP. | Alta |
| RF-04 | El catálogo se puede filtrar por tostión (Todas, Clara, Media, Oscura). | Media |
| RF-05 | Cada producto tiene un botón "Agregar" que lo suma al pedido; se puede aumentar, disminuir y quitar. | Alta |
| RF-06 | Un indicador flotante muestra la cantidad de ítems del pedido y lleva a la sección Pedido. | Media |
| RF-07 | La sección Origen explica el proceso (cultivo, beneficio, secado, tostión) y presenta los municipios de origen con altura y proceso. | Alta |
| RF-08 | La sección Pedido muestra el resumen del carrito con total y un formulario: nombre, correo o teléfono, ciudad, dirección y notas. | Alta |
| RF-09 | El formulario valida campos obligatorios y formato de correo o teléfono (7 a 10 dígitos, con o sin +57) antes de enviar, con mensajes claros. | Alta |
| RF-10 | Al enviar, se muestra una confirmación con número de pedido y el pedido queda guardado en `localStorage` (persistencia simulada), solo con primer nombre, ciudad, productos y total (sin dirección ni contacto). | Alta |
| RF-11 | El carrito persiste al recargar la página. | Media |
| RF-12 | Se listan los "pedidos recientes" guardados en el navegador. | Baja |

## Requisitos no funcionales
- RNF-01 Responsivo desde 360 px hasta escritorio.
- RNF-02 Accesible (ver constitución, principio 4).
- RNF-03 Carga rápida: sin imágenes pesadas; ilustraciones en SVG.
- RNF-04 Desplegable como sitio estático.

## Fuera de alcance
Pagos reales, cuentas de usuario, backend, envío de correos.

## Criterios de aceptación (resumen)
Cada RF se comprueba en `05-verificacion.md`.
