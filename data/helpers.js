/* Funciones de autoría del contenido. Los archivos de data/modules/*.js las usan
   para escribir el material de forma compacta. registerModule() asigna los
   identificadores estables (mXX-lN-p1, mXX-A-g…) que usa el progreso guardado.
   IMPORTANTE: no cambies el orden de lecciones ni de bloques de un módulo ya
   publicado, porque los resultados guardados dependen de esos identificadores. */
window.EM = window.EM || {};
EM.modules = EM.modules || {};

/** Vocabulario: inglés, español, ejemplo, traducción del ejemplo, extras {col, pron, use}. */
function V(en, es, ex, exEs, o) {
  return Object.assign({ en: en, es: es, ex: ex || '', exEs: exEs || '' }, o || {});
}
/** Opción múltiple: a = índice correcto (desde 0). */
function MC(q, o, a, why) {
  return { t: 'mc', q: q, o: o, a: a, why: why || '' };
}
/** Verdadero / falso. */
function TF(q, isTrue, why) {
  return { t: 'mc', q: q, o: ['True', 'False'], a: isTrue ? 0 : 1, why: why || '' };
}
/** Completar el hueco ___ (una o varias respuestas aceptadas). */
function GAP(q, a, why, hint) {
  return { t: 'gap', q: q, a: [].concat(a), why: why || '', hint: hint || '' };
}
/** Ordenar palabras: se escribe la frase correcta; las fichas se mezclan solas. */
function ORD(sentence, why, alts) {
  const clean = sentence.replace(/[.?!]+$/, '');
  return { t: 'ord', w: clean.split(/\s+/), a: [sentence].concat(alts || []), why: why || '' };
}
/** Transformar / reescribir (texto libre con varias respuestas aceptadas). */
function TR(q, a, why, label) {
  return { t: 'tr', q: q, a: [].concat(a), why: why || '', label: label || 'Reescribe' };
}
/** Corregir el error. */
function FIX(wrong, a, why) {
  return { t: 'tr', q: wrong, a: [].concat(a), why: why || '', label: 'Corrige' };
}
/** Traducir del español al inglés. */
function ES(es, a, why) {
  return { t: 'tr', q: es, a: [].concat(a), why: why || '', label: 'En inglés' };
}
/** Ítem de escucha: añade un texto que se reproduce con 🔊 antes de responder. */
function SAY(text, item) {
  item.say = text;
  return item;
}
/** Bloque de ejercicios. */
function EX(title, skill, instr, items) {
  return { title: title, skill: skill, instr: instr, items: items };
}
/** Diálogo: líneas [hablante, inglés, español opcional, variedad opcional (en-GB, en-AU, en-IN…)]. */
function DLG(lines) {
  return lines.map(function (l) {
    return { speaker: l[0], text: l[1], es: l[2] || '', lang: l[3] || '' };
  });
}

EM.registerModule = function (m) {
  const blocksOf = [];
  m.lessons.forEach(function (L, i) {
    const lid = m.id + '-l' + (i + 1);
    L.id = lid;
    L.n = i + 1;
    L._blocks = [];
    const add = function (key, title, skill, items, instr) {
      if (!items || !items.length) return null;
      const b = { id: lid + '-' + key, title: title, skill: skill, items: items, instr: instr || '' };
      L._blocks.push(b.id);
      return b;
    };
    if (L.warmup && L.warmup.items) L.warmup.block = add('warm', 'Activación', 'vocabulary', L.warmup.items, L.warmup.instr);
    if (L.input && L.comp) {
      const sk = L.input.kind === 'reading' ? 'reading' : 'listening';
      L.compBlock = add('comp', 'Comprensión', sk, L.comp, L.compInstr || (sk === 'listening' ? 'Responde después de escuchar. Si es posible, sin leer la transcripción.' : 'Responde según el texto.'));
    }
    if (L.reading && L.reading.comp) L.reading.block = add('read', 'Comprensión lectora', 'reading', L.reading.comp, 'Responde según el texto.');
    (L.practice || []).forEach(function (b, j) {
      b.id = lid + '-p' + (j + 1);
      L._blocks.push(b.id);
    });
    if (L.pron && L.pron.items) L.pron.block = add('pron', 'Identifica los sonidos', 'pronunciation', L.pron.items, L.pron.instr || 'Escucha (botón 🔊) o pronuncia en voz alta antes de responder.');
    if (L.retrieval) L.retBlock = add('ret', 'Recuperación sin ayudas', L.retrievalSkill || 'grammar', L.retrieval, 'Cierra las explicaciones y responde de memoria.');
    if (L.review) L.revBlock = add('rev', 'Repaso acumulativo', 'grammar', L.review, 'Contenido de lecciones y módulos anteriores.');
    blocksOf.push(L._blocks);
  });
  if (m.assessment) {
    const A = m.assessment;
    A._blocks = [];
    if (A.listening) {
      A.listening.block = { id: m.id + '-A-l', title: 'Listening', skill: 'listening', items: A.listening.items, instr: 'Escucha (o lee en voz alta) y responde.' };
      A._blocks.push(A.listening.block);
    }
    if (A.reading) {
      A.reading.block = { id: m.id + '-A-r', title: 'Reading', skill: 'reading', items: A.reading.items, instr: 'Lee el texto y responde.' };
      A._blocks.push(A.reading.block);
    }
    if (A.items) {
      A.block = { id: m.id + '-A-g', title: 'Gramática y vocabulario', skill: 'grammar', items: A.items, instr: 'Sin consultar el material.' };
      A._blocks.push(A.block);
    }
  }
  EM.modules[m.id] = m;
};
