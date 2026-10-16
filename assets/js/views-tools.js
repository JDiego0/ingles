/* Vistas de herramientas: vocabulario, repaso espaciado, errores, banco de
   speaking, pronunciación, historial, ajustes y ayuda. */
(function () {
  'use strict';
  const EM = window.EM;
  const U = EM.u;
  const h = U.h;
  const S = () => EM.store;
  const V = EM.views;
  const ui = () => EM.ui;
  const STATUS = { pending: 'Pendiente', learning: 'En progreso', doubtful: 'Dudosa', learned: 'Aprendida' };

  /* ================= VOCABULARIO ================= */
  V.vocab = async function vocabView(tab) {
    const root = h('div', { class: 'view' }, EM.pageHead('Vocabulario', 'Tus expresiones, su estado y el vocabulario de todo el curso'));
    const tabs = h('div', { class: 'tabs', role: 'tablist' },
      [['', 'Mis tarjetas'], ['course', 'Todo el curso'], ['add', '+ Añadir propia']].map(([k, t]) =>
        h('a', { role: 'tab', href: '#/vocab' + (k ? '/' + k : ''), class: 'tab' + ((tab || '') === k ? ' on' : ''), 'aria-selected': String((tab || '') === k) }, t))
    );
    root.append(tabs);

    if (tab === 'add') {
      const en = h('input', { class: 'inp', type: 'text', lang: 'en', id: 'own-en', autocapitalize: 'off' });
      const es = h('input', { class: 'inp', type: 'text', id: 'own-es' });
      const ex = h('input', { class: 'inp', type: 'text', lang: 'en', id: 'own-ex', autocapitalize: 'sentences' });
      const msg = h('p', { 'aria-live': 'polite' });
      root.append(h('form', { class: 'card', onsubmit: (e) => {
        e.preventDefault();
        if (!en.value.trim() || !es.value.trim()) { msg.textContent = 'Escribe la expresión en inglés y su significado.'; return; }
        if (EM.srs.has(en.value.trim())) { msg.textContent = 'Esa expresión ya está en tus tarjetas.'; return; }
        EM.srs.add({ en: en.value.trim(), es: es.value.trim(), ex: ex.value.trim() }, { own: true, src: 'propia' });
        msg.textContent = `Añadida: ${en.value.trim()}`;
        en.value = es.value = ex.value = '';
        en.focus();
      } },
        h('label', { class: 'lbl', for: 'own-en' }, 'Expresión en inglés'), en,
        h('label', { class: 'lbl', for: 'own-es' }, 'Significado en español'), es,
        h('label', { class: 'lbl', for: 'own-ex' }, 'Ejemplo (opcional)'), ex,
        h('button', { class: 'btn btn-primary', type: 'submit' }, 'Guardar'),
        msg,
        h('p', { class: 'small muted' }, 'Consejo: guarda frases completas que hayas escuchado y necesites (I ran out of…, It took me ages to…), no palabras sueltas.')
      ));
      return root;
    }

    if (tab === 'course') {
      root.append(h('p', { class: 'small' }, 'Cargando todos los módulos…'));
      await EM.loadAll();
      root.lastChild.remove();
      const q = h('input', { class: 'inp', type: 'search', placeholder: 'Buscar en inglés o español…', 'aria-label': 'Buscar expresión' });
      const box = h('div');
      const render = () => {
        const term = U.norm(q.value);
        box.replaceChildren();
        EM.curriculum.modules.forEach((meta) => {
          const m = EM.modules[meta.id];
          if (!m) return;
          let items = m.lessons.flatMap((L) => L.chunks || []);
          if (term) items = items.filter((v) => U.norm(v.en + ' ' + v.es).includes(term));
          if (!items.length) return;
          box.append(h('details', { class: 'mod-vocab', open: !!term },
            h('summary', {}, `${meta.id.toUpperCase()} · ${meta.title} (${items.length})`),
            ui().vocabList(items, { src: meta.id, lvl: meta.cefr })));
        });
        if (!box.children.length) box.append(h('p', {}, 'Sin resultados.'));
      };
      q.addEventListener('input', U.debounce(render, 250));
      root.append(q, box);
      render();
      return root;
    }

    // Mis tarjetas
    const cards = Object.values(S().data.cards);
    const c = EM.srs.counts();
    root.append(h('p', { class: 'small' }, `${c.total} tarjetas · ${c.learned} aprendidas · ${c.doubtful} dudosas · ${c.pending} pendientes`));
    const filter = h('select', { class: 'inp', 'aria-label': 'Filtrar' },
      [['all', 'Todas'], ['pending', 'Pendientes'], ['learning', 'En progreso'], ['doubtful', 'Dudosas'], ['learned', 'Aprendidas'], ['fav', '⭐ Favoritas'], ['own', 'Propias'], ['error', 'Errores']].map(([v, t]) => h('option', { value: v }, t)));
    const q = h('input', { class: 'inp', type: 'search', placeholder: 'Buscar…', 'aria-label': 'Buscar en mis tarjetas' });
    const list = h('ul', { class: 'card-list' });
    const render = () => {
      const f = filter.value;
      const term = U.norm(q.value);
      let arr = cards.filter((x) =>
        f === 'all' ? true : f === 'fav' ? x.fav : f === 'own' ? x.own : f === 'error' ? x.kind === 'error' : x.status === f);
      if (term) arr = arr.filter((x) => U.norm(x.en + ' ' + x.es).includes(term));
      arr.sort((a, b) => (a.due < b.due ? -1 : 1));
      list.replaceChildren(...arr.slice(0, 300).map(cardRow));
      if (!arr.length) list.append(h('li', { class: 'muted' }, cards.length ? 'Ninguna tarjeta con este filtro.' : 'Aún no tienes tarjetas. Se añaden al completar lecciones o con “+ Repasar”.'));
    };
    const cardRow = (x) => {
      const sel = h('select', { class: 'inp inp-sm', 'aria-label': 'Estado de ' + x.en }, Object.entries(STATUS).map(([k, t]) => h('option', { value: k }, t)));
      sel.value = x.status;
      sel.onchange = () => { EM.srs.setStatus(x.id, sel.value); U.toast('Estado actualizado'); };
      const fav = h('button', { class: 'btn-icon', type: 'button', 'aria-pressed': String(!!x.fav), 'aria-label': 'Favorita' }, x.fav ? '⭐' : '☆');
      fav.onclick = () => { const on = EM.srs.toggleFav(x.id); fav.textContent = on ? '⭐' : '☆'; fav.setAttribute('aria-pressed', String(on)); };
      return h('li', { class: 'vcard' },
        h('div', { class: 'v-head' }, h('span', { class: 'v-en', lang: 'en' }, x.en), ui().sayBtn(x.en), fav),
        h('p', { class: 'v-es' }, x.es),
        x.ex ? h('p', { class: 'v-ex small', lang: 'en' }, x.ex) : null,
        h('div', { class: 'row wrap' }, sel,
          h('span', { class: 'small muted' }, x.seen ? `Próximo repaso: ${U.fmtDate(x.due)}` : 'Nueva'),
          x.src ? h('span', { class: 'badge' }, x.src) : null,
          x.own || x.kind === 'error'
            ? h('button', { class: 'btn btn-sm btn-ghost', type: 'button', onclick: async () => { if (await U.confirm('¿Eliminar esta tarjeta?')) { EM.srs.remove(x.id); EM.route(); } } }, 'Eliminar')
            : null
        )
      );
    };
    filter.onchange = render;
    q.addEventListener('input', U.debounce(render, 250));
    root.append(h('div', { class: 'row wrap filters' }, filter, q), list);
    render();
    return root;
  };

  /* ================= REPASO ESPACIADO ================= */
  V.review = async function reviewView(mode) {
    const root = h('div', { class: 'view' }, EM.pageHead('Repaso espaciado', 'Recuperación activa de expresiones (unos 10 minutos al día)'));
    const t = U.today();
    let queue;
    if (mode === 'doubtful') {
      queue = Object.values(S().data.cards).filter((c) => c.status === 'doubtful' || c.lapses > 0).slice(0, 30);
    } else if (mode === 'fav') {
      queue = Object.values(S().data.cards).filter((c) => c.fav);
    } else queue = EM.srs.queue();
    queue = U.shuffle(queue);
    const c = EM.srs.counts();
    root.append(
      h('div', { class: 'tabs', role: 'tablist' },
        [['', `Hoy (${c.due + c.fresh})`], ['doubtful', 'Olvidadas y dudosas'], ['fav', '⭐ Favoritas']].map(([k, tt]) =>
          h('a', { role: 'tab', class: 'tab' + ((mode || '') === k ? ' on' : ''), 'aria-selected': String((mode || '') === k), href: '#/review' + (k ? '/' + k : '') }, tt)))
    );
    const stage = h('div', { class: 'review-stage' });
    root.append(stage);
    let i = 0;
    let doneN = 0;
    const requeued = new Set();
    const dirSetting = S().s.direction;
    const show = () => {
      if (i >= queue.length) {
        const cc = EM.srs.counts();
        stage.replaceChildren(h('div', { class: 'card' },
          h('h2', {}, queue.length ? '✔ Repaso terminado' : 'Nada pendiente por ahora'),
          h('p', {}, queue.length ? `Has repasado ${doneN} tarjetas.` : 'No hay tarjetas vencidas ni nuevas para hoy.'),
          h('p', { class: 'small muted' }, `Mañana vencen ${cc.tomorrow}. Total: ${cc.total} · aprendidas: ${cc.learned}.`),
          h('div', { class: 'row wrap' }, h('a', { class: 'btn', href: '#/vocab' }, 'Ver mis tarjetas'), h('a', { class: 'btn btn-ghost', href: '#/vocab/course' }, 'Añadir del curso'))));
        return;
      }
      const card = queue[i];
      const dir = dirSetting === 'mixed' ? (U.seeded(card.id + t)() < 0.5 ? 'es-en' : 'en-es') : dirSetting;
      const front = dir === 'es-en' ? card.es : card.en;
      const prod = dir === 'es-en';
      const inp = h('input', { class: 'inp', type: 'text', lang: prod ? 'en' : 'es', 'aria-label': 'Tu respuesta (opcional)', placeholder: prod ? 'Escribe o di en voz alta en inglés…' : 'Significado en español…', autocapitalize: 'off', autocomplete: 'off', spellcheck: 'false' });
      const back = h('div', { class: 'rv-back', hidden: true });
      const grades = h('div', { class: 'grades', hidden: true });
      const p = EM.srs.preview(card);
      const days = (n) => (n === 0 ? 'hoy' : n === 1 ? '1 día' : n + ' días');
      [['again', 'Otra vez', 'btn-danger'], ['hard', 'Difícil', ''], ['good', 'Bien', 'btn-primary'], ['easy', 'Fácil', '']].forEach(([k, label, cls]) =>
        grades.append(h('button', {
          class: 'btn ' + cls, type: 'button',
          onclick: () => {
            EM.srs.grade(card.id, k);
            doneN++;
            // Las tarjetas que vuelven a vencer hoy se repiten una vez al final de la sesión.
            if ((k === 'again' || p[k] === 0) && !requeued.has(card.id)) { requeued.add(card.id); queue.push(card); }
            i++;
            show();
          },
        }, h('span', {}, label), h('small', {}, days(p[k])))));
      const reveal = h('button', { class: 'btn btn-primary btn-lg', type: 'button' }, 'Mostrar respuesta');
      reveal.onclick = () => {
        const typed = inp.value.trim();
        const ok = typed && prod ? U.matches(typed, card.en) : null;
        back.hidden = false;
        back.replaceChildren(
          h('p', { class: 'rv-ans', lang: prod ? 'en' : 'es' }, prod ? card.en : card.es, ' ', prod ? ui().sayBtn(card.en) : null),
          !prod ? h('p', { class: 'small', lang: 'en' }, card.en, ' ', ui().sayBtn(card.en)) : null,
          typed && prod ? h('p', { class: ok ? 'ok' : 'bad' }, ok ? '✔ Coincide.' : '✘ Compara tu versión: ' + typed) : null,
          card.ex ? h('p', { class: 'v-ex', lang: 'en' }, card.ex, ' ', ui().sayBtn(card.ex)) : null,
          card.exEs ? h('p', { class: 'small muted' }, card.exEs) : null,
          card.col ? h('p', { class: 'small' }, h('b', {}, 'Combina: '), card.col) : null,
          h('p', { class: 'small' }, '¿Qué tan bien lo recordaste?')
        );
        grades.hidden = false;
        reveal.hidden = true;
        grades.querySelector('.btn-primary').focus();
      };
      stage.replaceChildren(h('div', { class: 'card rv' },
        h('p', { class: 'small muted' }, `${i + 1} / ${queue.length} · ${prod ? 'Español → inglés (producción)' : 'Inglés → español (reconocimiento)'}${card.seen ? '' : ' · nueva'}`),
        h('p', { class: 'rv-front', lang: prod ? 'es' : 'en' }, front, !prod ? ' ' : null, !prod ? ui().sayBtn(card.en) : null),
        prod && card.exEs ? h('p', { class: 'small muted' }, 'Pista de contexto: ' + card.exEs) : null,
        inp,
        reveal, back, grades,
        h('p', { class: 'small muted' }, 'Intenta decirlo en voz alta antes de mostrar la respuesta.')
      ));
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !reveal.hidden) reveal.click(); });
    };
    show();
    root.append(h('details', { class: 'reveal' }, h('summary', {}, '¿Cómo funciona?'),
      h('div', { class: 'reveal-body small' },
        h('p', {}, 'Cada tarjeta está en una “caja”. Si la recuerdas bien sube de caja y su próximo repaso se aleja (1, 3, 7, 14, 30, 60, 120 días). Si la olvidas vuelve a empezar y aparece de nuevo hoy. “Difícil” mantiene la caja con un intervalo más corto.'),
        h('p', {}, 'Los intervalos son orientativos y se adaptan a tus respuestas. Límites diarios en Ajustes (nuevas y repasos), para no sobrecargarte: el repaso no debe superar unos 10–15 minutos de tu hora.'))));
    return root;
  };

  /* ================= ERRORES ================= */
  V.errors = async function errorsView() {
    const root = h('div', { class: 'view' }, EM.pageHead('Mis errores', 'Errores recurrentes: entiende, corrige y reutiliza'));
    const all = Object.values(S().data.errors);
    const open = all.filter((e) => !e.resolved).sort((a, b) => b.count - a.count || (a.last < b.last ? 1 : -1));
    const solved = all.filter((e) => e.resolved);
    root.append(h('p', { class: 'small' }, `${open.length} por resolver · ${solved.length} resueltos. Los errores de los ejercicios se registran automáticamente; también puedes añadir los tuyos en la reflexión de cada lección.`));
    const ul = h('ul', { class: 'err-list' });
    open.slice(0, 60).forEach((e) => {
      const inp = h('input', { class: 'inp', type: 'text', lang: 'en', 'aria-label': 'Escribe la forma correcta', placeholder: 'Escribe la forma correcta…', autocapitalize: 'off', autocomplete: 'off', spellcheck: 'false' });
      const fb = h('div', { 'aria-live': 'polite' });
      const li = h('li', { class: 'card err' },
        h('p', { class: 'small muted' }, `×${e.count} · ${U.fmtDate(e.last)}${e.source ? ' · ' + e.source : ''}`),
        e.prompt ? h('p', { class: 'small' }, h('b', {}, 'Ejercicio: '), e.prompt) : null,
        h('p', {}, h('b', {}, 'Tu respuesta: '), h('s', { lang: 'en' }, e.wrong)),
        inp,
        h('div', { class: 'row wrap' },
          h('button', {
            class: 'btn btn-primary btn-sm', type: 'button',
            onclick: () => {
              const ok = U.matches(inp.value, e.right);
              const sent = h('textarea', { class: 'ta', rows: 2, lang: 'en', 'aria-label': 'Frase nueva con la forma correcta', placeholder: 'Ahora escribe una frase NUEVA, en otro contexto, usando la forma correcta…' });
              fb.replaceChildren(
                h('p', { class: ok ? 'ok' : 'bad' }, ok ? '✔ Correcto.' : '✘ La forma esperada es: ', ok ? null : h('b', { lang: 'en' }, e.right)),
                e.why ? h('p', { class: 'why' }, '💡 ' + e.why) : null,
                sent,
                h('button', {
                  class: 'btn btn-sm', type: 'button',
                  onclick: () => {
                    if (U.wordCount(sent.value) < 3) { U.toast('Escribe una frase nueva de al menos 3 palabras.'); return; }
                    e.resolved = U.today();
                    e.reuse = sent.value;
                    S().save();
                    U.toast('Error marcado como resuelto. Volverá si lo repites.');
                    li.remove();
                  },
                }, 'La reutilicé: marcar resuelto')
              );
            },
          }, 'Comprobar'),
          h('button', {
            class: 'btn btn-sm btn-ghost', type: 'button',
            onclick: () => {
              EM.srs.add({ id: 'err-' + U.slug(e.right), en: e.right, es: 'Corrige: ' + e.wrong, ex: e.why || '' }, { kind: 'error', src: 'error' });
              U.toast('Añadido al repaso espaciado.');
            },
          }, '+ Repaso')
        ),
        fb
      );
      ul.append(li);
    });
    if (!open.length) ul.append(h('li', { class: 'muted' }, 'No tienes errores pendientes. ¡Excelente!'));
    root.append(ul);
    if (solved.length)
      root.append(ui().reveal(`Resueltos (${solved.length})`, h('ul', { class: 'errs' }, solved.map((e) => h('li', {}, h('s', { lang: 'en' }, e.wrong), ' → ', h('b', { lang: 'en' }, e.right))))));
    return root;
  };

  /* ================= BANCO DE SPEAKING ================= */
  EM.speakingBankFor = (stage, n, seedKey) => {
    const B = EM.speakingBank;
    const lvl = B.levels.find((l) => l.stages.includes(stage)) || B.levels[0];
    const qs = lvl.topics.flatMap((t) => t.qs);
    return U.shuffle(qs, U.seeded(seedKey + U.today())).slice(0, n);
  };
  V.speaking = async function speakingView(lvlId) {
    const B = EM.speakingBank;
    const root = h('div', { class: 'view' }, EM.pageHead('Banco de speaking', 'Práctica oral en solitario: preguntas por nivel y técnicas de rescate'));
    root.append(h('section', { class: 'card' }, h('h2', {}, 'Cómo practicar sin profesor'), ui().html(B.method)));
    // Técnicas de rescate
    const tech = h('section', { class: 'card' }, h('h2', {}, '🛟 Técnicas para superar bloqueos'));
    B.techniques.forEach((t) => {
      tech.append(ui().reveal(t.name + ' — ' + t.es, h('div', {},
        ui().html(t.explain, 'p'),
        h('ul', { class: 'exs', lang: 'en' }, t.phrases.map((p) => h('li', {}, p, ' ', ui().sayBtn(p)))),
        t.example ? h('p', { class: 'small' }, h('b', {}, 'Ejemplo: '), h('span', { lang: 'en', html: t.example })) : null,
        t.drill ? h('p', { class: 'prompt-box' }, h('b', {}, 'Práctica: '), ui().html(t.drill, 'span')) : null
      )));
    });
    root.append(tech);
    // Niveles
    const cur = lvlId || B.levels[0].id;
    root.append(h('div', { class: 'tabs', role: 'tablist' }, B.levels.map((l) =>
      h('a', { role: 'tab', class: 'tab' + (l.id === cur ? ' on' : ''), 'aria-selected': String(l.id === cur), href: '#/speaking/' + l.id }, l.id))));
    const L = B.levels.find((l) => l.id === cur) || B.levels[0];
    root.append(h('p', {}, h('b', {}, `Nivel ${L.id}: `), L.desc));
    // Pregunta aleatoria
    const rnd = h('div', { class: 'card' });
    const all = L.topics.flatMap((t) => t.qs.map((q) => ({ q, topic: t.topic })));
    const draw = () => {
      const pick = all[Math.floor(Math.random() * all.length)];
      rnd.replaceChildren(
        h('h2', {}, '🎲 Pregunta al azar'),
        h('p', { class: 'small muted' }, pick.topic),
        h('p', { class: 'prompt-box', lang: 'en' }, pick.q, ' ', ui().sayBtn(pick.q)),
        h('p', { class: 'small' }, `Habla ${ui().fmt(L.time)}. Estructura sugerida: ${L.structure}`),
        h('div', { class: 'row wrap' }, ui().countdown(L.time), ui().recorder()),
        h('div', { class: 'row wrap' }, h('button', { class: 'btn', type: 'button', onclick: draw }, 'Otra pregunta')),
        ui().reveal('Autoevaluar', ui().rubric('bank-' + L.id + '-' + U.today(), 'speaking'), 'rub')
      );
    };
    draw();
    root.append(rnd);
    L.topics.forEach((t) => {
      root.append(ui().reveal(`${t.topic} (${t.qs.length})`, h('ol', { class: 'qs', lang: 'en' }, t.qs.map((q) => h('li', {}, q, ' ', ui().sayBtn(q))))));
    });
    if (L.tasks) root.append(h('section', { class: 'card' }, h('h2', {}, 'Tareas de monólogo'), h('ul', { class: 'bul' }, L.tasks.map((x) => h('li', { html: x })))));
    return root;
  };

  /* ================= PRONUNCIACIÓN ================= */
  V.pron = async function pronView() {
    const P = EM.pron;
    const root = h('div', { class: 'view' }, EM.pageHead('Pronunciación', 'Guía de referencia para hispanohablantes (inglés estadounidense)'));
    root.append(h('section', { class: 'card' }, ui().html(P.intro)));
    if (!EM.speech.supported) root.append(ui().noSpeechNote());
    P.sections.forEach((s) => {
      root.append(ui().reveal(s.title, h('div', {},
        ui().html(s.explain),
        s.pairs ? h('ul', { class: 'pairs' }, s.pairs.map((p) => h('li', {}, h('span', { lang: 'en' }, p[0]), ui().sayBtn(p[0]), ' / ', h('span', { lang: 'en' }, p[1]), ui().sayBtn(p[1])))) : null,
        s.drill ? h('ul', { class: 'drill' }, s.drill.map((d) => h('li', {}, h('span', { lang: 'en', html: d }), ' ', ui().sayBtn(d.replace(/<[^>]+>/g, ''))))) : null,
        s.tip ? h('p', { class: 'note' }, '💡 ', s.tip) : null
      ), 'pron-sec'));
    });
    root.append(h('section', { class: 'card' }, h('h2', {}, 'Compárate'), h('p', { class: 'small' }, 'Graba una frase, escúchala y compárala con el modelo. No hay evaluación automática de la pronunciación: escucha si el acento (sílaba fuerte), el ritmo y los sonidos finales coinciden.'), ui().recorder()));
    return root;
  };

  /* ================= HISTORIAL ================= */
  V.history = async function historyView() {
    const root = h('div', { class: 'view' }, EM.pageHead('Historial de estudio'));
    const tot = EM.prog.totals();
    root.append(h('section', { class: 'stats' },
      h('div', { class: 'stat' }, h('span', { class: 'stat-n' }, tot.minutes), h('span', { class: 'stat-l' }, 'minutos')),
      h('div', { class: 'stat' }, h('span', { class: 'stat-n' }, tot.days), h('span', { class: 'stat-l' }, 'días activos')),
      h('div', { class: 'stat' }, h('span', { class: 'stat-n' }, tot.lessons), h('span', { class: 'stat-l' }, 'sesiones'))));
    // Últimos 14 días
    const days = Array.from({ length: 14 }, (_, i) => U.addDays(U.today(), i - 13));
    const max = Math.max(60, ...days.map((d) => (S().data.log[d] || {}).min || 0));
    root.append(h('section', { class: 'card' }, h('h2', {}, 'Minutos, últimos 14 días'),
      h('div', { class: 'minichart', role: 'img', 'aria-label': 'Minutos por día en los últimos 14 días: ' + days.map((d) => ((S().data.log[d] || {}).min || 0)).join(', ') },
        days.map((d) => {
          const v = (S().data.log[d] || {}).min || 0;
          return h('div', { class: 'mc-col' }, h('span', { class: 'mc-bar', style: `height:${(v / max) * 100}%` }), h('span', { class: 'mc-l' }, d.slice(8)));
        })),
      h('p', { class: 'small muted' }, 'Los minutos se registran con el temporizador de sesión.')));
    // Diagnósticos
    const dg = S().data.diag;
    if (dg.length) {
      const first = dg[0];
      const last = dg[dg.length - 1];
      root.append(h('section', { class: 'card' }, h('h2', {}, 'Comparación de diagnósticos'),
        h('div', { class: 'table-wrap' }, h('table', {},
          h('thead', {}, h('tr', {}, h('th', {}, ''), h('th', {}, 'Primero'), h('th', {}, 'Último'))),
          h('tbody', {},
            h('tr', {}, h('th', {}, 'Fecha'), h('td', {}, U.fmtDate(first.date)), h('td', {}, U.fmtDate(last.date))),
            h('tr', {}, h('th', {}, 'Estimación'), h('td', {}, first.est), h('td', {}, last.est)),
            ...['A1', 'A2', 'B1', 'B2'].map((b) => h('tr', {}, h('th', {}, b), h('td', {}, U.pct(first.pct[b])), h('td', {}, U.pct(last.pct[b])))),
            h('tr', {}, h('th', {}, 'Speaking (auto)'), h('td', {}, U.pct(first.speak)), h('td', {}, U.pct(last.speak))),
            h('tr', {}, h('th', {}, 'Writing (auto)'), h('td', {}, U.pct(first.write)), h('td', {}, U.pct(last.write)))
          ))),
        dg.length === 1 ? h('p', { class: 'small muted' }, 'Repite el diagnóstico al terminar una etapa para comparar.') : null));
    }
    // Evaluaciones
    const as = Object.entries(S().data.assess).filter(([, r]) => r.best != null);
    root.append(h('section', { class: 'card' }, h('h2', {}, 'Evaluaciones'),
      as.length ? h('ul', { class: 'bul' }, as.map(([k, r]) => h('li', {}, `${k.toUpperCase()}: mejor ${U.pct(r.best)}`, r.passed ? ` · superada ${U.fmtDate(r.passed)}` : ' · pendiente'))) : h('p', { class: 'muted' }, 'Sin evaluaciones todavía.')));
    // Días
    const log = Object.entries(S().data.log).sort((a, b) => (a[0] < b[0] ? 1 : -1)).slice(0, 60);
    root.append(h('section', { class: 'card' }, h('h2', {}, 'Registro diario'),
      log.length
        ? h('div', { class: 'table-wrap' }, h('table', {},
            h('thead', {}, h('tr', {}, h('th', {}, 'Día'), h('th', {}, 'Min'), h('th', {}, 'Ejerc.'), h('th', {}, 'Repasos'), h('th', {}, 'Sesiones'))),
            h('tbody', {}, log.map(([d, r]) => h('tr', {}, h('td', {}, U.fmtDate(d)), h('td', {}, r.min || 0), h('td', {}, r.ex || 0), h('td', {}, r.reviews || 0), h('td', {}, (r.lessons || []).length))))))
        : h('p', { class: 'muted' }, 'Aún no hay actividad registrada.')));
    return root;
  };

  /* ================= AJUSTES ================= */
  V.settings = async function settingsView() {
    const s = S().s;
    const root = h('div', { class: 'view' }, EM.pageHead('Ajustes'));
    const save = () => { S().save(); EM.applyTheme(); U.toast('Ajustes guardados'); };
    const field = (label, ctrl, help) => h('div', { class: 'field' }, h('label', { class: 'lbl', for: ctrl.id }, label), ctrl, help ? h('p', { class: 'small muted' }, help) : null);

    const theme = h('select', { class: 'inp', id: 'set-theme' }, [['auto', 'Automático (sistema)'], ['light', 'Claro'], ['dark', 'Oscuro']].map(([v, t]) => h('option', { value: v }, t)));
    theme.value = s.theme;
    theme.onchange = () => { s.theme = theme.value; save(); };
    const fs = h('select', { class: 'inp', id: 'set-font' }, [['0.95', 'Normal'], ['1', 'Grande'], ['1.1', 'Muy grande']].map(([v, t]) => h('option', { value: v }, t)));
    fs.value = String(s.fontScale);
    fs.onchange = () => { s.fontScale = +fs.value; save(); };

    // Voz
    const voice = h('select', { class: 'inp', id: 'set-voice' });
    const fillVoices = () => {
      voice.replaceChildren(h('option', { value: '' }, 'Automática (en-US preferida)'),
        ...EM.speech.ranked().map((v) => h('option', { value: v.voiceURI }, `${v.name} (${v.lang})`)));
      voice.value = s.voiceURI || '';
    };
    fillVoices();
    const off = EM.speech.onChange(() => { if (!voice.isConnected) return off(); fillVoices(); });
    voice.onchange = () => { s.voiceURI = voice.value; save(); };
    const rate = h('select', { class: 'inp', id: 'set-rate' }, [['0.7', 'Lenta (0.7)'], ['0.8', '0.8'], ['0.9', 'Media (0.9)'], ['1', 'Natural (1.0)']].map(([v, t]) => h('option', { value: v }, t)));
    rate.value = String(s.rate);
    rate.onchange = () => { s.rate = +rate.value; save(); };

    const newPer = h('input', { class: 'inp', id: 'set-new', type: 'number', min: 0, max: 50, inputmode: 'numeric', value: s.newPerDay });
    newPer.onchange = () => { s.newPerDay = Math.max(0, Math.min(50, +newPer.value || 0)); save(); };
    const maxRev = h('input', { class: 'inp', id: 'set-max', type: 'number', min: 5, max: 200, inputmode: 'numeric', value: s.maxReviews });
    maxRev.onchange = () => { s.maxReviews = Math.max(5, Math.min(200, +maxRev.value || 40)); save(); };
    const dir = h('select', { class: 'inp', id: 'set-dir' }, [['mixed', 'Mixta'], ['es-en', 'Español → inglés (producción)'], ['en-es', 'Inglés → español (reconocimiento)']].map(([v, t]) => h('option', { value: v }, t)));
    dir.value = s.direction;
    dir.onchange = () => { s.direction = dir.value; save(); };
    const free = h('input', { type: 'checkbox', id: 'set-free' });
    free.checked = !!s.freeMode;
    free.onchange = () => { s.freeMode = free.checked; save(); };

    root.append(
      h('section', { class: 'card' }, h('h2', {}, 'Apariencia'), field('Tema', theme), field('Tamaño de letra', fs)),
      h('section', { class: 'card' }, h('h2', {}, 'Voz (texto a voz)'),
        EM.speech.supported
          ? h('div', {}, field('Voz inglesa', voice, `${EM.speech.voices.length} voces inglesas detectadas. La calidad y el acento dependen del dispositivo. En Android puedes instalar voces en Ajustes del sistema → Texto a voz.`),
              field('Velocidad por defecto', rate),
              h('button', { class: 'btn', type: 'button', onclick: () => EM.speech.say("Hi! I'm going to help you practice. Can you hear me clearly?") }, '🔊 Probar voz'))
          : ui().noSpeechNote()),
      h('section', { class: 'card' }, h('h2', {}, 'Repaso espaciado'),
        field('Tarjetas nuevas por día', newPer), field('Máximo de repasos por día', maxRev), field('Dirección de las tarjetas', dir)),
      h('section', { class: 'card' }, h('h2', {}, 'Progresión'),
        h('label', { class: 'chk', for: 'set-free' }, free, h('span', {}, 'Modo libre: desbloquear todos los módulos (para repasar o explorar). El progreso real se sigue registrando.')))
    );

    // Copia de seguridad
    const fileIn = h('input', { type: 'file', accept: 'application/json,.json', id: 'imp', class: 'sr-only' });
    fileIn.onchange = async () => {
      const f = fileIn.files[0];
      if (!f) return;
      try {
        const txt = await f.text();
        if (!(await U.confirm('Importar reemplazará el progreso actual de este navegador. ¿Continuar?', 'Importar'))) return;
        S().importJSON(txt);
        EM.applyTheme();
        U.toast('Copia importada correctamente.');
        EM.route();
      } catch (e) {
        U.toast('Error al importar: ' + e.message);
      } finally {
        fileIn.value = '';
      }
    };
    root.append(h('section', { class: 'card' }, h('h2', {}, 'Copia de seguridad'),
      h('p', { class: 'small' }, 'Tu progreso se guarda solo en este navegador (localStorage). Se pierde si borras los datos del navegador, usas otro navegador o cambias de dispositivo. No hay sincronización entre dispositivos. Exporta una copia con frecuencia (por ejemplo, cada semana).'),
      h('div', { class: 'row wrap' },
        h('button', {
          class: 'btn btn-primary', type: 'button',
          onclick: () => {
            const blob = new Blob([S().exportJSON()], { type: 'application/json' });
            const a = h('a', { href: URL.createObjectURL(blob), download: `english-mastery-${U.today()}.json` });
            document.body.append(a);
            a.click();
            setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
            U.toast('Copia exportada.');
          },
        }, '⬇ Exportar progreso (JSON)'),
        h('label', { class: 'btn', for: 'imp', tabindex: '0', role: 'button', onkeydown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fileIn.click(); } } }, '⬆ Importar copia'),
        fileIn
      ),
      h('p', { class: 'small muted' }, S().ok ? '✔ Almacenamiento local disponible.' : '⚠ Almacenamiento local NO disponible: el progreso solo dura mientras la página esté abierta.')
    ));
    root.append(h('section', { class: 'card' }, h('h2', {}, 'Reiniciar'),
      h('button', {
        class: 'btn btn-danger', type: 'button',
        onclick: async () => {
          if (await U.confirm('Esto borrará TODO tu progreso en este navegador. Exporta antes una copia si la quieres conservar. ¿Borrar?', 'Borrar todo')) {
            S().reset();
            EM.applyTheme();
            U.toast('Progreso reiniciado.');
            location.hash = '#/';
          }
        },
      }, 'Borrar todo el progreso')));
    return root;
  };

  /* ================= AYUDA ================= */
  V.help = async function helpView() {
    return h('div', { class: 'view' }, EM.pageHead('Ayuda'), ui().html(EM.helpHTML, 'div', 'card prose'));
  };
})();
