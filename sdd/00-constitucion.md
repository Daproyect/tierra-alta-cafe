# Fase 0 — Constitución del proyecto

Principios que guían todas las decisiones y que la IA debe respetar en cada fase.

1. **La especificación manda.** Ningún código se escribe sin estar respaldado por un requisito de `01-especificacion.md`. Si el código y la especificación difieren, se corrige la especificación primero.
2. **Simplicidad.** Sitio estático con Astro y Tailwind CSS. Cero dependencias de runtime innecesarias; el JavaScript del cliente solo existe donde hay interacción.
3. **Responsivo primero (mobile-first).** Todo debe verse y usarse bien desde 360 px de ancho.
4. **Accesibilidad básica.** HTML semántico, contraste suficiente, foco visible, etiquetas en formularios, `alt` en imágenes, navegación por teclado.
5. **Sin datos falsos presentados como reales.** Marca, productos y precios son ficticios; el pedido es simulado y se guarda solo en el navegador (`localStorage`). No se recogen pagos ni datos sensibles.
6. **Contenido como datos.** Los productos viven en `src/data/products.json`, no dentro del HTML.
7. **Verificable.** Cada requisito tiene un criterio de aceptación comprobable (ver `05-verificacion.md`).
8. **Control de contexto con la IA.** Se trabaja por fases, con un documento por fase. El código se construye a partir de esos documentos, de modo que la especificación original no se pierde entre correcciones.

## Stack
- Astro 5 + Tailwind CSS 4 (plugin de Vite).
- TypeScript para la lógica del cliente.
- Despliegue estático en Vercel (u otra plataforma gratuita).
