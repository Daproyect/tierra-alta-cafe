# Fase 3 — Plan técnico (cómo)

## Arquitectura
Sitio estático generado con Astro. Una sola página (`src/pages/index.astro`) compuesta por componentes `.astro`. La interactividad vive en un único módulo TypeScript (`src/scripts/shop.ts`) cargado en el cliente.

```
src/
  data/products.json      # catálogo y municipios (contenido como datos)
  layouts/Base.astro      # <head>, SEO, fuentes, estilos globales
  components/
    Header.astro          # RF-01
    Hero.astro            # RF-02
    Catalog.astro         # RF-03, RF-04, RF-05
    Origin.astro          # RF-07
    Order.astro           # RF-08, RF-09, RF-10, RF-12
    Footer.astro
    CartFab.astro         # RF-06
    BeanArt.astro         # ilustración SVG reutilizable
  scripts/shop.ts         # estado del carrito, filtro, validación, localStorage
  styles/global.css       # Tailwind + tema (colores y tipografía)
```

## Decisiones
- **Tailwind CSS 4** con tema propio (`@theme`): paleta tierra/café/crema/verde cafetal.
- **Estado:** objeto `{ [productId]: qty }` en `localStorage` (clave `tac:cart`); pedidos en `tac:orders`.
- **Render del carrito:** el JS pinta el resumen a partir de `products.json` incrustado como `data-*`/JSON en el HTML, sin framework.
- **Validación:** API de validación de HTML5 + reglas propias (correo/teléfono) con mensajes en `aria-live`.
- **Seguridad:** todo texto del usuario se inserta con `textContent`, nunca con `innerHTML`.
- **Despliegue:** `npm run build` → carpeta `dist/` → Vercel (framework Astro detectado automáticamente).

## Trazabilidad requisito → componente
Ver la columna de comentarios en cada componente; la matriz final está en `05-verificacion.md`.
