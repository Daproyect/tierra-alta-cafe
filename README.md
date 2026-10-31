# Tierra Alta Café — Taller SDD (Diseño de Sistemas · ITM)

Landing page interactiva de una tienda de café de origen local de Antioquia, desarrollada con **Spec-Driven Development** asistido por IA. Marca y productos ficticios.

**Sitio desplegado:** https://tierra-alta-cafe.onrender.com
**Repositorio:** https://github.com/Daproyect/tierra-alta-cafe

**Stack:** Astro 5 · Tailwind CSS 4 · TypeScript.

## Documentación SDD (carpeta `sdd/`)
0. [Constitución](sdd/00-constitucion.md) — principios y stack
1. [Especificación](sdd/01-especificacion.md) — requisitos y criterios
2. [Clarificación](sdd/02-clarificacion.md) — ambigüedades resueltas
3. [Plan técnico](sdd/03-plan-tecnico.md) — arquitectura y decisiones
4. [Tareas](sdd/04-tareas.md) — descomposición
5. [Verificación](sdd/05-verificacion.md) — pruebas contra los requisitos

## Ejecutar
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

## Despliegue
Desplegado como *Static Site* en Render (plataforma gratuita): rama `main`, Build Command `npm install && npm run build`, Publish Directory `dist`. También funciona en Vercel, Netlify o Cloudflare Pages.

## Proceso con IA (Claude Code)
El proyecto se desarrolló por fases, con un documento por fase en `sdd/`. Cada fase quedó escrita en un documento, y el código se construyó a partir de esos documentos para no perder la especificación original entre correcciones.

| Fase | Qué se le pidió a la IA | Resultado |
|------|-------------------------|-----------|
| Decisiones | Se eligió el escenario **tienda de café de origen local** y el uso de las fases de **Spec Kit**. | Alcance fijado en `sdd/00` y `sdd/02`. |
| Constitución, especificación, clarificación | Redactar principios, requisitos con ID (RF/RNF) y ambigüedades resueltas. | `sdd/00` a `sdd/02`. |
| Plan y tareas | Definir arquitectura (Astro + Tailwind, `localStorage`) y descomponer en tareas T01–T17. | `sdd/03` y `sdd/04`. |
| Implementación | Construir los componentes y la lógica del carrito y el formulario siguiendo el plan. | Código en `src/`. |
| Verificación | Probar cada requisito en el navegador y pasar revisiones independientes de código y de seguridad. | `sdd/05`, con las correcciones aplicadas. |
