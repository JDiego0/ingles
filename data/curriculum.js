/* Mapa curricular: etapas, módulos (metadatos), plan semanal, sesión de
   consolidación y tareas abiertas de los exámenes de etapa.
   El contenido completo de cada módulo está en data/modules/<id>.js y se carga
   bajo demanda. "n" = número de lecciones del módulo (el validador lo comprueba). */
window.EM = window.EM || {};
EM.curriculum = {
  stages: [
    { n: 0, title: 'Diagnóstico y preparación', cefr: '—', desc: 'Estimar tu punto de partida, aprender a usar el curso, organizar la hora diaria y conocer los sonidos y estrategias clave.' },
    { n: 1, title: 'Reconstrucción de fundamentos', cefr: 'A1+', exam: true, desc: 'Be, presente simple y continuo, preguntas, artículos, cantidades, there is/are, can, imperativos y primeras conversaciones.' },
    { n: 2, title: 'Consolidación A2', cefr: 'A2', exam: true, desc: 'Pasado, futuro, comparaciones, modales frecuentes, experiencias y relatos de uno a dos minutos.' },
    { n: 3, title: 'Independencia B1', cefr: 'B1', exam: true, desc: 'Present perfect, condicionales, relativas, pasiva, estilo indirecto, phrasal verbs, opiniones y conversaciones espontáneas.' },
    { n: 4, title: 'Consolidación B1+ y dominio funcional B2', cefr: 'B1+/B2', exam: true, desc: 'Tiempos narrativos, modales en pasado, condicionales mixtos, discurso, registro, argumentación y comunicación profesional.' },
    { n: 5, title: 'Ruta avanzada hacia C1', cefr: 'B2+/C1', exam: true, desc: 'Matiz, atenuación, síntesis, persuasión, lectura crítica, debate y comprensión de discursos extensos.' },
    { n: 6, title: 'Integración y evaluación final', cefr: 'B2 (+C1)', desc: 'Pruebas integradoras, simulaciones, auditoría de errores y plan de mantenimiento.' },
  ],

  modules: [
    { id: 'm00', stage: 0, cefr: 'A1+–A2', n: 2, consol: false, assess: false, title: 'Start Here', es: 'Método, sonidos clave y estrategias de supervivencia' },
    { id: 'm01', stage: 1, cefr: 'A1+', n: 4, title: 'Me and My World', es: 'Presentarte: be, pronombres, posesivos y preguntas' },
    { id: 'm02', stage: 1, cefr: 'A1+', n: 4, title: 'Daily Life', es: 'Rutinas: presente simple, do/does, frecuencia y hora' },
    { id: 'm03', stage: 1, cefr: 'A1+', n: 4, title: 'Places and Things', es: 'There is/are, artículos, contables, preposiciones, have got' },
    { id: 'm04', stage: 1, cefr: 'A1+/A2', n: 4, title: 'Right Now and Abilities', es: 'Presente continuo, can, imperativos y peticiones' },
    { id: 'm05', stage: 2, cefr: 'A2', n: 4, title: 'Stories from the Past', es: 'Pasado simple: be, regulares, irregulares y preguntas' },
    { id: 'm06', stage: 2, cefr: 'A2', n: 4, title: 'Plans and Predictions', es: 'Futuro: going to, will, presente continuo; invitaciones' },
    { id: 'm07', stage: 2, cefr: 'A2', n: 4, title: 'Comparing and Choosing', es: 'Comparativos, superlativos y cuantificadores' },
    { id: 'm08', stage: 2, cefr: 'A2', n: 4, title: 'Rules, Advice and Requests', es: 'Should, must, have to, might; peticiones; gerundio e infinitivo' },
    { id: 'm09', stage: 2, cefr: 'A2/B1', n: 4, title: 'Experiences and Anecdotes', es: 'Past continuous, present perfect introductorio y anécdotas' },
    { id: 'm10', stage: 3, cefr: 'B1', n: 4, title: 'Life Changes', es: 'Present perfect (continuous), for/since, past perfect, narración' },
    { id: 'm11', stage: 3, cefr: 'B1', n: 4, title: 'What If?', es: 'Condicionales 1 y 2, relativas, opiniones y desacuerdos' },
    { id: 'm12', stage: 3, cefr: 'B1', n: 4, title: 'Work, Tech and Information', es: 'Pasiva, estilo indirecto, correos y phrasal verbs' },
    { id: 'm13', stage: 3, cefr: 'B1/B1+', n: 4, title: 'Real Conversations', es: 'Verb patterns, probabilidad, conectores y resolver problemas' },
    { id: 'm14', stage: 4, cefr: 'B1+/B2', n: 4, title: 'Looking Back', es: 'Tiempos narrativos, modales en pasado, 3.º/mixto, wish' },
    { id: 'm15', stage: 4, cefr: 'B2', n: 4, title: 'Making Your Case', es: 'Discurso, registro, énfasis y argumentación' },
    { id: 'm16', stage: 4, cefr: 'B2', n: 4, title: 'Professional English', es: 'Entrevistas, reuniones, presentaciones, negociación e informes' },
    { id: 'm17', stage: 5, cefr: 'B2+/C1', n: 4, title: 'Nuance and Precision', es: 'Atenuación, certeza, reformulación, síntesis e idioms' },
    { id: 'm18', stage: 5, cefr: 'C1', n: 4, title: 'Advanced Communication', es: 'Lectura crítica, persuasión, debate, acentos y ambigüedad' },
    { id: 'm19', stage: 6, cefr: 'B2 (+C1)', n: 3, consol: false, title: 'Integration and Final Assessment', es: 'Simulaciones, prueba final, auditoría de errores y plan de mantenimiento' },
  ],

  /* Semana tipo (6 días de 60 min + 1 día de descanso o exposición voluntaria). */
  week: [
    { day: 'Día 1', what: 'Lección 1 del módulo' },
    { day: 'Día 2', what: 'Lección 2 del módulo' },
    { day: 'Día 3', what: 'Sesión de consolidación (repaso, shadowing, banco de speaking, errores)' },
    { day: 'Día 4', what: 'Lección 3 del módulo' },
    { day: 'Día 5', what: 'Lección 4 del módulo' },
    { day: 'Día 6', what: 'Evaluación del módulo + tarea de transferencia + repaso de errores' },
    { day: 'Día 7', what: 'Descanso o exposición voluntaria (series, podcasts, canciones; sin obligación)' },
  ],

  /* Sesión de consolidación genérica (se rellena con material del módulo). */
  consol: {
    agenda: [
      [10, 'Repaso', 'Cola de repaso espaciado (tarjetas vencidas y nuevas)'],
      [15, 'Listening', 'Vuelve a escuchar los inputs de L1 y L2 sin transcripción y anota palabras clave'],
      [10, 'Shadowing', 'Shadowing de las frases modelo de L1 y L2 (3 rondas)'],
      [15, 'Speaking', '3 preguntas del banco de speaking del nivel: 1–2 min cada una, grabándote'],
      [10, 'Errores', 'Banco de errores: corrige y vuelve a usar en una frase nueva tus 5 errores más repetidos'],
    ],
  },

  /* Tareas abiertas de los exámenes de etapa (las preguntas objetivas se
     toman de las evaluaciones y recuperaciones de los módulos de la etapa). */
  stageTasks: {
    1: {
      speak: { title: 'Presentación personal y rutina', time: 120, prompt: 'Talk for two minutes: who you are, where you live, what you do every day, what you are doing these days, and what you can and can\'t do well.', useful: ["I'm…", 'I usually…', 'At the moment I\'m…', 'I can… but I can\'t…', 'There is a… near my home'], criteria: ['Usé be, presente simple y presente continuo', 'Hice al menos una pregunta retórica o de cierre', 'Hablé 2 minutos'] },
      write: { title: 'Correo de presentación', task: 'Write an email (80–100 words) to a new language-exchange partner. Introduce yourself, describe your routine and your home, and ask three questions.', words: '80–100', checklist: ['Saludo y despedida', 'Presente simple con -s en tercera persona', 'There is / there are', 'Tres preguntas correctas'] },
    },
    2: {
      speak: { title: 'Anécdota y planes', time: 150, prompt: 'Tell a story about a trip or a memorable day (past simple and past continuous). Then explain your plans for next year and give a recommendation to a friend.', useful: ['It happened when…', 'While I was…', "I'm going to…", 'You should…', 'It was better than…'], criteria: ['Secuencia clara (first, then, after that, in the end)', 'Pasado regular e irregular correcto', 'Futuro y un consejo'] },
      write: { title: 'Reseña de experiencia', task: 'Write a review (120–150 words) of a place you visited: what you did, what was good or bad, a comparison with another place and advice for future visitors.', words: '120–150', checklist: ['Pasado simple', 'Comparativo o superlativo', 'Should / have to', 'Párrafos'] },
    },
    3: {
      speak: { title: 'Opinión y problema', time: 180, prompt: 'Your team must choose between working from home or from the office. Give your opinion, compare advantages and disadvantages, use a conditional, and propose a solution.', useful: ['In my opinion…', 'On the other hand…', 'If we…, we would…', 'The main reason is that…', 'What I suggest is…'], criteria: ['Opinión justificada con dos razones', 'Condicional 1 o 2 correcto', 'Propuesta final'] },
      write: { title: 'Correo formal de problema', task: 'Write an email (150–180 words) to a service provider explaining a problem (what happened, what has been done, what you want). Use at least one passive and one reported sentence.', words: '150–180', checklist: ['Registro formal', 'Present perfect', 'Pasiva', 'Estilo indirecto', 'Petición clara'] },
    },
    4: {
      speak: { title: 'Presentación argumentada', time: 240, prompt: 'Give a 4-minute talk: "Should companies allow a four-day work week?" Present both sides, take a position, refer to a past experience (past modals or third conditional), and conclude.', useful: ['It could be argued that…', 'Having said that…', 'If they had…, they would have…', 'What really matters is…', 'To sum up…'], criteria: ['Estructura de presentación', 'Marcadores de discurso variados', 'Condicional 3 o mixto', 'Conclusión clara'] },
      write: { title: 'Ensayo argumentativo', task: 'Write an essay (220–260 words): "Technology makes us less patient." Introduction, two body paragraphs (one for each side), conclusion with your position.', words: '220–260', checklist: ['Tesis clara', 'Contraargumento y refutación', 'Linking words formales', 'Registro neutro-formal'] },
    },
    5: {
      speak: { title: 'Síntesis y debate', time: 300, prompt: 'Summarize two opposing views on AI in education (from module 18 materials), evaluate the evidence, express degrees of certainty, and defend a nuanced position. 5 minutes.', useful: ['Broadly speaking…', 'There is some evidence that…', 'It would be an oversimplification to say…', 'I am inclined to think…', 'That said…'], criteria: ['Síntesis fiel de ambas posturas', 'Atenuación y grados de certeza', 'Posición matizada con condiciones', 'Registro y cohesión avanzados'] },
      write: { title: 'Informe con recomendaciones', task: 'Write a report (280–320 words) for a manager evaluating a remote-onboarding program: purpose, findings, limitations, recommendations.', words: '280–320', checklist: ['Encabezados', 'Lenguaje impersonal y pasiva', 'Hedging adecuado', 'Recomendaciones accionables'] },
    },
  },
};
