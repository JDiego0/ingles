// Validador de contenido: node tests/validate.mjs
// Carga los datos del curso en un contexto aislado y comprueba estructura,
// respuestas, secciones obligatorias y ausencia de placeholders.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ctx = { console };
ctx.window = ctx;
vm.createContext(ctx);
const load = (f) => vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });

['data/helpers.js', 'data/rubrics.js', 'data/curriculum.js', 'data/speaking-bank.js', 'data/pronunciation.js', 'data/help.js', 'data/assessments/diagnostic.js'].forEach(load);

const errors = [];
const warns = [];
const E = (where, msg) => errors.push(`${where}: ${msg}`);

// Sintaxis de todos los scripts de la app (sin ejecutarlos)
for (const f of fs.readdirSync(path.join(root, 'assets/js')).concat(['../../sw.js'])) {
  const p = path.join(root, 'assets/js', f);
  try {
    new vm.Script(fs.readFileSync(p, 'utf8'), { filename: f });
  } catch (e) {
    E('assets/js/' + f, 'error de sintaxis: ' + e.message);
  }
}
const W = (where, msg) => warns.push(`${where}: ${msg}`);
const only = process.argv[2];

const BAD_TEXT = /\b(TODO|TBD)\b|lorem ipsum|[Pp]laceholder|por agregar|contenido pendiente|coming soon/;

function checkItem(it, where) {
  if (!it || typeof it !== 'object') return E(where, 'ítem vacío');
  if (it.t === 'mc') {
    if (!it.q) E(where, 'mc sin pregunta');
    if (!Array.isArray(it.o) || it.o.length < 2) E(where, 'mc con menos de 2 opciones');
    else {
      if (!(Number.isInteger(it.a) && it.a >= 0 && it.a < it.o.length)) E(where, `mc con respuesta fuera de rango (${it.a})`);
      const set = new Set(it.o.map((x) => String(x).trim()));
      if (set.size !== it.o.length) E(where, 'mc con opciones duplicadas: ' + it.o.join(' | '));
    }
  } else if (it.t === 'gap') {
    const n = String(it.q).split('___').length - 1;
    if (n !== 1) E(where, `gap con ${n} huecos (debe ser 1): ` + it.q);
    if (!it.a.length || it.a.some((x) => !String(x).trim())) E(where, 'gap sin respuesta');
  } else if (it.t === 'ord') {
    if (!it.w || it.w.length < 2) E(where, 'ord con menos de 2 palabras');
  } else if (it.t === 'tr') {
    if (!it.q) E(where, 'tr sin enunciado');
    if (!it.a.length || it.a.some((x) => !String(x).trim())) E(where, 'tr sin respuesta');
  } else E(where, 'tipo de ítem desconocido: ' + it.t);
}
function checkBlock(b, where, min = 3) {
  if (!b) return;
  if (!b.items || b.items.length < min) E(where, `bloque con ${b.items ? b.items.length : 0} ítems (mín. ${min})`);
  (b.items || []).forEach((it, i) => checkItem(it, `${where}#${i + 1}`));
}

const stats = { modules: 0, lessons: 0, items: 0, vocab: 0, speak: 0, write: 0, lines: 0, readings: 0, words: 0 };
const allIds = new Set();
const vocabSeen = new Map();

for (const meta of ctx.EM.curriculum.modules) {
  if (only && meta.id !== only) continue;
  const file = path.join(root, 'data/modules', meta.id + '.js');
  if (!fs.existsSync(file)) {
    E(meta.id, 'falta el archivo del módulo');
    continue;
  }
  const src = fs.readFileSync(file, 'utf8');
  if (BAD_TEXT.test(src)) E(meta.id, 'contiene texto de relleno: ' + src.match(BAD_TEXT)[0]);
  try {
    load('data/modules/' + meta.id + '.js');
  } catch (e) {
    E(meta.id, 'error de sintaxis/ejecución: ' + e.message);
    continue;
  }
  const m = ctx.EM.modules[meta.id];
  if (!m) {
    E(meta.id, 'no registró el módulo');
    continue;
  }
  stats.modules++;
  const w = meta.id;
  if (m.lessons.length !== meta.n) E(w, `curriculum dice n=${meta.n} pero hay ${m.lessons.length} lecciones`);
  ['summary', 'transfer'].forEach((k) => !m[k] && E(w, 'falta ' + k));
  ['objectives', 'prereq', 'outcomes'].forEach((k) => (!m[k] || !m[k].length) && E(w, 'falta ' + k));
  if (!m.errors || m.errors.length < 3) E(w, 'menos de 3 errores frecuentes');

  let hasWrite = false;
  let hasReading = false;
  let hasListening = false;
  let grammarCount = 0;
  m.lessons.forEach((L) => {
    stats.lessons++;
    const lw = L.id;
    ['title', 'goal', 'outcome', 'check'].forEach((k) => !L[k] && E(lw, 'falta ' + k));
    const sum = (L.agenda || []).reduce((a, b) => a + b[0], 0);
    if (sum !== 60) E(lw, `la agenda suma ${sum} min (debe ser 60)`);
    if (!L.input) E(lw, 'falta input (exposición)');
    else {
      if (L.input.kind === 'reading') {
        hasReading = true;
        if (!L.input.text) E(lw, 'lectura sin texto');
        stats.readings++;
        stats.words += String(L.input.text).split(/\s+/).length;
      } else {
        hasListening = true;
        if (!L.input.lines || L.input.lines.length < 5) E(lw, 'listening con menos de 5 líneas');
        stats.lines += (L.input.lines || []).length;
        (L.input.lines || []).forEach((l) => (stats.words += l.text.split(/\s+/).length));
      }
    }
    if (L.reading) {
      hasReading = true;
      stats.readings++;
      stats.words += String(L.reading.text).split(/\s+/).length;
      checkBlock(L.reading.block, lw + ' reading', 3);
    }
    if (!L.compBlock) E(lw, 'falta comprensión');
    checkBlock(L.compBlock, lw + ' comp', 4);
    if (!L.chunks || L.chunks.length < 6) E(lw, `chunks: ${L.chunks ? L.chunks.length : 0} (mín. 6)`);
    (L.chunks || []).forEach((v, i) => {
      if (!v.en || !v.es || !v.ex || !v.exEs) E(`${lw} chunk#${i + 1}`, 'vocabulario incompleto (en, es, ex, exEs)');
      const key = String(v.en).toLowerCase();
      if (vocabSeen.has(key) && vocabSeen.get(key) !== lw) W(`${lw}`, `chunk repetido de ${vocabSeen.get(key)}: ${v.en}`);
      else vocabSeen.set(key, lw);
      stats.vocab++;
    });
    if (L.grammar) {
      grammarCount++;
      ['title', 'meaning', 'when', 'form', 'examples', 'spanish', 'errors'].forEach((k) => !L.grammar[k] && E(lw, 'gramática sin ' + k));
    }
    if (!L.practice || !L.practice.length) E(lw, 'falta práctica controlada');
    (L.practice || []).forEach((b, i) => checkBlock(b, `${lw} p${i + 1}`, 4));
    if (!L.semi) W(lw, 'sin práctica semilibre');
    if (!L.speak || !L.speak.length) E(lw, 'falta speaking');
    (L.speak || []).forEach((s, i) => {
      stats.speak++;
      if (!s.prompt) E(`${lw} s${i + 1}`, 'speaking sin prompt');
      if (!s.criteria) W(`${lw} s${i + 1}`, 'speaking sin criterios');
    });
    if (L.write) {
      hasWrite = true;
      stats.write++;
      if (!L.write.task || !L.write.checklist) E(lw, 'writing incompleto');
      if (!L.write.model) W(lw, 'writing sin modelo');
    }
    if (!L.pron && !L.shadow) E(lw, 'sin pronunciación ni shadowing');
    if (!L.shadow || L.shadow.length < 3) W(lw, 'shadowing con menos de 3 frases');
    if (L.pron && L.pron.block) checkBlock(L.pron.block, lw + ' pron', 3);
    if (!L.retBlock) E(lw, 'falta recuperación sin ayudas');
    checkBlock(L.retBlock, lw + ' ret', 4);
    checkBlock(L.revBlock, lw + ' rev', 2);
    checkBlock(L.warmup && L.warmup.block, lw + ' warm', 2);
    L._blocks.forEach((id) => {
      if (allIds.has(id)) E(lw, 'id de bloque duplicado ' + id);
      allIds.add(id);
    });
    stats.items += [L.compBlock, L.retBlock, L.revBlock, L.warmup && L.warmup.block, L.pron && L.pron.block, L.reading && L.reading.block, ...(L.practice || [])]
      .filter(Boolean)
      .reduce((a, b) => a + b.items.length, 0);
  });
  if (meta.id !== 'm00' && meta.id !== 'm19' && grammarCount < 2) E(w, `solo ${grammarCount} lecciones con gramática`);
  if (!hasWrite) E(w, 'ninguna lección con writing');
  if (!hasReading) E(w, 'ninguna lectura');
  if (!hasListening) E(w, 'ningún listening');
  if (meta.assess !== false) {
    const A = m.assessment;
    if (!A) E(w, 'falta evaluación');
    else {
      if (!A.listening || !A.listening.lines || A.listening.lines.length < 4) E(w, 'evaluación sin listening');
      else checkBlock(A.listening.block, w + ' A-l', 4);
      if (!A.reading || !A.reading.text) E(w, 'evaluación sin reading');
      else checkBlock(A.reading.block, w + ' A-r', 4);
      if (!A.items || A.items.length < 12) E(w, `evaluación con ${A.items ? A.items.length : 0} ítems (mín. 12)`);
      else checkBlock(A.block, w + ' A-g', 12);
      if (!A.speak || !A.speak.prompt) E(w, 'evaluación sin speaking');
      if (!A.write || !A.write.task) E(w, 'evaluación sin writing');
      stats.items += A._blocks.reduce((a, b) => a + b.items.length, 0);
    }
  }
}

// Diagnóstico
const D = ctx.EM.diagnostic;
D.parts.forEach((p) => {
  p.items.forEach((it, i) => {
    checkItem(it, `diag-${p.id}#${i + 1}`);
    if (!(it.lvl || p.lvl)) E(`diag-${p.id}`, 'ítem sin nivel');
  });
});
// Banco de speaking y pronunciación
ctx.EM.speakingBank.levels.forEach((l) => l.topics.forEach((t) => t.qs.length < 4 && E('speaking-bank ' + l.id, 'tema con pocas preguntas: ' + t.topic)));
if (ctx.EM.pron.sections.length < 10) E('pron', 'pocas secciones');

// Etapas: tareas abiertas
ctx.EM.curriculum.stages.filter((s) => s.exam).forEach((s) => {
  if (!ctx.EM.curriculum.stageTasks[s.n]) E('stage ' + s.n, 'faltan tareas abiertas del examen');
});

console.log('Estadísticas:', stats);
if (warns.length) console.log(`\n${warns.length} avisos:\n- ` + warns.slice(0, 60).join('\n- '));
if (errors.length) {
  console.log(`\n✘ ${errors.length} errores:\n- ` + errors.join('\n- '));
  process.exit(1);
}
console.log('\n✔ Validación correcta');
