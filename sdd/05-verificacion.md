# Fase 6 — Verificación

Pruebas ejecutadas en el navegador contra `npm run dev` (Astro) y compilación con `npm run build` sin errores.

| Requisito | Prueba | Resultado |
|-----------|--------|-----------|
| RF-01 | Navegación fija con enlaces a Catálogo/Origen/Pedido; menú móvil con `aria-expanded` | Cumple (vista de escritorio y de ancho móvil revisadas) |
| RF-02 | Hero con dos botones de acción | Cumple |
| RF-03 | 6 tarjetas con nombre, municipio, notas, tostión, peso y precio en COP | Cumple (6 tarjetas) |
| RF-04 | Filtro: "Oscura" muestra 2, "Todas" muestra 6 | Cumple |
| RF-05 | Agregar 2× Jardín Honey + 1× Urrao Lavado; botones + y − en el resumen | Cumple (total $ 111.000) |
| RF-06 | Indicador flotante muestra 3 y luego 0 tras enviar el pedido | Cumple |
| RF-07 | Sección Origen con 4 pasos y 6 municipios | Cumple |
| RF-08 | Resumen con total y formulario con 5 campos | Cumple |
| RF-09 | Envío vacío, contacto inválido ("abc") y carrito vacío muestran mensajes específicos | Cumple |
| RF-10 | Pedido válido muestra número `TA-XXXXXX` y se guarda en `tac:orders` | Cumple |
| RF-11 | `tac:cart` guarda el carrito en cada cambio | Cumple (tras recargar la página el carrito conserva 2 unidades y el total $ 88.000) |
| RF-12 | El pedido enviado aparece en "Pedidos recientes" | Cumple |
| RNF-01 | Revisado a ~440 px y ~1280 px | Cumple (no se probó en dispositivos reales) |
| RNF-02 | Etiquetas en formularios, foco visible, `aria-live`/`role` en mensajes, enlace "Saltar al contenido" | Cumple a nivel básico; no se corrió una auditoría automática (Lighthouse/axe) |
| RNF-04 | `npm run build` genera `dist/` estático | Cumple |

## Revisión posterior (código y seguridad) y correcciones
Se revisó el código con dos revisiones independientes y se corrigió lo siguiente, verificado luego en el navegador:
- Botón "Agregar" ya no queda fijo en "¡Agregado!" con doble clic.
- Con carrito vacío y campos inválidos se muestra un solo aviso y el foco va al primer campo con error.
- Teléfono: acepta 7–10 dígitos con o sin +57 y separadores; los correos con espacios se rechazan.
- El indicador flotante anuncia la cantidad (`aria-label` dinámico) y el filtro anuncia cuántos cafés se muestran.
- El menú móvil se cierra con Escape y al ampliar la ventana.
- Un historial corrupto en `localStorage` se descarta en vez de romper la página.
- Solo se guarda el primer nombre y la ciudad del pedido, con aviso en pantalla.

Pendiente a futuro (no bloqueante): alojar las fuentes en el propio sitio y añadir una política CSP; medir el contraste del texto secundario con una herramienta.

## Seguridad y privacidad
- Los textos del usuario se escriben con `textContent`, no con `innerHTML`.
- En `localStorage` solo se guarda primer nombre, ciudad, productos y total; **no** se guarda dirección ni contacto.
- No hay llamadas a servidores propios; solo se cargan fuentes de Google Fonts.

## Limitaciones conocidas
- Pedido simulado: no hay backend ni correo.
- Marca, productos y precios son ficticios.
- Desplegado en Render; se comprobó que el sitio publicado carga, muestra 6 productos y el carrito responde.
