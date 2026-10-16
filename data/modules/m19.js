/* M19 · Integration and Final Assessment — simulaciones integradas, materiales extensos, auditoría de errores y plan de mantenimiento. */
EM.registerModule({
  id: 'm19',
  stage: 6,
  cefr: 'B2 (+C1)',
  title: 'Integration and Final Assessment',
  es: 'Simulaciones, prueba final, auditoría de errores y plan de mantenimiento',
  summary: 'This final module brings everything together. You complete an integrated real-life simulation (a job application process), work with extended listening and reading, audit your persistent errors, compare your current level with your initial diagnosis, and design a realistic maintenance plan to keep progressing after the course. The final assessment integrates all skills.',
  objectives: [
    'Combine listening, reading, speaking and writing in realistic multi-step tasks.',
    'Understand extended spoken and written texts and summarize them accurately.',
    'Identify and correct your persistent errors with a structured audit.',
    'Compare your current performance with your initial diagnosis and plan your next steps.',
  ],
  prereq: ['Stages 1–5 (or the corresponding test-out assessments).'],
  outcomes: [
    'I can complete a full application process in English: phone screening, interview, follow-up email.',
    'I can summarize a 5-minute talk and a 600-word article without copying.',
    'I can list my 10 most persistent errors and show their corrected forms in new sentences.',
    'I have a written, realistic 3-month maintenance plan.',
  ],
  errors: [
    ['I live here since 2018.', "I've lived here since 2018.", 'Persistent B1–B2 error: present perfect for unfinished time.'],
    ['She work in a bank.', 'She works in a bank.', 'Third-person -s, even at advanced levels.'],
    ['I am agree.', 'I agree.', 'Persistent calque.'],
    ['People is…', 'People are…', 'Plural noun.'],
    ['Explain me / Said me', 'Explain to me / Told me', 'Verb patterns.'],
    ['Actually (= currently)', 'Currently / nowadays', 'False friend.'],
    ['If I would have known…', 'If I had known…', 'Conditionals.'],
  ],
  transfer: '<p>Your transfer task is your maintenance plan: put the first two weeks into your real calendar today (specific days, times and materials). Schedule a date to retake the diagnostic in three months and compare.</p>',
  lessons: [
    /* ---------------- L1 ---------------- */
    {
      title: 'Simulation: From Job Ad to Job Offer',
      goal: 'Complete an integrated, multi-skill simulation of a job application in English: read an ad, handle a phone screening, answer interview questions and write a follow-up email.',
      outcome: 'You complete all four steps of the simulation and self-assess them with the rubrics.',
      check: 'Comprehension ≥ 80 %; interview recorded; follow-up email written.',
      agenda: [
        [5, 'Warm-up', 'Activation: your professional profile'],
        [15, 'Listening', '“Phone screening with a recruiter”'],
        [10, 'Vocabulary', 'Recruitment language'],
        [5, 'Review', 'Key structures for interviews (rapid review)'],
        [17, 'Speaking', 'Full interview simulation'],
        [8, 'Writing', 'Follow-up email'],
      ],
      warmup: {
        text: '<p>Before you start, write (or say aloud) three facts about your professional profile in English: your role, years of experience, and one achievement with a number.</p>',
        items: [
          MC('M16: STAR stands for…', ['Situation, Task, Action, Result', 'Start, Talk, Answer, Repeat'], 0, ''),
          MC('M10: “Llevo cinco años trabajando aquí”', ["I've been working here for five years.", 'I work here since five years.'], 0, ''),
          MC('M16: Polite rejection in negotiation:', ["I'm afraid that isn't possible.", 'No way.'], 0, ''),
        ],
      },
      input: {
        kind: 'dialogue',
        title: 'Phone screening with a recruiter',
        context: 'Laura Benítez applied for a Customer Success Specialist role at CloudPay, a fintech company in Austin (fictional). A recruiter, Ryan, calls her for a 10-minute screening.',
        task1: 'Listen without reading. Write down: salary range, work model, next step and date.',
        task2: 'Listen with the transcript. Note the questions Ryan asks; they are typical of real screenings. Underline Laura\'s strategies (clarifying, quantifying, asking good questions).',
        lines: DLG([
          ['Ryan', "Hi, is this Laura? It's Ryan from CloudPay. Is now still a good time to talk?", '¿Hola, Laura? Soy Ryan de CloudPay. ¿Sigue siendo buen momento para hablar?'],
          ['Laura', "Hi Ryan, yes, perfect. Thanks for calling.", 'Hola Ryan, sí, perfecto. Gracias por llamar.'],
          ['Ryan', "Great. So, I've looked at your résumé. Can you give me a quick overview of your background?", 'Genial. He visto tu currículum. ¿Puedes darme un resumen rápido de tu trayectoria?'],
          ['Laura', "Sure. I've worked in customer support for six years, the last three as a team lead at a payments startup in Bogotá, where I manage eight agents. Last year we reduced average response time from twelve hours to under four.", 'Claro. Llevo seis años en atención al cliente, los últimos tres como líder de equipo en una startup de pagos en Bogotá, donde gestiono ocho agentes. El año pasado redujimos el tiempo medio de respuesta de doce horas a menos de cuatro.'],
          ['Ryan', "Impressive. What's motivating you to look for a new role?", 'Impresionante. ¿Qué te motiva a buscar un nuevo puesto?'],
          ['Laura', "I'm looking for a role that's more proactive — helping clients get value from the product, not only solving problems. That's why Customer Success caught my attention.", 'Busco un rol más proactivo: ayudar a los clientes a sacar valor del producto, no solo resolver problemas. Por eso me llamó la atención Customer Success.'],
          ['Ryan', "Makes sense. The role is hybrid — three days in the Austin office. Would relocation be possible for you?", 'Tiene sentido. El puesto es híbrido: tres días en la oficina de Austin. ¿Podrías trasladarte?'],
          ['Laura', "Yes, I'd be open to relocating. Just to clarify, does the company offer any relocation support?", 'Sí, estaría abierta a mudarme. Solo para aclarar, ¿la empresa ofrece algún apoyo para la reubicación?'],
          ['Ryan', "We do, a relocation package, and we can sponsor visas for this position. The salary range is sixty-five to seventy-five thousand, plus a bonus. Is that in line with your expectations?", 'Sí, un paquete de reubicación, y podemos patrocinar visas para este puesto. El rango salarial es de sesenta y cinco a setenta y cinco mil, más un bono. ¿Está en línea con tus expectativas?'],
          ['Laura', "It's within my range, yes. I'd like to know more about the bonus structure at a later stage.", 'Está dentro de mi rango, sí. Me gustaría saber más sobre la estructura del bono más adelante.'],
          ['Ryan', "Of course. Next step: a video interview with the hiring manager, Diane, next Thursday at 10 a.m. Austin time. Does that work?", 'Por supuesto. Siguiente paso: una videoentrevista con la responsable de contratación, Diane, el próximo jueves a las 10 a. m. hora de Austin. ¿Te va bien?'],
          ['Laura', "That works. That's 11 a.m. in Bogotá, right? Could you send me a calendar invite with the link?", 'Me va bien. Eso son las 11 a. m. en Bogotá, ¿verdad? ¿Me puedes enviar una invitación de calendario con el enlace?'],
          ['Ryan', "Exactly. I'll send it today. Good luck, Laura!", 'Exacto. Te la envío hoy. ¡Suerte, Laura!'],
        ]),
      },
      comp: [
        MC('How long has Laura worked in customer support?', ['Three years', 'Six years', 'Eight years', 'Twelve years'], 1, ''),
        MC('What achievement does she mention?', ['Hiring eight agents', 'Reducing response time from 12 hours to under 4', 'Doubling sales', 'Opening an office'], 1, ''),
        MC('Why does she want a Customer Success role?', ['Higher salary', 'It is more proactive', 'Less work', 'To work remotely'], 1, ''),
        MC('What is the work model?', ['Fully remote', 'Hybrid: three days in the Austin office', 'Five days in the office', 'Freelance'], 1, ''),
        MC('What is the salary range?', ['$56k–$57k', '$65k–$75k', '$75k–$85k', '$60k flat'], 1, ''),
        MC('When is the next interview?', ['Next Tuesday at 10 a.m.', 'Next Thursday at 10 a.m. Austin time', 'Tomorrow', 'Next month'], 1, ''),
      ],
      chunks: [
        V('Is now still a good time to talk?', '¿Sigue siendo buen momento para hablar?', "Hi, it's Ryan. Is now still a good time to talk?", 'Hola, soy Ryan. ¿Te viene bien hablar ahora?', {}),
        V('Can you give me a quick overview of …?', '¿Puedes darme un resumen rápido de…?', 'Can you give me a quick overview of your experience?', '¿Me das un resumen rápido de tu experiencia?', {}),
        V("What's motivating you to …?", '¿Qué te motiva a…?', "What's motivating you to change jobs?", '¿Qué te motiva a cambiar de trabajo?', {}),
        V("I'd be open to relocating.", 'Estaría abierto/a a mudarme.', "For the right role, I'd be open to relocating.", 'Por el puesto adecuado, estaría dispuesta a mudarme.', {}),
        V('a relocation package', 'paquete de reubicación', 'Does the offer include a relocation package?', '¿La oferta incluye un paquete de reubicación?', {}),
        V('sponsor a visa', 'patrocinar una visa', 'The company can sponsor visas for this role.', 'La empresa puede patrocinar visas para este puesto.', {}),
        V('Is that in line with your expectations?', '¿Está en línea con tus expectativas?', 'The salary is $70k. Is that in line with your expectations?', 'El salario es de 70 mil. ¿Está en línea con tus expectativas?', {}),
        V("It's within my range.", 'Está dentro de mi rango.', "That's within my range, yes.", 'Eso está dentro de mi rango, sí.', {}),
        V('at a later stage', 'en una fase posterior', "I'd like to discuss the bonus at a later stage.", 'Me gustaría hablar del bono más adelante.', {}),
        V('the hiring manager', 'el/la responsable de contratación', 'The next interview is with the hiring manager.', 'La siguiente entrevista es con la responsable de contratación.', {}),
        V('Could you send me a calendar invite?', '¿Me puedes enviar una invitación de calendario?', 'Could you send me a calendar invite with the link?', '¿Me envías una invitación con el enlace?', {}),
      ],
      notes: '<div class="card-in"><h3>🧭 Rapid review: structures you need for this simulation</h3><ul class="bul"><li><b>Duration</b> (M10): <i>I\'ve worked in… for six years / since 2019.</i></li><li><b>Achievements</b> (M16): <i>We reduced… from… to…</i> · <i>As a result,…</i></li><li><b>Non-defining relatives</b> (M16): <i>…at a startup in Bogotá, where I manage eight agents.</i></li><li><b>Clarifying</b> (M13): <i>Just to clarify, does…? · That\'s 11 a.m. in Bogotá, right?</i></li><li><b>Diplomatic negotiation</b> (M16–M17): <i>It\'s within my range · I\'d like to know more about… at a later stage.</i></li><li><b>Formal follow-up email</b> (M12, M15): <i>Thank you for… · As discussed,… · I look forward to…</i></li></ul></div>',
      practice: [
        EX('Recruitment language', 'vocabulary', 'Choose the most natural option.', [
          MC('The recruiter asks for a summary of your career:', ['Can you give me a quick overview of your background?', 'Tell me all your life.', 'What is your history?'], 0, ''),
          MC('You are willing to move to another city:', ["I'd be open to relocating.", 'I can move me.', 'I am open to relocate me.'], 0, ''),
          MC('The salary is acceptable for you:', ["It's within my range.", "It's in my range of me.", 'It is my range.'], 0, ''),
          MC('You want to discuss details later:', ["I'd like to know more about that at a later stage.", 'Tell me later the details.', 'After, we speak.'], 0, ''),
          MC('Checking the time zone:', ["That's 11 a.m. in Bogotá, right?", 'What hour is in Bogotá?', 'Is 11 in my country?'], 0, ''),
          MC('Asking for the invitation:', ['Could you send me a calendar invite?', 'Send me the invite.', 'Invite me, please, the calendar.'], 0, ''),
        ]),
        EX('Integrated grammar check', 'grammar', 'Correct the sentences from a candidate\'s notes.', [
          FIX('I work in customer support since six years.', ["I've worked in customer support for six years.", 'I have worked in customer support for six years.', "I've been working in customer support for six years."], 'M10.'),
          FIX('My last company, that is in Bogotá, has 200 employees.', ['My last company, which is in Bogotá, has 200 employees.'], 'M16.'),
          FIX('I am agree with the conditions.', ['I agree with the conditions.'], 'M11.'),
          FIX('Could you explain me the bonus?', ['Could you explain the bonus to me?', 'Could you explain the bonus?'], 'Verb pattern.'),
          FIX('We reduced the response time of 12 hours to 4.', ['We reduced the response time from 12 hours to 4.', 'We reduced the response time from 12 to 4 hours.'], 'M16: from… to…'),
          FIX('If I would get the job, I would move to Austin.', ["If I got the job, I would move to Austin.", "If I get the job, I'll move to Austin.", "If I got the job, I'd move to Austin."], 'M11.'),
        ]),
      ],
      semi: {
        task: 'Prepare your own “screening card”: write your answers (in keywords, not full sentences) to the five typical screening questions, including one achievement with a number, your salary range and two questions for the recruiter.',
        frames: ['Background:…', 'Achievement: from … to…', 'Motivation: …caught my attention because…', 'Relocation / hybrid:…', 'Salary: within my range…', 'My questions:…'],
        examples: ['Background: 5 years data analysis, retail, team of 4.', 'Achievement: reduced report time from 3 days to 4 hours (automation).', 'Motivation: want product analytics → closer to decisions.', 'Hybrid: OK, 2–3 days office.', 'Salary: 60–70k → within my range.', 'Questions: What does success look like in 6 months? How big is the team?'],
      },
      speak: [
        {
          title: 'Step 1 · Phone screening (role-play)',
          context: 'Now it\'s your turn. Answer Ryan\'s questions with your real profile (or an invented one).',
          goal: 'Give concise, specific answers; clarify; negotiate diplomatically.',
          prompt: '<p>Answer each recruiter question in 30–60 seconds.</p>',
          questions: ['Can you give me a quick overview of your background?', "What's motivating you to look for a new role?", 'The role is hybrid. Would relocation be possible for you?', 'The salary range is X. Is that in line with your expectations?', 'Do you have any questions for me?'],
          useful: ["I've worked in… for…", 'Last year we…, which…', "That's why… caught my attention.", "I'd be open to…", 'Just to clarify,…', "It's within my range.", 'Could you send me…?'],
          time: 180,
          criteria: ['Present perfect for experience', 'A quantified achievement', 'Clarifying question', 'Diplomatic salary answer', 'One good question for the recruiter'],
        },
        {
          title: 'Step 2 · Interview with the hiring manager',
          context: 'Video interview with Diane, the hiring manager.',
          goal: 'Answer behavioral questions with STAR and show critical thinking.',
          prompt: '<p>Answer each question in 1.5–2 minutes. Use STAR for behavioral questions; hedge where appropriate; use discourse markers naturally.</p>',
          questions: ['Tell me about a time when you turned an unhappy client into a loyal one.', 'How would you measure the success of our customer success team?', 'Tell me about a time you disagreed with your manager. What happened?', "Where do you see yourself in three years?", 'Why should we hire you?'],
          useful: ['Situation: Last year,…', 'My task was to…', 'First, I… Then, I…', 'As a result,…', 'I would probably look at…', 'Having said that,…', 'I see myself…'],
          time: 480,
          criteria: ['STAR complete in behavioral answers', 'Results with numbers', 'Hedging and nuance', 'Discourse markers', 'Fluency and confidence'],
          model: "Tell me about a time you disagreed with your manager. — Sure. Last year, my manager wanted to reduce our support hours to save money. I understood the budget pressure, but I was worried about our customers in other time zones. My task was to propose an alternative. First, I analyzed our tickets and found that only 8% came in at night. Then I suggested a rotating on-call system instead of closing completely. Having said that, I also accepted that we'd need fewer people per shift. As a result, we saved around 20% of the cost and kept satisfaction above 90%. What I learned is that disagreement works best when you bring data and a solution.",
        },
      ],
      shadow: ["Can you give me a quick overview of your background?", "I've worked in customer support for six years, the last three as a team lead.", "That's why Customer Success caught my attention.", "I'd be open to relocating. Just to clarify, does the company offer any relocation support?", "It's within my range, yes."],
      write: {
        title: 'Step 3 · Follow-up email after the interview',
        task: '<p>Write a follow-up email (130–160 words) to Diane after the interview: thank her, refer to one specific topic you discussed, add one piece of information you forgot to mention, confirm your interest, and close professionally.</p>',
        frames: ['Subject: Thank you — Customer Success Specialist interview', 'Dear Diane,', 'Thank you for taking the time to…', 'I particularly enjoyed discussing…', "One thing I didn't mention is that…", 'I remain very interested in…', 'I look forward to hearing from you.', 'Best regards,'],
        words: '130–160',
        checklist: ['Appropriate subject and greeting', 'Specific reference to the conversation', 'New relevant information', 'Formal-neutral register', 'No errors in persistent structures (present perfect, -s, prepositions)'],
        model: "Subject: Thank you — Customer Success Specialist interview\n\nDear Diane,\n\nThank you for taking the time to speak with me on Thursday. I particularly enjoyed our conversation about measuring customer health, and your idea of combining product-usage data with regular check-in calls.\n\nOne thing I didn't mention is that I have recently completed a certification in customer success management, which covered onboarding strategies and churn analysis. I believe this would help me contribute quickly to your team's goals for the next quarter.\n\nI remain very interested in the role and in CloudPay's mission to make payments simpler for small businesses. Please let me know if you need any further information or references.\n\nI look forward to hearing from you.\n\nBest regards,\nLaura Benítez",
      },
      retrieval: [
        ES('¿Puedes darme un resumen rápido de tu trayectoria?', ['Can you give me a quick overview of your background?', 'Could you give me a quick overview of your background?'], ''),
        ES('Estaría abierta a mudarme.', ["I'd be open to relocating.", 'I would be open to relocating.'], ''),
        ES('Está dentro de mi rango.', ["It's within my range.", 'It is within my range.'], ''),
        ES('Llevo seis años en atención al cliente.', ["I've worked in customer support for six years.", "I've been working in customer support for six years.", 'I have worked in customer service for six years.', "I've worked in customer service for six years."], ''),
        ES('Gracias por tomarse el tiempo de hablar conmigo.', ['Thank you for taking the time to speak with me.', 'Thank you for taking the time to talk to me.'], ''),
        ES('Quedo a la espera de su respuesta.', ['I look forward to hearing from you.'], ''),
      ],
      review: [
        MC('M18: Polite interruption:', ['Sorry, if I could just come in here…', 'Stop!'], 0, ''),
        MC('M17: Diplomatic: “You might want to…” =', ['a suggestion', 'an order'], 0, ''),
        MC('M14: “If I had known, I ___ applied earlier.”', ['would have', 'will have'], 0, ''),
        MC('M09: “I ___ been to Austin twice.”', ["'ve", "'m"], 0, ''),
      ],
      transfer: 'Use this simulation for real: update your English CV, prepare your 5 key answers and record them.',
    },

    /* ---------------- L2 ---------------- */
    {
      title: 'Extended Listening and Reading: How Adults Learn Languages',
      goal: 'Understand an extended talk and a long article, take notes, summarize accurately, evaluate the ideas critically and respond in writing.',
      outcome: 'You write a 150-word summary of the talk and a 250-word response essay connecting it to your own learning.',
      check: 'Comprehension ≥ 80 %; summary and response essay written.',
      agenda: [
        [15, 'Listening', 'Extended talk: “Learning a language as an adult”'],
        [15, 'Reading', 'Long article: “The plateau problem”'],
        [10, 'Vocabulary', 'Language-learning vocabulary'],
        [10, 'Speaking', 'Discussion: what worked for you?'],
        [10, 'Writing', 'Summary + start of response essay'],
      ],
      input: {
        kind: 'monologue',
        title: 'Learning a language as an adult',
        context: 'A talk by a (fictional) language teacher and researcher, Dr. Emma Clarke, at a community event. It is long: listen in two parts if necessary.',
        task1: 'Listen without reading and take notes: what are the four principles she mentions?',
        task2: 'Listen with the transcript. Mark the hedging expressions and the examples she uses for each principle.',
        lines: DLG([
          ['Dr. Clarke', "Good evening. Many adults believe they are simply too old to learn a language. I'd like to challenge that idea tonight — not with promises, but with what we know, and what we don't know, about adult learning."],
          ['Dr. Clarke', "Let me start with the bad news. Children who grow up with a language usually achieve a more native-like accent than adults. That seems fairly well established. But accent is only one part of communication, and it's arguably not the most important one."],
          ['Dr. Clarke', "Now the good news. Adults have advantages that children don't: we can plan, we can use strategies, and we can understand explanations. In many studies of instructed learning, adults actually progress faster than children in the early stages."],
          ['Dr. Clarke', "So what helps? I'd highlight four principles. The first is input that you can understand. Listening and reading to material that is slightly above your level seems to be one of the most reliable drivers of progress — not hours of grammar tables alone."],
          ['Dr. Clarke', "The second is retrieval. When you try to remember a word or a phrase without looking, the effort itself strengthens memory. That's why spaced review and self-testing tend to work better than re-reading notes."],
          ['Dr. Clarke', "The third is output with feedback. Speaking and writing push you to notice the gaps in what you can say. And when you get feedback — from a teacher, a partner, or even by comparing a recording with a model — you can fix those gaps."],
          ['Dr. Clarke', "The fourth, and perhaps the least glamorous, is consistency. Twenty to sixty minutes a day, most days of the week, is likely to beat a five-hour session once a week. Language is built in layers."],
          ['Dr. Clarke', "Finally, a word about plateaus. Almost every learner reaches a point where progress feels invisible, often around the intermediate level. This is normal. The way out is usually more variety and more challenge: longer texts, faster speech, more spontaneous conversation."],
          ['Dr. Clarke', "To sum up: you are not too old. You may never sound like you were born in Chicago or Manchester, and that's fine. What you can become is clear, fluent and confident. And that, in my experience, changes lives."],
        ]),
      },
      comp: [
        MC('What does Dr. Clarke say about accent?', ['Adults always achieve a native accent', 'Children usually achieve a more native-like accent; accent is only one part of communication', 'Accent doesn\'t exist', 'Accent is the most important part'], 1, ''),
        MC('What advantage do adults have, according to her?', ['Better memory than children', 'They can plan, use strategies and understand explanations', 'They have more free time', 'They never make mistakes'], 1, ''),
        MC('What is the first principle?', ['Grammar tables', 'Understandable input slightly above your level', 'Talking to natives only', 'Living abroad'], 1, ''),
        MC('Why does retrieval work?', ['It is faster', 'The effort of remembering strengthens memory', 'It is more fun', 'It replaces speaking'], 1, ''),
        MC('What does she say about consistency?', ['One long session a week is best', 'Short, frequent practice is likely to beat one long weekly session', 'It doesn\'t matter', 'Only weekends count'], 1, ''),
        MC('What is her advice for plateaus?', ['Stop for a while', 'More variety and challenge', 'Go back to beginner materials', 'Only study grammar'], 1, ''),
      ],
      reading: {
        title: 'The plateau problem',
        intro: 'A long article (about 550 words) from a (fictional) language-learning blog. Read it in two parts if you prefer.',
        text: `If you have studied English for a few years, you probably know the feeling. At the beginning, progress was obvious: every week you could say something new. Then, somewhere around the intermediate level, the improvements became harder to see. You understand most conversations, you can survive at work, but you don't feel any closer to the fluency you imagined. Welcome to the plateau.

Plateaus are not a sign of failure. In fact, they are almost inevitable. At lower levels, each new word or structure adds a lot of communicative power: learning "Can I have…?" immediately opens hundreds of situations. At higher levels, each new item adds less. Learning the difference between "deny" and "refuse" matters, but it doesn't transform your daily life. Progress continues; it simply becomes less visible.

There is also a psychological trap. Intermediate learners are often good enough to avoid difficult situations. They choose the words they know, rephrase around structures they are unsure of, and watch series with subtitles in their own language. This is efficient for communication, but it can slow down learning, because the brain has no reason to stretch.

So how do you escape? Experienced teachers tend to recommend three strategies.

The first is to increase the challenge of your input. If you only listen to slow, clear podcasts for learners, try authentic material: interviews, debates, comedy, regional accents. Switch your subtitles to English, and then, for some programs, remove them altogether. Read long texts — novels, long-form journalism — rather than only short articles. Extensive reading and listening expose you to thousands of collocations that no course can teach explicitly.

The second is to make your output more demanding. Instead of chatting about familiar topics, give yourself tasks that force new language: explain a complex process, argue the opposite of your opinion, summarize a documentary in two minutes, retell a story using three structures you usually avoid. Recording yourself and comparing your version with a model can reveal patterns you don't notice in real time.

The third is to work deliberately on your persistent errors. Most advanced learners have a small set of mistakes that appear again and again — often the same ones they made years before. Keeping an error log, writing the correct form in several new sentences, and reviewing it regularly can finally break these habits.

None of this is magic, and none of it is fast. Learners who move from B2 to C1 usually describe a long period of steady, sometimes boring, exposure and practice. But they also describe moments when something suddenly clicks: a joke they understand, a meeting where they forget they are speaking a foreign language, a book they finish without a dictionary.

If you are on a plateau, the most important thing is not to interpret it as a ceiling. It is simply the part of the journey where the path is less steep — and longer — than before.`,
        glossary: [['plateau', 'meseta (estancamiento)'], ['inevitable', 'inevitable'], ['stretch', 'esforzarse, estirarse'], ['long-form journalism', 'periodismo de largo formato'], ['persistent', 'persistente'], ['click', 'encajar, entenderse de golpe'], ['ceiling', 'techo']],
        comp: [
          MC('According to the article, why does progress feel slower at higher levels?', ['Learners stop studying', 'Each new item adds less communicative power', 'Teachers are worse', 'English is harder at higher levels'], 1, ''),
          MC('What is the "psychological trap"?', ['Learners avoid difficult situations and rely on what they know', 'Learners study too much', 'Learners forget everything', 'Learners prefer grammar'], 0, ''),
          MC('Which is one way to increase the challenge of input?', ['Watching with subtitles in your own language', 'Using authentic materials and English subtitles or none', 'Listening only to slow podcasts', 'Reading only short articles'], 1, ''),
          MC('What does the article recommend for persistent errors?', ['Ignore them', 'Keep an error log and practice correct forms in new sentences', 'Change teachers', 'Stop speaking'], 1, ''),
          TF('The article promises fast results.', false, '“None of this is magic, and none of it is fast.”'),
          MC('What is the main message of the conclusion?', ['A plateau is a ceiling', 'A plateau is not a ceiling, just a longer, less steep part of the path', 'You should stop at B2', 'C1 is impossible'], 1, ''),
        ],
        reuse: 'Write down two strategies from the article that you will apply next week, with specific materials.',
      },
      chunks: [
        V('be well established', 'estar bien establecido / demostrado', 'That seems fairly well established.', 'Eso parece bastante establecido.', {}),
        V('the early stages', 'las primeras etapas', 'Adults often progress faster in the early stages.', 'Los adultos suelen progresar más rápido al principio.', {}),
        V('a driver of progress', 'un motor del progreso', 'Input is one of the main drivers of progress.', 'El input es uno de los principales motores del progreso.', {}),
        V('notice the gaps', 'notar las carencias', 'Speaking helps you notice the gaps in your English.', 'Hablar te ayuda a notar lo que te falta.', {}),
        V('hit / reach a plateau', 'estancarse', 'Most learners hit a plateau around B1–B2.', 'La mayoría se estanca alrededor de B1–B2.', {}),
        V('authentic material', 'material auténtico', 'Switch to authentic material: interviews, debates, comedy.', 'Pasa a material auténtico: entrevistas, debates, comedia.', {}),
        V('extensive reading / listening', 'lectura / escucha extensiva', 'Extensive reading exposes you to thousands of collocations.', 'La lectura extensiva te expone a miles de colocaciones.', {}),
        V('break a habit', 'romper un hábito', 'An error log can help you break old habits.', 'Un registro de errores ayuda a romper viejos hábitos.', {}),
        V('something clicks', 'algo encaja / se entiende de golpe', 'Suddenly, something clicked and I understood the joke.', 'De repente algo encajó y entendí el chiste.', {}),
        V("It's not a ceiling.", 'No es un techo.', "A plateau is not a ceiling.", 'Una meseta no es un techo.', {}),
      ],
      practice: [
        EX('Note-taking and summarizing', 'listening', 'Choose the best summary sentence for each part of the talk.', [
          MC('Part 1 (accent):', ['Children often get a more native-like accent, but accent is only part of communication.', 'Adults can never learn languages.', 'Accent is everything.'], 0, ''),
          MC('Part 2 (adult advantages):', ['Adults can use planning and strategies, and often progress faster at first.', 'Adults are always slower.', 'Children are better in every way.'], 0, ''),
          MC('Part 3 (principles):', ['Input, retrieval, output with feedback and consistency drive progress.', 'Only grammar matters.', 'Only living abroad works.'], 0, ''),
          MC('Part 4 (plateaus):', ['Plateaus are normal; more variety and challenge help.', 'Plateaus mean you should stop.', 'Plateaus never happen.'], 0, ''),
        ]),
        EX('Vocabulary in context', 'vocabulary', '', [
          MC('“Progress becomes less visible” means…', ['you still improve, but it\'s harder to notice', 'you stop improving', 'you improve faster'], 0, ''),
          MC('“The brain has no reason to stretch” means…', ['there is no challenge to push it', 'the brain is tired', 'the brain is too small'], 0, ''),
          MC('“Something clicks” means…', ['you suddenly understand', 'something breaks', 'you press a button'], 0, ''),
          MC('A “driver of progress” is…', ['something that causes progress', 'a person who drives', 'an obstacle'], 0, ''),
          MC('“Least glamorous” means…', ['not exciting, but important', 'the most beautiful', 'useless'], 0, ''),
        ]),
        EX('Paraphrase key ideas', 'writing', 'Paraphrase in your own words (change words and structure).', [
          TR('“Consistency is likely to beat a five-hour session once a week.”', ['Studying a little every day is probably more effective than one long session a week.', 'Regular short practice probably works better than one long weekly session.', 'Short daily practice is likely to be more effective than a long weekly session.'], 'Use self-validation if your paraphrase keeps the meaning.'),
          TR('“A plateau is not a ceiling.”', ['Feeling stuck does not mean you cannot improve further.', 'A period without visible progress is not the limit of your ability.', "Being stuck doesn't mean you've reached your limit."], ''),
          TR('“Intermediate learners are often good enough to avoid difficult situations.”', ['At an intermediate level, learners can often avoid challenging situations.', 'Intermediate learners can usually get by without facing difficult situations.'], ''),
          TR('“Retrieval: the effort of remembering strengthens memory.”', ['Trying to recall something helps you remember it better.', 'Making an effort to remember makes memory stronger.', 'The act of remembering reinforces memory.'], ''),
        ]),
      ],
      semi: {
        task: 'Write your notes from the talk in a structured format (main idea + 4 principles + plateau advice), using only keywords. Then, without looking at the transcript, say the summary aloud in 60 seconds.',
        frames: ['Main idea:…', '1. Input:…', '2. Retrieval:…', '3. Output + feedback:…', '4. Consistency:…', 'Plateau:…'],
        examples: ['Main idea: adults are not too old; accent ≠ communication.', '1. Input: slightly above level, listening/reading.', '2. Retrieval: remember without looking → spaced review.', '3. Output + feedback: speak/write, compare with model.', '4. Consistency: 20–60 min most days.', 'Plateau: normal at B1–B2 → more variety and challenge.'],
      },
      speak: [
        {
          title: 'Discussion: what worked for you?',
          context: 'A discussion group about language learning at the end of the course.',
          goal: 'Connect extended input to your own experience with nuance and critical thinking.',
          prompt: '<p>Talk for 2–3 minutes: summarize Dr. Clarke\'s main idea; say which principle has worked best for you during this course and give an example; describe any plateau you have experienced; and evaluate one claim critically (is there anything you disagree with or would qualify?).</p>',
          useful: ['Dr. Clarke argues that…', 'In my experience,…', 'What has worked best for me is…', 'I hit a plateau when…', 'I would qualify her point about… because…', 'Having said that,…'],
          time: 180,
          criteria: ['Accurate summary', 'Personal examples', 'Critical evaluation with hedging', 'Cohesive and fluent delivery'],
          model: "Dr. Clarke argues that adults are not too old to learn a language, even if they may never sound native. In my experience, what has worked best is retrieval: the daily review made words stick in a way that reading my notes never did. I definitely hit a plateau around module ten. I could understand most things, but I felt I wasn't improving. What helped was switching to English subtitles and recording myself. I'd qualify her point about accent, though: for some jobs, like customer service by phone, pronunciation might matter more than she suggests. Having said that, clarity, not a native accent, is what matters most.",
          second: 'Give advice in 60 seconds to someone who is starting this course today.',
        },
      ],
      shadow: ["Many adults believe they are simply too old to learn a language.", "Accent is only one part of communication, and it's arguably not the most important one.", 'When you try to remember a word without looking, the effort itself strengthens memory.', 'Language is built in layers.', 'What you can become is clear, fluent and confident.'],
      write: {
        title: 'Summary + response essay',
        task: '<p>Part A: write a summary of the talk (120–150 words) in your own words. Part B: write a response essay (220–260 words): “What I have learned about learning English”, connecting the talk and the article with your own experience in this course, evaluating one idea critically, and stating your plan for the next stage.</p>',
        frames: ['In her talk, Dr. Clarke argues that…', 'She identifies four principles:…', 'In my experience,…', 'The article on plateaus suggests that…', 'I would qualify…', 'From now on, I intend to…'],
        words: '350–400 (total)',
        checklist: ['Summary: paraphrased and accurate', 'Essay: clear thesis', 'Connections between sources', 'Personal evidence', 'Critical evaluation with hedging', 'Formal-neutral register and cohesion'],
        model: "Summary\nIn her talk, Dr. Emma Clarke challenges the belief that adults are too old to learn languages. Although children usually develop a more native-like accent, she argues that adults have important advantages, such as planning and strategy use, and often progress faster at the beginning. She identifies four principles that support learning: understandable input slightly above one's level, retrieval practice, speaking and writing with feedback, and consistent daily study. Finally, she describes plateaus as a normal stage, best overcome through more varied and challenging practice. Her conclusion is that, while sounding native may be unrealistic, becoming clear and confident is achievable.\n\nWhat I have learned about learning English\nWhen I started this course, I believed my problem was grammar. Looking back, I think my main problem was avoidance. ... (continue with your own experience)",
      },
      retrieval: [
        ES('La mayoría se estanca alrededor de B1.', ['Most learners hit a plateau around B1.', 'Most learners reach a plateau around B1.'], ''),
        ES('Eso parece bastante establecido.', ['That seems fairly well established.'], ''),
        ES('De repente, algo encajó.', ['Suddenly, something clicked.'], ''),
        ES('Una meseta no es un techo.', ['A plateau is not a ceiling.', "A plateau isn't a ceiling."], ''),
        ES('El idioma se construye por capas.', ['Language is built in layers.'], ''),
        ES('Hablar te ayuda a notar lo que te falta.', ['Speaking helps you notice the gaps.', 'Speaking helps you notice the gaps in your language.'], ''),
      ],
      review: [
        MC('M18: “On balance” means…', ['all things considered', 'on the contrary'], 0, ''),
        MC('M17: “It may well…” expresses…', ['probability', 'impossibility'], 0, ''),
        MC('M15: Formal for “But…” at the start of a sentence:', ['However,…', 'Anyway,…'], 0, ''),
        MC('M12: “The report ___ sent yesterday.”', ['was', 'is'], 0, ''),
      ],
      transfer: 'Choose one authentic long-form material (a book, a podcast series, a documentary) to start this week.',
    },

    /* ---------------- L3 ---------------- */
    {
      title: 'Error Audit, Progress Check and Maintenance Plan',
      goal: 'Audit your persistent errors, compare your current performance with your initial diagnosis, and write a realistic plan to keep improving after the course.',
      outcome: 'You have a list of your 10 most persistent errors with corrections, a comparison with your diagnosis, and a 3-month plan.',
      check: 'Mixed error review ≥ 80 %; diagnostic retaken (recommended); plan written and recorded.',
      agenda: [
        [10, 'Reading', '“Life after the course: a maintenance guide”'],
        [15, 'Review', 'Error audit: the 30 most common persistent errors'],
        [10, 'Self-assessment', 'Error bank + diagnostic comparison (Más → Historial)'],
        [15, 'Speaking', 'Progress presentation'],
        [10, 'Writing', 'Your 3-month maintenance plan'],
      ],
      input: {
        kind: 'reading',
        title: 'Life after the course: a maintenance guide',
        context: 'A practical guide written for students who finish this course. Read it as a checklist for your next three months.',
        task1: 'Skim: what are the five pillars of the maintenance plan?',
        task2: 'Read again and mark which pillars you already do and which you need to start.',
        text: `Finishing a course is a milestone, not the finish line. Languages need maintenance: without regular use, comprehension and especially speaking can slowly weaken. The good news is that maintaining and improving your English can take less time than you think — if it becomes part of your life rather than a separate "study" activity.

<b>1. Daily input (20–30 minutes).</b> Listen and read every day: podcasts during your commute, a series with English subtitles, news in English, a novel at night. Choose material you enjoy and that is slightly challenging. Variety matters: include at least two different accents every week.

<b>2. Spaced review (5–10 minutes).</b> Keep using your review deck. Add expressions you find in real materials — full chunks, not isolated words — and review them daily. Don't let the queue grow too large: it's better to add fewer cards and review consistently.

<b>3. Regular speaking (3 times a week).</b> Speaking is the skill that fades fastest. Find a conversation partner, a language exchange, an online tutor or a discussion group. If none are available, use the speaking bank: answer one question a day, record yourself and compare it with your earlier recordings every month.

<b>4. Writing with purpose (once a week).</b> Write something real: an email, a review, a LinkedIn post, a diary entry, a summary of an article you read. Check it against your error log before you "send" it.

<b>5. Error control (monthly).</b> Once a month, review your error bank. Choose your three most frequent errors and write five new sentences with each correct form. Notice whether they appear in your recordings.

Finally, measure your progress honestly. Retake the diagnostic every three months and compare it with your first attempt. If you want an official certificate, consider a recognized exam (for example, Cambridge, IELTS or TOEFL, depending on your goals); remember that this course cannot certify your level, but it can prepare you to keep growing.`,
        glossary: [['milestone', 'hito'], ['finish line', 'línea de meta'], ['fade', 'debilitarse, desvanecerse'], ['diary entry', 'entrada de diario'], ['recognized exam', 'examen reconocido']],
      },
      comp: [
        MC('What does the guide say about finishing a course?', ['It is the end of learning', 'It is a milestone, not the finish line', 'You don\'t need to practice anymore', 'You should start a new course immediately'], 1, ''),
        MC('How much daily input does it recommend?', ['5 minutes', '20–30 minutes', '3 hours', 'None'], 1, ''),
        MC('Which skill fades fastest, according to the guide?', ['Reading', 'Speaking', 'Writing', 'Grammar'], 1, ''),
        MC('What should you do with your error bank every month?', ['Delete it', 'Choose the three most frequent errors and write new sentences', 'Show it to friends', 'Nothing'], 1, ''),
        MC('How often should you retake the diagnostic?', ['Every week', 'Every three months', 'Never', 'Every year'], 1, ''),
        TF('The guide says this course can certify your official level.', false, '“this course cannot certify your level”.'),
      ],
      chunks: [
        V('a milestone, not the finish line', 'un hito, no la meta', 'Finishing this course is a milestone, not the finish line.', 'Terminar este curso es un hito, no la meta.', {}),
        V('part of your life', 'parte de tu vida', 'English should become part of your life, not just a subject.', 'El inglés debe ser parte de tu vida, no solo una asignatura.', {}),
        V('slightly challenging', 'un poco desafiante', 'Choose material that is slightly challenging.', 'Elige material un poco desafiante.', {}),
        V('let something grow too large', 'dejar que algo crezca demasiado', "Don't let your review queue grow too large.", 'No dejes que la cola de repaso crezca demasiado.', {}),
        V('a skill fades', 'una habilidad se debilita', 'Speaking fades fastest without practice.', 'Hablar es lo primero que se debilita sin práctica.', {}),
        V('a language exchange', 'un intercambio de idiomas', 'I found a language exchange partner online.', 'Encontré un compañero de intercambio en línea.', {}),
        V('write with purpose', 'escribir con propósito', 'Write with purpose: emails, reviews, posts.', 'Escribe con propósito: correos, reseñas, publicaciones.', {}),
        V('measure your progress honestly', 'medir tu progreso con honestidad', 'Measure your progress honestly every three months.', 'Mide tu progreso con honestidad cada tres meses.', {}),
        V('a recognized exam', 'un examen reconocido', 'If you need a certificate, take a recognized exam.', 'Si necesitas un certificado, presenta un examen reconocido.', {}),
        V('keep growing', 'seguir creciendo', 'The goal is to keep growing after the course.', 'El objetivo es seguir creciendo después del curso.', {}),
      ],
      notes: '<div class="card-in"><h3>🩹 Your error audit (15 min)</h3><ol class="bul"><li>Open <a href="#/errors">Más → Mis errores</a> and list your <b>10 most frequent errors</b>.</li><li>Group them: verb tenses · prepositions · word order · articles · verb patterns · vocabulary (false friends) · pronunciation.</li><li>Do the “30 persistent errors” exercise below. Add any you got wrong to your error bank.</li><li>For each of your top 5 errors, write <b>three new sentences</b> with the correct form (different contexts).</li></ol><h3>📈 Progress check (10 min)</h3><ol class="bul"><li>If you have time this week, <a href="#/diagnostic">retake the diagnostic</a> (it stays saved).</li><li>Open <a href="#/history">Historial</a> and compare the first and last diagnostic, your assessment scores and your study minutes.</li><li>Listen to your first speaking recording (if you kept it, e.g., from M01 or M05) and a recent one. Note three concrete differences.</li></ol><p class="small muted">Reminder: these comparisons are indicators of progress, not an official CEFR certification.</p></div>',
      practice: [
        EX('Persistent errors (1): tenses and verbs', 'grammar', 'Correct each sentence. These are some of the most persistent errors of Spanish speakers at all levels.', [
          FIX('I live in Lima since 2019.', ["I've lived in Lima since 2019.", 'I have lived in Lima since 2019.', "I've been living in Lima since 2019."], ''),
          FIX('She work in a hospital.', ['She works in a hospital.'], ''),
          FIX('Did you went to the meeting?', ['Did you go to the meeting?'], ''),
          FIX('I am agree with you.', ['I agree with you.'], ''),
          FIX('If I would have time, I would help you.', ["If I had time, I would help you.", "If I had time, I'd help you."], ''),
          FIX('I have visited Mexico last year.', ['I visited Mexico last year.'], ''),
          FIX('When I will arrive, I will call you.', ["When I arrive, I'll call you.", 'When I arrive, I will call you.'], ''),
          FIX('I am working here for three years.', ["I've been working here for three years.", "I've worked here for three years.", 'I have been working here for three years.'], ''),
          FIX('He suggested me to apply.', ['He suggested that I apply.', 'He suggested applying.', 'He suggested that I should apply.'], ''),
          FIX('I look forward to hear from you.', ['I look forward to hearing from you.'], ''),
        ]),
        EX('Persistent errors (2): structure, prepositions and vocabulary', 'grammar', 'Correct each sentence.', [
          FIX('Is very important to practice.', ["It's very important to practice.", 'It is very important to practice.'], ''),
          FIX('People is very friendly here.', ['People are very friendly here.'], ''),
          FIX('I have 30 years.', ["I'm 30.", 'I am 30.', "I'm 30 years old.", 'I am 30 years old.'], ''),
          FIX('Can you explain me the problem?', ['Can you explain the problem to me?', 'Can you explain the problem?'], ''),
          FIX('She said me that she was busy.', ['She told me that she was busy.', 'She told me she was busy.', 'She said that she was busy.'], ''),
          FIX('I arrived to the office at nine.', ['I arrived at the office at nine.'], ''),
          FIX('It depends of the price.', ['It depends on the price.'], ''),
          FIX('The life is beautiful.', ['Life is beautiful.'], ''),
          FIX('I need an advice.', ['I need some advice.', 'I need a piece of advice.'], ''),
          FIX('Actually I work in a bank. (= actualmente)', ['Currently I work in a bank.', 'Currently, I work in a bank.', 'I currently work in a bank.', 'Nowadays I work in a bank.'], ''),
        ]),
        EX('Persistent errors (3): mixed advanced', 'grammar', 'Correct each sentence.', [
          FIX('Despite it was raining, we went out.', ['Although it was raining, we went out.', 'Despite the rain, we went out.', 'Even though it was raining, we went out.'], ''),
          FIX('Although it was late, but we continued.', ['Although it was late, we continued.', 'It was late, but we continued.'], ''),
          FIX('The man which lives next door is a doctor.', ['The man who lives next door is a doctor.', 'The man that lives next door is a doctor.'], ''),
          FIX('I enjoy to read in English.', ['I enjoy reading in English.'], ''),
          FIX('She made me to wait for an hour.', ['She made me wait for an hour.'], ''),
          FIX('I wish I have more time.', ['I wish I had more time.'], ''),
          FIX('Sales increased of 20%.', ['Sales increased by 20%.'], ''),
          FIX('He asked me where was the station.', ['He asked me where the station was.'], ''),
          FIX('We should of called them.', ['We should have called them.', "We should've called them."], ''),
          FIX('Not only he was late, but he forgot the documents.', ['Not only was he late, but he also forgot the documents.', 'Not only was he late, but he forgot the documents too.'], ''),
        ]),
      ],
      semi: {
        task: 'Write your top 5 persistent errors (from your error bank or from the exercises above) and three new sentences with the correct form of each, in different contexts (work, travel, personal life).',
        frames: ['Error: … → Correct: …', '1. (work) …', '2. (travel) …', '3. (personal) …'],
        examples: ['Error: I live here since 2019 → Correct: I\'ve lived here since 2019.', '1. I\'ve worked with this client since March.', '2. We\'ve been in Cusco since Monday.', '3. I\'ve known my best friend since we were six.'],
      },
      speak: [
        {
          title: 'Progress presentation',
          context: 'You present your progress to a mentor (or to yourself, recorded) at the end of the course.',
          goal: 'Give a structured, honest, reflective presentation of your progress and plan.',
          prompt: '<p>Talk for 3 minutes: where you started (diagnostic, first recordings), what has improved (with specific examples), your three most persistent errors and how you will fix them, what you wish you had done differently, and your concrete plan for the next three months.</p>',
          useful: ['When I started,…', "I've noticed that I can now…", 'My most persistent errors are…', 'To fix them, I intend to…', 'I wish I had…', 'Over the next three months, I will…', 'My goal is to… by…'],
          time: 180,
          criteria: ['Honest comparison before/after', 'Specific evidence of progress', 'Persistent errors identified', 'Realistic, specific plan', 'Range of structures from the whole course'],
          model: "When I started this course, the diagnostic placed me at around A2, and in my first recording I spoke for barely forty seconds, with long pauses. Now I can talk for three or four minutes about complex topics, and I've noticed that I can follow podcasts at normal speed with English subtitles. My most persistent errors are still the present perfect with 'since', the third-person -s when I'm tired, and prepositions like 'depend on'. To fix them, I intend to write five sentences with each error every Sunday. I wish I had started recording myself earlier: it's the most useful thing I did. Over the next three months, I'll listen to one podcast episode a day, have two conversation sessions a week, and retake the diagnostic in January. My goal is to feel ready for the IELTS by June.",
          second: 'Explain your maintenance plan in 60 seconds to a friend who wants to start learning English.',
        },
      ],
      pron: {
        title: 'Your personal pronunciation checklist',
        explain: '<p>Review the pronunciation points that matter most for clarity (see the Pronunciation guide in Más → Pronunciación). Record yourself reading the sentences below, then check: <b>word stress</b>, final <b>-s</b> and <b>-ed</b>, vowel contrasts (/iː/–/ɪ/, /æ/–/ʌ/), <b>can/can\'t</b>, schwa in weak forms, and intonation in questions.</p>',
        drill: ["She <b>WORKS</b> in <b>MAR</b>keting and she's <b>LIVED</b> in Lima since twenty <b>NINE</b>teen.", 'I <b>CAN</b> help on <b>MON</b>day, but I <b>CAN\'T</b> on <b>TUES</b>day.', "It's a <b>CHEAP</b> <b>SHIP</b>, not a <b>SHEEP</b>!", 'Could you <b>SEND</b> me the re<b>PORT</b> by <b>FRI</b>day? ↗'],
        items: [
          MC('Which is usually the most important for being understood?', ['A perfect native accent', 'Correct word stress and clear key sounds', 'Speaking very fast'], 1, ''),
          SAY("I can't come on Tuesday.", MC('Can the speaker come?', ['Yes', 'No'], 1, '')),
          SAY('She worked there for ten years.', MC('Does she still work there?', ['Yes', 'No'], 1, 'Past simple.')),
        ],
      },
      shadow: ['Finishing a course is a milestone, not the finish line.', 'Choose material you enjoy and that is slightly challenging.', 'Speaking is the skill that fades fastest.', 'Measure your progress honestly.', 'This course cannot certify your level, but it can prepare you to keep growing.'],
      write: {
        title: 'My 3-month maintenance plan',
        task: '<p>Write your personal plan (200–250 words) for the next three months. Include: your goals (specific and measurable), weekly routine for each pillar (input, review, speaking, writing, error control), materials you will use, how you will measure progress, and what you will do if you lose motivation.</p>',
        frames: ['My main goal for the next three months is to…', 'Every day, I will…', 'Three times a week, I will…', 'Once a week,…', 'Every month,…', 'I will measure my progress by…', 'If I lose motivation, I will…'],
        words: '200–250',
        checklist: ['Specific, measurable goals', 'All five pillars covered', 'Concrete materials and times', 'Measurement method (diagnostic, recordings)', 'Plan B for low motivation', 'Accurate future forms (will, going to, present continuous)'],
        model: "My 3-month English maintenance plan\n\nMy main goal for the next three months is to speak for five minutes about a professional topic without long pauses, and to understand a full podcast episode without subtitles. I'm also going to prepare for the IELTS, which I plan to take next June.\n\nEvery day, I will listen to 20 minutes of a business podcast on my way to work and review my vocabulary deck for 10 minutes before breakfast. I will add three new expressions a day from real materials, not from lists.\n\nThree times a week, I will practice speaking: on Tuesdays and Thursdays with my language-exchange partner, Mark, and on Saturdays by answering a question from the speaking bank and recording myself.\n\nOnce a week, I will write something real in English: a LinkedIn post, a review or a summary of an article. Before posting, I will check it against my error log.\n\nEvery month, I will review my three most frequent errors and write five new sentences with each correct form. On January 15th, I'll retake the diagnostic and compare it with my first one.\n\nIf I lose motivation, I will reduce the plan to the minimum — ten minutes of listening a day — rather than stopping completely, and I will reread this plan.",
      },
      retrieval: [
        ES('Terminar el curso es un hito, no la meta.', ['Finishing the course is a milestone, not the finish line.'], ''),
        ES('Hablar es lo primero que se debilita.', ['Speaking is the skill that fades fastest.', 'Speaking fades fastest.', 'Speaking is the first skill to fade.'], ''),
        ES('Repetiré el diagnóstico en tres meses.', ["I'll retake the diagnostic in three months.", 'I will retake the diagnostic in three months.', "I'm going to retake the diagnostic in three months."], ''),
        ES('Mis errores más persistentes son…', ['My most persistent errors are…', 'My most persistent mistakes are…', 'My most persistent errors are'], ''),
        ES('Ojalá hubiera empezado a grabarme antes.', ['I wish I had started recording myself earlier.', "I wish I'd started recording myself earlier."], ''),
        ES('Este curso no puede certificar mi nivel.', ['This course cannot certify my level.', "This course can't certify my level."], ''),
      ],
      review: [
        MC('M18: “The argument rests on the ___ that…”', ['assumption', 'assume'], 0, ''),
        MC('M16: “I had my car ___.”', ['repaired', 'repair'], 0, ''),
        MC('M11: “If it ___ tomorrow, we\'ll stay home.”', ['rains', 'will rain'], 0, ''),
        MC('M05: “I ___ to Bogotá last year.”', ['went', 'have gone'], 0, ''),
      ],
      transfer: 'Put the first two weeks of your plan in your calendar today and set a reminder to retake the diagnostic in three months.',
    },
  ],

  assessment: {
    listening: {
      context: 'Final listening: part of a podcast interview with a (fictional) software engineer who moved from Medellín to Toronto.',
      lines: DLG([
        ['Host', "Juliana, you moved to Toronto four years ago. What was the hardest part of working in English?", '', 'en-US'],
        ['Juliana', "Honestly, it wasn't the technical vocabulary. I'd been reading documentation in English for years. The hardest part was the meetings: people interrupting each other, jokes, cultural references I didn't get.", '', 'en-US'],
        ['Host', "How did you deal with that?", '', 'en-US'],
        ['Juliana', "At first I stayed quiet, which wasn't a great strategy. My manager actually told me in a review that the team wanted to hear more of my ideas. That was a turning point.", '', 'en-US'],
        ['Juliana', "So I started preparing one comment before every meeting, and I learned phrases like 'Can I just add something here?'. It sounds small, but it changed how people saw me.", '', 'en-US'],
        ['Host', "And your accent? Was that an issue?", '', 'en-US'],
        ['Juliana', "Not really. Toronto is incredibly diverse; half my team has an accent. What mattered more was being clear — and asking when I didn't understand, instead of pretending.", '', 'en-US'],
        ['Host', "Any regrets?", '', 'en-US'],
        ['Juliana', "I wish I had practiced speaking much earlier, back in Colombia. If I had, I'd probably have been promoted sooner. But I've learned that it's never too late.", '', 'en-US'],
      ]),
      items: [
        MC('What was the hardest part for Juliana?', ['Technical vocabulary', 'Meetings: interruptions, jokes and cultural references', 'Writing emails', 'Her accent'], 1, ''),
        MC('Why wasn\'t technical vocabulary difficult?', ['She had studied it at school', "She'd been reading documentation in English for years", 'Her team spoke Spanish', 'She used a translator'], 1, ''),
        MC('What was the turning point?', ['A promotion', 'Her manager said the team wanted to hear more of her ideas', 'A new job', 'Moving house'], 1, ''),
        MC('What strategy did she adopt?', ['Staying quiet', 'Preparing one comment before every meeting and learning interruption phrases', 'Taking a course', 'Only writing emails'], 1, ''),
        MC('What does she say about accent?', ['It was a big problem', 'Not really an issue; being clear and asking mattered more', 'She changed it completely', 'Her team criticized it'], 1, ''),
        MC('What does she regret?', ['Moving to Toronto', 'Not practicing speaking earlier', 'Studying engineering', 'Changing jobs'], 1, ''),
      ],
    },
    reading: {
      title: 'Final reading: The bilingual workplace',
      text: `As companies become more international, more and more professionals spend their working day in a second language. For many, this is an opportunity; for others, a source of constant fatigue.

Researchers who study multilingual teams have described a phenomenon sometimes called "second-language fatigue": the extra mental effort required to follow fast conversations, choose words carefully and monitor one's own accuracy. Non-native speakers may contribute less in meetings not because they have fewer ideas, but because the cost of speaking is higher. This, in turn, can lead colleagues to underestimate their competence — an unfair but common bias.

Organizations can reduce this gap with simple measures: sharing agendas in advance, summarizing decisions in writing, encouraging people to ask for clarification, and, perhaps most importantly, slowing down. Native speakers, too, have a role: avoiding heavy idioms, checking understanding, and resisting the temptation to finish other people's sentences.

For learners, the message is twofold. First, fatigue is normal and tends to decrease as language becomes more automatic. Second, waiting until you feel "perfect" before speaking is a strategy that rarely works. Preparing contributions, using phrases to gain time and asking clarifying questions are not signs of weakness, but professional skills.`,
      items: [
        MC('What is "second-language fatigue"?', ['Tiredness from traveling', 'The extra mental effort of working in a second language', 'A medical condition', 'Boredom in meetings'], 1, ''),
        MC('Why might non-native speakers contribute less in meetings?', ['They have fewer ideas', 'The cost of speaking is higher for them', 'They are shy by nature', 'They are not allowed'], 1, ''),
        MC('What unfair bias can result?', ['Colleagues may underestimate their competence', 'They are paid more', 'They are promoted faster', 'Nothing'], 0, ''),
        MC('Which is NOT one of the measures mentioned for organizations?', ['Sharing agendas in advance', 'Summarizing decisions in writing', 'Requiring a native accent', 'Slowing down'], 2, ''),
        MC('What role do native speakers have?', ['None', 'Avoiding heavy idioms, checking understanding, not finishing others\' sentences', 'Correcting every error', 'Speaking faster'], 1, ''),
        MC('What is the "twofold" message for learners?', ['Stop working in English', 'Fatigue is normal and decreases; don\'t wait to be perfect before speaking', 'Only speak when perfect', 'Avoid meetings'], 1, ''),
      ],
    },
    items: [
      FIX('She work in a hospital since 2018.', ["She's worked in a hospital since 2018.", 'She has worked in a hospital since 2018.', "She's been working in a hospital since 2018."]),
      FIX('Did you saw the email?', ['Did you see the email?']),
      MC('There ___ a lot of people at the event.', ['were', 'was'], 0, ''),
      MC('How ___ information do you need?', ['much', 'many'], 0, ''),
      MC("I'm looking forward to ___ you.", ['meeting', 'meet'], 0, ''),
      MC("If I ___ more time, I'd travel more.", ['had', 'have', 'would have'], 0, ''),
      MC('If I had known, I ___ you.', ['would have called', 'would call', 'will call'], 0, ''),
      MC('The building ___ in 1920.', ['was built', 'built', 'has built'], 0, ''),
      MC('She asked me where I ___.', ['lived', 'did live', 'live I'], 0, ''),
      MC('___ the delay, the project was a success.', ['Despite', 'Although', 'However'], 0, ''),
      MC('My manager, ___ is from Chile, approved it.', ['who', 'that', 'which'], 0, ''),
      MC('He ___ have forgotten. He never forgets. (deduction)', ["can't", "mustn't", 'should'], 0, ''),
      MC('I wish I ___ harder at school.', ['had studied', 'studied', 'would study'], 0, ''),
      MC('Not only ___ late, but he also lost the keys.', ['was he', 'he was'], 0, ''),
      MC('It is likely ___ rain tomorrow.', ['to', '—', 'that'], 0, ''),
      MC('___ a decision', ['make', 'do'], 0, ''),
      MC('Diplomatic: “The report ___ be a bit long.”', ['might', 'must'], 0, ''),
      MC('“Either we cut costs or we close” is…', ['a false dilemma', 'a statistic'], 0, ''),
      ES('Llevo tres años aprendiendo inglés.', ["I've been learning English for three years.", 'I have been learning English for three years.', "I've been studying English for three years."], ''),
      ES('Si hubiera sabido, habría venido.', ["If I had known, I would have come.", "If I'd known, I'd have come."], ''),
      ES('Se espera que las ventas suban.', ['Sales are expected to rise.', 'It is expected that sales will rise.', 'Sales are expected to increase.'], ''),
      ES('Solo para aclarar, ¿te refieres al lunes o al martes?', ['Just to clarify, do you mean Monday or Tuesday?'], ''),
    ],
    speak: {
      title: 'Final integrated speaking (6–8 minutes)',
      context: 'Final evaluation. Record all parts in one session if possible.',
      prompt: '<p><b>Part 1 (1 min):</b> introduce yourself professionally (present perfect, achievements). <b>Part 2 (2 min):</b> tell an anecdote about a challenge you overcame (narrative tenses, reflection with third/mixed conditionals). <b>Part 3 (2 min):</b> summarize Juliana\'s interview and the bilingual-workplace article, and give your opinion with hedging. <b>Part 4 (2 min):</b> argue for or against: "Companies should offer free language training to all employees", including a counterargument and a call to action. Compare this recording with your first one.</p>',
      useful: ["I've worked as… for…", 'It happened when…', 'If I hadn\'t…, I wouldn\'t…', 'Both sources suggest that…', 'It could be argued that…', 'I urge…'],
      time: 420,
      criteria: ['Fluency over 6–8 minutes', 'Range: tenses, conditionals, modals, passives', 'Accuracy in persistent structures', 'Coherence and discourse markers', 'Interaction strategies / clarity', 'Pronunciation: clear and comprehensible'],
    },
    write: {
      title: 'Final essay',
      task: '<p>Write an essay (250–300 words): "Speaking English at work: obstacle or opportunity?" Use the final listening and reading as sources (paraphrased), add your own experience, present a nuanced position, address a counterargument, and conclude with recommendations for learners and for companies.</p>',
      words: '250–300',
      checklist: ['Clear nuanced thesis', 'Synthesis of both sources (paraphrased)', 'Personal evidence', 'Counterargument and rebuttal', 'Recommendations for two audiences', 'Formal register, cohesion and accuracy'],
      model: "Speaking English at work: obstacle or opportunity?\n\nFor millions of professionals, English is no longer a subject studied at school but the language of their daily work. Whether this represents an obstacle or an opportunity depends, in my view, less on accent or grammar than on how individuals and organizations manage the challenge.\n\nThe difficulties are real. Research on multilingual teams suggests that working in a second language involves considerable mental effort, which may lead non-native speakers to contribute less in meetings and, unfairly, to be seen as less competent. The experience of Juliana, a Colombian engineer in Toronto, illustrates this: her technical English was strong, yet she initially stayed silent in fast-paced meetings.\n\nHowever, her story also shows how quickly the obstacle can become an opportunity. Once she began preparing contributions and using phrases to enter discussions, her colleagues' perception of her changed. In my own experience, the same is true: the turning point came not when my English became perfect, but when I stopped waiting for it to be perfect.\n\nSome might argue that companies should simply hire native speakers to avoid these problems. This argument, however, ignores the value of diverse teams and the fact that clarity, not nativeness, is what effective communication requires.\n\nIn conclusion, speaking English at work is best seen as a demanding opportunity. Learners should practice speaking early, prepare for meetings and ask for clarification without embarrassment. Companies, for their part, can share agendas in advance, summarize decisions in writing and encourage everyone — native speakers included — to communicate more clearly. Language, after all, should be a bridge rather than a barrier.",
    },
  },
});
