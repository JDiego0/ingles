# English Mastery — Curso integral de inglés A1+ → B2 (+ ruta C1)

Aplicación web estática (HTML, CSS y JavaScript nativo, sin backend) con un curso completo de inglés para hispanohablantes: 20 módulos, 77 lecciones de 60 minutos, consolidaciones semanales, evaluaciones por módulo y por etapa, diagnóstico inicial, repaso espaciado, banco de speaking y guía de pronunciación. Está diseñada **primero para teléfonos Android** (360–430 px) y funciona también en tableta y ordenador.

> Estado y pruebas: ver [`PROGRESO.md`](PROGRESO.md) y [`tests/validation.md`](tests/validation.md).

---

## 1. Requisitos

- Un navegador moderno: Chrome/Edge para Android o escritorio (recomendado), Firefox o Safari recientes.
- Para ejecutarlo en tu ordenador: **cualquier servidor HTTP estático**. Por ejemplo, Python 3 (ya viene en macOS/Linux; en Windows, desde python.org) o Node.js.
- No hace falta instalar dependencias, ni compilar, ni tener cuentas o claves.

> ⚠️ No lo abras con doble clic (`file://`): los módulos se cargan bajo demanda y algunos navegadores lo bloquean. Usa un servidor local (abajo) o GitHub Pages.

## 2. Ejecutar localmente

Desde la carpeta del proyecto (la que contiene `index.html`):

```bash
# Opción A: Python
python -m http.server 8000

# Opción B: Node.js
npx serve .
```

Abre `http://localhost:8000` en el navegador.

**Probarlo desde tu teléfono en la misma red Wi-Fi:** ejecuta `python -m http.server 8000 --bind 0.0.0.0`, averigua la IP local de tu ordenador (por ejemplo `192.168.1.20`) y abre `http://192.168.1.20:8000` en el teléfono. (El service worker y la instalación como app solo funcionan en `localhost` o con HTTPS; en GitHub Pages funcionan siempre.)

## 3. Probarlo en un navegador

1. Abre la app y pulsa **Empezar** (el primer paso es el diagnóstico).
2. Para revisar la vista móvil en el ordenador: herramientas de desarrollo (F12) → icono de dispositivo → elige un Android de 360–412 px. También puedes abrir `tests/mobile.html`, que muestra la app en marcos de 360, 412 y 780×360 (horizontal).
3. Para explorar todo sin cumplir los requisitos de progresión: **Más → Ajustes → Modo libre**.
4. Validador de contenido (requiere Node.js 18+):

```bash
node tests/validate.mjs        # todo el curso
node tests/validate.mjs m05    # un módulo
```

## 4. Crear el repositorio en GitHub

1. Crea una cuenta en github.com (si no tienes).
2. Pulsa **New repository**, ponle un nombre (por ejemplo `english-mastery`), elige **Public** (GitHub Pages gratuito requiere repositorio público en cuentas gratuitas) y créalo **sin** README.
3. En tu ordenador, dentro de la carpeta del proyecto:

```bash
git init
git add .
git commit -m "English Mastery: curso completo"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/english-mastery.git
git push -u origin main
```

(Alternativa sin terminal: en la página del repositorio, **Add file → Upload files** y arrastra todo el contenido de la carpeta.)

## 5. Publicar con GitHub Pages

1. En el repositorio: **Settings → Pages**.
2. En **Build and deployment**, *Source*: **Deploy from a branch**; *Branch*: `main` y carpeta `/ (root)`. Guarda.
3. Tras 1–2 minutos, la app estará en `https://TU_USUARIO.github.io/english-mastery/`.
4. Ábrela en el teléfono y, en Chrome, menú ⋮ → **Añadir a pantalla de inicio** / **Instalar aplicación**.

Todas las rutas son relativas, así que funciona en la subruta `/english-mastery/` sin cambios. El archivo `.nojekyll` evita que GitHub procese los archivos con Jekyll.

## 6. Actualizar el curso

1. Edita los archivos (por ejemplo, un módulo en `data/modules/m05.js`).
2. Ejecuta `node tests/validate.mjs`.
3. Si cambiaste archivos del motor (CSS/JS), sube la versión de la caché en `sw.js` (`english-mastery-v2` → `v3`).
4. `git add . && git commit -m "Actualiza M05" && git push`. GitHub Pages se actualiza en 1–2 minutos (la app revalida los archivos con conexión).

## 7. Exportar y restaurar el progreso

- **Exportar:** Más → Ajustes → **Exportar progreso (JSON)**. Descarga `english-mastery-AAAA-MM-DD.json`.
- **Importar:** Más → Ajustes → **Importar copia** y elige el archivo. Reemplaza el progreso de ese navegador (pide confirmación).
- Recomendación: exporta una copia cada semana y guárdala en tu nube o correo.

## 8. Limitaciones del almacenamiento local

- El progreso se guarda en `localStorage` del navegador **en ese dispositivo**.
- Se pierde si borras los datos del sitio o del navegador, si usas modo incógnito, otro navegador u otro dispositivo.
- **No hay sincronización entre dispositivos** (no hay backend). Para cambiar de dispositivo: exporta en uno e importa en el otro.
- Si tienes el curso abierto en dos pestañas, los cambios se sincronizan entre ellas.
- Las grabaciones de voz **no se guardan** (solo existen mientras la página está abierta).

## 9. Qué funciona sin conexión y qué necesita internet

- **Sin conexión** (después de la primera visita con internet): las páginas y módulos ya visitados, los ejercicios, el repaso y el progreso. El service worker guarda en caché lo que vas abriendo.
- **Necesita internet:** la primera carga y los módulos que aún no hayas abierto; las actualizaciones del curso; y, en algunos dispositivos, las voces de texto a voz que el sistema descarga de la red.

## 10. Funciones que dependen del navegador

| Función | Tecnología | Si no está disponible |
|---|---|---|
| Audio de listening, frases y pronunciación | Web Speech API (`speechSynthesis`) | La app lo detecta y lo indica; usa la transcripción para leer en voz alta. La calidad, el acento y las voces disponibles dependen del dispositivo (en Android: Ajustes del sistema → Salida de texto a voz). |
| Voces británica/australiana/india (M18) | Voces instaladas en el sistema | Se usa la voz inglesa por defecto. |
| Grabarte y escucharte | `MediaRecorder` + micrófono | Se sugiere usar la grabadora del teléfono. Requiere permiso y HTTPS/localhost. |
| Instalar como app y uso sin conexión | Service worker + manifest | La web funciona igual en el navegador. |
| Vibración al acabar cronómetros | `navigator.vibrate` | Solo aviso visual. |

**No hay** reconocimiento de voz ni evaluación automática de la pronunciación: el speaking y el writing se autoevalúan con rúbricas.

## 11. Añadir módulos y lecciones sin romper la app

Estructura de datos:

- `data/curriculum.js`: lista de etapas y módulos (`id`, `stage`, `cefr`, `n` = número de lecciones, `title`, `es`). El validador comprueba que `n` coincide con el archivo.
- `data/modules/mXX.js`: el contenido. Usa las funciones de `data/helpers.js`:
  - `V(en, es, ejemplo, traducción, {col, pron, use})` — vocabulario.
  - `MC(pregunta, opciones, índiceCorrecto, explicación)`, `TF(...)`, `GAP('… ___ …', respuestas, explicación)`, `ORD('Frase correcta.')`, `TR(enunciado, respuestas)`, `FIX(frase_errónea, correcciones)`, `ES(español, traducciones)`, `SAY(texto_audio, item)`.
  - `EX(título, habilidad, instrucciones, items)` — bloque de práctica. Habilidades: `listening, reading, grammar, vocabulary, pronunciation, speaking, writing`.
  - `DLG([[hablante, inglés, español?, variedad?], …])` — diálogos.
- Cada lección admite: `title, goal, outcome, check, materials, agenda (suma 60 min), warmup, input, comp, chunks, notes, grammar, practice, semi, speak[], write, pron, shadow, reading, retrieval, review, transfer`. Cada módulo: `objectives, prereq, outcomes, errors, summary, transfer, lessons, assessment {listening, reading, items, speak, write}`.

Reglas importantes:

1. **No cambies el orden** de lecciones ni de bloques de práctica de un módulo ya publicado: los identificadores de progreso (`m05-l2-p1`, `m05-A-g`…) dependen de la posición. Para añadir, agrega **al final**.
2. Los huecos (`GAP`) tienen **un solo `___`**. Para frases con varios huecos usa `TR` o `MC`.
3. Escribe varias respuestas aceptadas cuando haya alternativas razonables. La corrección ya ignora mayúsculas, puntuación y contracciones (`don't` = `do not`).
4. Para añadir un módulo nuevo: crea `data/modules/m20.js`, añádelo a `curriculum.modules` con su etapa y ejecuta el validador.
5. Contenido original: no copies textos con derechos de autor.

## 12. Estructura del proyecto

```
INGLES/
├── index.html              SPA (router por hash)
├── manifest.webmanifest    instalación como app
├── sw.js                   service worker (red primero, caché de respaldo)
├── .nojekyll               para GitHub Pages
├── README.md · PROGRESO.md
├── assets/
│   ├── css/styles.css      estilos base mobile-first, tema claro/oscuro
│   ├── css/responsive.css  tabletas, escritorio, horizontal
│   ├── images/icon.svg
│   └── js/
│       ├── util.js         DOM, fechas, normalización de respuestas, diálogos
│       ├── storage.js      localStorage versionado, migración, export/import, sync entre pestañas
│       ├── speech.js       texto a voz con detección de soporte + grabadora
│       ├── srs.js          repetición espaciada (cajas 0–7)
│       ├── progress.js     desbloqueos, secuencia semanal, racha, habilidades
│       ├── components.js   reproductor, grabadora, cuenta atrás, rúbricas, tareas
│       ├── exercises.js    motor de ejercicios con corrección automática
│       ├── timer.js        temporizador de sesión con agenda
│       ├── views-home.js   inicio, ruta, módulo, menú
│       ├── views-lesson.js lección A–K y consolidación
│       ├── views-assess.js evaluación de módulo, examen de etapa, diagnóstico
│       ├── views-tools.js  vocabulario, repaso, errores, speaking, pronunciación, historial, ajustes, ayuda
│       └── app.js          arranque, router, carga de módulos, tema
├── data/
│   ├── helpers.js · curriculum.js · rubrics.js · speaking-bank.js · pronunciation.js · help.js
│   ├── assessments/diagnostic.js
│   └── modules/m00.js … m19.js
└── tests/
    ├── validate.mjs        validador automático del contenido y sintaxis
    ├── mobile.html         vista de prueba en marcos de teléfono
    └── validation.md       registro de pruebas
```

## 13. Fuentes pedagógicas (referencias verificables)

- Consejo de Europa (2020). *Common European Framework of Reference for Languages: Learning, teaching, assessment — Companion volume*.
- Nation, I. S. P. *Learning Vocabulary in Another Language*. Cambridge University Press.
- Lewis, M. (1993). *The Lexical Approach*.
- Willis, J. (1996). *A Framework for Task-Based Learning*.
- Krashen, S. (1982). *Principles and Practice in Second Language Acquisition* (input comprensible; debatido en la investigación posterior).

Todos los textos, diálogos, ejercicios y estudios de caso del curso son originales y, cuando citan estudios o empresas, son **ficticios** y así se indica.

## 14. Expectativas honestas

El curso no certifica niveles MCER. Completar los módulos no garantiza por sí solo alcanzar B2 o C1: se necesita exposición amplia y sostenida al idioma. Usa el plan de mantenimiento de M19 y, si necesitas un certificado, presenta un examen oficial.
