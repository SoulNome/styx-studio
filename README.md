# Styx Studio

Sitio web de una sola página (*landing*) para un estudio de desarrollo, con una
estética oscura y cinematográfica: *"Where Code Meets the Eternal"*.

Lo hice con **HTML, CSS y JavaScript puro**, sin frameworks, cuidando el
rendimiento y la experiencia visual: fondo animado con WebGL, cursor
personalizado y animaciones al hacer scroll.

## Lo que incluye

- Fondo animado en **WebGL** (`js/webgl-bg.js`).
- **Cursor personalizado** interactivo (`js/cursor.js`).
- Animaciones de entrada por sección al hacer scroll (`js/animations.js`).
- CSS organizado por piezas (variables, nav, hero, secciones, footer) en vez de
  un solo archivo gigante.
- Diseño responsive.

## Estructura

```
index.html        página principal
css/
  variables.css   colores y tokens de diseño
  base.css        estilos base
  nav.css         navegación
  hero.css        sección principal
  sections.css    secciones de contenido
  footer.css      pie de página
js/
  webgl-bg.js     fondo animado
  cursor.js       cursor personalizado
  animations.js   animaciones al scroll
  ui.js           interacciones de interfaz
logo.html         prueba del logo
```

## Cómo verlo

Al ser un sitio estático, basta con abrir `index.html` en el navegador, o
servirlo localmente:

```bash
python -m http.server 8000
# abrir http://localhost:8000
```

## Stack

HTML5 · CSS3 · JavaScript (vanilla) · WebGL
