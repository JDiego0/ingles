# Registro de validación

Fecha de las pruebas: 15 de octubre de 2026. Entorno: Windows 11, Chrome de escritorio (automatizado), servidor local `python -m http.server`, Node.js 24.

## 1. Validación automática del contenido — `node tests/validate.mjs`

Resultado: **✔ Validación correcta** (0 errores).

| Métrica | Valor |
|---|---|
| Módulos | 20 (M00–M19) |
| Lecciones | 77 (+ 18 sesiones de consolidación generadas, 19 evaluaciones de módulo, 5 exámenes de etapa, 1 diagnóstico) |
| Ítems corregibles automáticamente | 3 476 (+ 54 del diagnóstico) |
| Expresiones (chunks) con ejemplo y traducción | 772 |
| Tareas de speaking con criterios | 79 (+ evaluación y banco de speaking) |
| Tareas de writing con lista de verificación y modelo | 27 (+ 19 en evaluaciones) |
| Líneas de diálogo/monólogo con transcripción | 602 |
| Lecturas | 26 (+ 19 en evaluaciones) |

Qué comprueba el validador:
- Sintaxis de todos los scripts de `assets/js` y de `sw.js`.
- Cada módulo: archivo existente, nº de lecciones = `curriculum.n`, objetivos, conocimientos previos, resultados, errores frecuentes, resumen, transferencia.
- Cada lección: objetivo, resultado, comprobación, agenda que suma **exactamente 60 min**, input (diálogo ≥5 líneas o lectura), comprensión, ≥6 chunks completos, gramática con sus 7 componentes (cuando existe), práctica controlada, speaking, pronunciación o shadowing, recuperación.
- Cada módulo con evaluación: listening con transcripción y preguntas, lectura, ≥12 ítems, speaking y writing.
- Cada ítem: opción múltiple con respuesta en rango y sin opciones duplicadas; huecos con exactamente un `___`; respuestas no vacías.
- Ausencia de texto de relleno (TODO, placeholder, “por agregar”…).
- Identificadores de bloque únicos.

Avisos (no errores): 4 chunks repetidos entre módulos a propósito, como reciclaje.

Comprobación adicional de claves: script heurístico que compara las opciones citadas en las explicaciones con la opción marcada como correcta. Detectó 2 discrepancias; ambas eran falsos positivos (la explicación cita a propósito la opción incorrecta).

## 2. Pruebas en navegador (Chrome, viewport móvil)

Herramienta: `tests/mobile.html` (marcos de 360×780, 412×915 y 780×360) + inspección por JavaScript y capturas de pantalla.

| Prueba | Resultado |
|---|---|
| Las 139 rutas (20 módulos, 77 lecciones, 18 consolidaciones, 19 evaluaciones, 5 exámenes de etapa) cargan sin errores JS | ✔ |
| Ningún texto “null”, “undefined” o “[object Object]” en pantalla | ✔ (tras corregir un fallo de `append(null)`) |
| Sin desbordamiento horizontal a 360 px en todas las rutas | ✔ |
| Sin desbordamiento en horizontal (780×360) | ✔ (barra inferior compacta de 50 px) |
| Elementos táctiles ≥ 40–46 px (radios dentro de etiquetas de ≥46 px) | ✔ |
| Ordenar palabras sin teclado (fichas táctiles) | ✔ |
| Campos de texto con `font-size: 16px` (sin zoom automático en móvil), sin autocorrector | ✔ |
| Completar una lección: ejercicios, rúbrica, botón habilitado solo con ≥ 80 % y speaking autoevaluado | ✔ |
| Las expresiones de la lección pasan al repaso al completarla | ✔ |
| Progresión: diagnóstico A2 → ubicación en M05; M00 completo → siguiente paso M05 | ✔ |
| Evaluación con 67 % no aprueba; reintento con 100 % aprueba y desbloquea M06 (M07 sigue bloqueado) | ✔ |
| Examen de etapa bloqueado hasta superar los módulos de la etapa | ✔ |
| Persistencia tras recargar (lecciones, diagnóstico, ubicación) | ✔ |
| Sincronización entre dos pestañas/contextos abiertos | ✔ (añadida tras detectar sobrescritura) |
| Exportar JSON → reiniciar → importar: el progreso vuelve | ✔ (función probada; la descarga física del archivo no se ejecutó en la automatización) |
| Temporizador: cambio de bloque, minutos registrados, continúa tras recargar | ✔ |
| Repaso espaciado: calificar, re-cola de “Otra vez”/“Difícil”, intervalos mostrados | ✔ |
| Botones ocultos (`hidden`) realmente ocultos | ✔ (corregido: las clases con `display` anulaban `hidden`) |
| Banco de errores: comprobar, reutilizar en frase nueva, marcar resuelto | ✔ |
| Vocabulario propio y vocabulario de todo el curso | ✔ |
| Texto a voz detectado (`speechSynthesis`), 6 voces inglesas (en-US, en-GB) | ✔ detección; la reproducción audible no se verificó automáticamente |
| Foco visible al navegar con teclado | ✔ |
| Rutas relativas (sin `/` inicial) para subruta de GitHub Pages | ✔ (búsqueda en todo el código) |
| Caché: el service worker revalida con la red (`cache: 'no-cache'`) | ✔ (corregido tras detectar archivos antiguos servidos por la caché HTTP) |

## 3. Fallos encontrados y corregidos durante las pruebas

1. `append/replaceChildren` convertía `null` en el texto “null” → filtro global en `util.js`.
2. Número de lista desalineado en preguntas de opción múltiple → la pregunta pasa a ser un párrafo.
3. Atributo `hidden` anulado por `display` de botones y rejillas → regla `[hidden]{display:none!important}`.
4. Dos pestañas abiertas podían sobrescribirse el progreso → sincronización por evento `storage`.
5. Versiones antiguas servidas desde la caché HTTP → el service worker revalida siempre con conexión.
6. Huecos con dos `___` y respuestas difíciles de teclear en el móvil (guiones) → convertidos a opción múltiple o reescritura, y nueva regla en el validador.
7. Tarjeta nueva: “Difícil” y “Bien” daban el mismo intervalo → “Difícil” la repite hoy.

## 4. No verificado (requiere dispositivo o cuenta real)

- **Prueba en un teléfono Android físico** (se usó emulación por tamaño de viewport en Chrome de escritorio). Recomendado: abrir la URL de GitHub Pages en el teléfono y recorrer una lección completa.
- **Reproducción audible** de las voces y su calidad en Android.
- **Grabadora** (`MediaRecorder`): permiso de micrófono y reproducción en un dispositivo real.
- **Descarga física** del archivo de copia de seguridad y el selector de archivos al importar en Android.
- **Instalación como app** (Añadir a pantalla de inicio) y uso sin conexión en un teléfono.
- **Despliegue real en GitHub Pages** (no se publicó nada en ninguna cuenta; el proyecto está preparado).
- Safari/iOS y Firefox.
