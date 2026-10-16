/* M12 · Work, Tech and Information — voz pasiva, estilo indirecto, correos y phrasal verbs. */
EM.registerModule({
  id: 'm12',
  stage: 3,
  cefr: 'B1',
  title: 'Work, Tech and Information',
  es: 'Pasiva, estilo indirecto, correos y phrasal verbs',
  summary: 'El inglés del trabajo y la tecnología: explicar procesos con la voz pasiva (It\'s made… / It was sent…), transmitir lo que otros dijeron o preguntaron (She said that… / He asked if…), escribir correos claros y profesionales, y dominar los phrasal verbs más frecuentes en el trabajo y la tecnología (set up, log in, back up, figure out, follow up…).',
  objectives: [
    'Explicar procesos y hechos cuando el agente no importa (voz pasiva).',
    'Informar de lo que alguien dijo, preguntó o pidió (estilo indirecto).',
    'Escribir correos de trabajo claros con el registro adecuado.',
    'Usar 20 phrasal verbs frecuentes del trabajo y la tecnología.',
  ],
  prereq: ['M10–M11.', 'Participios (M09).'],
  outcomes: [
    'Puedo formar la pasiva en presente, pasado, present perfect y con modales.',
    'Puedo transformar afirmaciones, preguntas y peticiones a estilo indirecto con los cambios de tiempo necesarios.',
    'Puedo distinguir say y tell y usar ask (someone) to…',
    'Puedo escribir un correo de seguimiento de 120 palabras con estructura profesional.',
    'Puedo explicar un problema técnico usando phrasal verbs.',
  ],
  errors: [
    ['The package was send yesterday.', 'The package was sent yesterday.', 'Pasiva con participio.'],
    ['It is made in China by people. (agente innecesario)', "It's made in China.", 'Solo menciona el agente si importa.'],
    ['She said me that…', 'She told me that… / She said that…', 'tell + persona; say sin persona.'],
    ['He asked me where was the office.', 'He asked me where the office was.', 'Pregunta indirecta: orden afirmativo.'],
    ['She asked me if I can help.', 'She asked me if I could help.', 'Cambio de tiempo.'],
    ['He told me do it.', 'He told me to do it.', 'tell/ask + persona + to.'],
    ['Please, find attached the file. (informal en exceso o calco)', 'Please find the file attached. / I\'ve attached the file.', 'Fórmulas de correo.'],
  ],
  transfer: '<p>Esta semana, escribe en inglés al menos un correo o mensaje real de trabajo (o una simulación muy realista) usando una pasiva y un phrasal verb. Explica a alguien en voz alta cómo se hace un producto que usas (café, pan, una app) con la voz pasiva.</p>',
  lessons: [
    /* ---------------- L1 ---------------- */
    {
      title: "It's Made in… — The Passive",
      goal: 'Explicar procesos y hechos con la voz pasiva (presente, pasado, present perfect, modales) cuando lo importante es la acción, no quién la hace.',
      outcome: 'Explicas el proceso de fabricación o entrega de un producto en 6–8 pasos con la pasiva.',
      check: 'Lectura y práctica ≥ 80 %; explicación de un proceso grabada.',
      agenda: [
        [5, 'Activación', 'Repaso de M11'],
        [15, 'Reading', '“From the farm to your cup”'],
        [10, 'Vocabulario', 'Procesos y producción'],
        [10, 'Gramática', 'Voz pasiva: be + participio'],
        [12, 'Speaking', 'Explica un proceso'],
        [8, 'Pronunciación', 'Participios en -ed y was/were débiles'],
      ],
      warmup: {
        items: [
          GAP("M11: If I ___ (have) time, I'd help you.", 'had'),
          GAP("M11: It's a place ___ you can buy tools.", 'where'),
          FIX('M11: I am agree.', ['I agree.']),
        ],
      },
      input: {
        kind: 'reading',
        title: 'From the farm to your cup',
        context: 'An article from a coffee company\'s website explains how its coffee is produced.',
        task1: 'Skim: how many steps are there between the farm and your cup?',
        task2: 'Read again and underline every passive (is/are/was/were/has been/can be + participle). Who does each action? Is it important?',
        text: `Have you ever wondered how your morning coffee gets to you? It's a long journey.

<b>1. Growing.</b> Our coffee is grown on small farms in the mountains of Colombia and Peru, between 1,200 and 2,000 meters above sea level. Most of the plants are grown in the shade of taller trees.

<b>2. Picking.</b> The coffee "cherries" are picked by hand when they are red. A good picker can collect up to 100 kilos a day.

<b>3. Processing.</b> The beans are removed from the cherries, washed and dried in the sun for about two weeks.

<b>4. Shipping.</b> Then the dry beans are packed in big bags and sent to our roasting facility in Portland. Last year, more than 400 tons were shipped.

<b>5. Roasting.</b> Here, the beans are roasted at around 200 °C. Each batch is tasted by our team before it is approved.

<b>6. Your cup.</b> Finally, the coffee is packed in recyclable bags and delivered to stores. It can be ground at home or in the store.

Since 2018, all our farmers have been paid at least 30% above the market price. This project was started because we believe great coffee should be fair coffee.`,
        glossary: [['grown', 'cultivado'], ['in the shade', 'a la sombra'], ['picked', 'recogido'], ['beans', 'granos'], ['roasted', 'tostado'], ['batch', 'lote'], ['ground', 'molido (grind–ground)'], ['fair', 'justo']],
      },
      comp: [
        MC('Where is the coffee grown?', ['In Portland', 'In the mountains of Colombia and Peru', 'In Brazil', 'In the city'], 1, ''),
        MC('How are the cherries picked?', ['By machines', 'By hand', 'By the roasting team', 'They fall'], 1, ''),
        MC('How long are the beans dried?', ['Two days', 'About two weeks', 'Two months', 'One hour'], 1, ''),
        MC('Where are the beans roasted?', ['On the farm', 'In Portland', 'In the stores', 'At home'], 1, ''),
        MC('What happens before a batch is approved?', ['It is tasted by the team', 'It is sent to Peru', 'It is washed', 'Nothing'], 0, ''),
        TF('Farmers have been paid below the market price since 2018.', false, 'At least 30% above.'),
      ],
      chunks: [
        V("It's made / grown / produced in …", 'Se fabrica / cultiva / produce en…', "It's grown in Colombia.", 'Se cultiva en Colombia.', {}),
        V('… is picked / done by hand', 'se recoge / hace a mano', 'The cherries are picked by hand.', 'Las cerezas se recogen a mano.', {}),
        V('Have you ever wondered …?', '¿Alguna vez te has preguntado…?', 'Have you ever wondered how your phone is made?', '¿Te has preguntado cómo se fabrica tu teléfono?', {}),
        V('get to you', 'llegarte', 'How does your package get to you?', '¿Cómo te llega el paquete?', {}),
        V('up to …', 'hasta…', 'A picker can collect up to 100 kilos.', 'Un recolector puede recoger hasta 100 kilos.', {}),
        V('be sent to …', 'ser enviado a…', 'The bags are sent to Portland.', 'Las bolsas se envían a Portland.', {}),
        V('be approved', 'ser aprobado', 'Each batch is approved by the team.', 'Cada lote es aprobado por el equipo.', {}),
        V('can be + participle', 'puede ser… / se puede…', 'It can be ground at home.', 'Se puede moler en casa.', {}),
        V('above / below the market price', 'por encima / debajo del precio de mercado', 'Farmers are paid above the market price.', 'A los agricultores se les paga por encima del precio de mercado.', {}),
        V('This project was started because …', 'Este proyecto se inició porque…', 'The app was created because people needed it.', 'La app se creó porque la gente la necesitaba.', {}),
      ],
      grammar: {
        title: 'The passive voice: be + past participle',
        meaning: 'The focus is on the <b>action or the object</b>, not on who does it (because it is unknown, obvious or unimportant).',
        when: 'Processes, news, reports, product descriptions, formal writing, instructions.',
        form: '<table><tr><th>Tense</th><th>Passive</th><th>Example</th></tr><tr><td>Present simple</td><td>am/is/are + participle</td><td>Coffee is grown in Colombia.</td></tr><tr><td>Past simple</td><td>was/were + participle</td><td>400 tons were shipped last year.</td></tr><tr><td>Present perfect</td><td>has/have been + participle</td><td>Farmers have been paid fairly since 2018.</td></tr><tr><td>Future / modals</td><td>will be / can be / must be + participle</td><td>It can be ground at home.</td></tr><tr><td>Present continuous</td><td>am/is/are being + participle</td><td>The website is being updated.</td></tr></table><p class="small">Use <b>by</b> + agent only when it matters: <i>Each batch is tasted <b>by our team</b></i>. Questions: <i>Where is it made? When was it sent?</i></p>',
        examples: [
          ['Our coffee is grown on small farms.', 'Nuestro café se cultiva en pequeñas fincas.'],
          ['The cherries are picked by hand.', 'Las cerezas se recogen a mano.'],
          ['More than 400 tons were shipped last year.', 'El año pasado se enviaron más de 400 toneladas.'],
          ['All our farmers have been paid above the market price.', 'A todos los agricultores se les ha pagado por encima del mercado.'],
          ['It can be ground at home.', 'Se puede moler en casa.'],
        ],
        spanish: 'El español usa mucho la pasiva refleja con “se” (“se cultiva”, “se enviaron”). En inglés no existe ese “se”: se usa la pasiva con <i>be</i> (<i>is grown, were sent</i>) o un sujeto general (<i>they / people / you</i>). No traduzcas “se” por “it”: “Se habla inglés” = <i>English is spoken</i>.',
        errors: [
          ['The coffee is grow in Peru.', 'The coffee is grown in Peru.', 'Participio.'],
          ['It was build in 1920.', 'It was built in 1920.', 'build–built–built.'],
          ['Is spoken English here.', 'English is spoken here.', 'Sujeto primero.'],
          ['The email sent yesterday.', 'The email was sent yesterday.', 'Falta be.'],
          ['It was made by someone in a factory.', 'It was made in a factory.', 'Agente innecesario.'],
        ],
      },
      practice: [
        EX('Activa → pasiva', 'grammar', 'Reescribe en voz pasiva (sin agente si no es importante).', [
          TR('They grow coffee in Colombia.', ['Coffee is grown in Colombia.'], ''),
          TR('Someone stole my bike yesterday.', ['My bike was stolen yesterday.'], ''),
          TR('They have updated the app.', ['The app has been updated.'], ''),
          TR('You can download the file here.', ['The file can be downloaded here.'], ''),
          TR('The team tests every batch.', ['Every batch is tested by the team.', 'Every batch is tested.'], 'Aquí el agente puede ser relevante.'),
          TR('They built this bridge in 1890.', ['This bridge was built in 1890.'], ''),
        ]),
        EX('Completa en pasiva', 'grammar', '', [
          GAP('English ___ (speak) in many countries.', 'is spoken'),
          GAP('The meeting ___ (cancel) yesterday.', 'was canceled', 'También “cancelled” (UK).'),
          GAP('Your order ___ (ship) tomorrow.', 'will be shipped'),
          GAP('Three new stores ___ (open) since January.', 'have been opened'),
          GAP('These phones ___ (make) in Vietnam.', 'are made'),
          GAP('The report must ___ (send) before Friday.', 'be sent'),
        ]),
        EX('¿Activa o pasiva?', 'grammar', 'Elige la forma más natural.', [
          MC('Our office ___ in 2015.', ['was opened', 'opened by someone'], 0, ''),
          MC('My grandfather ___ this house.', ['built', 'was built'], 0, 'Sujeto que hace la acción y es importante.'),
          MC('Where ___ your phone made?', ['was', 'did'], 0, ''),
          MC('The thief ___ by the police last night.', ['was caught', 'caught'], 0, ''),
          FIX('The package was send last week.', ['The package was sent last week.'], ''),
        ]),
      ],
      semi: {
        task: 'Elige un producto que conozcas (arepas, pan, una app, vino, chocolate) y escribe 6 pasos de su proceso en pasiva.',
        frames: ['First, … is/are…', 'Then, … is/are…', 'After that,…', 'Finally,…', '… can be…', 'Since…, … has been…'],
        examples: ['First, the corn is cooked and ground.', 'Then, the dough is mixed with water and salt.', 'After that, small balls are made by hand.', 'They are flattened and cooked on a hot pan.', 'Finally, the arepas are served with cheese or eggs.', 'They can be eaten for breakfast, lunch or dinner.'],
      },
      speak: [
        {
          title: 'Explica un proceso',
          context: 'Un visitante extranjero te pregunta cómo se hace un producto típico de tu país, o un cliente cómo funciona un proceso de tu trabajo.',
          goal: 'Explicar un proceso ordenado con la voz pasiva.',
          prompt: '<p>Explain how something is made, produced or delivered (food, a product, a service). 6–8 steps, with sequencing words.</p>',
          useful: ['First,…', 'Then / After that,…', '… is/are + participle', '… is done by hand / by machine', 'It can be…', 'Finally,…'],
          time: 90,
          criteria: ['be + participio correcto', 'Participios irregulares', 'Agente solo si importa', 'Secuencia clara'],
          model: "Let me explain how an online order is delivered in my company. First, the order is received by our system and payment is confirmed. Then, the products are picked from the shelves and packed in a box. After that, a label is printed and the box is weighed. The packages are collected by the delivery company every afternoon at four. Most orders are delivered in 48 hours. Finally, an email is sent to the customer with the tracking number. If there's a problem, it can be solved through the chat.",
          second: 'Explica cómo se celebra una fiesta tradicional de tu país con pasivas (“Special food is prepared…”).',
        },
      ],
      pron: {
        title: 'Participios y was/were débiles',
        explain: '<p>En la pasiva, el participio es la palabra fuerte; <i>is/are/was/were</i> son débiles: <i>It was <b>BUILT</b> in 1890</i> /ɪt wəz ˈbɪlt/. Repasa la -ed: <i>picked</i> /pɪkt/, <i>washed</i> /wɑʃt/, <i>approved</i> /əˈpruːvd/, <i>tasted</i> /ˈteɪstɪd/. Irregulares frecuentes: <i>made, sent, built, grown /groʊn/, sold, paid, written, chosen</i>.</p>',
        drill: ["It's <b>GROWN</b> in Co<b>LOM</b>bia.", 'The <b>CHER</b>ries are <b>PICKED</b> by <b>HAND</b>.', 'More than four hundred tons were <b>SHIPPED</b>.', 'Each batch is <b>TAST</b>ed /ɪd/.'],
        items: [
          MC('¿Cuántas sílabas tiene “picked”?', ['1', '2'], 0, ''),
          MC('¿Cuántas sílabas tiene “tasted”?', ['1', '2'], 1, ''),
          SAY('The beans are roasted in Portland.', MC('¿Dónde se tuestan?', ['En Colombia', 'En Portland', 'En casa'], 1, '')),
        ],
      },
      shadow: ['Have you ever wondered how your morning coffee gets to you?', 'Our coffee is grown on small farms in the mountains.', 'The coffee cherries are picked by hand.', 'Last year, more than 400 tons were shipped.', 'It can be ground at home or in the store.'],
      retrieval: [
        ES('Se cultiva en Perú.', ["It's grown in Peru.", 'It is grown in Peru.'], ''),
        ES('Mi bici fue robada ayer.', ['My bike was stolen yesterday.'], ''),
        ES('La app ha sido actualizada.', ['The app has been updated.'], ''),
        ES('Se puede descargar aquí.', ['It can be downloaded here.'], ''),
        ES('Aquí se habla inglés.', ['English is spoken here.'], ''),
        ES('El edificio se construyó en 1920.', ['The building was built in 1920.'], ''),
      ],
      review: [
        GAP("If it ___ (rain), we'll stay home.", 'rains'),
        GAP("It's the app ___ I use for work.", ['that', 'which']),
        MC('M10: I ___ here since 2020.', ["'ve worked", 'work'], 0, ''),
      ],
      transfer: 'Lee la etiqueta en inglés de un producto (ropa, comida, electrónica) y encuentra frases en pasiva (“Made in…”, “Designed in…”).',
    },

    /* ---------------- L2 ---------------- */
    {
      title: 'She Said That… — Reported Statements',
      goal: 'Transmitir lo que otra persona dijo (reported speech) con say / tell y los cambios de tiempos, pronombres y referencias.',
      outcome: 'Resumes a un compañero lo que dijo un cliente o jefe en una llamada, con 6 frases en estilo indirecto.',
      check: 'Práctica ≥ 80 %; resumen grabado de una llamada.',
      agenda: [
        [5, 'Activación', 'Pasiva'],
        [15, 'Listening', '“What did the client say?”'],
        [10, 'Vocabulario', 'Verbos para informar: say, tell, explain, mention'],
        [10, 'Gramática', 'Reported speech: cambios de tiempo y referencias'],
        [12, 'Speaking', 'Resume una conversación'],
        [8, 'Pronunciación', 'said /sɛd/, told + shadowing'],
      ],
      warmup: {
        items: [
          GAP('The bridge ___ (build) in 1890.', 'was built'),
          TR('They clean the office every day. (pasiva)', ['The office is cleaned every day.'], ''),
          MC('Your order will ___ tomorrow.', ['be delivered', 'delivered'], 0, ''),
        ],
      },
      input: {
        kind: 'dialogue',
        title: 'What did the client say?',
        context: 'Rachel just had a call with an important client, Mr. Grant. Now she tells her colleague Sam what he said.',
        task1: 'Listen without reading. Is the client happy or unhappy? Why?',
        task2: 'Listen with the transcript. Underline said / told / explained / mentioned. Then write what Mr. Grant\'s exact words probably were.',
        lines: DLG([
          ['Sam', "So, how was the call with Mr. Grant? What did he say?", 'Bueno, ¿qué tal la llamada con el Sr. Grant? ¿Qué dijo?'],
          ['Rachel', "Well, he said he was happy with the design, but he wasn't happy with the delays.", 'Pues dijo que estaba contento con el diseño, pero no con los retrasos.'],
          ['Sam', "Did he mention the budget?", '¿Mencionó el presupuesto?'],
          ['Rachel', "Yes. He told me that his company had already spent more than they had planned.", 'Sí. Me dijo que su empresa ya había gastado más de lo planeado.'],
          ['Sam', "Uh-oh. Is he going to cancel the contract?", 'Uy. ¿Va a cancelar el contrato?'],
          ['Rachel', "No, don't worry. He said they would continue, but he wanted a clear schedule by Friday.", 'No, tranquilo. Dijo que continuarían, pero que quería un calendario claro para el viernes.'],
          ['Sam', "That's fair. Anything else?", 'Es justo. ¿Algo más?'],
          ['Rachel', "He explained that his boss was coming to the presentation next week, so everything had to be perfect.", 'Explicó que su jefe vendría a la presentación la semana siguiente, así que todo tenía que ser perfecto.'],
          ['Sam', "Next week? I thought it was next month!", '¿La semana que viene? ¡Pensaba que era el mes que viene!'],
          ['Rachel', "So did I. He also said that he could send us the new data the next day. That's today, so check your email.", 'Yo también. También dijo que nos podía enviar los datos nuevos al día siguiente. Es hoy, así que mira tu correo.'],
          ['Sam', "OK. I'll tell the team that we need to finish the schedule by Thursday night.", 'Vale. Le diré al equipo que tenemos que terminar el calendario el jueves por la noche.'],
        ]),
      },
      comp: [
        MC('What was the client happy with?', ['The delays', 'The design', 'The budget', 'The schedule'], 1, ''),
        MC('What did he say about the budget?', ['It was fine', 'His company had already spent more than planned', 'He had no budget', 'He would pay more'], 1, ''),
        TF('The client is going to cancel the contract.', false, 'He said they would continue.'),
        MC('What does he want by Friday?', ['A new design', 'A clear schedule', 'A discount', 'A meeting'], 1, ''),
        MC('Who is coming to the presentation?', ['His wife', 'His boss', 'A new client', 'Nobody'], 1, ''),
        MC('When is the presentation?', ['Next month', 'Next week', 'Tomorrow', 'Today'], 1, ''),
      ],
      chunks: [
        V('He said (that) …', 'Dijo que…', 'He said he was happy with the design.', 'Dijo que estaba contento con el diseño.', { use: 'say + (that) + frase. Sin persona.' }),
        V('She told me (that) …', 'Me dijo que…', 'She told me that she was busy.', 'Me dijo que estaba ocupada.', { use: 'tell + persona + (that).' }),
        V('He explained that …', 'Explicó que…', 'He explained that his boss was coming.', 'Explicó que su jefe venía.', {}),
        V('Did he mention …?', '¿Mencionó…?', 'Did she mention the price?', '¿Mencionó el precio?', {}),
        V('by Friday', 'para el viernes (como tarde)', 'We need it by Friday.', 'Lo necesitamos para el viernes.', { use: 'by = no más tarde de; until = hasta (continuidad).' }),
        V('the next day / the following week', 'al día siguiente / la semana siguiente', 'He said he would call the next day.', 'Dijo que llamaría al día siguiente.', {}),
        V("That's fair.", 'Es justo / razonable.', 'He wants a schedule? That\'s fair.', '¿Quiere un calendario? Es razonable.', {}),
        V('So did I. / Neither did I.', 'Yo también / Yo tampoco (pasado).', 'I thought it was next month. — So did I.', 'Pensé que era el mes que viene. — Yo también.', {}),
        V('Uh-oh.', 'Uy… (problema)', "Uh-oh. Is he angry?", 'Uy. ¿Está enfadado?', {}),
        V('spend more than planned', 'gastar más de lo previsto', 'We spent more than we had planned.', 'Gastamos más de lo previsto.', {}),
      ],
      grammar: {
        title: 'Reported statements (indirect speech)',
        meaning: 'We report what someone said, usually moving the tense <b>one step back</b> when the reporting verb is in the past (said, told).',
        when: 'Summarizing meetings, calls, emails; telling stories; news.',
        form: '<table><tr><th>Direct</th><th>Reported (said that…)</th></tr><tr><td>present: “I <b>am</b> happy.”</td><td>he was happy</td></tr><tr><td>present continuous: “His boss <b>is coming</b>.”</td><td>his boss was coming</td></tr><tr><td>past / present perfect: “We <b>spent</b> / <b>have spent</b> too much.”</td><td>they had spent too much</td></tr><tr><td>will: “We <b>will</b> continue.”</td><td>they would continue</td></tr><tr><td>can: “I <b>can</b> send it.”</td><td>he could send it</td></tr><tr><td>must / have to: “It <b>has to</b> be perfect.”</td><td>it had to be perfect</td></tr></table><p class="small">Also change pronouns and references: <i>today → that day, tomorrow → the next day, next week → the following week, here → there, this → that</i>. If the information is still true, you can keep the tense: <i>He said he likes the design</i>. <b>say</b> vs <b>tell</b>: <i>He said (that)… / He told <b>me</b> (that)…</i>; never “said me”.</p>',
        examples: [
          ["He said he was happy with the design.", '“I\'m happy with the design.”'],
          ['He told me that they had already spent more than planned.', '“We\'ve already spent more than planned.”'],
          ['He said they would continue.', '“We will continue.”'],
          ['He explained that his boss was coming next week.', '“My boss is coming next week.”'],
          ['He said he could send the data the next day.', '“I can send the data tomorrow.”'],
        ],
        spanish: 'Funciona como en español (“Dijo que estaba contento”, “Dijo que vendría”): el tiempo retrocede. Lo que más falla es <b>say/tell</b>: “Me dijo” = <i>He told me</i> (no “He said me”).',
        errors: [
          ['He said me that he was tired.', 'He told me that he was tired.', ''],
          ['She told that she was busy.', 'She said that she was busy.', 'tell necesita persona.'],
          ["He said he will call tomorrow. (contado días después)", 'He said he would call the next day.', ''],
          ['She said she can come.', 'She said she could come.', 'Cambio habitual.'],
        ],
      },
      practice: [
        EX('say o tell', 'grammar', '', [
          GAP('She ___ me that she was leaving.', 'told'),
          GAP('He ___ that the meeting was canceled.', 'said'),
          GAP('Can you ___ me the time?', 'tell'),
          GAP('What did the doctor ___?', 'say'),
          GAP('They ___ us the truth.', 'told'),
          GAP('I ___ goodbye and left.', 'said', 'say goodbye / hello / sorry.'),
        ]),
        EX('Pasa a estilo indirecto', 'grammar', 'Empieza con “She said (that)…”.', [
          TR('“I am tired.”', ['She said she was tired.', 'She said that she was tired.'], ''),
          TR('“I will call you tomorrow.”', ['She said she would call me the next day.', 'She said that she would call me the next day.', 'She said she would call me the following day.'], ''),
          TR('“We have finished the report.”', ['She said they had finished the report.', 'She said that they had finished the report.'], ''),
          TR('“I can\'t come to the meeting.”', ["She said she couldn't come to the meeting.", "She said that she couldn't come to the meeting.", 'She said she could not come to the meeting.'], ''),
          TR('“My boss is coming next week.”', ['She said her boss was coming the following week.', 'She said that her boss was coming the following week.', 'She said her boss was coming the next week.'], ''),
          TR('“I lost my keys.”', ['She said she had lost her keys.', 'She said that she had lost her keys.', 'She said she lost her keys.'], 'Past → past perfect (o se mantiene en habla informal).'),
        ]),
        EX('Corrige', 'grammar', '', [
          FIX('He said me that he was sick.', ['He told me that he was sick.', 'He told me he was sick.', 'He said that he was sick.'], ''),
          FIX('She told that the shop was closed.', ['She said that the shop was closed.', 'She said the shop was closed.', 'She told me that the shop was closed.'], ''),
          FIX('He said he will be late. (ayer)', ['He said he would be late.'], ''),
          FIX('They told me they can help.', ['They told me they could help.'], ''),
        ]),
      ],
      semi: {
        task: 'Recuerda una conversación real reciente (con tu jefe, un amigo, un médico). Escribe 5 frases de lo que te dijeron con said, told, explained y mentioned.',
        frames: ['He/She said (that)…', 'He/She told me (that)…', 'He/She explained that…', 'He/She mentioned that…'],
        examples: ['My manager said the project was going well.', 'She told me that I had to present it to the director.', 'She explained that the director was very busy.', 'She mentioned that there would be a bonus if we finished early.', "My mom told me she couldn't come on Sunday."],
      },
      speak: [
        {
          title: 'Resume una llamada',
          context: 'Hablaste con un cliente/proveedor/médico. Ahora informas a otra persona.',
          goal: 'Transmitir información con estilo indirecto, say/tell correctos y cambios de tiempo.',
          prompt: '<p>Read the "call notes" (direct speech) and report them to your colleague in 60–90 seconds.</p><p><i>Client: "I\'m not happy with the price. We can\'t pay more than $5,000. We\'ve received another offer. I\'ll decide on Monday. My team is testing your demo this week. You have to send the contract today."</i></p>',
          useful: ['He said (that)…', 'He told me (that)…', 'He explained that…', 'He also mentioned that…', 'So we need to…'],
          time: 90,
          criteria: ['say/tell correctos', 'Tiempos retrocedidos', 'Pronombres y referencias cambiados', 'Conclusión práctica'],
          model: "OK, so I talked to the client. He said he wasn't happy with the price. He told me they couldn't pay more than five thousand dollars, and he mentioned that they had received another offer. He said he would decide on Monday. He also explained that his team was testing our demo that week. And he told me we had to send the contract that day. So we need to send it this afternoon, and maybe offer a small discount.",
          second: 'Cuenta a un amigo lo que te dijo tu médico o tu casero la última vez (real o inventado).',
        },
      ],
      pron: {
        title: 'said /sɛd/, told /toʊld/, would',
        explain: '<p><i>said</i> rima con <i>red</i> /sɛd/ (no “seid”). <i>told</i> /toʊld/ tiene diptongo /oʊ/ y una l oscura. <i>that</i> en “said that” es débil /ðət/, y a menudo se omite. <i>would</i> se reduce a /wəd/ o \'d: <i>He said he\'d call</i>.</p>',
        drill: ['He <b>SAID</b> he was <b>HAP</b>py. /sɛd/', 'She <b>TOLD</b> me that she was <b>BU</b>sy.', "He said he'd <b>CALL</b> the next <b>DAY</b>.", 'He ex<b>PLAINED</b> that his <b>BOSS</b> was <b>COM</b>ing.'],
        items: [
          MC('“said” rima con…', ['paid', 'red', 'side'], 1, ''),
          SAY("She told me she'd be late.", MC('¿Qué dijo?', ['Que llegaría tarde', 'Que no vendría', 'Que llegó tarde ayer'], 0, '')),
          SAY('He said that he had already paid.', MC('¿Había pagado?', ['Sí, ya había pagado', 'No'], 0, '')),
        ],
      },
      shadow: ['He said he was happy with the design.', 'He told me that his company had already spent more than they had planned.', 'He said they would continue, but he wanted a clear schedule by Friday.', 'He explained that his boss was coming to the presentation next week.', 'I thought it was next month! — So did I.'],
      retrieval: [
        ES('Me dijo que estaba cansada.', ['She told me she was tired.', 'She told me that she was tired.'], ''),
        ES('Dijo que llamaría al día siguiente.', ['He said he would call the next day.', "He said he'd call the next day.", 'He said that he would call the next day.'], ''),
        ES('Explicó que su jefe venía.', ['He explained that his boss was coming.', 'She explained that her boss was coming.'], ''),
        ES('¿Mencionó el precio?', ['Did he mention the price?', 'Did she mention the price?'], ''),
        ES('Lo necesitamos para el viernes.', ['We need it by Friday.'], ''),
        ES('Pensé que era el lunes. — Yo también.', ['I thought it was Monday. — So did I.', 'I thought it was Monday. So did I.'], ''),
      ],
      review: [
        GAP('The email ___ (send) yesterday.', 'was sent'),
        TR('They have fixed the bug. (pasiva)', ['The bug has been fixed.'], ''),
        GAP("M11: If I ___ (be) you, I'd call her.", ['were', 'was']),
      ],
      transfer: 'Después de tu próxima reunión o llamada, escribe en inglés 3 frases de lo que dijo la otra persona.',
    },

    /* ---------------- L3 ---------------- */
    {
      title: 'He Asked If… — Reported Questions, Requests and Emails',
      goal: 'Transmitir preguntas y peticiones (asked if / asked me to) y escribir correos de trabajo claros con fórmulas adecuadas.',
      outcome: 'Escribes un correo de seguimiento después de una reunión resumiendo preguntas y peticiones.',
      check: 'Lectura y práctica ≥ 80 %; correo de seguimiento escrito y leído en voz alta.',
      agenda: [
        [5, 'Activación', 'Reported statements'],
        [15, 'Reading', '“Three emails after a meeting”'],
        [10, 'Vocabulario', 'Fórmulas de correo profesional'],
        [10, 'Gramática', 'Reported questions and requests'],
        [12, 'Speaking', 'Informar de preguntas y peticiones'],
        [8, 'Pronunciación', 'Lectura en voz alta de un correo + shadowing'],
      ],
      warmup: {
        items: [
          MC('She ___ me that she was busy.', ['told', 'said'], 0, ''),
          TR('“I will help you.” → He said…', ['He said he would help me.', "He said he'd help me.", 'He said that he would help me.'], ''),
          GAP('He said that he ___ (can) come.', 'could'),
        ],
      },
      input: {
        kind: 'reading',
        title: 'Three emails after a meeting',
        context: 'After a meeting with a new client, Laura (account manager at a marketing agency in Austin) exchanges emails with her team and the client.',
        task1: 'Skim: who writes each email and what is its purpose?',
        task2: 'Read again. Underline reported questions (asked if/whether/where…) and reported requests (asked … to…). Note the opening and closing formulas.',
        text: `<b>Email 1 — From Laura to the team</b>
Subject: Notes from today's meeting with GreenBox
Hi team,
Quick summary of today's meeting. The client asked whether we could launch the campaign in May instead of June. They also asked how much the video would cost and if we had worked with food brands before. Their director asked us to send two design options by Wednesday.
Could you please check your availability for May and let me know by tomorrow?
Thanks,
Laura

<b>Email 2 — From Laura to the client</b>
Subject: Follow-up: campaign timeline and budget
Dear Mr. Hill,
Thank you for meeting with us today. As promised, I am following up on the questions you asked. We can launch in May if we receive the final product photos by April 10th. I have attached our price list for video production. And yes, we have worked with several food brands; you can find two case studies in the attached file.
We will send you two design options by Wednesday, as requested.
Please let me know if you have any further questions.
Best regards,
Laura Méndez

<b>Email 3 — From the client</b>
Subject: Re: Follow-up: campaign timeline and budget
Hi Laura,
Thanks for the quick reply. I'll send the photos next week. One more question: would it be possible to have a short call on Thursday?
Best,
Daniel Hill`,
        glossary: [['whether', 'si (= if, más formal)'], ['availability', 'disponibilidad'], ['as promised', 'como prometí'], ['follow up on', 'dar seguimiento a'], ['attached', 'adjunto'], ['case studies', 'casos de éxito'], ['as requested', 'según lo solicitado']],
      },
      comp: [
        MC('What did the client ask about the launch?', ['If it could be in May instead of June', 'If it could be in July', 'If it was canceled', 'Nothing'], 0, ''),
        MC('What did the director ask the agency to do?', ['Call him', 'Send two design options by Wednesday', 'Lower the price', 'Make a video'], 1, ''),
        MC('What does Laura ask her team?', ['To send designs', 'To check their availability for May', 'To call the client', 'To write case studies'], 1, ''),
        MC('What is the condition for launching in May?', ['A bigger budget', 'Receiving the product photos by April 10th', 'A call on Thursday', 'Hiring a new designer'], 1, ''),
        MC('Which email is the most formal?', ['Email 1', 'Email 2', 'Email 3'], 1, ''),
        MC('What does the client want in his last email?', ['A discount', 'A short call on Thursday', 'More case studies', 'New photos'], 1, ''),
      ],
      chunks: [
        V('I am following up on …', 'Le escribo para dar seguimiento a…', "I'm following up on our conversation last week.", 'Le escribo para retomar nuestra conversación de la semana pasada.', { col: 'follow up = dar seguimiento' }),
        V('Thank you for meeting with us.', 'Gracias por reunirse con nosotros.', 'Thank you for meeting with us today.', 'Gracias por reunirse hoy con nosotros.', {}),
        V('As promised, …', 'Como le prometí,…', "As promised, here is the report.", 'Como prometí, aquí está el informe.', {}),
        V('I have attached … / Please find … attached.', 'Adjunto… / Encontrará… adjunto.', "I've attached the price list.", 'Adjunto la lista de precios.', {}),
        V('as requested', 'según lo solicitado', 'We will send two options, as requested.', 'Enviaremos dos opciones, según lo solicitado.', {}),
        V('Could you please … and let me know by …?', '¿Podrían… y avisarme antes de…?', 'Could you please check and let me know by Friday?', '¿Podrían revisarlo y avisarme antes del viernes?', {}),
        V('Please let me know if you have any further questions.', 'Quedo a su disposición para cualquier pregunta.', 'Please let me know if you have any further questions.', 'No dude en escribirme si tiene más preguntas.', {}),
        V('Would it be possible to …?', '¿Sería posible…?', 'Would it be possible to have a short call?', '¿Sería posible tener una llamada corta?', {}),
        V('Quick summary of …', 'Resumen rápido de…', "Quick summary of today's meeting.", 'Resumen rápido de la reunión de hoy.', { use: 'Informal, entre compañeros.' }),
        V('Thanks for the quick reply.', 'Gracias por la rápida respuesta.', 'Thanks for the quick reply, Laura.', 'Gracias por responder tan rápido, Laura.', {}),
      ],
      grammar: {
        title: 'Reported questions and requests',
        meaning: 'Reporting what someone <b>asked</b> or <b>asked someone to do</b>.',
        when: 'Meeting notes, emails, telling someone about a conversation.',
        form: '<table><tr><th>Direct</th><th>Reported</th></tr><tr><td>Yes/No question: “<b>Can</b> you launch in May?”</td><td>He asked <b>if / whether</b> we <b>could</b> launch in May.</td></tr><tr><td>Wh- question: “How much <b>will</b> the video cost?”</td><td>He asked how much the video <b>would</b> cost.</td></tr><tr><td>Request: “Please send two options.”</td><td>He asked us <b>to send</b> two options.</td></tr><tr><td>Negative request: “Don\'t call after six.”</td><td>She asked me <b>not to</b> call after six.</td></tr><tr><td>Order: “Finish it today.”</td><td>He told me <b>to finish</b> it that day.</td></tr></table><p class="small">In reported questions, use <b>statement word order</b> (subject + verb) and no question mark: <i>He asked where <b>the office was</b></i> (not “where was the office”). No <i>do/does/did</i>: <i>She asked what I wanted</i>.</p>',
        examples: [
          ['The client asked whether we could launch in May.', '“Can you launch in May?”'],
          ['They asked how much the video would cost.', '“How much will the video cost?”'],
          ['They asked if we had worked with food brands before.', '“Have you worked with food brands before?”'],
          ['Their director asked us to send two design options.', '“Please send two design options.”'],
          ['She asked me not to call after six.', '“Don\'t call after six, please.”'],
        ],
        spanish: 'Como en español (“Preguntó si podíamos…”, “Nos pidió que enviáramos…”). Atención: “pedir que + subjuntivo” = <i>ask someone <b>to</b> + verb</i>: “Me pidió que lo llamara” = <i>He asked me to call him</i>. Y en las preguntas indirectas no se invierte el orden.',
        errors: [
          ['He asked me where was the station.', 'He asked me where the station was.', 'Orden afirmativo.'],
          ['She asked me if I can help.', 'She asked me if I could help.', ''],
          ['He asked me that I send it.', 'He asked me to send it.', ''],
          ['She asked what did I want.', 'She asked what I wanted.', 'Sin did.'],
          ['He told me don\'t be late.', 'He told me not to be late.', ''],
        ],
      },
      practice: [
        EX('Preguntas indirectas', 'grammar', 'Empieza con “She asked (me)…”.', [
          TR('“Are you free on Friday?”', ['She asked me if I was free on Friday.', 'She asked if I was free on Friday.', 'She asked me whether I was free on Friday.'], ''),
          TR('“Where do you work?”', ['She asked me where I worked.', 'She asked where I worked.'], ''),
          TR('“Have you finished the report?”', ['She asked me if I had finished the report.', 'She asked if I had finished the report.', 'She asked me whether I had finished the report.'], ''),
          TR('“How much does it cost?”', ['She asked how much it cost.', 'She asked me how much it cost.'], ''),
          TR('“Can you send me the file?”', ['She asked me if I could send her the file.', 'She asked if I could send her the file.', 'She asked me to send her the file.'], ''),
        ]),
        EX('Peticiones y órdenes', 'grammar', 'Usa asked/told + persona + (not) to.', [
          TR('Boss to me: “Finish the report today.” → My boss told me…', ['My boss told me to finish the report that day.', 'My boss told me to finish the report today.'], ''),
          TR('Client to us: “Please send two options.” → The client asked us…', ['The client asked us to send two options.'], ''),
          TR('Neighbor to me: “Please don\'t park here.” → My neighbor asked me…', ['My neighbor asked me not to park there.', 'My neighbor asked me not to park here.'], ''),
          FIX('He asked me that I call him.', ['He asked me to call him.'], ''),
          FIX('She asked me where was the meeting room.', ['She asked me where the meeting room was.'], ''),
        ]),
        EX('Fórmulas de correo', 'writing', 'Elige la opción adecuada para un correo profesional a un cliente.', [
          MC('Saludo formal:', ['Dear Mr. Hill,', 'Hey Hill!', 'Hello friend,'], 0, ''),
          MC('Para dar seguimiento:', ['I am following up on our meeting.', 'I write you for the meeting thing.', 'Remember the meeting?'], 0, ''),
          MC('Para adjuntar:', ["I've attached the proposal.", 'I attach you the proposal in the email.', 'There goes the proposal.'], 0, ''),
          MC('Cierre:', ['Please let me know if you have any further questions.', 'Bye!', 'Answer me soon.'], 0, ''),
          MC('Despedida formal:', ['Best regards,', 'Kisses,', 'See ya,'], 0, ''),
        ]),
      ],
      semi: {
        task: 'Piensa en la última reunión o conversación de trabajo/estudio que tuviste. Escribe 3 preguntas que te hicieron y 2 peticiones, en estilo indirecto.',
        frames: ['He/She asked (me) if…', 'He/She asked whether…', 'He/She asked what/when/how…', 'He/She asked me to…', 'He/She told me not to…'],
        examples: ['My manager asked me if I had finished the budget.', 'She asked when I could present it to the team.', 'A client asked whether we offered discounts for students.', 'My boss asked me to update the website.', 'She told me not to share the numbers yet.'],
      },
      speak: [
        {
          title: 'Informar de una reunión',
          context: 'Tu compañero no pudo ir a una reunión. Cuéntale qué preguntó y qué pidió el cliente.',
          goal: 'Transmitir preguntas y peticiones con el orden y los tiempos correctos.',
          prompt: '<p>Report these questions and requests from a client meeting (60–90 s):</p><p><i>"Can you deliver in two weeks?" · "How many people are working on the project?" · "Have you used this software before?" · "Please send us a weekly report." · "Don\'t change the logo." · "When will the first version be ready?"</i></p>',
          useful: ['The client asked if / whether…', 'He wanted to know how many…', 'She asked us to…', 'They told us not to…', 'So we need to…'],
          time: 90,
          criteria: ['Orden afirmativo en preguntas indirectas', 'Cambios de tiempo', 'ask/tell + to', 'Conclusión práctica'],
          model: "So, in the meeting the client asked whether we could deliver in two weeks. He also wanted to know how many people were working on the project and if we had used that software before. Then he asked us to send them a weekly report, and he told us not to change the logo. Finally, he asked when the first version would be ready. So we need to decide the date today and prepare the first report for Friday.",
          second: 'Cuenta a un amigo qué te preguntaron en una entrevista de trabajo o en la frontera de un país.',
        },
      ],
      pron: {
        title: 'Leer un correo en voz alta con naturalidad',
        explain: '<p>Leer en voz alta tus correos te ayuda a detectar frases poco naturales. Agrupa las palabras en bloques de sentido y pausa en comas y puntos: <i>Thank you for meeting with us today. | As promised, | I am following up | on the questions you asked.</i> Acentúa la información nueva (fechas, cifras, acciones).</p>',
        drill: ['Thank you for <b>MEET</b>ing with us <b>TO</b>day.', 'As <b>PROM</b>ised, | I\'m <b>FOL</b>lowing <b>UP</b> on your <b>QUES</b>tions.', "I've at<b>TACHED</b> the <b>PRICE</b> list.", 'Please let me <b>KNOW</b> if you have any <b>FUR</b>ther <b>QUES</b>tions.'],
        items: [
          MC('En “follow up”, ¿qué parte es más fuerte?', ['follow', 'up'], 1, 'En phrasal verbs, la partícula suele ser fuerte.'),
          SAY('He asked whether we could launch in May.', MC('¿Qué preguntó?', ['Si podían lanzar en mayo', 'Cuándo lanzarían', 'Por qué en mayo'], 0, '')),
          SAY('She asked me not to call after six.', MC('¿Qué pidió?', ['Que llamara a las seis', 'Que no llamara después de las seis'], 1, '')),
        ],
      },
      shadow: ["Quick summary of today's meeting.", 'The client asked whether we could launch the campaign in May.', 'Their director asked us to send two design options by Wednesday.', 'As promised, I am following up on the questions you asked.', 'Please let me know if you have any further questions.'],
      write: {
        title: 'Correo de seguimiento',
        task: '<p>Después de una reunión (real o inventada), escribe un correo de seguimiento (120–150 palabras) a un cliente o jefe: agradece, resume las preguntas que te hicieron y respóndelas, confirma las peticiones y los próximos pasos, y cierra profesionalmente.</p>',
        frames: ['Subject: Follow-up:…', 'Dear … / Hi …,', 'Thank you for…', 'As promised, I am following up on…', 'You asked whether / how…', 'As requested, we will…', "I've attached…", 'Please let me know if…', 'Best regards,'],
        words: '120–150',
        checklist: ['Asunto claro', 'Saludo y cierre adecuados al registro', 'Al menos 2 preguntas en estilo indirecto', 'Una pasiva', 'Próximos pasos con fechas'],
        model: "Subject: Follow-up: website redesign\n\nDear Ms. Parker,\n\nThank you for meeting with us yesterday. As promised, I am following up on the questions you asked.\n\nYou asked whether the new website could be ready before the holiday season. Yes: if the content is approved by October 15th, we can launch on November 20th. You also asked how many pages were included in the price. The quote includes up to 12 pages; additional pages can be added for $150 each. I have attached the updated quote.\n\nAs requested, we will send you three homepage designs by Friday. Could you please let me know who will approve the final version?\n\nPlease let me know if you have any further questions.\n\nBest regards,\nJavier Ríos",
      },
      retrieval: [
        ES('Me preguntó si estaba libre.', ['She asked me if I was free.', 'He asked me if I was free.', 'She asked if I was free.'], ''),
        ES('Me preguntó dónde vivía.', ['She asked me where I lived.', 'He asked me where I lived.'], ''),
        ES('Me pidió que le enviara el archivo.', ['He asked me to send him the file.', 'She asked me to send her the file.'], ''),
        ES('Me dijo que no llegara tarde.', ['She told me not to be late.', 'He told me not to be late.', 'She told me not to arrive late.'], ''),
        ES('Le escribo para dar seguimiento a nuestra reunión.', ["I'm following up on our meeting.", 'I am following up on our meeting.', "I'm writing to follow up on our meeting."], ''),
        ES('Adjunto la propuesta.', ["I've attached the proposal.", 'I have attached the proposal.', 'Please find the proposal attached.'], ''),
      ],
      review: [
        MC('He ___ me he was sick.', ['told', 'said'], 0, ''),
        GAP('“I can\'t come.” → She said she ___ come.', ["couldn't", 'could not']),
        GAP('These cars ___ (make) in Mexico.', 'are made'),
      ],
      transfer: 'Revisa un correo en inglés que hayas recibido y fíjate en las fórmulas de apertura y cierre. Úsalas en tu próximo correo.',
    },

    /* ---------------- L4 ---------------- */
    {
      title: 'Log In, Back Up, Figure Out — Phrasal Verbs for Work and Tech',
      goal: 'Usar 20 phrasal verbs muy frecuentes del trabajo y la tecnología, su significado y su posición con objetos (separables / no separables).',
      outcome: 'Explicas un problema técnico y su solución en una llamada de soporte usando 8 phrasal verbs.',
      check: 'Práctica ≥ 80 %; llamada de soporte grabada.',
      agenda: [
        [5, 'Activación', 'Reported questions'],
        [15, 'Listening', '“IT support call”'],
        [10, 'Vocabulario', '20 phrasal verbs de trabajo y tecnología'],
        [10, 'Gramática', 'Phrasal verbs separables e inseparables'],
        [12, 'Speaking', 'Llamada de soporte técnico'],
        [8, 'Pronunciación', 'Acento en la partícula + shadowing'],
      ],
      warmup: {
        items: [
          FIX('She asked me where was the office.', ['She asked me where the office was.']),
          TR('“Please call me later.” → He asked me…', ['He asked me to call him later.'], ''),
          MC('He ___ that he would be late.', ['said', 'told'], 0, ''),
        ],
      },
      input: {
        kind: 'dialogue',
        title: 'IT support call',
        context: 'Monica works at a law firm in Atlanta. Her laptop has problems, so she calls Jay from IT support.',
        task1: 'Listen without reading. What are Monica\'s problems and how are they solved?',
        task2: 'Listen with the transcript. Underline every phrasal verb and guess its meaning from context.',
        lines: DLG([
          ['Jay', "IT support, this is Jay. How can I help?", 'Soporte técnico, habla Jay. ¿En qué puedo ayudar?'],
          ['Monica', "Hi Jay, it's Monica from Legal. I can't log in to my email. It says my password is wrong, but I'm sure it's right.", 'Hola Jay, soy Monica de Legal. No puedo entrar en mi correo. Dice que la contraseña es incorrecta, pero estoy segura de que es correcta.'],
          ['Jay', "OK. Your password probably expired. I'll reset it and you can set up a new one. Hold on a second.", 'Vale. Seguramente caducó. La restablezco y puedes configurar una nueva. Un segundo.'],
          ['Monica', "Thanks. Also, my laptop keeps shutting down. It happened three times this morning.", 'Gracias. Además, mi portátil no para de apagarse. Pasó tres veces esta mañana.'],
          ['Jay', "Hmm. Is the battery running out, or does it turn off suddenly?", 'Mmm. ¿Se acaba la batería o se apaga de repente?'],
          ['Monica', "It turns off suddenly, even when it's plugged in.", 'Se apaga de repente, incluso enchufado.'],
          ['Jay', "That could be overheating. First, did you back up your files?", 'Puede ser sobrecalentamiento. Primero, ¿hiciste copia de seguridad de tus archivos?'],
          ['Monica', "Back up? Um… I don't think so.", '¿Copia de seguridad? Mmm… creo que no.'],
          ['Jay', "OK, please do that first. Save everything to the cloud. Then turn the laptop off and don't turn it on again until I check it.", 'Vale, hazlo primero, por favor. Guarda todo en la nube. Luego apaga el portátil y no lo enciendas hasta que lo revise.'],
          ['Monica', "Got it. Can you come and look at it?", 'Entendido. ¿Puedes venir a mirarlo?'],
          ['Jay', "I'll look into it this afternoon. I need to figure out if it's the fan or the battery. If we can't fix it, we'll give you a replacement.", 'Lo investigo esta tarde. Tengo que averiguar si es el ventilador o la batería. Si no podemos arreglarlo, te damos uno de reemplazo.'],
          ['Monica', "Great. And the email?", 'Genial. ¿Y el correo?'],
          ['Jay', "Done. I've sent a temporary password to your phone. Log in and change it right away. I'll follow up with you after lunch.", 'Hecho. Te envié una contraseña temporal al teléfono. Entra y cámbiala enseguida. Te contacto después del almuerzo.'],
        ]),
      },
      comp: [
        MC('What is Monica\'s first problem?', ['She can\'t log in to her email', 'Her phone is broken', 'Her printer doesn\'t work', 'She lost her laptop'], 0, ''),
        MC('Why can\'t she log in?', ['Her account was deleted', 'Her password probably expired', 'The internet is down', 'She forgot her username'], 1, ''),
        MC('What is the laptop problem?', ['The screen is broken', 'It turns off suddenly', 'It is too slow', 'The keyboard doesn\'t work'], 1, ''),
        MC('What does Jay ask her to do first?', ['Restart it', 'Back up her files', 'Buy a new battery', 'Call later'], 1, ''),
        MC('When will Jay check the laptop?', ['Now', 'This afternoon', 'Tomorrow', 'Next week'], 1, ''),
        MC('Where did Jay send the temporary password?', ['To her email', 'To her phone', 'To her boss', 'By mail'], 1, ''),
      ],
      chunks: [
        V('log in (to …) / log out', 'iniciar / cerrar sesión', "I can't log in to my email.", 'No puedo entrar en mi correo.', {}),
        V('set up', 'configurar / montar', 'Set up a new password.', 'Configura una nueva contraseña.', { col: 'set up a meeting / an account / a business' }),
        V('back up (files)', 'hacer copia de seguridad', 'Did you back up your files?', '¿Hiciste copia de seguridad?', { use: 'sustantivo: a backup.' }),
        V('turn on / turn off', 'encender / apagar', 'Turn it off and turn it on again.', 'Apágalo y vuelve a encenderlo.', {}),
        V('run out of …', 'quedarse sin…', "My battery is running out. We've run out of paper.", 'Me estoy quedando sin batería. Se acabó el papel.', {}),
        V('shut down', 'apagarse / cerrar (del todo)', 'My laptop keeps shutting down.', 'Mi portátil no para de apagarse.', {}),
        V('look into (something)', 'investigar / estudiar (un problema)', "I'll look into it this afternoon.", 'Lo investigo esta tarde.', { use: 'Inseparable: look into it.' }),
        V('figure out', 'averiguar / entender', 'I need to figure out what the problem is.', 'Tengo que averiguar cuál es el problema.', {}),
        V('follow up (with someone / on something)', 'dar seguimiento', "I'll follow up with you after lunch.", 'Te contacto después del almuerzo para seguir.', {}),
        V('Hold on (a second).', 'Espera un segundo.', 'Hold on, let me check.', 'Espera, déjame ver.', {}),
        V('fill in / fill out (a form)', 'rellenar (un formulario)', 'Please fill out this form.', 'Rellene este formulario, por favor.', {}),
        V('come up with (an idea)', 'idear / ocurrírsele', 'She came up with a great solution.', 'Se le ocurrió una solución genial.', {}),
        V('put off (something)', 'posponer', "Don't put off the backup.", 'No pospongas la copia de seguridad.', {}),
        V('find out', 'enterarse / descubrir', 'I found out that the server was down.', 'Descubrí que el servidor estaba caído.', {}),
      ],
      grammar: {
        title: 'Phrasal verbs: meaning and word order',
        meaning: 'Verb + particle (up, out, off, on, in, into…) with a new meaning that is often not literal: <i>figure out</i> = understand / solve.',
        when: 'Everywhere in spoken English, especially at work and with technology. More formal equivalents: <i>investigate</i> (look into), <i>postpone</i> (put off), <i>configure</i> (set up).',
        form: '<table><tr><th>Type</th><th>Rule</th><th>Example</th></tr><tr><td>Separable (turn off, set up, back up, fill out, figure out, put off)</td><td>Noun: before or after the particle. <b>Pronoun: always in the middle.</b></td><td>Turn off the laptop / Turn the laptop off / Turn <b>it</b> off (not “turn off it”)</td></tr><tr><td>Inseparable (look into, log in to, run out of, come up with)</td><td>Object always after the whole verb</td><td>I\'ll look into <b>it</b>. We ran out of <b>paper</b>.</td></tr><tr><td>Intransitive (log in, shut down, hold on)</td><td>No object</td><td>It keeps shutting down.</td></tr></table>',
        examples: [
          ["I can't log in to my email.", 'No puedo entrar en mi correo.'],
          ["Turn it off and don't turn it on again.", 'Apágalo y no lo enciendas.'],
          ['Did you back up your files? / Did you back them up?', '¿Hiciste copia de tus archivos?'],
          ["I'll look into it this afternoon.", 'Lo investigo esta tarde.'],
          ['We need to figure out what the problem is.', 'Tenemos que averiguar cuál es el problema.'],
        ],
        spanish: 'Muchos phrasal verbs equivalen a un verbo español de una sola palabra (apagar = turn off, averiguar = figure out, posponer = put off). Aprende cada uno como un chunk con un ejemplo. Y con pronombres (it, them, me), colócalos en medio de los separables: <i>turn it off</i>.',
        errors: [
          ['Turn off it.', 'Turn it off.', 'Pronombre en medio.'],
          ['I will look it into.', 'I will look into it.', 'Inseparable.'],
          ['We ran out paper.', 'We ran out of paper.', 'run out of.'],
          ['I need to figure out it.', 'I need to figure it out.', ''],
          ['Fill the form.', 'Fill out / fill in the form.', 'Con partícula.'],
        ],
      },
      practice: [
        EX('Significado', 'vocabulary', 'Elige el phrasal verb correcto.', [
          MC('Hacer copia de seguridad:', ['back up', 'back off', 'set back'], 0, ''),
          MC('Investigar un problema:', ['look into', 'look after', 'look up to'], 0, ''),
          MC('Posponer:', ['put off', 'put on', 'put up'], 0, ''),
          MC('Quedarse sin:', ['run out of', 'run into', 'run over'], 0, ''),
          MC('Idear / proponer (una idea):', ['come up with', 'come across', 'come in'], 0, ''),
          MC('Configurar:', ['set up', 'set off', 'get up'], 0, ''),
          MC('Averiguar / entender:', ['figure out', 'figure in', 'find in'], 0, ''),
          MC('Iniciar sesión:', ['log in', 'log up', 'sign out'], 0, ''),
        ]),
        EX('Completa', 'vocabulary', 'Usa la partícula correcta.', [
          GAP('My phone battery is running ___. Do you have a charger?', 'out'),
          GAP("Please fill ___ this form and sign it.", ['out', 'in']),
          GAP("I'll look ___ the problem and call you back.", 'into'),
          GAP("Can you turn the music ___? It's too loud.", 'down'),
          GAP("Don't put ___ the meeting again. We need a decision.", 'off'),
          GAP("She came up ___ a brilliant idea.", 'with'),
        ]),
        EX('Orden con pronombres', 'grammar', '', [
          MC('The laptop is hot. Turn ___.', ['it off', 'off it'], 0, ''),
          MC('Those files are important. Back ___.', ['them up', 'up them'], 0, ''),
          MC('There\'s a problem with the server. I\'ll look ___.', ['into it', 'it into'], 0, ''),
          FIX('I need to figure out it.', ['I need to figure it out.'], ''),
          FIX('We have run out milk.', ['We have run out of milk.', "We've run out of milk."], ''),
        ]),
      ],
      semi: {
        task: 'Escribe 8 frases sobre tu día de trabajo o estudio con 8 phrasal verbs distintos de la lección (al menos 3 con pronombre: it/them).',
        frames: ['I log in to…', 'I usually set up…', 'I always back … up', 'When…, I turn it off', 'I often run out of…', 'I need to figure out…', "I'll look into…", "Don't put … off"],
        examples: ['Every morning I log in to the company system at 8.', 'Today I set up a meeting with the new client.', 'I back up my files every Friday; I back them up to the cloud.', 'I always run out of time before lunch.', "I couldn't figure out the new software, so IT looked into it.", "I've put off my taxes for weeks. I need to do them!"],
      },
      speak: [
        {
          title: 'Llamada de soporte técnico',
          context: 'Practica los dos papeles: usuario con un problema y técnico de soporte.',
          goal: 'Describir un problema y una solución con phrasal verbs y estilo natural.',
          prompt: '<p>User: describe two problems (can\'t log in / phone shuts down / printer runs out of ink / Wi-Fi keeps disconnecting). Technician: ask questions, give step-by-step instructions, promise to follow up.</p>',
          useful: ["I can't log in to…", 'It keeps shutting down.', "It's running out of…", 'Have you tried turning it off and on again?', 'Back up your files first.', "I'll look into it.", "I'll follow up with you…", 'Hold on a second.'],
          time: 120,
          criteria: ['8 phrasal verbs bien usados', 'Pronombres en posición correcta', 'Instrucciones claras (imperativos)', 'Cierre con seguimiento'],
          model: "User: Hi, I can't log in to the company app on my phone, and my phone keeps shutting down. Tech: OK, hold on a second. When did it start? User: Yesterday. Tech: Have you tried turning it off and on again? User: Yes, but it didn't help. Tech: Then please back up your photos and files first. After that, delete the app and set it up again. If it still shuts down, the battery might be running out quickly. I'll look into your account now and I'll follow up with you this afternoon.",
          second: 'Explica a un familiar mayor cómo configurar WhatsApp o una videollamada usando phrasal verbs y pasos.',
        },
      ],
      pron: {
        title: 'Acento en la partícula de los phrasal verbs',
        explain: '<p>En los phrasal verbs, la partícula suele llevar el acento: <i>turn <b>OFF</b>, log <b>IN</b>, back <b>UP</b>, figure <b>OUT</b>, look <b>IN</b>to</i>. Cuando el pronombre va en medio, sigue siendo la partícula la fuerte: <i>turn it <b>OFF</b></i>. Atención: como sustantivo, el acento pasa al principio: <i>a <b>BACK</b>up, a <b>SET</b>up, a <b>LOG</b>in</i>.</p>',
        pairs: [['to back up (verbo)', 'a backup (sustantivo)'], ['to set up', 'a setup'], ['to log in', 'a login']],
        drill: ['Turn it <b>OFF</b> and turn it <b>ON</b> again.', 'Did you back them <b>UP</b>?', "I'll look <b>IN</b>to it.", 'We need a <b>BACK</b>up.'],
        items: [
          MC('En el verbo “figure out”, la sílaba más fuerte es…', ['FIG', 'OUT'], 1, ''),
          MC('En el sustantivo “a backup”, la sílaba más fuerte es…', ['BACK', 'UP'], 0, ''),
          SAY("I've run out of ink.", MC('¿Qué pasó?', ['Se acabó la tinta', 'Derramó la tinta', 'Compró tinta'], 0, '')),
        ],
      },
      shadow: ["I can't log in to my email.", 'My laptop keeps shutting down.', 'First, did you back up your files?', "Then turn the laptop off and don't turn it on again until I check it.", "I'll look into it this afternoon. I need to figure out if it's the fan or the battery."],
      retrieval: [
        ES('No puedo iniciar sesión.', ["I can't log in.", 'I cannot log in.'], ''),
        ES('Apágalo (el portátil).', ['Turn it off.', 'Shut it down.'], ''),
        ES('Nos quedamos sin papel.', ['We ran out of paper.', "We've run out of paper.", 'We have run out of paper.'], ''),
        ES('Lo investigo esta tarde.', ["I'll look into it this afternoon.", 'I will look into it this afternoon.'], ''),
        ES('No consigo averiguarlo.', ["I can't figure it out.", 'I cannot figure it out.'], ''),
        ES('Te contacto mañana para seguir.', ["I'll follow up with you tomorrow.", 'I will follow up with you tomorrow.'], ''),
      ],
      review: [
        TR('“Can you help me?” → She asked me…', ['She asked me if I could help her.', 'She asked if I could help her.', 'She asked me to help her.'], ''),
        GAP('The software ___ (update) last night.', 'was updated'),
        MC('He ___ me to call him.', ['asked', 'said'], 0, ''),
        GAP("M11: If I ___ (know) the answer, I'd tell you.", 'knew'),
      ],
      transfer: 'Cambia el idioma de tu teléfono u ordenador al inglés durante una semana y fíjate en los phrasal verbs de los menús (Log out, Sign in, Turn off…).',
    },
  ],

  assessment: {
    listening: {
      context: 'A short company announcement recorded by the HR manager.',
      lines: DLG([
        ['HR manager', "Hello everyone. A few updates. Our new time-tracking system was installed last weekend, and from Monday all employees will be asked to use it."],
        ['HR manager', "You'll receive an email with instructions. Please log in and set up your password before Friday."],
        ['HR manager', "Several of you asked whether the old system could still be used. Unfortunately, it can't: it has been shut down permanently."],
        ['HR manager', "Someone also asked me if training would be offered. Yes, short online sessions will be organized on Wednesday and Thursday."],
        ['HR manager', "Finally, the director asked me to remind you to back up any personal files from the old shared drive. It will be deleted at the end of the month."],
      ]),
      items: [
        MC('When was the new system installed?', ['Last weekend', 'Yesterday', 'On Monday', 'Next week'], 0, ''),
        MC('What must employees do before Friday?', ['Attend training', 'Log in and set up a password', 'Delete files', 'Call HR'], 1, ''),
        TF('The old system can still be used.', false, 'It has been shut down permanently.'),
        MC('When will the training sessions be organized?', ['Monday and Tuesday', 'Wednesday and Thursday', 'Friday', 'At the end of the month'], 1, ''),
        MC('What did the director ask HR to remind employees?', ['To back up personal files from the old drive', 'To come to the office', 'To change their email', 'To use the old system'], 0, ''),
        MC('When will the old shared drive be deleted?', ['Today', 'On Friday', 'At the end of the month', 'Next year'], 2, ''),
      ],
    },
    reading: {
      title: 'Customer complaint and reply',
      text: `<b>From: Ana Castillo</b>
Subject: Order #45821 — damaged item
Dear Customer Service,
I am writing about my order #45821, which was delivered yesterday. Unfortunately, the lamp was broken when I opened the box. I have attached two photos. Could you please tell me whether I can get a replacement or a refund?
Kind regards,
Ana Castillo

<b>From: BrightHome Customer Service</b>
Subject: Re: Order #45821 — damaged item
Dear Ms. Castillo,
Thank you for contacting us, and we are very sorry about the damaged lamp. We have looked into your order and found that the box was not packed correctly at our warehouse.
A new lamp has already been sent to you and should arrive within three working days. You don't need to send the broken lamp back. In addition, a 15% discount code has been added to your account.
Please let us know if there is anything else we can do.
Best regards,
Tom Becker, Customer Service`,
      items: [
        MC('What was the problem with the order?', ['It arrived late', 'The lamp was broken', 'It was the wrong color', 'It never arrived'], 1, ''),
        MC('What did Ana ask?', ['To speak to a manager', 'Whether she could get a replacement or a refund', 'For a discount', 'Where her order was'], 1, ''),
        MC('Why was the lamp damaged, according to the company?', ['The delivery driver dropped it', 'The box was not packed correctly', 'Ana broke it', 'It was an old lamp'], 1, ''),
        TF('Ana must send the broken lamp back.', false, "You don't need to send it back."),
        MC('When should the new lamp arrive?', ['Tomorrow', 'Within three working days', 'In two weeks', 'Next month'], 1, ''),
        MC('What else did the company give her?', ['A free lamp', 'A 15% discount code', 'Free delivery for a year', 'Nothing'], 1, ''),
      ],
    },
    items: [
      GAP('This bridge ___ (build) in 1925.', 'was built'),
      GAP('Coffee ___ (grow) in many countries.', 'is grown'),
      GAP('The report has ___ (send) to the client.', 'been sent'),
      TR('Someone stole my wallet. (pasiva)', ['My wallet was stolen.'], ''),
      MC('She ___ me that she was busy.', ['told', 'said'], 0, ''),
      TR('“I am tired.” → He said…', ['He said he was tired.', 'He said that he was tired.'], ''),
      TR('“We will call you tomorrow.” → They said…', ['They said they would call me the next day.', "They said they'd call me the next day.", 'They said that they would call me the next day.', 'They said they would call me the following day.'], ''),
      FIX('He asked me where was the bank.', ['He asked me where the bank was.']),
      TR('“Can you help me?” → She asked me if…', ['She asked me if I could help her.'], ''),
      TR('“Please send the file.” → The boss asked me…', ['The boss asked me to send the file.'], ''),
      FIX('He said me that he was late.', ['He told me that he was late.', 'He told me he was late.', 'He said that he was late.']),
      MC('The laptop is very hot. Turn ___.', ['it off', 'off it'], 0, ''),
      MC('We have run out ___ coffee.', ['of', 'from', '—'], 0, ''),
      MC('“Investigar un problema”:', ['look into', 'look after', 'look for'], 0, ''),
      MC('“Hacer copia de seguridad”:', ['back up', 'put off', 'set off'], 0, ''),
      ES('Se habla inglés en muchos países.', ['English is spoken in many countries.'], ''),
      ES('Me pidió que no llegara tarde.', ['She asked me not to be late.', 'He asked me not to be late.', 'She asked me not to arrive late.'], ''),
      ES('Adjunto el informe.', ["I've attached the report.", 'I have attached the report.', 'Please find the report attached.'], ''),
    ],
    speak: {
      title: 'Explicar y transmitir (2–3 minutos)',
      context: 'Una reunión con un nuevo compañero de equipo.',
      prompt: '<p>Explain a process at your work or study using the passive (4–5 steps). Then report what your manager/teacher said and asked recently (3 sentences). Finally, describe a technical problem you had and how it was solved with phrasal verbs.</p>',
      useful: ['First, … is/are…', 'Then, … was…', 'My manager said that… / asked me to…', "I couldn't log in…", 'IT looked into it…', 'Finally, …'],
      time: 150,
      criteria: ['Pasiva variada', 'Reported speech correcto', 'Phrasal verbs con buen orden', 'Organización clara'],
    },
    write: {
      title: 'Correo de reclamación o respuesta a un cliente',
      task: '<p>Write a formal email (130–150 words): EITHER a complaint about a service/product (what happened, what you asked before, what you want), OR the company\'s reply (apology, what was found, what has been done, next steps). Use at least 2 passives, 1 reported question/request and 2 phrasal verbs.</p>',
      words: '130–150',
      checklist: ['Asunto', 'Saludo/cierre formales', '2 pasivas', 'Estilo indirecto', '2 phrasal verbs', 'Petición o solución clara'],
      model: "Subject: Internet service — repeated outages\n\nDear Customer Support,\n\nI am writing about my internet service at 245 Oak Street. Since March 3rd, the connection has been cut several times a day. I called your helpline twice. The first agent said the problem would be fixed within 24 hours, and the second one asked me to turn the router off and on again, which I did. Unfortunately, the problem has not been solved.\n\nI work from home, so I cannot put this off any longer. Could you please send a technician this week and look into a discount for the days without service?\n\nI look forward to hearing from you.\n\nKind regards,\nPablo Herrera\nAccount number: 77821",
    },
  },
});
