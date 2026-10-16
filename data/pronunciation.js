/* Guía de referencia de pronunciación (inglés estadounidense) para hispanohablantes.
   Los símbolos son del AFI (IPA). Hay muchas variedades válidas del inglés:
   aquí se usa una pronunciación estadounidense general como modelo, no como la única correcta. */
window.EM = window.EM || {};
EM.pron = {
  intro: `
<p>El inglés tiene unos <b>14–15 sonidos vocálicos</b> distintos (según el análisis) frente a 5 del español, y su ritmo se basa en <b>sílabas acentuadas</b>: las palabras importantes se alargan y las funcionales se reducen. Por eso el objetivo no es “sonar nativo”, sino ser <b>claro y fácil de entender</b>.</p>
<p>Prioridades para hispanohablantes (de mayor a menor impacto en la comprensión): 1) acento de palabra, 2) sonidos finales (-s, -ed), 3) contrastes vocálicos (ship/sheep, cat/cut), 4) ritmo y formas débiles, 5) consonantes como /v/, /θ/, /z/.</p>
<p class="small">Usa 🔊 para oír el modelo con la voz de tu dispositivo (calidad variable; si una voz suena rara, cambia de voz en Ajustes). Graba tu versión y compárala. No hay evaluación automática de pronunciación.</p>`,
  sections: [
    {
      title: '1. /iː/ (sheep) vs /ɪ/ (ship)',
      explain: `<p><b>/iː/</b>: labios estirados como sonriendo, lengua alta y tensa, sonido algo más largo (como una “i” española tensa). <b>/ɪ/</b>: más relajado y corto, la boca un poco más abierta; suena entre la “i” y la “e” españolas. La diferencia principal es la <b>calidad</b> (tensa/relajada), no solo la duración.</p>`,
      pairs: [['sheep', 'ship'], ['leave', 'live'], ['feel', 'fill'], ['beat', 'bit'], ['seat', 'sit'], ['eat', 'it'], ['heel', 'hill'], ['team', 'Tim']],
      drill: ['<b>This</b> is <b>six</b> times <b>bigger</b>.', 'Please <b>leave</b> it in the <b>green</b> box.', 'Do you <b>live</b> here, or do you <b>leave</b> tomorrow?'],
      tip: 'Si dudas, en /ɪ/ relaja la cara y acorta. Palabras de alta frecuencia con /ɪ/: it, is, in, this, his, will, big, live, city, business (BIZ-nis).',
    },
    {
      title: '2. /æ/ (cat) vs /ʌ/ (cut) vs /ɑ/ (hot)',
      explain: `<p><b>/æ/</b>: boca muy abierta y labios estirados, entre “a” y “e”: <i>cat, bad, have, happy</i>. <b>/ʌ/</b>: “a” corta y relajada, mandíbula media: <i>cut, but, love, money, come</i> (aunque se escriben con o, suenan /ʌ/). <b>/ɑ/</b>: “a” abierta y atrás, como una “a” española larga: <i>hot, stop, father, job</i> en inglés estadounidense.</p>`,
      pairs: [['cat', 'cut'], ['bag', 'bug'], ['hat', 'hut'], ['cap', 'cup'], ['match', 'much'], ['ran', 'run'], ['cot', 'cut'], ['hot', 'hut']],
      drill: ['My <b>mom</b> has a <b>black cat</b> and a <b>lucky duck</b>.', "I'm <b>hungry</b> but I <b>can\'t</b> stop <b>now</b>.", 'The <b>bus</b> was <b>much</b> too <b>fast</b>.'],
    },
    {
      title: '3. La schwa /ə/: el sonido más frecuente del inglés',
      explain: `<p>La schwa es una vocal neutra, corta y relajada (como un “e” muy débil). Aparece en casi todas las <b>sílabas no acentuadas</b>, se escriba con a, e, i, o, u: <i>a<b>bout</b> /əˈbaʊt/, ba<b>na</b>na /bəˈnænə/, <b>prob</b>lem /ˈprɑbləm/, to<b>day</b> /təˈdeɪ/, <b>sev</b>en /ˈsɛvən/</i>. Si pronuncias todas las vocales “completas” como en español, el ritmo se rompe y cuesta entenderte.</p>`,
      drill: ['a<b>bout</b> · a<b>gain</b> · to<b>day</b> · po<b>lice</b> · <b>choc</b>olate (CHOK-lit)', 'I want <b>a cup</b> of <b>cof</b>fee (a /ə/, of /əv/)', '<b>Can</b>ada · ca<b>na</b>dian · <b>pho</b>tograph · pho<b>tog</b>rapher'],
      tip: 'Las palabras funcionales (a, the, to, of, for, and, can, was) casi siempre usan schwa cuando no se enfatizan.',
    },
    {
      title: '4. /uː/ (food) vs /ʊ/ (good)',
      explain: '<p><b>/uː/</b>: labios redondos y tensos, como una “u” española: <i>food, school, blue, you</i>. <b>/ʊ/</b>: más relajado y corto, labios poco redondeados: <i>good, book, look, could, would, should, put</i>.</p>',
      pairs: [['fool', 'full'], ['pool', 'pull'], ['Luke', 'look'], ['suit', 'soot'], ["who'd", 'hood']],
      drill: ['<b>Could</b> you <b>look</b> at this <b>good book</b>?', 'The <b>pool</b> at <b>school</b> is <b>full</b>.'],
    },
    {
      title: '5. /b/ vs /v/',
      explain: '<p>En español la “b” y la “v” suenan igual; en inglés no. <b>/v/</b>: los dientes de arriba tocan suavemente el labio de abajo y vibra la garganta (como una “f” con voz). <b>/b/</b>: los dos labios se juntan y se separan.</p>',
      pairs: [['very', 'berry'], ['vote', 'boat'], ['van', 'ban'], ['vest', 'best'], ['curve', 'curb'], ['vowel', 'bowel']],
      drill: ['<b>Very</b> good <b>vibes</b> in <b>Vegas</b>.', 'I <b>have</b> a <b>van</b> and a <b>bike</b>.', 'We <b>voted</b> on the <b>best</b> <b>video</b>.'],
      tip: 'Pon un dedo sobre la garganta: en /v/ debes sentir vibración continua.',
    },
    {
      title: '6. /θ/ (think) y /ð/ (this)',
      explain: '<p>La punta de la lengua toca ligeramente el borde de los dientes de arriba y sale aire. <b>/θ/</b> es sin voz (como la “z” de España en “zapato”): <i>think, three, thanks, month, birthday</i>. <b>/ð/</b> es con voz y se parece mucho a la “d” suave de “na<b>d</b>a”: <i>this, that, they, mother, the</i>.</p>',
      pairs: [['think', 'sink'], ['three', 'tree'], ['thank', 'tank'], ['thin', 'tin'], ['they', 'day'], ['those', 'doze'], ['mouth', 'mouse']],
      drill: ['<b>Thanks</b> for the <b>three things</b>.', '<b>This</b> is <b>the</b> <b>third Thursday</b> of <b>the</b> <b>month</b>.', '<b>They</b> <b>think</b> <b>that</b> <b>the</b> <b>weather</b> is fine.'],
    },
    {
      title: '7. /z/ (zoo) vs /s/ (sue)',
      explain: '<p>El español casi no tiene /z/ sonora. Es una “s” con vibración en la garganta (como el zumbido de una abeja). Es MUY frecuente: <i>is, was, his, has, does, easy, busy, music, reason, these</i>, y en muchos plurales y terceras personas (<i>dogs, plays, goes</i>).</p>',
      pairs: [['sue', 'zoo'], ['ice', 'eyes'], ['price', 'prize'], ['bus', 'buzz'], ['place', 'plays'], ['niece', 'knees']],
      drill: ['<b>Is</b> <b>this</b> <b>easy</b>? <b>Yes</b>, it <b>is</b>.', 'He <b>always plays</b> <b>music</b> on <b>Thursdays</b>.', '<b>These</b> <b>are</b> <b>his</b> <b>shoes</b>.'],
    },
    {
      title: '8. /ʃ/ (share) vs /tʃ/ (chair) y /dʒ/ (job) vs /j/ (yes)',
      explain: '<p><b>/ʃ/</b>: el sonido de pedir silencio “shhh”: <i>she, shop, wash, nation</i>. <b>/tʃ/</b>: como la “ch” española: <i>chair, watch, kitchen</i>. <b>/dʒ/</b>: “ch” con voz: <i>job, just, age, July</i>. <b>/j/</b>: como la “i” de “hielo”: <i>yes, you, year</i>. Muchos hispanohablantes dicen “jes” por “yes”: eso cambia el significado.</p>',
      pairs: [['share', 'chair'], ['ship', 'chip'], ['wash', 'watch'], ['shoes', 'choose'], ['jet', 'yet'], ['joke', 'yolk'], ['jam', 'yam'], ['Jell-O', 'yellow']],
      drill: ['<b>She</b> <b>chose</b> <b>cheap shoes</b>.', '<b>Yes</b>, I <b>just</b> got the <b>job</b> <b>yesterday</b>.'],
    },
    {
      title: '9. /h/ suave y la s inicial',
      explain: '<p><b>/h/</b> es solo aire, como empañar un vidrio; no raspes la garganta como la “j” española: <i>hello, house, who, behind</i>. <b>S + consonante</b> al inicio: no añadas “e” antes. Se dice <i>school</i>, no “eschool”: <i>Spain, student, street, speak, sport, smile, snow</i>. Truco: alarga la s (“sssschool”) y luego une la consonante.</p>',
      drill: ['<b>H</b>ow are you? <b>H</b>ave you <b>h</b>eard from <b>H</b>elen?', 'The <b>st</b>udents <b>sp</b>eak <b>Sp</b>anish at <b>sch</b>ool.', '<b>St</b>art the <b>st</b>ory in <b>Sp</b>ring.'],
    },
    {
      title: '10. Terminaciones -s y -ed',
      explain: `<p><b>-s / -es</b> (plurales, tercera persona, posesivo): /s/ después de sonido sordo (<i>books, works, cats</i>), /z/ después de sonido sonoro (<i>dogs, plays, goes</i>), /ɪz/ después de s, z, sh, ch, j (<i>buses, watches, pages</i>).</p>
<p><b>-ed</b> (pasado regular): /t/ después de sonido sordo (<i>worked, stopped, watched</i>), /d/ después de sonido sonoro (<i>played, lived, called</i>), /ɪd/ solo después de t o d (<i>wanted, needed, started</i>). Error muy frecuente: decir “work-ed” con sílaba extra.</p>`,
      drill: ['She <b>works</b>, he <b>plays</b>, it <b>finishes</b>.', 'I <b>worked</b>, I <b>played</b>, I <b>wanted</b>.', 'We <b>watched</b> the <b>matches</b> and <b>visited</b> the <b>clubs</b>.'],
    },
    {
      title: '11. Acento de palabra (word stress)',
      explain: `<p>Cada palabra de 2+ sílabas tiene una sílaba fuerte: más larga, más alta y con vocal completa; las otras se reducen (a menudo a schwa). Un acento mal colocado dificulta más la comprensión que un sonido imperfecto.</p>
<p>Patrones útiles: muchos sustantivos de 2 sílabas en la 1.ª (<i>TAble, OFfice, PROject</i>); muchos verbos de 2 sílabas en la 2.ª (<i>deCIDE, beGIN, reLAX</i>); <i>reCORD</i> (verbo) vs <i>REcord</i> (sustantivo); palabras en -tion/-sion acentúan la sílaba anterior (<i>inforMAtion, deCIsion</i>); en -ic también (<i>ecoNOMic</i>); en -ity la antepenúltima (<i>uniVERsity, abILity</i>).</p>`,
      drill: ['<b>PHO</b>tograph · pho<b>TOG</b>rapher · photo<b>GRAPH</b>ic', '<b>COM</b>fortable (3 sílabas: COMF-ter-ble) · <b>VEG</b>etable (VEJ-ta-ble)', 'de<b>VEL</b>op · de<b>VEL</b>oper · de<b>VEL</b>opment', '<b>EV</b>ent? No: e<b>VENT</b> · <b>HO</b>tel? No: ho<b>TEL</b>'],
    },
    {
      title: '12. Acento de frase, ritmo y formas débiles',
      explain: `<p>En la frase se acentúan las <b>palabras de contenido</b> (sustantivos, verbos principales, adjetivos, adverbios, negaciones) y se reducen las <b>funcionales</b> (artículos, preposiciones, auxiliares, pronombres). El tiempo entre sílabas fuertes tiende a ser regular, así que las débiles se “comprimen”.</p>
<p>Formas débiles frecuentes: <i>to /tə/, for /fər/, of /əv/, and /ən/, can /kən/, was /wəz/, were /wər/, at /ət/, a /ə/, the /ðə/, do you /dəjə/</i>. Atención: <b>can</b> /kən/ (débil) vs <b>can't</b> /kænt/ (fuerte, vocal completa): la diferencia está sobre todo en la vocal y el acento.</p>`,
      drill: ['I <b>WANT</b> to <b>GO</b> to the <b>PARK</b>.', 'I can <b>SWIM</b>. / I <b>CAN\'T</b> <b>SWIM</b>.', '<b>WHERE</b> was he <b>GO</b>ing?', 'It was a <b>CUP</b> of <b>TEA</b> and a <b>PIECE</b> of <b>CAKE</b>.'],
    },
    {
      title: '13. Linking: unir palabras',
      explain: `<p>En el habla conectada las palabras se unen: <b>consonante + vocal</b> (<i>turn‿off → tur-noff, an‿apple, pick‿it‿up</i>); <b>misma consonante</b> se pronuncia una vez, algo más larga (<i>bus‿stop, big‿game</i>); entre vocales aparece una /w/ o /j/ de transición (<i>go‿(w)on, I‿(y)am, see‿(y)it</i>).</p>`,
      drill: ['Turn‿it‿off.', 'Pick‿it‿up‿at‿eight.', 'Can‿I‿have‿an‿orange?', 'Let\'s‿talk‿about‿it.'],
    },
    {
      title: '14. La T estadounidense (flap) y otras reducciones',
      explain: `<p>En inglés estadounidense, una t (o d) entre vocales, con la segunda vocal débil, suele sonar como una “r” suave española (golpe rápido de lengua): <i>water, better, city, party, a lot of, get it, what about</i>. Antes de /n/ a veces se corta en la garganta: <i>button, certain</i>.</p>
<p>Reducciones de habla informal (para <b>entender</b>, úsalas con moderación al hablar y no al escribir formalmente): <i>going to → gonna, want to → wanna, got to → gotta, kind of → kinda, let me → lemme, did you → didja, what are you → whatcha / whaddaya</i>.</p>`,
      drill: ['<b>Wa</b>ter · <b>bet</b>ter · <b>ci</b>ty · <b>par</b>ty', 'I\'m <b>gonna</b> get a <b>lot</b> of <b>bet</b>ter <b>wa</b>ter.', 'What are you going to do? → Whaddaya gonna do?'],
      tip: 'Pronunciación cuidadosa y habla conectada son correctas las dos: la primera es útil para que te entiendan claramente; conocer la segunda es clave para entender a nativos.',
    },
    {
      title: '15. Entonación',
      explain: `<p><b>Descendente</b> (↘): afirmaciones, preguntas con wh- (what, where, why), órdenes: <i>Where do you live? ↘</i>. <b>Ascendente</b> (↗): preguntas de sí/no, sorpresa, frases que continúan: <i>Do you live here? ↗</i>. <b>Listas</b>: sube en cada elemento y baja en el último: <i>apples ↗, bananas ↗ and grapes ↘</i>. Una entonación demasiado plana puede sonar seca o desinteresada; subir un poco al final de peticiones suena más amable: <i>Could you help me? ↗</i></p>`,
      drill: ['Where are you from? ↘', 'Are you from Mexico? ↗', 'I need eggs ↗, milk ↗ and bread ↘.', 'Really? ↗ That\'s amazing! ↘'],
    },
  ],
};
