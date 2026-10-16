/* Vista de lección (estructura A–K) y sesión de consolidación. */
(function () {
  'use strict';
  const EM = window.EM;
  const U = EM.u;
  const h = U.h;
  const S = () => EM.store;
  const V = EM.views;
  const ui = () => EM.ui;

  const sec = (id, letter, title, ...kids) =>
    h('section', { class: 'lsec', id },
      h('h2', {}, letter ? h('span', { class: 'letter', 'aria-hidden': 'true' }, letter) : null, title),
      ...kids
    );

  function lockedView(meta) {
    return h('div', { class: 'view' }, EM.pageHead('Contenido bloqueado'),
      h('p', {}, `Para abrir ${meta.id.toUpperCase()} necesitas superar la evaluación del módulo anterior (80 %).`),
      h('a', { class: 'btn', href: '#/module/' + meta.id }, 'Ver el módulo'));
  }

  function inputSection(L, m) {
    const I = L.input;
    const box = [];
    box.push(h('h3', { lang: 'en' }, I.title || ''));
    if (I.context) box.push(h('p', {}, h('b', {}, 'Contexto: '), ui().html(I.context, 'span')));
    if (I.kind === 'reading') {
      if (I.task1) box.push(h('p', { class: 'task1' }, h('b', {}, 'Primera lectura: '), I.task1));
      const paras = String(I.text).split(/\n\s*\n/);
      box.push(h('article', { class: 'reading', lang: 'en' }, paras.map((p) => h('p', { html: p }))));
      const lines = EM.speech.sentences(I.text).map((t) => ({ text: t }));
      if (EM.speech.supported) box.push(ui().reveal('Escuchar el texto (voz del navegador)', ui().player(lines, { hidden: true, title: 'Lectura en voz alta' })));
      if (I.glossary) box.push(ui().reveal('Glosario', h('ul', { class: 'gloss' }, I.glossary.map((g) => h('li', {}, h('b', { lang: 'en' }, g[0]), ' — ', g[1])))));
      if (I.task2) box.push(h('p', {}, h('b', {}, 'Segunda lectura: '), I.task2));
    } else {
      box.push(
        h('p', { class: 'task1' }, h('b', {}, '1.ª escucha: '), I.task1 || 'Escucha sin leer. ¿Quién habla, dónde y para qué?'),
        ui().player(I.lines, { hidden: true }),
        h('p', {}, h('b', {}, '2.ª escucha (otro propósito): '), I.task2 || 'Escucha de nuevo con la transcripción y subraya mentalmente las expresiones útiles.'),
        h('p', { class: 'small muted' }, 'Recomendación: primero escucha sin leer. La transcripción es material de estudio; no es un audio grabado, se lee con la voz de tu dispositivo.')
      );
    }
    return box;
  }

  function grammarCard(G) {
    return h('div', { class: 'grammar card-in' },
      h('h3', {}, '📐 ' + G.title),
      G.meaning ? h('p', {}, h('b', {}, '1. Qué significa: '), ui().html(G.meaning, 'span')) : null,
      G.when ? h('p', {}, h('b', {}, '2. Cuándo se usa: '), ui().html(G.when, 'span')) : null,
      G.form ? h('div', {}, h('b', {}, '3. Cómo se forma:'), h('div', { class: 'table-wrap' }, ui().html(G.form))) : null,
      G.examples
        ? h('div', {}, h('b', {}, '4. Ejemplos naturales:'),
            h('ul', { class: 'exs' }, G.examples.map((e) => h('li', {}, h('span', { lang: 'en' }, e[0]), ' ', ui().sayBtn(e[0]), e[1] ? h('span', { class: 'muted small' }, ' — ' + e[1]) : null))))
        : null,
      G.spanish ? h('p', {}, h('b', {}, '5. Diferencias con el español: '), ui().html(G.spanish, 'span')) : null,
      G.errors
        ? h('div', {}, h('b', {}, '6. Errores frecuentes:'),
            h('ul', { class: 'errs' }, G.errors.map((e) => h('li', {}, '✘ ', h('s', { lang: 'en' }, e[0]), ' → ✔ ', h('b', { lang: 'en' }, e[1]), e[2] ? h('span', { class: 'small muted' }, ' · ' + e[2]) : null))))
        : null,
      h('p', { class: 'small muted' }, '7. Ejercicios graduados → sección E · 8. Actividad comunicativa → sección G.')
    );
  }

  function pronSection(P, lid) {
    const out = [];
    if (P.title) out.push(h('h3', {}, '👄 ' + P.title));
    if (P.explain) out.push(ui().html(P.explain));
    if (P.pairs && P.pairs.length) {
      out.push(
        h('p', { class: 'small' }, 'Pares mínimos: escucha cada palabra, repítela y luego alterna rápido A–B–A–B.'),
        h('ul', { class: 'pairs' }, P.pairs.map((p) => h('li', {}, h('span', { lang: 'en' }, p[0]), ui().sayBtn(p[0]), h('span', { 'aria-hidden': 'true' }, ' / '), h('span', { lang: 'en' }, p[1]), ui().sayBtn(p[1]))))
      );
    }
    if (P.drill && P.drill.length) {
      out.push(h('p', { class: 'small' }, 'Frases para practicar (marca mentalmente las sílabas fuertes):'),
        h('ul', { class: 'drill' }, P.drill.map((d) => h('li', {}, h('span', { lang: 'en', html: d }), ' ', ui().sayBtn(d.replace(/<[^>]+>/g, ''))))));
    }
    if (P.block) out.push(EM.exercise(P.block));
    return out;
  }

  function shadowSection(lines) {
    return [
      h('ol', { class: 'method small' },
        h('li', {}, 'Escucha la frase una vez sin hablar.'),
        h('li', {}, 'Repite en voz baja al mismo tiempo (mumble).'),
        h('li', {}, 'Repite en voz alta imitando ritmo, pausas y entonación, no solo las palabras.'),
        h('li', {}, 'Grábate y compara con el modelo. Repite 3 rondas.')
      ),
      h('ul', { class: 'shadow' }, lines.map((l) => h('li', {}, h('span', { lang: 'en', html: l }), ' ', ui().sayBtn(l.replace(/<[^>]+>/g, ''))))),
      ui().recorder(),
    ];
  }

  function reflection(lid, src) {
    const saved = S().data.reflections[lid] || {};
    const f = h('form', { class: 'reflect', onsubmit: (e) => e.preventDefault() });
    const exprs = h('textarea', { rows: 3, class: 'ta', 'aria-label': 'Expresiones nuevas', placeholder: 'Una por línea: inglés = español\nI\'m looking for = Estoy buscando' });
    exprs.value = saved.expressions || '';
    const diff = h('textarea', { rows: 2, class: 'ta', 'aria-label': 'Dificultades', placeholder: '¿Qué te costó más hoy?' });
    diff.value = saved.difficulties || '';
    const wrong = h('input', { class: 'inp', type: 'text', lang: 'en', 'aria-label': 'Error que cometí', placeholder: 'Mi error (ej.: She work here)', autocapitalize: 'off' });
    const right = h('input', { class: 'inp', type: 'text', lang: 'en', 'aria-label': 'Forma correcta', placeholder: 'Forma correcta (She works here)', autocapitalize: 'off' });
    const conf = h('fieldset', { class: 'conf' }, h('legend', {}, 'Confianza percibida hoy (1 = muy baja, 5 = alta)'),
      [1, 2, 3, 4, 5].map((n) => {
        const id = `${lid}-conf-${n}`;
        const r = h('input', { type: 'radio', name: lid + '-conf', id, value: n });
        if (saved.confidence === n) r.checked = true;
        return h('label', { for: id, class: 'conf-l' }, r, h('span', {}, n));
      })
    );
    const msg = h('p', { 'aria-live': 'polite', class: 'small' });
    f.append(
      h('label', { class: 'lbl' }, 'Expresiones nuevas que quiero recordar'), exprs,
      h('label', { class: 'lbl' }, 'Dificultades'), diff,
      h('p', { class: 'lbl' }, 'Registrar un error propio (por ejemplo, de tu grabación)'), wrong, right,
      conf,
      h('button', {
        class: 'btn btn-primary', type: 'button',
        onclick: () => {
          const c = f.querySelector(`input[name="${lid}-conf"]:checked`);
          S().data.reflections[lid] = { expressions: exprs.value, difficulties: diff.value, confidence: c ? +c.value : null, date: U.today() };
          let added = 0;
          exprs.value.split('\n').forEach((line) => {
            const [en, es] = line.split('=').map((x) => (x || '').trim());
            if (en && es && !EM.srs.has(en)) {
              EM.srs.add({ en, es }, { src: src, own: true });
              added++;
            }
          });
          if (wrong.value.trim() && right.value.trim()) {
            S().addError({ wrong: wrong.value.trim(), right: right.value.trim(), prompt: 'Error propio', why: '', source: lid });
            wrong.value = right.value = '';
          }
          S().save();
          msg.textContent = 'Reflexión guardada.' + (added ? ` ${added} expresiones añadidas a tu repaso.` : '');
        },
      }, 'Guardar reflexión'),
      msg
    );
    return f;
  }

  /** Requisitos para completar una lección. */
  function completionState(L) {
    const sc = EM.blockScores(L._blocks);
    const speakIds = (L.speak || []).map((_, i) => `${L.id}-s${i + 1}`);
    const spoke = speakIds.length === 0 || speakIds.some((id) => S().data.rubrics[id]);
    const okEx = sc.attempted === sc.total && (sc.avg == null || sc.avg >= EM.prog.PASS);
    return { sc, spoke, ok: okEx && spoke };
  }

  /* ================= LECCIÓN ================= */
  V.lesson = async function lessonView(mid, lid) {
    const meta = EM.prog.meta(mid);
    if (!meta) return V.notfound();
    const m = await EM.loadModule(mid);
    const L = m.lessons.find((x) => x.id === lid);
    if (!L) return V.notfound();
    if (!EM.prog.unlocked(meta)) return lockedView(meta);

    const rec = S().data.lessons[lid] || (S().data.lessons[lid] = {});
    rec.visited = U.today();
    S().data.last = { href: location.hash, title: `${mid.toUpperCase()} · L${L.n}: ${L.title}` };
    S().save();

    const root = h('div', { class: 'view lesson' });
    const toc = [];
    const parts = [];
    const push = (id, letter, title, ...kids) => {
      toc.push([id, letter, title]);
      parts.push(sec(id, letter, title, ...kids));
    };

    // Cabecera
    root.append(
      h('nav', { class: 'crumbs', 'aria-label': 'Migas' }, h('a', { href: '#/path' }, 'Ruta'), ' › ', h('a', { href: '#/module/' + mid }, mid.toUpperCase()), ' › L' + L.n),
      EM.pageHead(`Lección ${L.n}: ${L.title}`, `${m.title} · ${m.cefr}`)
    );
    const agendaTotal = (L.agenda || []).reduce((a, b) => a + b[0], 0);
    root.append(
      h('section', { class: 'card brief' },
        h('p', {}, h('b', {}, '🎯 Objetivo: '), L.goal),
        h('p', {}, h('b', {}, '⏱ Tiempo: '), `${agendaTotal || 60} minutos`),
        h('p', {}, h('b', {}, '🧰 Materiales: '), L.materials || 'Este curso, auriculares (opcional), cuaderno o notas del teléfono, micrófono para grabarte (opcional).'),
        h('p', {}, h('b', {}, '✅ Resultado esperado: '), L.outcome),
        h('p', {}, h('b', {}, '🔍 Cómo comprobarlo: '), L.check),
        L.agenda
          ? ui().reveal('Agenda de la sesión', h('ol', { class: 'agenda' }, L.agenda.map((a) => h('li', {}, h('b', {}, `${a[0]} min · ${a[1]}`), ' — ', a[2]))), 'open-agenda')
          : null,
        h('div', { class: 'row wrap' },
          h('button', { class: 'btn btn-primary', type: 'button', onclick: () => EM.timer.start(`${mid.toUpperCase()} L${L.n}: ${L.title}`, location.hash, L.agenda) }, '⏱ Iniciar sesión con temporizador')
        )
      )
    );

    // A. Activación
    if (L.warmup) push('a', 'A', 'Activación', L.warmup.text ? ui().html(L.warmup.text) : null, L.warmup.block ? EM.exercise(L.warmup.block) : null);
    // B. Exposición
    if (L.input) push('b', 'B', L.input.kind === 'reading' ? 'Lectura' : 'Escucha', ...inputSection(L, m));
    // C. Comprensión
    if (L.compBlock) push('c', 'C', 'Comprensión', EM.exercise(L.compBlock));
    // D. Análisis
    const dKids = [];
    if (L.chunks && L.chunks.length) dKids.push(h('h3', {}, '🧩 Expresiones completas (chunks)'), ui().vocabList(L.chunks, { src: mid, lvl: m.cefr }));
    if (L.notes) dKids.push(ui().html(L.notes, 'div', 'notes'));
    if (L.grammar) dKids.push(grammarCard(L.grammar));
    if (dKids.length) push('d', 'D', 'Análisis del lenguaje', ...dKids);
    // E. Práctica controlada
    if (L.practice && L.practice.length) push('e', 'E', 'Práctica controlada', ...L.practice.map((b) => EM.exercise(b)));
    // F. Semilibre
    if (L.semi) {
      const id = `${lid}-semi`;
      const ta = h('textarea', { class: 'ta', rows: 5, lang: 'en', 'aria-label': 'Tus frases', placeholder: 'Escribe tus frases aquí…', autocapitalize: 'sentences', spellcheck: 'false' });
      ta.value = S().data.writing[id] || '';
      ta.addEventListener('input', U.debounce(() => { S().data.writing[id] = ta.value; S().save(); }, 400));
      push('f', 'F', 'Práctica semilibre',
        h('div', { class: 'prompt-box' }, ui().html(L.semi.task)),
        L.semi.frames ? h('ul', { class: 'chips-list', lang: 'en' }, L.semi.frames.map((x) => h('li', { class: 'chip' }, x))) : null,
        ta,
        L.semi.examples ? ui().reveal('Ver ejemplos posibles', h('ul', { class: 'exs', lang: 'en' }, L.semi.examples.map((x) => h('li', {}, x, ' ', ui().sayBtn(x))))) : null,
        h('p', { class: 'small muted' }, 'Después de escribir, di cada frase en voz alta dos veces sin mirar.')
      );
    }
    // G. Producción
    const gKids = [];
    (L.speak || []).forEach((t, i) => gKids.push(ui().speakTask(t, `${lid}-s${i + 1}`)));
    if (L.write) gKids.push(ui().writeTask(L.write, `${lid}-w`));
    if (gKids.length) push('g', 'G', 'Producción comunicativa', ...gKids);
    // H. Pronunciación y shadowing
    const hKids = [];
    if (L.pron) hKids.push(...pronSection(L.pron, lid));
    if (L.shadow && L.shadow.length) hKids.push(h('h3', {}, '🔁 Shadowing'), ...shadowSection(L.shadow));
    if (hKids.length) push('h', 'H', 'Pronunciación y escucha', ...hKids);
    // Lectura adicional
    if (L.reading) {
      const R = L.reading;
      push('r', '+', 'Lectura',
        h('h3', { lang: 'en' }, R.title || ''),
        R.intro ? h('p', { class: 'small' }, R.intro) : null,
        h('article', { class: 'reading', lang: 'en' }, String(R.text).split(/\n\s*\n/).map((p) => h('p', { html: p }))),
        EM.speech.supported ? ui().reveal('Escuchar el texto', ui().player(EM.speech.sentences(R.text).map((t) => ({ text: t })), { hidden: true, title: 'Lectura en voz alta' })) : null,
        R.glossary ? ui().reveal('Glosario', h('ul', { class: 'gloss' }, R.glossary.map((g) => h('li', {}, h('b', { lang: 'en' }, g[0]), ' — ', g[1])))) : null,
        R.block ? EM.exercise(R.block) : null,
        R.reuse ? h('p', {}, h('b', {}, 'Reutiliza: '), ui().html(R.reuse, 'span')) : null
      );
    }
    // I. Recuperación
    if (L.retBlock) push('i', 'I', 'Recuperación sin ayudas', EM.exercise(L.retBlock));
    // J. Reflexión
    push('j', 'J', 'Reflexión y registro', reflection(lid, mid));
    // K. Revisión
    const counts = EM.srs.counts();
    push('k', 'K', 'Revisión programada',
      L.revBlock ? EM.exercise(L.revBlock) : null,
      h('p', {}, `Tienes ${counts.due + counts.fresh} tarjetas en la cola de hoy. `, h('a', { href: '#/review' }, 'Ir al repaso espaciado')),
      L.transfer ? h('div', { class: 'transfer' }, h('b', {}, '🌍 Transferencia a la vida real: '), ui().html(L.transfer, 'span')) : null
    );

    // Índice de secciones (navegación rápida en móvil)
    root.append(
      h('nav', { class: 'toc', 'aria-label': 'Secciones de la lección' },
        toc.map(([id, letter, title]) => h('a', { href: '#', class: 'toc-a', onclick: (e) => { e.preventDefault(); const t = document.getElementById(id); t && t.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }, title }, letter === '+' ? 'R' : letter))
      ),
      ...parts
    );

    // Finalización
    const done = h('section', { class: 'card complete', 'aria-live': 'polite' });
    // Se toma el registro en el momento (no la referencia inicial), por si los
    // datos se recargaron desde otra pestaña o desde una copia importada.
    const markDone = () => {
      const r = S().data.lessons[lid] || (S().data.lessons[lid] = {});
      r.completed = U.today();
      (L.chunks || []).forEach((v) => EM.srs.add(v, { src: mid, lvl: m.cefr }));
      S().logActivity('lesson', lid);
      S().saveNow();
      U.toast('¡Lección completada! Sus expresiones están en tu repaso.');
    };
    const renderDone = () => {
      const st = completionState(L);
      // Al cumplir los requisitos, la lección queda marcada automáticamente.
      if (st.ok && !EM.prog.lessonDone(lid)) markDone();
      const isDone = EM.prog.lessonDone(lid);
      done.replaceChildren(
        h('h2', {}, isDone ? '✔ Lección completada' : 'Completar la lección'),
        h('ul', { class: 'checks' },
          h('li', { class: st.sc.attempted === st.sc.total ? 'ok' : '' }, `${st.sc.attempted === st.sc.total ? '✔' : '○'} Ejercicios comprobados: ${st.sc.attempted}/${st.sc.total}`),
          h('li', { class: st.sc.avg != null && st.sc.avg >= EM.prog.PASS ? 'ok' : '' }, `${st.sc.avg != null && st.sc.avg >= EM.prog.PASS ? '✔' : '○'} Media de mejores resultados ≥ 80 %: ${U.pct(st.sc.avg)}`),
          h('li', { class: st.spoke ? 'ok' : '' }, `${st.spoke ? '✔' : '○'} Producción oral autoevaluada con rúbrica (sección G)`)
        ),
        isDone
          ? h('p', {}, `Completada el ${U.fmtDate(S().data.lessons[lid].completed)}. `, nextLink())
          : h('button', {
              class: 'btn btn-primary btn-lg', type: 'button', disabled: !st.ok,
              onclick: () => {
                markDone();
                renderDone();
              },
            }, 'Marcar como completada'),
        !st.ok && !isDone ? h('p', { class: 'small muted' }, 'Abrir la lección no basta: completa los requisitos para avanzar.') : null
      );
    };
    const nextLink = () => {
      const nx = EM.prog.next();
      return nx ? h('a', { class: 'btn', href: nx.href }, 'Siguiente paso →') : null;
    };
    root.addEventListener('ex-scored', renderDone);
    root.addEventListener('rubric-saved', renderDone);
    renderDone();
    root.append(done);
    return root;
  };

  /* ================= CONSOLIDACIÓN ================= */
  V.consol = async function consolView(mid) {
    const meta = EM.prog.meta(mid);
    if (!meta) return V.notfound();
    if (!EM.prog.unlocked(meta)) return lockedView(meta);
    const m = await EM.loadModule(mid);
    const id = mid + '-c';
    S().data.last = { href: location.hash, title: `${mid.toUpperCase()} · Consolidación` };
    S().save();
    const C = EM.curriculum.consol;
    const half = Math.ceil(m.lessons.length / 2);
    const first = m.lessons.slice(0, half);
    const root = h('div', { class: 'view lesson' },
      h('nav', { class: 'crumbs', 'aria-label': 'Migas' }, h('a', { href: '#/path' }, 'Ruta'), ' › ', h('a', { href: '#/module/' + mid }, mid.toUpperCase()), ' › Consolidación'),
      EM.pageHead('Sesión de consolidación', `${m.title} · lecciones 1–${half}`),
      h('section', { class: 'card brief' },
        h('p', {}, h('b', {}, '🎯 Objetivo: '), 'Fijar lo aprendido en las primeras lecciones mediante repaso espaciado, escucha repetida, shadowing y habla libre.'),
        h('p', {}, h('b', {}, '✅ Resultado: '), 'Responder 3 preguntas de 1–2 minutos usando las expresiones del módulo y corregir tus errores más repetidos.'),
        h('p', {}, h('b', {}, '🔍 Comprobación: '), 'Autoevaluación con rúbrica ≥ nivel 3 en fluidez y vocabulario, cola de repaso vacía.'),
        h('ol', { class: 'agenda' }, C.agenda.map((a) => h('li', {}, h('b', {}, `${a[0]} min · ${a[1]}`), ' — ', a[2]))),
        h('button', { class: 'btn btn-primary', type: 'button', onclick: () => EM.timer.start(`${mid.toUpperCase()} Consolidación`, location.hash, C.agenda) }, '⏱ Iniciar sesión con temporizador')
      )
    );
    const counts = EM.srs.counts();
    root.append(sec('c1', '1', 'Repaso espaciado (10 min)', h('p', {}, `Cola de hoy: ${counts.due} vencidas + ${counts.fresh} nuevas.`), h('a', { class: 'btn', href: '#/review' }, 'Abrir repaso')));
    const listen = [];
    first.forEach((L) => {
      if (L.input && L.input.lines) listen.push(h('h3', {}, `L${L.n}: ${L.input.title}`), ui().player(L.input.lines, { hidden: true }));
      else if (L.input && L.input.text) listen.push(h('h3', {}, `L${L.n}: ${L.input.title}`), ui().player(EM.speech.sentences(L.input.text).map((t) => ({ text: t })), { hidden: true, title: 'Lectura en voz alta' }));
    });
    root.append(sec('c2', '2', 'Escucha repetida (15 min)', h('p', {}, 'Escucha cada input sin transcripción. Anota 5 palabras clave y resume en voz alta en 30 segundos. Después, escucha con la transcripción y comprueba qué no captaste.'), ...listen));
    const sh = first.flatMap((L) => L.shadow || []);
    root.append(sec('c3', '3', 'Shadowing (10 min)', ...shadowSection(sh)));
    const qs = EM.speakingBankFor(meta.stage, 3, mid);
    root.append(sec('c4', '4', 'Speaking libre (15 min)',
      ui().speakTask({ title: 'Tres preguntas del banco', prompt: 'Answer each question for 1–2 minutes. Use at least three expressions from this module.', questions: qs, time: 120, useful: first.flatMap((L) => (L.chunks || []).slice(0, 2).map((v) => v.en)), criteria: ['Hablé al menos 1 minuto por pregunta', 'Usé 3 expresiones del módulo', 'Si me bloqueé, usé una técnica de rescate'] }, id + '-s1')
    ));
    const errs = Object.values(S().data.errors).filter((e) => !e.resolved).sort((a, b) => b.count - a.count).slice(0, 5);
    root.append(sec('c5', '5', 'Errores (10 min)',
      errs.length
        ? h('ul', { class: 'errs' }, errs.map((e) => h('li', {}, h('s', { lang: 'en' }, e.wrong), ' → ', h('b', { lang: 'en' }, e.right), h('span', { class: 'small muted' }, ` (×${e.count})`))))
        : h('p', {}, 'Aún no hay errores registrados. ¡Bien! Usa este tiempo para repetir la pronunciación de L1–L2.'),
      h('p', {}, 'Para cada error: lee la forma correcta en voz alta 3 veces y escribe una frase nueva con ella.'),
      h('a', { class: 'btn', href: '#/errors' }, 'Practicar mis errores')
    ));
    const done = h('section', { class: 'card complete', 'aria-live': 'polite' });
    const render = () => {
      const isDone = EM.prog.consolDone(mid);
      const spoke = !!S().data.rubrics[id + '-s1'];
      done.replaceChildren(
        h('h2', {}, isDone ? '✔ Consolidación completada' : 'Completar la sesión'),
        h('p', {}, spoke ? '✔ Speaking autoevaluado.' : '○ Autoevalúa el speaking (sección 4) para completar.'),
        isDone ? null : h('button', {
          class: 'btn btn-primary btn-lg', type: 'button', disabled: !spoke,
          onclick: () => {
            S().data.lessons[id] = { ...S().data.lessons[id], completed: U.today() };
            S().logActivity('lesson', id);
            S().saveNow();
            U.toast('Consolidación completada.');
            render();
          },
        }, 'Marcar como completada')
      );
    };
    root.addEventListener('rubric-saved', render);
    render();
    root.append(done);
    return root;
  };

  EM.lessonCompletionState = completionState;
})();
