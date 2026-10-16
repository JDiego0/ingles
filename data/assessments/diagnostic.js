/* Diagnóstico inicial: preguntas por banda (A1–B2), lectura, escucha (texto a voz),
   escritura y expresión oral autoevaluadas, y descriptores "puedo…".
   Cada ítem lleva el tema y el módulo donde se trabaja, para el plan de nivelación. */
(function () {
  function D(item, topic, mod) {
    item.topic = topic;
    item.mod = mod;
    return item;
  }
  EM.diagnostic = {
    intro: `
<p><b>Duración:</b> 45–60 minutos. Puedes hacerlo en dos días: lo que compruebes queda guardado.</p>
<p><b>Instrucciones:</b> no uses diccionario ni traductor. <b>Si no sabes una respuesta, déjala en blanco</b> en lugar de adivinar: así el plan de nivelación será más preciso. Las preguntas van de más fácil (A1) a más difícil (B2); es normal no saber las últimas.</p>
<p><b>Qué obtendrás:</b> un porcentaje por banda de nivel, una estimación orientativa, el módulo recomendado para empezar y una lista de temas para reforzar.</p>
<p class="small muted"><b>Limitaciones:</b> es una prueba breve; la expresión oral y escrita se autoevalúan; no hay examinador. No equivale a un nivel oficial del MCER.</p>`,
    parts: [
      {
        id: 'A1', lvl: 'A1', skill: 'grammar', title: 'Parte 1 · Gramática y vocabulario (A1)',
        items: [
          D(MC('My sister ___ a nurse.', ['is', 'are', 'am', 'be'], 0, 'She/he/it → is.'), 'Verbo to be', 'm01'),
          D(MC('___ you from Colombia?', ['Do', 'Are', 'Is', 'Does'], 1, 'Preguntas con be: invertir el verbo (Are you…?).'), 'Preguntas con be', 'm01'),
          D(MC('He ___ in a bank.', ['work', 'works', 'working', 'is work'], 1, 'Tercera persona del presente simple: -s.'), 'Presente simple (3.ª persona)', 'm02'),
          D(MC('___ she like coffee?', ['Do', 'Is', 'Does', 'Are'], 2, 'Preguntas en presente simple con he/she/it: Does.'), 'Auxiliares do/does', 'm02'),
          D(MC('There ___ two chairs in the kitchen.', ['is', 'are', 'be', 'has'], 1, 'Plural → there are.'), 'There is / there are', 'm03'),
          D(MC('This is ___ car. (= de nosotros)', ['us', 'our', 'we', 'ours'], 1, 'Adjetivo posesivo antes del sustantivo: our car.'), 'Adjetivos posesivos', 'm01'),
          D(MC('I ___ swim, but I can\'t dive.', ['can', 'am', 'do', 'have'], 0, 'Habilidad: can + verbo base.'), 'Can / can\'t', 'm04'),
          D(MC('Look! It ___.', ['rains', 'is raining', 'rain', 'raining'], 1, 'Acción en este momento: presente continuo.'), 'Presente continuo', 'm04'),
          D(MC('I have ___ apple and ___ banana.', ['a / a', 'an / a', 'an / an', 'a / an'], 1, 'an antes de sonido vocálico (an apple), a antes de consonante.'), 'Artículos a/an', 'm03'),
          D(MC('We usually have dinner ___ 8 o\'clock.', ['in', 'on', 'at', 'to'], 2, 'Horas: at.'), 'Preposiciones de tiempo', 'm02'),
        ],
      },
      {
        id: 'A2', lvl: 'A2', skill: 'grammar', title: 'Parte 2 · Gramática y vocabulario (A2)',
        items: [
          D(MC('I ___ to the cinema last Saturday.', ['go', 'went', 'gone', 'was go'], 1, 'Pasado de go: went.'), 'Pasado simple irregular', 'm05'),
          D(MC('___ you see the match yesterday?', ['Did', 'Do', 'Were', 'Was'], 0, 'Preguntas en pasado simple: Did + sujeto + verbo base.'), 'Preguntas en pasado', 'm05'),
          D(MC('Look at those clouds. It ___ rain.', ["'s going to", 'will to', 'rains', 'is raining to'], 0, 'Predicción con evidencia presente: going to.'), 'Futuro con going to', 'm06'),
          D(MC('My brother is ___ than me.', ['tall', 'more tall', 'taller', 'tallest'], 2, 'Adjetivo corto: -er + than.'), 'Comparativos', 'm07'),
          D(MC('How ___ water do you drink a day?', ['many', 'much', 'lot', 'few'], 1, 'Water es incontable: how much.'), 'Cuantificadores (much/many)', 'm07'),
          D(MC('You ___ smoke here. It\'s forbidden.', ["mustn't", "don't have to", "shouldn't to", 'not must'], 0, 'Prohibición: mustn\'t. Don\'t have to = no es necesario.'), 'Must / have to', 'm08'),
          D(MC('I enjoy ___ to music.', ['listen', 'to listen', 'listening', 'listened'], 2, 'Enjoy + -ing.'), 'Gerundio después de verbos', 'm08'),
          D(MC('Have you ever ___ sushi?', ['eat', 'ate', 'eaten', 'eating'], 2, 'Present perfect: have + participio (eaten).'), 'Present perfect (experiencias)', 'm09'),
          D(MC('I ___ TV when the phone rang.', ['watched', 'was watching', 'am watching', 'watch'], 1, 'Acción en progreso interrumpida: past continuous.'), 'Past continuous', 'm09'),
          D(MC('It\'s cold in here. I ___ close the window.', ["'ll", "'m going", 'am', 'going to'], 0, 'Decisión espontánea en el momento: will (\'ll).'), 'Futuro con will', 'm06'),
        ],
      },
      {
        id: 'B1', lvl: 'B1', skill: 'grammar', title: 'Parte 3 · Gramática y vocabulario (B1)',
        items: [
          D(MC('I ___ here since 2019.', ['live', 'am living', 'have lived', 'lived'], 2, 'Desde un punto del pasado hasta ahora: present perfect + since.'), 'Present perfect con for/since', 'm10'),
          D(MC('When I arrived at the cinema, the film ___.', ['already started', 'had already started', 'has already started', 'was already start'], 1, 'Acción anterior a otra en el pasado: past perfect.'), 'Past perfect', 'm10'),
          D(MC('If I ___ more time, I would learn the guitar.', ['have', 'had', 'would have', 'will have'], 1, 'Segundo condicional: if + pasado, would + verbo.'), 'Segundo condicional', 'm11'),
          D(MC('If it rains tomorrow, we ___ at home.', ['stay', 'would stay', 'will stay', 'stayed'], 2, 'Primer condicional: if + presente, will + verbo.'), 'Primer condicional', 'm11'),
          D(MC('The woman ___ lives next door is a doctor.', ['which', 'who', 'what', 'whose'], 1, 'Personas: who (o that).'), 'Oraciones de relativo', 'm11'),
          D(MC('This bridge ___ in 1920.', ['built', 'was built', 'is built', 'has build'], 1, 'Pasiva en pasado: was/were + participio.'), 'Voz pasiva', 'm12'),
          D(MC('She said she ___ tired.', ['is', 'was being', 'was', 'has'], 2, 'Estilo indirecto: el presente “I am” suele pasar a “was”.'), 'Estilo indirecto', 'm12'),
          D(MC('Can you ___ the music down? I\'m working.', ['turn', 'put', 'take', 'make'], 0, 'Turn down = bajar el volumen.'), 'Phrasal verbs', 'm12'),
          D(MC('He isn\'t answering. I\'m not sure why; he ___ be busy.', ['must', 'might', "can't", 'has to'], 1, 'Posibilidad sin certeza: might / may / could.'), 'Modales de probabilidad', 'm13'),
          D(MC('I\'m looking forward to ___ you.', ['see', 'seeing', 'saw', 'be seeing'], 1, 'Look forward to + -ing (to es preposición).'), 'Verb patterns', 'm13'),
        ],
      },
      {
        id: 'B2', lvl: 'B2', skill: 'grammar', title: 'Parte 4 · Gramática y vocabulario (B2)',
        items: [
          D(MC('If I had studied harder, I ___ the exam.', ['would pass', 'would have passed', 'had passed', 'will pass'], 1, 'Tercer condicional: if + past perfect, would have + participio.'), 'Tercer condicional', 'm14'),
          D(MC('You ___ told me! I would have helped you.', ['should have', 'must have', 'could', 'should'], 0, 'Crítica sobre el pasado: should have + participio.'), 'Modales en pasado', 'm14'),
          D(MC('I wish I ___ speak Japanese.', ['can', 'could', 'would', 'will'], 1, 'Deseo sobre el presente: wish + pasado (could).'), 'Wish / if only', 'm14'),
          D(MC('Not only ___ late, but he also forgot the documents.', ['he was', 'was he', 'he is', 'did he was'], 1, 'Inversión tras “Not only” al inicio.'), 'Inversión y énfasis', 'm15'),
          D(MC('___ the bad weather, the event was a success.', ['Although', 'Despite', 'However', 'Even'], 1, 'Despite + sustantivo; although + oración.'), 'Linking words', 'm15'),
          D(MC('She ___ have left already; her coat isn\'t here.', ['must', 'can', 'should', 'would'], 0, 'Deducción casi segura sobre el pasado: must have.'), 'Deducción en pasado', 'm14'),
          D(MC('By the time we get there, the meeting ___.', ['will finish', 'will have finished', 'finishes', 'has finished'], 1, 'Acción terminada antes de un momento futuro: future perfect.'), 'Contrastes de tiempos', 'm14'),
          D(MC('The report is ___ to be published next week.', ['expected', 'expecting', 'expects', 'expect'], 0, 'Pasiva impersonal: be expected to.'), 'Pasiva en contextos variados', 'm16'),
          D(MC('Which is the most appropriate in a formal email to a client?', ['We need to sort this out ASAP.', 'We would appreciate it if this could be resolved promptly.', 'Fix this now, please.', 'Can you, like, fix this?'], 1, 'Registro formal: estructuras indirectas y corteses.'), 'Registro formal/informal', 'm15'),
          D(MC('If I hadn\'t missed the bus, I ___ at home now.', ['would be', 'would have been', 'will be', 'am'], 0, 'Condicional mixto: pasado → consecuencia presente.'), 'Condicional mixto', 'm14'),
        ],
      },
      {
        id: 'rA2', lvl: 'A2', skill: 'reading', title: 'Parte 5 · Lectura (A2)',
        text: `Laura is 29 and she works as a graphic designer. Last year she moved from a small town to Chicago because she got a job at a big company. At first, it was difficult. She didn't know anyone, and the apartment was very expensive, so she shared it with two other women.

Now she is happier. She goes to a Spanish conversation group every Thursday, where she has made some good friends. She takes the train to work, which is faster than driving. On weekends, she likes walking by the lake. The only thing she doesn't like is the winter: it is much colder than in her hometown.`,
        items: [
          D(TF('Laura moved to Chicago for a job.', true, '“because she got a job at a big company”.'), 'Comprensión lectora A2', 'm05'),
          D(TF('She lived alone in her first apartment.', false, 'She shared it with two other women.'), 'Comprensión lectora A2', 'm05'),
          D(MC('How does Laura go to work?', ['By car', 'By train', 'On foot', 'By bus'], 1, '“She takes the train to work”.'), 'Comprensión lectora A2', 'm02'),
          D(MC('Where did she make friends?', ['At work', 'At a conversation group', 'By the lake', 'In her apartment'], 1, '“a Spanish conversation group… where she has made some good friends”.'), 'Comprensión lectora A2', 'm09'),
          D(MC('What doesn\'t she like about Chicago?', ['The trains', 'The lake', 'The winter', 'Her job'], 2, '“The only thing she doesn\'t like is the winter”.'), 'Comprensión lectora A2', 'm07'),
        ],
      },
      {
        id: 'rB1', lvl: 'B1', skill: 'reading', title: 'Parte 6 · Lectura (B1)',
        text: `When Bright Software introduced a four-day week two years ago, many managers expected productivity to fall. Instead, the company reports that projects are delivered on time more often than before. The reason, according to its CEO, is that meetings have been reduced to a minimum and employees protect long blocks of time for focused work.

However, not everyone is convinced. Some employees say that the four days have become more intense and stressful, and that they sometimes answer messages on Fridays "just to keep up". Customer support, which needs to be available five days a week, has had to organize shifts, which some staff find complicated.

The company has decided to continue the experiment for another year, but it will survey employees every three months to check workload and well-being.`,
        items: [
          D(MC('What did many managers expect?', ['Productivity would increase', 'Productivity would decrease', 'Employees would quit', 'Meetings would be longer'], 1, '“expected productivity to fall”.'), 'Comprensión lectora B1', 'm12'),
          D(MC('According to the CEO, why has it worked?', ['People work longer hours', 'There are fewer meetings and more focused time', 'They hired more people', 'Customers are more patient'], 1, '“meetings have been reduced… long blocks of time for focused work”.'), 'Comprensión lectora B1', 'm12'),
          D(MC('What problem do some employees mention?', ['They earn less money', 'The days feel more intense', 'They have more meetings', 'They work on Saturdays'], 1, '“the four days have become more intense and stressful”.'), 'Comprensión lectora B1', 'm13'),
          D(MC('Why does customer support have shifts?', ['It must be available five days a week', 'It has too many employees', 'The CEO asked for it', 'Customers complained'], 0, '“needs to be available five days a week”.'), 'Comprensión lectora B1', 'm12'),
          D(MC('What will the company do next?', ['Stop the experiment', 'Return to five days', 'Continue and survey employees regularly', 'Reduce salaries'], 2, '“continue the experiment… survey employees every three months”.'), 'Comprensión lectora B1', 'm11'),
        ],
      },
      {
        id: 'rB2', lvl: 'B2', skill: 'reading', title: 'Parte 7 · Lectura (B2)',
        text: `"Digital minimalism" is often presented as a simple matter of willpower: delete a few apps, turn off notifications, and you will regain your attention. Yet this framing arguably places the burden on individuals while ignoring the fact that many applications are deliberately designed to maximize engagement. Telling people to resist a product engineered by teams of specialists is, at best, an incomplete solution.

That is not to say personal habits are irrelevant. Small changes, such as keeping the phone out of the bedroom, have been linked by some researchers to better sleep. But if we are serious about protecting attention, the conversation needs to include design standards and, perhaps, regulation — not merely self-help advice.`,
        items: [
          D(MC('What is the writer\'s main point?', ['Willpower is enough to control phone use', 'Responsibility should not rest only on individuals', 'Apps should be banned', 'Personal habits do not matter'], 1, 'Critica que la carga recaiga solo en el individuo.'), 'Inferencia (B2)', 'm15'),
          D(MC('“At best, an incomplete solution” suggests the writer thinks individual effort is…', ['useless', 'insufficient on its own', 'the best solution', 'dangerous'], 1, 'Incompleta, no inútil.'), 'Matices de opinión', 'm17'),
          D(MC('How does the writer treat personal habits?', ['Rejects them completely', 'Accepts they can help', 'Says they cause problems', 'Does not mention them'], 1, '“That is not to say personal habits are irrelevant”.'), 'Concesión', 'm15'),
          D(MC('The word “merely” in the last sentence means…', ['only', 'mostly', 'never', 'especially'], 0, 'merely = solamente.'), 'Vocabulario avanzado', 'm17'),
        ],
      },
      {
        id: 'lA2', lvl: 'A2', skill: 'listening', title: 'Parte 8 · Escucha (A2)',
        context: 'A phone call to a hotel. Escucha dos veces sin leer.',
        lines: [
          ['Receptionist', 'Good afternoon, Lakeview Hotel. How can I help you?'],
          ['Carlos', "Hi. I'd like to book a room for two nights, please. Next Friday and Saturday."],
          ['Receptionist', 'Sure. A single or a double room?'],
          ['Carlos', "A double, please. It's for me and my wife."],
          ['Receptionist', "OK. A double room is 120 dollars a night, and breakfast is included."],
          ['Carlos', "Great. Is there parking? We're going to drive."],
          ['Receptionist', "Yes, there is. It's free for guests. Can I have your name, please?"],
          ['Carlos', "Carlos Mendez. M-E-N-D-E-Z."],
          ['Receptionist', "Thank you, Mr. Mendez. Check-in is from 3 p.m."],
        ],
        items: [
          D(MC('How many nights does Carlos want?', ['One', 'Two', 'Three', 'Four'], 1, '“for two nights”.'), 'Escucha: números y detalles', 'm03'),
          D(MC('How much is the room per night?', ['$102', '$112', '$120', '$220'], 2, '“120 dollars a night”.'), 'Escucha: números y precios', 'm03'),
          D(TF('Breakfast costs extra.', false, '“breakfast is included”.'), 'Escucha: detalles', 'm07'),
          D(MC('How will Carlos travel?', ['By train', 'By plane', 'By car', 'By bus'], 2, '“We\'re going to drive”.'), 'Escucha: planes futuros', 'm06'),
        ],
      },
      {
        id: 'lB1', lvl: 'B1', skill: 'listening', title: 'Parte 9 · Escucha (B1)',
        context: 'A voice message from a team leader. Escucha dos veces sin leer.',
        lines: [
          ['Megan', "Hi Daniel, it's Megan. Listen, there's been a change of plans for tomorrow."],
          ['Megan', "The client called this morning and asked us to move the demo from ten to two o'clock, because their manager can't make it in the morning."],
          ['Megan', "That actually works out well, because it gives us more time to fix the bug in the login page."],
          ['Megan', "Could you check with Priya whether the fix has been tested? If it hasn't, I'd rather we didn't show that feature at all."],
          ['Megan', "Oh, and the meeting room on the third floor is booked, so we'll use the one on the fifth floor instead."],
          ['Megan', "Give me a call when you get this. Thanks!"],
        ],
        items: [
          D(MC('Why has the demo been moved?', ['The team is not ready', 'The client\'s manager isn\'t available in the morning', 'The room is booked', 'Megan is sick'], 1, '“their manager can\'t make it in the morning”.'), 'Escucha: razones', 'm13'),
          D(MC('What time is the demo now?', ['10:00', '12:00', '2:00 p.m.', '5:00 p.m.'], 2, '“from ten to two o\'clock”.'), 'Escucha: detalles', 'm06'),
          D(MC('What does Megan want Daniel to do?', ['Fix the bug himself', 'Ask Priya if the fix was tested', 'Call the client', 'Book a room'], 1, '“check with Priya whether the fix has been tested”.'), 'Escucha: peticiones', 'm12'),
          D(MC('What will happen if the fix hasn\'t been tested?', ['They\'ll cancel the demo', 'They won\'t show the feature', 'They\'ll show it anyway', 'They\'ll change the date'], 1, '“I\'d rather we didn\'t show that feature at all”.'), 'Escucha: condiciones', 'm11'),
        ],
      },
    ],
    writing: {
      title: 'Escritura libre (10–12 min)',
      task: 'Write as much as you can (60–150 words): <b>introduce yourself</b>, describe <b>what you did last weekend</b>, and explain <b>one plan or goal</b> for next year and <b>why</b> it is important to you.',
      words: '60–150',
      checklist: ['Escribí sin traductor', 'Usé presente, pasado y futuro', 'Conecté ideas (and, but, because, so)', 'Revisé la -s de tercera persona y los pasados'],
      model: '<p><b>Ejemplo A2:</b> My name is Ana and I\'m 31. I live in Bogotá and I work in an office. Last weekend I visited my parents. We cooked lunch together and in the evening I watched a movie. Next year I\'m going to look for a new job because I want to work with technology.</p><p><b>Ejemplo B1:</b> I\'m Ana, a 31-year-old accountant from Bogotá, although I\'ve been learning to code for a year. Last weekend I finally finished a small web project, which made me really proud, and on Sunday I went hiking with some friends. Next year I\'d like to move into software development, because I enjoy solving problems and I think it would give me more opportunities to work remotely.</p>',
    },
    speaking: {
      title: 'Expresión oral guiada (8–10 min)',
      context: 'Responde en voz alta. Si puedes, grábate. Pasa a la siguiente pregunta cuando ya no puedas continuar.',
      goal: 'Ver hasta qué nivel puedes hablar sin preparación.',
      prompt: 'Answer each question. Speak for up to one minute per question.',
      questions: ['Introduce yourself. What do you do and what do you like doing?', 'Describe your last vacation or a special day. What happened?', 'If you could change one thing about your city, what would it be and why?', 'Some people say technology is making us less social. Do you agree? Give reasons and examples.'],
      time: 60,
      criteria: ['¿En qué pregunta empezaste a bloquearte o a usar español?', '¿Pudiste hablar un minuto completo en las preguntas 1 y 2?', '¿Usaste pasado en la 2 y condicional en la 3?'],
    },
    cando: [
      ['A1', 'Puedo presentarme y dar información personal básica (nombre, origen, trabajo, familia).'],
      ['A1', 'Puedo preguntar y responder sobre mi rutina diaria con frases simples.'],
      ['A2', 'Puedo contar qué hice el fin de semana con varias frases conectadas.'],
      ['A2', 'Puedo comprar, pedir comida o preguntar direcciones y resolver problemas simples.'],
      ['A2', 'Puedo entender mensajes y anuncios cortos, claros y lentos.'],
      ['B1', 'Puedo dar mi opinión sobre un tema conocido y justificarla con razones.'],
      ['B1', 'Puedo narrar una experiencia con detalles, sentimientos y orden lógico.'],
      ['B1', 'Puedo entender las ideas principales de una conversación clara sobre temas cotidianos o de trabajo.'],
      ['B2', 'Puedo explicar ventajas y desventajas de varias opciones y defender una postura.'],
      ['B2', 'Puedo seguir conversaciones entre nativos a velocidad normal con algo de esfuerzo.'],
      ['B2', 'Puedo participar en reuniones de trabajo, aclarar malentendidos y negociar.'],
      ['C1', 'Puedo expresarme con fluidez y espontaneidad, sin buscar expresiones de forma evidente.'],
      ['C1', 'Puedo entender textos largos y exigentes y captar significados implícitos.'],
    ],
  };
})();
