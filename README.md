# Giunti Psychometrics · Catálogo de tests y cursos (Versión A · Next.js)

Prueba técnica Frontend Developer. Sitio de catálogo de tests psicológicos y cursos de formación de
Giunti Psychometrics Italia: landing, listado de productos (PLP), ficha de producto (PDP), carrito y
página de contactos.

- **Mercado e idioma:** Italia. Todos los textos visibles, las rutas y los parámetros de URL están en
  **italiano**, los precios en **euros con formato italiano** (`1.250,00 €`, `Intl` con `it-IT`).
- **Datos:** 100 % ficticios (12 productos). No se usan nombres de tests reales ni material protegido.
- **Repositorios:** esta es la **Versión A (Next.js)**. La Versión B (Laravel) vive en un repositorio
  **separado**: https://github.com/OsantiagoPerezE/giunti-psychometrics-landing-laravel. La Versión B
  replica el home y `/contatti` de esta versión con la misma tipografía, tamaños y colores.
- **Demo en producción:**
  - Versión A (Next.js): https://giunti-psychometrics-landing-nextjs.vercel.app/
  - Versión B (Laravel): https://giunti-psychometrics-landing-larave-six.vercel.app/

## Índice

1. [Rutas](#rutas)
2. [Stack y versiones](#stack-y-versiones)
3. [Instalación y comandos](#instalación-y-comandos)
4. [Cumplimiento del enunciado](#cumplimiento-del-enunciado)
5. [Funcionalidad](#funcionalidad)
6. [Estructura del proyecto](#estructura-del-proyecto)
7. [Convenciones de código](#convenciones-de-código)
8. [Datos](#datos)
9. [Identidad visual y responsive](#identidad-visual-y-responsive)
10. [Rendimiento y experiencia de usuario](#rendimiento-y-experiencia-de-usuario)
11. [Accesibilidad](#accesibilidad)
12. [Supuestos](#supuestos)
13. [Mejoras sobre la referencia](#mejoras-sobre-la-referencia)
14. [Limitaciones y mejoras propuestas](#limitaciones-y-mejoras-propuestas)
15. [Despliegue y notas](#despliegue-y-notas)

## Rutas

| Ruta               | Render                   | Descripción                                                                                   |
| ------------------ | ------------------------ | --------------------------------------------------------------------------------------------- |
| `/`                | Estática                 | Landing: hero, catálogo destacado (slider), banners, noticias y llamada a contactos.          |
| `/catalogo`        | Dinámica (lee la URL)    | PLP: listado con filtros múltiples, orden y paginación.                                       |
| `/prodotto/[slug]` | Estática (SSG, 12 rutas) | PDP: ficha del producto con compra, detalles y relacionados. 404 propia si el slug no existe. |
| `/contatti`        | Estática                 | Contactos: canales, formulario validado y preguntas frecuentes.                               |

**Parámetros del PLP** (todos opcionales; los valores inválidos se ignoran):

| Parámetro                  | Ejemplo                        | Significado                                                                    |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------ |
| `q`                        | `q=batteria`                   | Búsqueda por nombre (sin distinguir mayúsculas ni acentos).                    |
| `categoria`                | `categoria=clinica,scuola`     | Una o varias categorías.                                                       |
| `formato`                  | `formato=digitale,cartaceo`    | Uno o varios formatos (`cartaceo`, `digitale`, `corso-online`, `in-presenza`). |
| `tema`                     | `tema=benessere,comportamento` | Uno o varios temas del megamenú.                                               |
| `costrutto`                | `costrutto=attenzione`         | Uno o varios constructos del megamenú.                                         |
| `prezzo_min`, `prezzo_max` | `prezzo_max=800`               | Rango de precio (precio realmente pagado).                                     |
| `ordina`                   | `ordina=prezzo-asc`            | `rilevanza` (por defecto), `prezzo-asc`, `prezzo-desc`, `nome`.                |
| `pagina`                   | `pagina=2`                     | Página de resultados.                                                          |

Dentro de un mismo filtro basta con cumplir **una** opción ("o"); entre filtros distintos se deben
cumplir **todos** ("y"). La misma selección siempre genera la misma URL (orden canónico), así que los
enlaces se pueden compartir.

## Stack y versiones

| Herramienta                     | Versión                                                          |
| ------------------------------- | ---------------------------------------------------------------- |
| Node                            | 22.19.0                                                          |
| npm                             | 11.1.0                                                           |
| Next.js (App Router, Turbopack) | 16.4.3                                                           |
| React                           | 19.3.0                                                           |
| Tailwind CSS                    | 4.3.3 (configuración en CSS con `@theme`, sin `tailwind.config`) |
| TypeScript                      | 5.9.3, con `strict: true`                                        |
| ESLint                          | 9.39.5 con `eslint-config-next`                                  |

PHP y Composer **no aplican** a esta versión (son de la Versión B).

## Instalación y comandos

```bash
npm install        # instalar dependencias
npm run dev        # desarrollo en http://localhost:3000
npm run lint       # ESLint
npx tsc --noEmit   # chequeo de tipos
npm run build      # build de producción
npm run start      # servir el build de producción
```

El build de producción se ha verificado: compila, pasa TypeScript y ESLint sin errores y genera las 18 páginas.

## Cumplimiento del enunciado

**Secciones obligatorias**

| Requisito                                                                                                                                                    | Dónde                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Header: logo, navegación (Test, Formazione, Risorse, Contatti), "Accedi" visual, buscador que filtra por nombre                                              | `components/Header.tsx`, `components/SearchModal.tsx`                      |
| Hero con título, descripción, CTA y fondo con gradiente                                                                                                      | `components/Hero.tsx`                                                      |
| Grilla de productos con imagen, nombre, autor/docente, edad o fecha de inicio, precio original y con descuento en formato italiano, badge de formato y botón | `components/ProductCard.tsx`                                               |
| Grilla: 3 columnas en escritorio, 2 en tablet, 1 en móvil                                                                                                    | Home (slider de una fila) y PLP                                            |
| Filtro por categoría con "Tutti", client-side y sin recargar                                                                                                 | Home: `CategoryFilter`; PLP: filtros en la URL                             |
| Formulario: nombre ≥ 2, email válido, mensaje ≥ 10, errores visibles, estado de éxito, estilos consistentes                                                  | `components/ContactForm.tsx` (en `/contatti`, ver [supuestos](#supuestos)) |
| Footer: nombre, enlaces, redes (placeholders), copyright                                                                                                     | `components/Footer.tsx`                                                    |
| Datos ficticios: ≥ 8 productos en ≥ 3 categorías                                                                                                             | 12 productos en 4 categorías (`data/catalog.ts`)                           |

**Requisitos técnicos de la Versión A**

| Requisito                                  | Estado                                                                             |
| ------------------------------------------ | ---------------------------------------------------------------------------------- |
| Next.js 14+ con App Router                 | Next 16.4.3, carpeta `app/` (sin Pages Router).                                    |
| Tailwind CSS 3+ o 4                        | Tailwind 4.3.3.                                                                    |
| TypeScript estricto                        | `strict: true`; `tsc --noEmit` sin errores.                                        |
| Componentes reutilizables y tipados        | Props con `interface`/`type` en cada componente.                                   |
| Datos en archivo, no en JSX                | Todo en `data/catalog.ts`; tipos en `types/product.ts`.                            |
| Responsive 375 / 768 / 1280+               | Mobile first; ver [Identidad visual y responsive](#identidad-visual-y-responsive). |
| Separación de componentes, layouts y datos | `components/`, `app/layout.tsx`, `data/`, `lib/`, `types/`.                        |
| Accesibilidad básica WCAG 2.1 AA           | Ver [Accesibilidad](#accesibilidad).                                               |

## Funcionalidad

### Landing (`/`)

- **Hero** (`components/Hero.tsx`): promociona un **producto real del catálogo** (el que indica
  `hero.productSlug` en `data/catalog.ts`). El título es su nombre, la descripción es la suya y la foto de
  fondo, a todo el ancho, es la del producto. Incluye la llamada a la acción "Esplora il catalogo"
  (hacia `/catalogo`, visible sin hacer scroll en móvil y escritorio) y "Scopri il prodotto", hacia la
  ficha. Un recuadro dentro de la foto muestra el **porcentaje de descuento (calculado con los precios)**
  y el nombre del producto, y enlaza a la ficha; si el producto no tiene promoción, el recuadro no aparece. Nada del
  producto está escrito en el componente: si cambias `productSlug`, todo el hero cambia. Una capa
  oscura garantiza el contraste AA del texto (vertical en móvil y tablet, horizontal en escritorio).
- **Catálogo destacado**: filtros por categoría (píldoras con scroll horizontal y, si hubiera 6 o más
  categorías, un botón "Categorie" con panel y contadores), buscador por nombre y filtros avanzados
  (formato y rango de precio) en un modal pequeño. Los productos van en un **slider de una sola fila**:
  3 tarjetas por slide en escritorio, 2 en tablet y 1 en móvil, con flechas laterales, puntos, teclado
  (← →) y deslizamiento táctil. Un botón "Vedi tutto il catalogo" lleva al PLP.
- Banners promocionales, banner con foto, banda de misión, noticias (textos de redacción propia) y franja
  de confianza. Una sección "Hai bisogno di aiuto?" lleva a `/contatti`.

### Header y navegación

- Barra superior (envíos, Corporate, Aiuto, "Accesso alla piattaforma" con desplegable) más el header.
- **Megamenú "Test"** (Ambito, Temi, Costrutti): se abre con hover o con clic, se cierra con Escape, clic
  fuera o al salir (con un pequeño retraso para poder cruzar al panel). **Cada opción abre el PLP con su
  filtro.** Los botones superiores llevan a `/catalogo` y a la sección destacada de la home.
- Al hacer scroll la barra superior se pliega, el header se compacta con efecto de vidrio, aparece una
  barra de progreso de lectura y un botón de accesos rápidos con los enlaces de la barra superior.
  El menú resalta la sección o página actual.
- En móvil y tablet: menú de hamburguesa; el megamenú sustituye a la lista mientras está abierto.
- **Buscador** (icono de lupa): modal con sugerencias; en la home filtra el catálogo, en otras páginas
  lleva al producto o al PLP.

### PLP (`/catalogo`)

- Filtros **múltiples** (categoría, formato, tema, constructo), rango de precio y búsqueda; orden por
  relevancia, precio o nombre; paginación con enlaces reales (9 productos por página).
- **Contadores inteligentes**: cada opción muestra cuántos productos se verían al marcarla, y las que no
  tendrían resultados se atenúan.
- Chips de filtros activos (cada uno quita solo su opción), título y migas de pan según el filtro, estado
  vacío y "Azzera tutti i filtri".
- Escritorio: panel lateral (fijo solo si la ventana es lo bastante alta; sin scroll propio). Móvil y
  tablet: modal de filtros. La lista se atenúa mientras se aplican los filtros.

### PDP (`/prodotto/[slug]`)

- Migas de pan, imagen, badge de formato, precio con descuento (o sin él), descripción, datos clave
  (edad o inicio/horas/créditos), cantidad, "Aggiungi al carrello" y "Acquista ora".
- Barra de compra fija en móvil cuando el botón principal sale de pantalla.
- Secciones desplegables (qué incluye, características, envíos y devoluciones), productos relacionados,
  metadatos propios y datos estructurados (`schema.org/Product`).

### Carrito

- Panel lateral derecho con cantidades (1-9), quitar con "Annulla", ahorro total, sugerencias, código
  de descuento de ejemplo (`GIUNTI10`, 10 %), resumen de importes y finalización simulada con
  confirmación animada. Se guarda en `localStorage`.
- Aviso emergente al añadir, y animación del icono y del contador del header.

### Contactos (`/contatti`)

- Tres canales (asistencia, pedidos, formación) con email, teléfono y horario, sede de ejemplo,
  formulario y preguntas frecuentes.
- **Formulario**: nombre (obligatorio, ≥ 2), email (obligatorio y válido), mensaje (obligatorio, ≥ 10).
  Mensajes distintos para "vacío" y "demasiado corto", validación al salir del campo y al enviar, foco
  en el primer error, resumen de errores, contador de caracteres, envío simulado con estado de carga y
  confirmación visual con foco.

## Estructura del proyecto

```
app/
  layout.tsx            proveedores y marco común (barra superior, header, footer, carrito)
  page.tsx              landing
  catalogo/page.tsx     PLP
  prodotto/[slug]/      PDP (page.tsx, not-found.tsx)
  contatti/page.tsx     contactos
  globals.css           tema (tokens de color, puntos de corte) y animaciones
components/             componentes de la landing, del header y del carrito
  plp/                  filtros, orden, paginación y chips del PLP
  pdp/                  bloque de compra de la ficha
data/catalog.ts         todos los datos ficticios
lib/                    catalog-query (parámetros, filtros, facetas), filter, format, price, scroll
types/product.ts        tipos del dominio
```

## Convenciones de código

- **Arrow functions** en todo el proyecto: componentes, hooks, utilidades de `lib/` y páginas.
  ```tsx
  export const ProductCard = ({ product, priority = false }: ProductCardProps) => { … };
  ```
  Las páginas y el layout de Next exportan por defecto al final del archivo:
  `const Home = () => { … };` seguido de `export default Home;`. Lo mismo con las asíncronas
  (`const CatalogoPage = async ({ searchParams }) => { … }`).
- **Sin comentarios en el código:** los nombres de componentes, funciones y constantes describen lo que
  hacen, y las decisiones de diseño se documentan en este README.
- Componentes con props tipadas (`interface` o `type`), datos solo en `data/catalog.ts` y lógica pura en
  `lib/` (sin React), para poder reutilizarla en servidor y cliente.

## Datos

Todo el contenido vive en **`data/catalog.ts`**: categorías, productos, temas y constructos del
megamenú, enlaces útiles, canales de contacto y preguntas frecuentes. Para añadir un producto basta con
agregar un objeto a `products` (el slug define su URL y los temas/constructos, sus filtros). Los
precios están en euros; si un producto no define `discountPrice`, se muestra **sin promoción**.

Las imágenes son fotos de Unsplash **guardadas en el proyecto**, con nombres fáciles de identificar:
`public/images/prodotti/prodotto_01.jpg` … `prodotto_12.jpg` (la del producto `p01` es `prodotto_01`, etc.) y
`public/images/banner/banner_risorse.jpg` y `banner_consulenza.jpg`. No dependen de un servidor externo, que en
frío tardaba unos 6 s en servir cada foto. Se limpiaron: no llevan EXIF, GPS, autor ni perfiles de color
(todas en sRGB) y no tienen marcas de agua. Se sirven optimizadas con `next/image` (AVIF/WebP, caché de
30 días). Para cambiar una foto, sustituye el archivo o apunta `image` a otra ruta de `public/`.

## Identidad visual y responsive

| Token     | Valor     | Uso                               |
| --------- | --------- | --------------------------------- |
| `primary` | `#1B4F8A` | Botones, precios, enlaces         |
| `ink`     | `#0F2D52` | Texto                             |
| `accent`  | `#0EA5E9` | Foco, CTA y etiqueta de descuento |
| `surface` | `#EFF6FF` | Fondo                             |

**Definición responsive** (la del enunciado): **Mobile (375 px), Tablet (768 px), Desktop (1280 px o más)**.
Enfoque **mobile first**: los estilos base son los de móvil (diseñados y probados a 375 px) y solo se
amplían con `md:` (desde 768 px) y `lg:` (desde 1280 px). Los puntos de corte están en `app/globals.css`.

| Diseño  | Ancho de referencia | Se aplica                                 | Comportamiento                   |
| ------- | ------------------- | ----------------------------------------- | -------------------------------- |
| Mobile  | 375 px              | de 0 hasta justo antes de 768 px          | 1 columna, menú de hamburguesa.  |
| Tablet  | 768 px              | desde 768 px hasta justo antes de 1280 px | 2 columnas, menú de hamburguesa. |
| Desktop | 1280 px o más       | desde 1280 px                             | 3 columnas, navegación completa. |

Los anchos intermedios usan el diseño del tramo en el que caen: por ejemplo, 1024 px (iPad en horizontal)
muestra el diseño de **Tablet**, y 1100 px también. Se verificó a 375, 767, 768, 1023, 1024, 1279, 1280 y
1440 px.

## Rendimiento y experiencia de usuario

- **Header fuera del flujo:** es `fixed` con un espaciador de altura constante. Plegarlo o compactarlo no
  mueve el contenido ni cambia la altura del documento (evita un bucle de parpadeo con scrolls muy
  cortos), y tiene histéresis (se pliega a más de 48 px y se expande por debajo de 24 px).
  _Si cambias los paddings o textos de la barra superior o del header, actualiza la altura del
  espaciador en `components/StickyChrome.tsx` (117 px y 151 px)._
- **Paginación en el PLP**, no scroll infinito ni slides: URL compartible, botón "atrás" que conserva la
  posición, footer alcanzable, DOM pequeño y enlaces rastreables. El slider se reserva para la home.
- **Scroll:** al llegar a una página empieza arriba (también al recargar); al cambiar de página o de
  filtros desde abajo se vuelve al inicio de los resultados; `data-scroll-behavior="smooth"` evita que
  el scroll suave global anime los cambios de página en Next 16.
- **Imágenes:** copias locales (sin latencia de terceros: una variante nueva se optimiza en ~0,1 s y,
  en caché, en milisegundos) servidas con `next/image` en **AVIF** (con WebP de reserva): el hero a
  1920 px pesa ~30 KB en AVIF frente a ~84 KB en JPEG. Las visibles al abrir la página cargan con
  `loading="eager"` y `fetchPriority="high"` (en Next 16 `priority` está obsoleto); las demás, de forma
  diferida y con prioridad baja para que no compitan con el LCP por el ancho de banda. Los `sizes`
  coinciden con los puntos de corte reales (768 y 1280 px). `components/ProductImage.tsx` muestra un
  esqueleto con spinner (en la ficha) mientras carga y un aviso si falla; la foto nunca queda oculta
  aunque falle el JavaScript.
- **Fuentes e iconos:** solo se carga Geist (la monoespaciada no se usaba) y el favicon es un SVG de la
  marca (`app/icon.svg`, unos 300 bytes, en lugar del `.ico` de plantilla de 14,7 KB).
- **Medido** (producción, red de 1,6 Mbps y CPU 4 veces más lenta, mediana de 3 ejecuciones): LCP de la
  home ≈ 1,15 s (antes ≈ 1,9 s), imágenes de la home 155 KB (antes 260 KB), CLS ≈ 0 y TBT ≈ 100-200 ms.
  El JavaScript (~165 KB comprimido) es casi todo React y Next. Se probó diferir los diálogos cerrados
  (carrito, buscador, filtros) y no mejoró nada medible, así que no se aplicó.
- **Render:** la ficha de producto se genera de forma estática; el PLP se renderiza en el servidor según
  la URL (rápido y rastreable); los componentes de cliente se limitan a lo interactivo.
- Animaciones con `prefers-reduced-motion`, hover solo en dispositivos con puntero y cursor de mano en
  todo lo clicable.

## Accesibilidad

- Enlace "Vai al contenuto", `lang="it"`, jerarquía de títulos y `aria-label` en regiones y navegación.
- Foco visible en todos los elementos interactivos y navegación por teclado (menús con Escape, slider con
  flechas, modales con foco atrapado mediante `<dialog>`).
- Imágenes con texto alternativo; las decorativas, vacías.
- Formularios con etiquetas, `aria-required`, `aria-invalid`, `aria-describedby` y errores anunciados.
- El color de acento (`#0EA5E9`) no se usa como texto sobre fondo claro por contraste insuficiente.

## Supuestos

- **Formulario de contacto:** el enunciado lo pide dentro de la landing; por decisión de diseño vive en su
  propia página, `/contatti`, y la home enlaza a ella.
- **Idioma:** el sitio está en italiano; este README, en español.
- **Compra simulada:** el carrito, el código de descuento, el pago y el formulario no usan backend. El
  carrito persiste en `localStorage`.
- **Datos de contacto, direcciones y teléfonos** son ficticios (dominio reservado `example.com`).
- **Logo y favicon:** son un placeholder propio (SVG dibujado a mano), no el logo real.
- **Temas y constructos:** cada producto tiene temas y constructos inventados para poder filtrar.
- El precio con descuento es un 15 % menos que el original; 4 productos no tienen promoción para probar
  ese estado.

## Mejoras sobre la referencia

PLP y PDP completos, filtros múltiples con contadores, paginación por URL, carrito en panel lateral con
ahorro, sugerencias y deshacer, buscador con sugerencias, megamenú conectado al catálogo, header que se
compacta con barra de progreso, página de contactos con validación detallada, estados vacíos y de
error, y datos estructurados en la ficha.

## Limitaciones y mejoras propuestas

- No hay tests automatizados en el repositorio (las comprobaciones se hicieron con Chrome automatizado).
- Pendiente: tamaño de página del PLP (hoy 9; 6 o 12 dejan la grilla cuadrada en 1, 2 y 3 columnas).
  Algunas fotos de stock muestran marcas o textos de terceros (un
  logo de portátil, un apellido bordado en una bata): conviene cambiarlas si se quiere evitar cualquier
  marca visible.
- Futuro: backend real (pedidos, formulario, cuentas), pasarela de pago, un botón "Carica altri
  prodotti" si el catálogo creciera mucho, y pruebas end-to-end (Playwright).

## Despliegue y notas

- URL pública: https://giunti-psychometrics-landing-nextjs.vercel.app/
- Desplegado en **Vercel** como proyecto Next.js estándar, sin configuración adicional ni variables de
  entorno. Está conectado al repositorio de GitHub: cada push a `main` genera un nuevo despliegue de
  producción.
- Next.js muestra un aviso si hay un `yarn.lock` fuera del repositorio; es inofensivo y se silencia con
  `turbopack.root` en `next.config.ts`.
- El archivo `AGENTS.md` lo genera la plantilla de Next.js (instrucciones para agentes de IA); se puede
  conservar o borrar.
