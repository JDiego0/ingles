/* Evaluaciones: módulo (también como prueba de salto), examen de etapa y diagnóstico. */
(function () {
  'use strict';
  const EM = window.EM;
  const U = EM.u;
  const h = U.h;
  const S = () => EM.store;
  const V = EM.views;
  const ui = () => EM.ui;

  /** Media ponderada por nº de ítems con el mejor resultado de cada bloque. */
  function weighted(blocks) {
    let tot = 0;
    let acc = 0;
    let attempted = 0;
    blocks.forEach((b) => {
      const r = S().data.ex[b.id];
      tot += b.items.length;
      if (r) {
        attempted++;
        acc += (r.best / 100) * b.items.length;
      }
    });
    return { pct: tot ? (acc / tot) * 100 : 0, attempted, total: blocks.length };
  }

  function listeningPart(Lp, block) {
    return h('section', { class: 'lsec' },
      h('h2', {}, '🎧 Listening'),
      Lp.context ? h('p', {}, h('b', {}, 'Contexto: '), Lp.context) : null,
      ui().player(Lp.lines, { hidden: true, translate: false }),
      h('p', { class: 'small muted' }, 'Escucha dos veces sin transcripción antes de responder. Si tu navegador no tiene voz, pide a alguien que lo lea o léelo tú en voz alta una vez y responde sin volver a mirar.'),
      EM.exercise(block)
    );
  }
  function readingPart(R, block) {
    return h('section', { class: 'lsec' },
      h('h2', {}, '📖 Reading'),
      R.title ? h('h3', { lang: 'en' }, R.title) : null,
      h('article', { class: 'reading', lang: 'en' }, String(R.text).split(/\n\s*\n/).map((p) => h('p', { html: p }))),
      EM.exercise(block)
    );
  }

  function resultCard(key, blocks, speakId, writeId, onPass) {
    const card = h('section', { class: 'card complete', 'aria-live': 'polite' });
    const render = () => {
      const w = weighted(blocks);
      const sp = !speakId || !!S().data.rubrics[speakId];
      const wr = !writeId || !!S().data.rubrics[writeId];
      const all = w.attempted === w.total;
      const passed = all && w.pct >= EM.prog.PASS && sp && wr;
      const rec = S().data.assess[key] || (S().data.assess[key] = { best: null, passed: null, attempts: [] });
      if (all) {
        const pct = Math.round(w.pct);
        if (rec.best == null || pct > rec.best) rec.best = pct;
        if (passed && !rec.passed) {
          rec.passed = U.today();
          rec.attempts.push({ date: U.today(), obj: pct, speak: S().data.rubrics[speakId] && S().data.rubrics[speakId].pct, write: S().data.rubrics[writeId] && S().data.rubrics[writeId].pct });
          S().logActivity('ex');
          onPass && onPass();
          U.toast('¡Evaluación superada!');
        }
        S().save();
      }
      card.replaceChildren(
        h('h2', {}, rec.passed ? '✔ Superada' : 'Resultado'),
        h('ul', { class: 'checks' },
          h('li', { class: all ? 'ok' : '' }, `${all ? '✔' : '○'} Partes objetivas comprobadas: ${w.attempted}/${w.total}`),
          h('li', { class: all && w.pct >= EM.prog.PASS ? 'ok' : '' }, `${all && w.pct >= EM.prog.PASS ? '✔' : '○'} Puntuación objetiva (automática) ≥ 80 %: ${all ? U.pct(w.pct) : '—'}`),
          speakId ? h('li', { class: sp ? 'ok' : '' }, `${sp ? '✔' : '○'} Speaking autoevaluado${sp ? ': ' + U.pct(S().data.rubrics[speakId].pct) : ''}`) : null,
          writeId ? h('li', { class: wr ? 'ok' : '' }, `${wr ? '✔' : '○'} Writing autoevaluado${wr ? ': ' + U.pct(S().data.rubrics[writeId].pct) : ''}`) : null
        ),
        rec.passed
          ? h('p', {}, `Superada el ${U.fmtDate(rec.passed)}. Mejor puntuación objetiva: ${U.pct(rec.best)}. `, nextBtn())
          : all && w.pct < EM.prog.PASS
            ? h('p', {}, 'Aún no alcanzas el 80 %. Revisa tus errores (Más → Mis errores), repasa las lecciones relacionadas y usa “Reintentar” en las partes con menor puntuación.')
            : null,
        h('p', { class: 'small muted' }, 'La puntuación objetiva es automática. Speaking y writing son autoevaluaciones: sé honesto/a; si alguna puntuación es menor de 50 %, repite la tarea antes de seguir.')
      );
    };
    const nextBtn = () => {
      const nx = EM.prog.next();
      return nx ? h('a', { class: 'btn btn-primary', href: nx.href }, 'Siguiente paso →') : null;
    };
    render();
    return { card, render };
  }

  /* ================= EVALUACIÓN DE MÓDULO ================= */
  V.assess = async function assessView(mid) {
    const meta = EM.prog.meta(mid);
    if (!meta) return V.notfound();
    const m = await EM.loadModule(mid);
    if (!m.assessment) return V.notfound();
    const root = h('div', { class: 'view lesson' });
    root.append(
      h('nav', { class: 'crumbs', 'aria-label': 'Migas' }, h('a', { href: '#/path' }, 'Ruta'), ' › ', h('a', { href: '#/module/' + mid }, mid.toUpperCase()), ' › Evaluación'),
      EM.pageHead(`Evaluación ${mid.toUpperCase()}`, m.title)
    );
    if (!EM.prog.unlocked(meta)) {
      root.append(h('p', { class: 'note warn' }, '🔒 Este módulo está bloqueado.'));
      return root;
    }
    S().data.last = { href: location.hash, title: `${mid.toUpperCase()} · Evaluación` };
    const A = m.assessment;
    root.append(
      h('section', { class: 'card brief' },
        h('p', {}, h('b', {}, '⏱ Tiempo: '), '≈ 60 minutos (Listening 10 · Reading 10 · Gramática y vocabulario 15 · Speaking 12 · Writing 13).'),
        h('p', {}, h('b', {}, 'Para superarla: '), '80 % o más en la parte objetiva (corrección automática) y autoevaluar speaking y writing con la rúbrica.'),
        h('p', { class: 'small muted' }, 'Hazla sin consultar las lecciones. Si no la superas, repasa y vuelve a intentarlo: se guarda tu mejor resultado.'),
        h('button', { class: 'btn', type: 'button', onclick: () => EM.timer.start(`${mid.toUpperCase()} Evaluación`, location.hash, [[10, 'Listening', 'Parte de listening'], [10, 'Reading', 'Parte de lectura'], [15, 'Gramática', 'Gramática y vocabulario'], [12, 'Speaking', 'Tarea oral'], [13, 'Writing', 'Tarea escrita']]) }, '⏱ Iniciar con temporizador')
      )
    );
    if (A.listening) root.append(listeningPart(A.listening, A.listening.block));
    if (A.reading) root.append(readingPart(A.reading, A.reading.block));
    if (A.block) root.append(h('section', { class: 'lsec' }, h('h2', {}, '🧠 Gramática y vocabulario'), EM.exercise(A.block)));
    if (A.speak) root.append(h('section', { class: 'lsec' }, h('h2', {}, '🗣 Speaking'), ui().speakTask(A.speak, mid + '-A-s')));
    if (A.write) root.append(h('section', { class: 'lsec' }, h('h2', {}, '✍️ Writing'), ui().writeTask(A.write, mid + '-A-w')));
    const rc = resultCard(mid, A._blocks, A.speak ? mid + '-A-s' : null, A.write ? mid + '-A-w' : null);
    root.addEventListener('ex-scored', rc.render);
    root.addEventListener('rubric-saved', rc.render);
    root.append(rc.card);
    if (m.transfer) root.append(h('section', { class: 'card' }, h('h2', {}, '🌍 Tarea de transferencia'), ui().html(m.transfer)));
    return root;
  };

  /* ================= EXAMEN DE ETAPA ================= */
  V.stage = async function stageView(n) {
    n = +n;
    const st = EM.curriculum.stages.find((s) => s.n === n);
    if (!st || !st.exam) return V.notfound();
    const key = 'stage-' + n;
    const root = h('div', { class: 'view lesson' },
      h('nav', { class: 'crumbs', 'aria-label': 'Migas' }, h('a', { href: '#/path' }, 'Ruta'), ' › Examen etapa ' + n),
      EM.pageHead(`Examen de la etapa ${n}`, `${st.title} · ${st.cefr}`)
    );
    if (!EM.prog.stageUnlocked(n)) {
      root.append(h('p', { class: 'note warn' }, '🔒 Supera todos los módulos de esta etapa para hacer el examen acumulativo.'));
      return root;
    }
    const mods = EM.curriculum.modules.filter((m) => m.stage === n);
    const loaded = await Promise.all(mods.map((m) => EM.loadModule(m.id)));
    const rec = S().data.assess[key] || (S().data.assess[key] = { best: null, passed: null, attempts: [] });
    if (!rec.seed) rec.seed = String(Date.now());
    S().save();
    const rnd = U.seeded(rec.seed);
    // Banco de ítems: evaluaciones y recuperaciones de los módulos de la etapa.
    const pool = [];
    loaded.forEach((m) => {
      if (m.assessment && m.assessment.items) pool.push(...m.assessment.items);
      m.lessons.forEach((L) => (L.retrieval || []).forEach((it) => pool.push(it)));
    });
    const items = U.shuffle(pool, rnd).slice(0, 30);
    const withL = loaded.filter((m) => m.assessment && m.assessment.listening);
    const lm = withL.length ? withL[Math.floor(rnd() * withL.length)] : null;
    const withR = loaded.filter((m) => m.assessment && m.assessment.reading && m !== lm);
    const rm = withR.length ? withR[Math.floor(rnd() * withR.length)] : null;
    const blocks = [];
    root.append(
      h('section', { class: 'card brief' },
        h('p', {}, 'Examen acumulativo: 30 preguntas elegidas al azar de toda la etapa, un listening, una lectura y dos tareas abiertas. ≈ 75 minutos; puedes dividirlo en dos días.'),
        h('p', {}, h('b', {}, 'Para superarlo: '), '80 % en la parte objetiva y las dos tareas abiertas autoevaluadas.'),
        h('button', {
          class: 'btn btn-ghost', type: 'button',
          onclick: async () => {
            if (await U.confirm('¿Generar un examen nuevo con otras preguntas? Tu mejor resultado se conserva.')) {
              rec.seed = String(Date.now());
              S().save();
              EM.route();
            }
          },
        }, '🔀 Generar otro examen')
      )
    );
    if (lm) {
      const b = { ...lm.assessment.listening.block, id: `${key}-${rec.seed}-l` };
      blocks.push(b);
      root.append(listeningPart(lm.assessment.listening, b));
    }
    if (rm) {
      const b = { ...rm.assessment.reading.block, id: `${key}-${rec.seed}-r` };
      blocks.push(b);
      root.append(readingPart(rm.assessment.reading, b));
    }
    const ob = { id: `${key}-${rec.seed}-g`, title: 'Gramática y vocabulario acumulativos', skill: 'grammar', items, instr: 'Sin consultar el material.' };
    blocks.push(ob);
    root.append(h('section', { class: 'lsec' }, h('h2', {}, '🧠 Preguntas acumulativas'), EM.exercise(ob)));
    const T = EM.curriculum.stageTasks[n];
    root.append(h('section', { class: 'lsec' }, h('h2', {}, '🗣 Speaking'), ui().speakTask(T.speak, key + '-s')));
    root.append(h('section', { class: 'lsec' }, h('h2', {}, '✍️ Writing'), ui().writeTask(T.write, key + '-w')));
    const rc = resultCard(key, blocks, key + '-s', key + '-w');
    root.addEventListener('ex-scored', rc.render);
    root.addEventListener('rubric-saved', rc.render);
    root.append(rc.card);
    return root;
  };

  /* ================= DIAGNÓSTICO ================= */
  const BANDS = ['A1', 'A2', 'B1', 'B2'];
  V.diagnostic = async function diagView() {
    const D = EM.diagnostic;
    const draft = S().data.diagDraft || (S().data.diagDraft = {});
    const root = h('div', { class: 'view lesson' }, EM.pageHead('Diagnóstico inicial', 'Una estimación de tu punto de partida, no un certificado'));
    root.append(h('section', { class: 'card brief' }, ui().html(D.intro)));

    const prev = S().data.diag;
    if (prev.length) {
      const last = prev[prev.length - 1];
      root.append(h('section', { class: 'card' },
        h('h2', {}, 'Tu último resultado'),
        summary(last),
        h('p', { class: 'small muted' }, 'Puedes repetir el diagnóstico cuando quieras (por ejemplo, al terminar cada etapa) para comparar. Debajo están las preguntas de nuevo.')
      ));
    }

    const blocks = [];
    D.parts.forEach((p) => {
      const block = { id: 'diag-' + p.id, title: p.title, skill: p.skill, items: p.items, instr: p.instr || '' };
      blocks.push(block);
      const s = h('section', { class: 'lsec' }, h('h2', {}, p.title));
      if (p.lines) s.append(p.context ? h('p', {}, p.context) : null, ui().player(DLG(p.lines), { hidden: true, translate: false }));
      if (p.text) s.append(h('article', { class: 'reading', lang: 'en' }, String(p.text).split(/\n\s*\n/).map((x) => h('p', { html: x }))));
      s.append(EM.exercise(block));
      root.append(s);
    });
    root.addEventListener('ex-scored', (e) => {
      draft[e.detail.id] = e.detail.state;
      S().save();
      renderRes();
    });

    // Producción: escritura y habla autoevaluadas con descriptores "puedo…"
    root.append(h('section', { class: 'lsec' }, h('h2', {}, '✍️ Producción escrita'), ui().writeTask(D.writing, 'diag-w')));
    root.append(h('section', { class: 'lsec' }, h('h2', {}, '🗣 Expresión oral guiada'), ui().speakTask(D.speaking, 'diag-s')));
    root.append(h('section', { class: 'lsec' }, h('h2', {}, '✅ Autoevaluación “puedo…”'),
      h('p', { class: 'small' }, 'Marca solo lo que puedes hacer hoy sin preparación y sin traducir palabra por palabra.'),
      ui().checklist('diag-cando', D.cando.map((c) => `<b>${c[0]}</b> · ${c[1]}`))
    ));

    const res = h('section', { class: 'card complete', 'aria-live': 'polite' });
    function compute() {
      const band = {};
      const weak = [];
      BANDS.forEach((b) => (band[b] = { ok: 0, tot: 0 }));
      let attempted = 0;
      D.parts.forEach((p) => {
        const st = draft['diag-' + p.id];
        if (st) attempted++;
        p.items.forEach((it, i) => {
          const lv = it.lvl || p.lvl;
          band[lv].tot++;
          if (st && st[i]) band[lv].ok++;
          else if (it.topic) weak.push({ topic: it.topic, mod: it.mod, lvl: lv });
        });
      });
      const pct = {};
      BANDS.forEach((b) => (pct[b] = band[b].tot ? Math.round((band[b].ok / band[b].tot) * 100) : 0));
      let est = 'A1 o inferior';
      let place = 0;
      if (pct.A1 >= 70) { est = 'A1+'; place = 1; }
      if (pct.A1 >= 70 && pct.A2 >= 70) { est = 'A2'; place = 5; }
      if (pct.A1 >= 70 && pct.A2 >= 70 && pct.B1 >= 70) { est = 'B1'; place = 10; }
      if (pct.A1 >= 70 && pct.A2 >= 70 && pct.B1 >= 70 && pct.B2 >= 70) { est = 'B2 o superior'; place = 14; }
      const cando = S().data.checks['diag-cando'] || {};
      const canN = Object.values(cando).filter(Boolean).length;
      const sp = S().data.rubrics['diag-s'];
      const wr = S().data.rubrics['diag-w'];
      // Temas débiles únicos
      const seen = new Set();
      const weakU = weak.filter((w) => (seen.has(w.topic) ? false : seen.add(w.topic)));
      return { attempted, total: D.parts.length, pct, est, place, canN, canTot: D.cando.length, speak: sp ? sp.pct : null, write: wr ? wr.pct : null, weak: weakU };
    }
    function renderRes() {
      const r = compute();
      const complete = r.attempted === r.total;
      res.replaceChildren(
        h('h2', {}, 'Resultado del diagnóstico'),
        h('p', {}, `Partes objetivas comprobadas: ${r.attempted}/${r.total}.`),
        complete
          ? h('div', {},
              summary({ ...r, date: U.today() }),
              h('button', {
                class: 'btn btn-primary btn-lg', type: 'button',
                onclick: () => {
                  const out = { date: U.today(), pct: r.pct, est: r.est, place: r.place, canN: r.canN, canTot: r.canTot, speak: r.speak, write: r.write, weak: r.weak };
                  S().data.diag.push(out);
                  S().data.placement = Math.max(S().data.placement || 0, r.place);
                  S().data.diagDraft = {};
                  S().logActivity('ex');
                  S().saveNow();
                  U.toast('Diagnóstico guardado. Ruta ajustada.');
                  location.hash = '#/';
                },
              }, 'Guardar resultado y aplicar plan')
            )
          : h('p', { class: 'small muted' }, 'Comprueba todas las partes objetivas para ver tu estimación.')
      );
    }
    renderRes();
    root.append(res);
    return root;
  };

  function summary(r) {
    const mods = EM.curriculum.modules;
    const startMod = mods[Math.max(r.place, 0)] || mods[0];
    return h('div', { class: 'diag-sum' },
      h('p', {}, h('b', {}, 'Estimación orientativa: '), r.est, ` (${U.fmtDate(r.date)})`),
      h('ul', { class: 'skills' }, BANDS.map((b) => h('li', {}, h('div', { class: 'sk-top' }, h('span', {}, 'Preguntas nivel ' + b), h('span', { class: 'small' }, U.pct(r.pct[b]))), ui().bar(r.pct[b], 'Nivel ' + b)))),
      h('p', { class: 'small' }, `Autoevaluación “puedo…”: ${r.canN}/${r.canTot}. Speaking: ${U.pct(r.speak)} · Writing: ${U.pct(r.write)} (autoevaluados).`),
      h('p', {}, h('b', {}, 'Recomendación: '),
        r.place <= 1
          ? 'Empieza por M00 y sigue la ruta desde M01. Reconstruiremos las bases con calma.'
          : `Empieza por M00 (método) y después ${startMod.id.toUpperCase()} (${startMod.title}). Los módulos anteriores quedan desbloqueados: haz sus evaluaciones como pruebas de salto o repásalos si tienes dudas.`),
      r.speak != null && r.speak + 15 < (r.pct.A2 + r.pct.A1) / 2
        ? h('p', { class: 'note' }, 'Tu comprensión parece más alta que tu producción oral. Es muy común: da prioridad a los bloques de speaking y shadowing, y usa el banco de speaking a diario.')
        : null,
      r.weak && r.weak.length
        ? h('div', {}, h('b', {}, 'Plan de nivelación (temas con errores):'),
            h('ul', { class: 'bul' }, r.weak.slice(0, 14).map((w) => h('li', {}, `${w.topic} `, h('span', { class: 'badge' }, w.lvl), ' → ', w.mod ? h('a', { href: '#/module/' + w.mod }, w.mod.toUpperCase()) : '')))
          )
        : null,
      h('p', { class: 'small muted' }, 'Limitaciones: es una prueba breve, con autoevaluación de la producción y sin examinador. No equivale a un nivel MCER oficial; sirve para decidir dónde empezar.')
    );
  }
  EM.diagSummary = summary;
})();
