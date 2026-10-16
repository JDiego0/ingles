/* Texto de ayuda (vista #/help). */
window.EM = window.EM || {};
EM.helpHTML = `
<h2>Cómo usar el curso</h2>
<ol>
<li><b>Haz el diagnóstico</b> (Más → Diagnóstico). Estima tu punto de partida y desbloquea los módulos que correspondan.</li>
<li><b>Sigue el “Próximo paso” de Inicio.</b> Cada módulo dura una semana de 6 sesiones: L1, L2, consolidación, L3, L4 y evaluación.</li>
<li><b>Pulsa “Iniciar sesión con temporizador”</b> en cada lección: te guía por los bloques de la hora y registra tus minutos reales.</li>
<li><b>Completa la lección</b>: ejercicios comprobados con una media ≥ 80 % y speaking autoevaluado. Abrir una lección no cuenta como completarla.</li>
<li><b>Supera la evaluación del módulo</b> (≥ 80 % objetivo + speaking y writing autoevaluados) para desbloquear el siguiente.</li>
<li><b>Repasa a diario</b> en Repaso (10 minutos aprox.). Las expresiones de cada lección se añaden solas al completarla.</li>
</ol>

<h2>La hora diaria</h2>
<p>Distribución base (cada lección la adapta a su objetivo): <b>15 min</b> listening y comprensión · <b>10 min</b> vocabulario y expresiones · <b>15 min</b> speaking · <b>10 min</b> pronunciación y shadowing · <b>10 min</b> gramática aplicada, recuperación y repaso. El tiempo de navegación y de leer instrucciones generales no se cuenta. El séptimo día es de descanso o de exposición voluntaria (series con subtítulos en inglés, podcasts, canciones).</p>

<h2>Estructura de cada lección (A–K)</h2>
<p>A Activación · B Exposición (escucha o lectura) · C Comprensión · D Análisis (chunks y gramática) · E Práctica controlada · F Práctica semilibre · G Producción (speaking y writing) · H Pronunciación y shadowing · I Recuperación sin ayudas · J Reflexión · K Revisión acumulativa. Usa los botones de letras de arriba para saltar entre secciones.</p>

<h2>Audio: lo que hay y lo que no</h2>
<ul>
<li>El curso <b>no incluye grabaciones</b>. Los listening son <b>transcripciones completas</b> que tu navegador puede leer con <b>texto a voz</b> (Web Speech API) si tu dispositivo tiene voces en inglés.</li>
<li>La calidad, el acento y la disponibilidad de las voces dependen del dispositivo. En Android puedes instalar o cambiar voces en <i>Ajustes del sistema → Accesibilidad / Idioma → Salida de texto a voz</i>, y elegirla en Ajustes del curso.</li>
<li>Si no hay voz: lee la transcripción en voz alta (primero despacio, luego a ritmo natural) o pide a alguien que te la lea.</li>
<li>La <b>grabadora</b> (si el navegador la permite) guarda tu voz solo mientras la página está abierta, para compararte. <b>No hay reconocimiento de voz ni evaluación automática de pronunciación.</b></li>
</ul>

<h2>Corrección y autoevaluación</h2>
<ul>
<li>Los ejercicios cerrados se corrigen automáticamente. Se ignoran mayúsculas, puntuación y la diferencia entre contracciones (don't = do not).</li>
<li>Si tu respuesta de texto libre es válida pero distinta, puedes marcarla con “Mi respuesta también es válida”. Úsalo con honestidad: queda registrado como autovalidación.</li>
<li>Speaking y writing se evalúan con <b>rúbricas de autoevaluación</b>. No son notas automáticas.</li>
<li>Los errores de los ejercicios van a <b>Mis errores</b>: corrígelos, escribe una frase nueva con la forma correcta y márcalos como resueltos.</li>
</ul>

<h2>Usarlo en el teléfono como una app</h2>
<p>En Chrome para Android: menú ⋮ → <b>Añadir a pantalla de inicio</b> (o “Instalar aplicación”). Tras la primera visita, las páginas ya abiertas funcionan sin conexión, excepto lo que dependa de voces descargables del sistema.</p>

<h2>Tu progreso</h2>
<p>Se guarda en este navegador (localStorage). Se pierde si borras los datos del navegador, usas otro navegador o cambias de dispositivo, y no hay sincronización entre dispositivos. <b>Exporta una copia</b> en Ajustes con frecuencia e impórtala en otro dispositivo si cambias.</p>

<h2>Expectativas honestas</h2>
<ul>
<li>Las estimaciones de nivel (diagnóstico, exámenes) son <b>orientativas</b>. Una aplicación estática no puede certificar un nivel MCER: para eso existen exámenes oficiales con examinadores.</li>
<li>El curso completo son unas 115–120 sesiones de una hora. Como referencia, Cambridge English publica estimaciones aproximadas de <i>guided learning hours</i> por nivel (alrededor de 500–600 horas acumuladas para B2 y 700–800 para C1, contando desde cero). Por eso cada etapa recomienda <b>volver a recorrer los módulos</b> (segunda vuelta con tareas más largas del banco de speaking) y sumar exposición diaria al idioma.</li>
<li><b>C1 requiere exposición amplia y sostenida</b>: lectura extensa, escucha de material auténtico, conversación real. Completar los módulos 17–18 te da las herramientas y la práctica guiada, pero no garantiza por sí solo ese nivel.</li>
</ul>

<h2>Fundamentos pedagógicos (fuentes verificables)</h2>
<ul>
<li>Consejo de Europa (2020). <i>Common European Framework of Reference for Languages: Learning, teaching, assessment – Companion volume</i>. Base de los niveles, descriptores “puedo…” y dimensiones de las rúbricas.</li>
<li>Paul Nation, <i>Learning Vocabulary in Another Language</i> (Cambridge University Press): importancia de la recuperación espaciada y del vocabulario de alta frecuencia.</li>
<li>Michael Lewis, <i>The Lexical Approach</i> (1993): enseñanza mediante chunks y collocations.</li>
<li>Jane Willis, <i>A Framework for Task-Based Learning</i> (1996): ciclo de tareas comunicativas.</li>
<li>Stephen Krashen, hipótesis del input comprensible (<i>Principles and Practice in Second Language Acquisition</i>, 1982); discutida en la investigación posterior, aquí se usa como principio práctico: entender antes de producir de forma compleja.</li>
</ul>
<p class="small muted">Los enlaces y libros externos son complementarios: el curso incluye todo lo necesario para las actividades esenciales.</p>
`;
