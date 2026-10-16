/* Banco de speaking por nivel y tema + técnicas para superar bloqueos.
   Todo funciona en solitario: cuenta atrás, grabadora opcional y rúbrica. */
window.EM = window.EM || {};
EM.speakingBank = {
  method: `
<ol>
<li><b>Lee la pregunta y piensa 20 segundos</b> (no escribas el texto completo: solo 3 palabras clave).</li>
<li><b>Habla el tiempo indicado sin parar.</b> Si falta una palabra, usa una técnica de rescate (abajo). No vuelvas al español.</li>
<li><b>Grábate</b> (si tu navegador lo permite) o usa la grabadora del teléfono.</li>
<li><b>Escúchate</b> con la rúbrica: ¿fluidez?, ¿estructura objetivo?, ¿3+ expresiones del módulo?</li>
<li><b>Repite la misma pregunta</b> una segunda vez intentando mejorar UNA cosa (técnica 4/3/2: misma respuesta en 4, 3 y 2 minutos en niveles altos, o 90/60/45 s en niveles iniciales).</li>
<li><b>Registra</b> los errores que detectes en “Mis errores” o en la reflexión de la lección.</li>
</ol>
<p class="small">Progresión del monólogo: A1+ 30–60 s · A2 1–2 min · B1 2–3 min · B2 3–4 min · C1 4–5 min con estructura y matices.</p>`,

  techniques: [
    {
      name: 'Paraphrasing', es: 'Decirlo con otras palabras',
      explain: 'Si no recuerdas una palabra o estructura, expresa la misma idea de forma más sencilla. Lo importante es que el mensaje llegue.',
      phrases: ['In other words…', 'What I mean is…', 'Basically,…', 'To put it simply,…'],
      example: 'I forgot the word "unemployed": <i>He doesn\'t have a job at the moment. What I mean is, he\'s looking for work.</i>',
      drill: 'Explica sin decir la palabra: <i>landlord, receipt, deadline, fridge, sunburn</i>.',
    },
    {
      name: 'Fillers', es: 'Muletillas naturales para ganar tiempo',
      explain: 'Los hablantes nativos también hacen pausas, pero las llenan con expresiones naturales en lugar de silencio o "eeeh" en español.',
      phrases: ['Well,…', 'Let me think…', 'How can I put it?', "That's a good question.", 'You know,…', 'I mean,…', 'Kind of…'],
      example: '<i>Well, let me think… I guess the main reason is that…</i>',
      drill: 'Responde 5 preguntas del banco empezando siempre con un filler diferente.',
    },
    {
      name: 'Asking for clarification', es: 'Pedir aclaraciones',
      explain: 'Pedir que repitan o aclaren es una habilidad de comunicación, no un fracaso. Úsala en vez de fingir que entendiste.',
      phrases: ['Sorry, could you say that again?', 'Could you speak a bit more slowly, please?', 'What do you mean by…?', 'Do you mean…?', 'Sorry, I didn\'t catch that.', 'How do you spell that?'],
      example: 'A: <i>The meeting\'s been pushed back.</i> B: <i>Sorry, what do you mean by "pushed back"? Is it later?</i>',
      drill: 'Escucha un diálogo a velocidad natural y pausa en cada línea: formula una pregunta de aclaración distinta.',
    },
    {
      name: 'Self-correction', es: 'Autocorrección',
      explain: 'Si notas un error mientras hablas, corrígete rápido y sigue. Muestra control sin detener la conversación.',
      phrases: ['Sorry, I mean…', 'I mean…', 'Let me rephrase that.', 'Or rather,…', 'Sorry, what I meant was…'],
      example: '<i>Yesterday I go— sorry, I went to the bank.</i>',
      drill: 'Graba 1 minuto sobre ayer. Al escucharlo, anota cada error y vuelve a grabar corrigiéndote en voz alta.',
    },
    {
      name: 'Rephrasing', es: 'Reformular para confirmar',
      explain: 'Reformula lo que dijo la otra persona para comprobar que entendiste, o reformula tu propia idea si no te entendieron.',
      phrases: ['So, what you\'re saying is…', 'If I understand correctly,…', 'Let me put it another way.', 'So basically you mean…?'],
      example: '<i>So, if I understand correctly, you need the report by Friday, not Monday?</i>',
      drill: 'Lee una línea de cualquier diálogo del curso y reformúlala empezando con “So, what you\'re saying is…”.',
    },
    {
      name: 'Circumlocution', es: 'Describir lo que no sabes nombrar',
      explain: 'Describe el objeto o concepto: categoría, función, forma, lugar o ejemplo. Muy útil en viajes y trabajo.',
      phrases: ["It's a kind of…", "It's something you use to…", "It's the person who…", "It's a place where…", "It looks like…", "It's similar to…, but…", "I don't know the word, but…"],
      example: '<i>I need… I don\'t know the word, it\'s a thing you use to open a bottle of wine.</i> → <b>a corkscrew</b>',
      drill: 'Describe en 20 segundos cada uno sin nombrarlo: <i>charger, stapler, plumber, pharmacy, ladder</i>.',
    },
  ],

  levels: [
    {
      id: 'A1+', stages: [0, 1], time: 60,
      desc: 'Frases simples y conectadas con and, but, because. Habla 30–60 segundos.',
      structure: 'respuesta directa → 2 detalles → una frase final.',
      topics: [
        { topic: 'About you', qs: ['What is your name and where are you from?', 'What do you do? Do you work or study?', 'Describe your family.', 'How old are the people in your family?', 'What is your favorite food and why?', 'What languages do you speak?', 'What do you like about your city?', 'What is your phone like? Describe it.'] },
        { topic: 'Daily routine', qs: ['What time do you usually get up?', 'What do you usually have for breakfast?', 'How do you get to work or school?', 'What do you do in the evening?', 'What do you do on weekends?', 'How often do you exercise?', 'Describe a typical Monday.', 'What do you never do on Sundays?'] },
        { topic: 'Home and places', qs: ['Describe your home. How many rooms are there?', 'What is there near your home?', 'Describe your bedroom.', 'Where do you usually buy food?', 'Is there a park near your house? What is it like?', 'Describe your favorite place in your city.'] },
        { topic: 'Now and abilities', qs: ['What are you doing right now?', 'What are you wearing today?', 'What can you do well?', "What can't you do but want to learn?", 'Can you cook? What can you make?', 'What is happening in your street at the moment?'] },
      ],
      tasks: ['Preséntate en 60 segundos como si fuera una videollamada de trabajo.', 'Describe una foto de tu galería en 45 segundos: ¿quién, dónde, qué hay?', 'Explica tu rutina de un lunes de principio a fin en 60 segundos.'],
    },
    {
      id: 'A2', stages: [2], time: 90,
      desc: 'Pasado, futuro, comparaciones y consejos. Habla 1–2 minutos con secuencia (first, then, after that).',
      structure: 'contexto → secuencia de hechos → opinión o sentimiento → cierre.',
      topics: [
        { topic: 'Past experiences', qs: ['What did you do last weekend?', 'Tell me about your last vacation.', 'Describe a happy day from your childhood.', 'What was your first job? What did you do there?', 'Tell me about a time you got lost.', 'What did you study at school? Did you like it?', 'Describe the best meal you ever had.', 'What happened the last time you were very late?'] },
        { topic: 'Plans and future', qs: ['What are you going to do next weekend?', 'Where are you going to travel next year?', 'What do you think will change in your city in 10 years?', 'What are your plans for your career?', 'Invite a friend to do something this Saturday. Explain the plan.'] },
        { topic: 'Comparing', qs: ['Compare your city with another city you know.', 'Which is better: living in a house or an apartment?', 'Compare two jobs you know.', 'What is the most beautiful place in your country?', 'Compare traveling by bus and by plane.', 'Which season do you like most and why?'] },
        { topic: 'Advice and rules', qs: ['What should a tourist do in your city?', 'What are the rules at your workplace?', 'What do you have to do every week that you don\'t enjoy?', 'Give advice to someone who wants to learn English.', 'What should people do to stay healthy?'] },
        { topic: 'Experiences', qs: ['Have you ever been on a plane? Tell me about it.', 'What is the most interesting thing you have ever done?', 'Have you ever met someone famous?', 'What were you doing at 8 p.m. yesterday?', 'Tell me about a funny thing that happened to you.'] },
      ],
      tasks: ['Cuenta una anécdota en 90 segundos usando first, then, after that, in the end.', 'Deja un mensaje de voz de 1 minuto cancelando un plan y proponiendo otro.', 'Compara dos teléfonos o laptops y recomienda uno (1–2 min).'],
    },
    {
      id: 'B1', stages: [3], time: 150,
      desc: 'Opiniones justificadas, hipótesis, experiencias y problemas. 2–3 minutos con conectores.',
      structure: 'postura → razón 1 + ejemplo → razón 2 + ejemplo → contraargumento → conclusión.',
      topics: [
        { topic: 'Life changes', qs: ['How has your life changed in the last five years?', 'What have you been doing lately to improve your skills?', 'Describe a decision that changed your life.', 'How long have you lived in your current home? How has the area changed?', 'What had you done before you started your current job?'] },
        { topic: 'Hypotheticals', qs: ['What would you do if you won a lot of money?', 'If you could live in any country, where would you live and why?', 'What will you do if you get a better job offer abroad?', 'If you could change one thing about your city, what would it be?', 'What would happen if everyone worked from home?'] },
        { topic: 'Work and technology', qs: ['Describe your ideal job. What would you do?', 'How is technology changing the way people work?', 'Explain how an app you use every day works.', 'What skills are important for software developers?', 'Tell me about a problem you solved at work or school.', 'Should companies let employees work from home?'] },
        { topic: 'Opinions', qs: ['Is social media good or bad for teenagers?', 'Should public transport be free?', 'Are video games a waste of time?', 'Is it better to rent or to buy a home?', 'Should everyone learn to code?', 'Do people work too much nowadays?'] },
        { topic: 'Problems and solutions', qs: ['Your flight is canceled. Explain the problem and ask for a solution.', 'A colleague never answers your messages. What do you do?', 'Your neighbor makes noise every night. How do you handle it?', 'You bought a product online and it arrived broken. Call customer service.'] },
      ],
      tasks: ['Explica a un compañero nuevo cómo funciona tu trabajo o tus estudios (3 min).', 'Defiende una opinión y luego defiende la contraria (2 min cada una).', 'Narra una noticia que leíste esta semana con past simple, past perfect y reported speech.'],
    },
    {
      id: 'B2', stages: [4], time: 210,
      desc: 'Argumentación, especulación, reflexión sobre el pasado y registro profesional. 3–4 minutos.',
      structure: 'contexto → tesis → argumentos con evidencia → concesión y refutación → conclusión / recomendación.',
      topics: [
        { topic: 'Reflection and regret', qs: ['What would you have done differently in your education?', 'Describe a mistake that taught you something important.', 'If you had chosen a different career, where would you be now?', 'What do you wish you had known at 18?', 'Tell me about a time you should have spoken up but didn\'t.'] },
        { topic: 'Debate', qs: ['Should AI be allowed to make hiring decisions?', 'Is remote work making people more or less productive?', 'Should university education be free?', 'Are cities becoming too expensive for young people?', 'Does tourism do more harm than good?', 'Should there be limits on how much people use smartphones?'] },
        { topic: 'Professional', qs: ['Tell me about yourself (job interview).', 'Describe a project you are proud of: your role, the challenge and the result.', 'How do you handle disagreement in a team?', 'Explain a technical concept to someone without a technical background.', 'Present a proposal to improve a process at your workplace.', 'How do you prioritize when everything is urgent?'] },
        { topic: 'Speculation', qs: ['Why do you think so many startups fail?', 'What might work look like in 2040?', 'Why might someone leave a well-paid job?', 'Who do you think built the first cities, and why there?'] },
      ],
      tasks: ['Simula una entrevista: responde 5 preguntas de “Professional” con el método STAR (Situation, Task, Action, Result).', 'Presenta una propuesta de 4 minutos con diapositiva imaginaria: problema, solución, costos, riesgos.', 'Graba un argumento de 3 minutos y luego uno de 2 con la misma idea (técnica 4/3/2).'],
    },
    {
      id: 'C1', stages: [5, 6], time: 270,
      desc: 'Matiz, síntesis y persuasión. Gestiona ideas complejas con precisión y flexibilidad. 4–5 minutos.',
      structure: 'encuadre del tema → síntesis de posturas → evaluación crítica → posición matizada → implicaciones.',
      topics: [
        { topic: 'Society and ethics', qs: ['To what extent should governments regulate technology companies?', 'Is meritocracy a myth?', 'Can economic growth be sustainable indefinitely?', 'How should societies balance privacy and security?', 'Is it ethical to use AI-generated content without disclosure?'] },
        { topic: 'Synthesis', qs: ['Summarize the strongest arguments for and against universal basic income.', 'Explain two competing views on how people learn languages and evaluate them.', 'Compare the benefits and risks of open-source software for businesses.', 'Summarize a long article or talk you consumed this week and evaluate its argument.'] },
        { topic: 'Leadership and work', qs: ['What distinguishes a good manager from a great leader?', 'How would you persuade a skeptical team to adopt a new technology?', 'Describe a situation where data alone was not enough to make a decision.', 'How should companies measure productivity in knowledge work?'] },
        { topic: 'Abstract', qs: ['Is it possible to be completely objective?', 'Does language shape the way we think?', 'What is the value of failure?', 'Why do people resist change even when it benefits them?'] },
      ],
      tasks: ['Expón 5 minutos un tema complejo para un público no experto, con analogías.', 'Debate contigo mismo: 2 min a favor, 2 en contra, 1 min de síntesis matizada.', 'Reformula un párrafo técnico en tres registros: académico, profesional y conversacional.'],
    },
  ],
};
