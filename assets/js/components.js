/* Componentes reutilizables: reproductor de voz, grabadora, cuenta atrás,
   rúbricas de autoevaluación, tareas de speaking y writing, revelar soluciones. */
(function () {
  'use strict';
  const EM = window.EM;
  const U = EM.u;
  const h = U.h;
  const S = () => EM.store;
  const C = (EM.ui = {});

  /* ---------- Botón de escuchar una frase ---------- */
  C.sayBtn = (text, label = 'Escuchar', alt = 0) => {
    if (!EM.speech.supported) return null;
    return h(
      'button',
      {
        class: 'btn-icon',
        type: 'button',
        'aria-label': label + ': ' + String(text).slice(0, 60),
        title: label,
        onclick: () => {
          EM.speech.stop();
          EM.speech.say(text, { alt });
        },
      },
      '🔊'
    );
  };

  C.noSpeechNote = () =>
    h('p', { class: 'note warn' },
      'Tu navegador no ofrece síntesis de voz. Lee la transcripción en voz alta, despacio y luego a velocidad natural. ',
      'La calidad, el acento y la disponibilidad de las voces dependen de cada dispositivo.'
    );

  /* ---------- Reproductor de líneas (diálogos, monólogos, lecturas) ----------
     lines: [{ speaker, text, es }] ; opts.hidden: transcripción oculta al inicio */
  C.player = (lines, { hidden = true, title = 'Audio (voz del navegador)', translate = true } = {}) => {
    const speakers = [...new Set(lines.map((l) => l.speaker).filter(Boolean))];
    const items = lines.map((l) => ({ ...l, alt: Math.max(0, speakers.indexOf(l.speaker)) % 2 }));
    const wrap = h('div', { class: 'player' });
    const status = h('p', { class: 'player-status', 'aria-live': 'polite' }, '');
    const rateSel = h('select', { 'aria-label': 'Velocidad', class: 'rate' },
      [['0.7', 'Lenta'], ['0.85', 'Media'], ['1', 'Natural']].map(([v, t]) => h('option', { value: v }, t))
    );
    const cur = String(S().s.rate >= 0.95 ? 1 : S().s.rate <= 0.75 ? 0.7 : 0.85);
    rateSel.value = cur;
    const tr = h('ol', { class: 'transcript' + (hidden ? ' is-hidden' : '') });
    const lineEls = items.map((l, i) => {
      const li = h('li', { class: 'line' },
        h('div', { class: 'line-main' },
          l.speaker ? h('strong', { class: 'spk' }, l.speaker + ': ') : null,
          l.lang ? h('span', { class: 'badge', title: 'Variedad de inglés' }, l.lang, ' ') : null,
          h('span', { class: 'en', lang: 'en' }, l.text)
        ),
        h('div', { class: 'line-tools' },
          EM.speech.supported
            ? h('button', {
                class: 'btn-icon', type: 'button', 'aria-label': 'Escuchar línea ' + (i + 1),
                onclick: () => {
                  EM.speech.stop();
                  EM.speech.say(l.text, { alt: l.alt, rate: +rateSel.value, lang: l.lang });
                },
              }, '🔊')
            : null,
          translate && l.es
            ? h('details', { class: 'tr-es' }, h('summary', {}, 'ES'), h('span', { lang: 'es' }, l.es))
            : null
        )
      );
      return li;
    });
    tr.append(...lineEls);
    const highlight = (i) => {
      lineEls.forEach((el, j) => el.classList.toggle('current', j === i));
      status.textContent = i >= 0 ? `Reproduciendo línea ${i + 1} de ${items.length}` : 'Fin del audio.';
    };
    const playBtn = h('button', { class: 'btn btn-primary', type: 'button' }, '▶ Reproducir');
    const pauseBtn = h('button', { class: 'btn', type: 'button', disabled: true }, '⏸ Pausa');
    const stopBtn = h('button', { class: 'btn', type: 'button', disabled: true }, '⏹ Detener');
    playBtn.onclick = () => EM.speech.play(items, { onLine: highlight, rate: +rateSel.value });
    pauseBtn.onclick = () => EM.speech.togglePause();
    stopBtn.onclick = () => {
      EM.speech.stop();
      highlight(-2);
      status.textContent = 'Detenido.';
    };
    const off = EM.speech.onChange((sp) => {
      if (!wrap.isConnected) return off();
      pauseBtn.disabled = stopBtn.disabled = !sp.speaking;
      pauseBtn.textContent = sp.paused ? '▶ Seguir' : '⏸ Pausa';
    });
    const toggle = h('button', {
      class: 'btn btn-ghost', type: 'button', 'aria-expanded': String(!hidden),
      onclick: (e) => {
        const hid = tr.classList.toggle('is-hidden');
        e.currentTarget.setAttribute('aria-expanded', String(!hid));
        e.currentTarget.textContent = hid ? 'Mostrar transcripción' : 'Ocultar transcripción';
      },
    }, hidden ? 'Mostrar transcripción' : 'Ocultar transcripción');

    wrap.append(
      h('div', { class: 'player-head' }, h('span', { class: 'player-title' }, '🎧 ' + title)),
      EM.speech.supported
        ? h('div', { class: 'player-ctrls' }, playBtn, pauseBtn, stopBtn, h('label', { class: 'rate-l' }, 'Velocidad ', rateSel))
        : C.noSpeechNote(),
      status,
      toggle,
      tr
    );
    return wrap;
  };

  /* ---------- Grabadora (en memoria, no se guarda) ---------- */
  C.recorder = () => {
    if (!EM.recorder.supported) {
      return h('p', { class: 'note' }, 'Grabación no disponible en este navegador. Alternativa: usa la grabadora de voz del teléfono y escúchate.');
    }
    const box = h('div', { class: 'recorder' });
    const btn = h('button', { class: 'btn', type: 'button' }, '🎙 Grabarme');
    const audio = h('audio', { controls: true, class: 'rec-audio', hidden: true });
    const msg = h('span', { class: 'muted small', 'aria-live': 'polite' }, 'La grabación solo vive en esta página; no se guarda.');
    let rec = null;
    let stream = null;
    btn.onclick = async () => {
      if (rec && rec.state === 'recording') {
        rec.stop();
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const chunks = [];
        rec = new MediaRecorder(stream);
        rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
        rec.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          if (audio.src) URL.revokeObjectURL(audio.src);
          audio.src = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/webm' }));
          audio.hidden = false;
          btn.textContent = '🎙 Grabar de nuevo';
          btn.classList.remove('rec-on');
          msg.textContent = 'Escúchate y compara con el modelo.';
        };
        rec.start();
        btn.textContent = '⏹ Detener grabación';
        btn.classList.add('rec-on');
        msg.textContent = 'Grabando…';
      } catch (e) {
        msg.textContent = 'No se pudo acceder al micrófono (permiso denegado o no disponible).';
      }
    };
    box.append(btn, msg, audio);
    return box;
  };

  /* ---------- Cuenta atrás para hablar ---------- */
  C.countdown = (seconds, label = 'Hablar') => {
    const out = h('span', { class: 'cd-time', 'aria-live': 'off' }, fmt(seconds));
    const sr = h('span', { class: 'sr-only', 'aria-live': 'polite' });
    const btn = h('button', { class: 'btn', type: 'button' }, `⏱ ${label} ${fmt(seconds)}`);
    let t = null;
    let left = seconds;
    btn.onclick = () => {
      if (t) {
        clearInterval(t);
        t = null;
        btn.textContent = `⏱ ${label} ${fmt(seconds)}`;
        left = seconds;
        out.textContent = fmt(seconds);
        return;
      }
      left = seconds;
      btn.textContent = '⏹ Parar';
      sr.textContent = 'Empieza a hablar.';
      t = setInterval(() => {
        left--;
        out.textContent = fmt(left);
        if (!btn.isConnected) return clearInterval(t);
        if (left <= 0) {
          clearInterval(t);
          t = null;
          btn.textContent = `⏱ ${label} ${fmt(seconds)}`;
          sr.textContent = 'Tiempo terminado.';
          U.toast('⏱ Tiempo terminado');
          if (navigator.vibrate) navigator.vibrate(200);
        }
      }, 1000);
    };
    return h('div', { class: 'countdown' }, btn, out, sr);
  };
  function fmt(s) {
    s = Math.max(0, s);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }
  C.fmt = fmt;

  /* ---------- Rúbrica de autoevaluación (1–4 por criterio) ---------- */
  C.rubric = (taskId, kind = 'speaking', custom) => {
    const R = EM.rubrics;
    const crits = custom || R[kind] || R.speaking;
    const saved = S().data.rubrics[taskId];
    const form = h('form', { class: 'rubric', onsubmit: (e) => e.preventDefault() });
    form.append(h('p', { class: 'small muted' }, 'Autoevaluación (no es una nota automática). Elige el nivel que mejor describe tu respuesta.'));
    crits.forEach((c, ci) => {
      const fs = h('fieldset', { class: 'crit' }, h('legend', {}, c.name));
      c.levels.forEach((desc, li) => {
        const id = `${taskId}-r${ci}-${li}`;
        const input = h('input', { type: 'radio', name: `${taskId}-r${ci}`, id, value: li + 1 });
        if (saved && saved.scores && saved.scores[ci] === li + 1) input.checked = true;
        fs.append(h('label', { class: 'lvl', for: id }, input, h('span', {}, h('b', {}, li + 1 + ' · '), desc)));
      });
      form.append(fs);
    });
    const res = h('p', { class: 'rubric-res', 'aria-live': 'polite' }, saved ? `Guardado: ${U.pct(saved.pct)} (${U.fmtDate(saved.date)})` : '');
    form.append(
      h('button', {
        class: 'btn btn-primary', type: 'button',
        onclick: () => {
          const scores = crits.map((_, ci) => {
            const r = form.querySelector(`input[name="${taskId}-r${ci}"]:checked`);
            return r ? +r.value : 0;
          });
          if (scores.some((x) => !x)) {
            res.textContent = 'Elige un nivel en cada criterio.';
            return;
          }
          const pct = (scores.reduce((a, b) => a + b, 0) / (scores.length * 4)) * 100;
          S().data.rubrics[taskId] = { scores, pct, date: U.today(), kind };
          S().logActivity('ex');
          S().save();
          const weak = crits.filter((_, i) => scores[i] <= 2).map((c) => c.name);
          res.textContent = `Guardado: ${U.pct(pct)}.` + (weak.length ? ` Prioriza: ${weak.join(', ')}.` : ' ¡Buen trabajo!');
          form.dispatchEvent(new CustomEvent('rubric-saved', { bubbles: true }));
        },
      }, 'Guardar autoevaluación'),
      res
    );
    return form;
  };

  /* ---------- Revelar (soluciones, modelos) ---------- */
  C.reveal = (label, content, cls = '') =>
    h('details', { class: 'reveal ' + cls }, h('summary', {}, label), h('div', { class: 'reveal-body' }, content));

  C.html = (str, tag = 'div', cls = '') => h(tag, { class: cls, html: str || '' });

  C.list = (arr, cls = 'bul') => h('ul', { class: cls }, (arr || []).map((x) => h('li', { html: x })));

  /* ---------- Tarea de speaking ---------- */
  C.speakTask = (t, id) => {
    const card = h('section', { class: 'task speak', 'aria-label': 'Speaking: ' + t.title });
    card.append(
      h('h4', {}, '🗣 ' + (t.title || 'Speaking')),
      t.context ? h('p', {}, h('b', {}, 'Contexto: '), C.html(t.context, 'span')) : null,
      t.goal ? h('p', {}, h('b', {}, 'Objetivo: '), C.html(t.goal, 'span')) : null,
      h('div', { class: 'prompt-box', lang: 'en' }, C.html(t.prompt)),
      t.questions ? h('ol', { class: 'qs', lang: 'en' }, t.questions.map((q) => h('li', {}, q, ' ', C.sayBtn(q)))) : null,
      t.useful
        ? h('div', { class: 'useful' }, h('b', {}, 'Expresiones útiles: '), h('ul', { class: 'chips-list', lang: 'en' }, t.useful.map((x) => h('li', { class: 'chip' }, x))))
        : null,
      h('p', { class: 'small' }, h('b', {}, 'Tiempo: '), `${C.fmt(t.time || 60)} hablando sin parar. Si te bloqueas, usa una técnica de rescate (Más → Speaking).`),
      h('div', { class: 'row wrap' }, C.countdown(t.time || 60), C.recorder()),
      t.criteria ? h('div', {}, h('b', {}, 'Comprueba: '), C.list(t.criteria, 'checks')) : null,
      t.model
        ? C.reveal('Ver respuesta modelo (después de intentarlo)', h('div', {}, C.html(t.model, 'div', 'model'), C.sayBtn(t.model.replace(/<[^>]+>/g, ' '), 'Escuchar modelo')))
        : null,
      t.second ? h('div', { class: 'second' }, h('b', {}, 'Segunda tarea (misma habilidad, otra situación): '), C.html(t.second, 'span')) : null,
      C.reveal('Autoevaluar con rúbrica', C.rubric(id, 'speaking'), 'rub')
    );
    return card;
  };

  /* ---------- Tarea de writing ---------- */
  C.writeTask = (t, id) => {
    const card = h('section', { class: 'task write', 'aria-label': 'Writing: ' + (t.title || '') });
    const ta = h('textarea', {
      rows: 7, class: 'ta', lang: 'en', spellcheck: 'false', autocapitalize: 'sentences',
      'aria-label': 'Tu texto', placeholder: 'Escribe aquí en inglés…',
    });
    ta.value = S().data.writing[id] || '';
    const wc = h('span', { class: 'small muted', 'aria-live': 'polite' });
    const upd = () => (wc.textContent = `${U.wordCount(ta.value)} palabras${t.words ? ' (objetivo: ' + t.words + ')' : ''} · guardado automático`);
    upd();
    ta.addEventListener('input', U.debounce(() => {
      S().data.writing[id] = ta.value;
      S().save();
      upd();
    }, 400));
    card.append(
      h('h4', {}, '✍️ ' + (t.title || 'Writing')),
      h('div', { class: 'prompt-box' }, C.html(t.task)),
      t.frames ? h('div', {}, h('b', {}, 'Estructuras para usar: '), h('ul', { class: 'chips-list', lang: 'en' }, t.frames.map((x) => h('li', { class: 'chip' }, x)))) : null,
      ta,
      wc,
      t.checklist ? C.checklist(id + '-chk', t.checklist, 'Lista de verificación') : null,
      t.model ? C.reveal('Ver texto modelo (después de escribir)', C.html(t.model.replace(/\n/g, '<br>'), 'div', 'model')) : null,
      C.reveal('Autoevaluar con rúbrica', C.rubric(id, 'writing'), 'rub')
    );
    return card;
  };

  /* ---------- Lista de verificación persistente ---------- */
  C.checklist = (id, items, title) => {
    const st = S().data.checks[id] || {};
    const box = h('fieldset', { class: 'checklist' }, title ? h('legend', {}, title) : null);
    items.forEach((txt, i) => {
      const cid = id + '-' + i;
      const cb = h('input', { type: 'checkbox', id: cid });
      cb.checked = !!st[i];
      cb.onchange = () => {
        const cur = S().data.checks[id] || (S().data.checks[id] = {});
        cur[i] = cb.checked;
        S().save();
      };
      box.append(h('label', { class: 'chk', for: cid }, cb, h('span', { html: txt })));
    });
    return box;
  };

  /* ---------- Tabla de vocabulario / chunks ---------- */
  C.vocabList = (items, { src = '', lvl = '' } = {}) => {
    const ul = h('ul', { class: 'vocab-list' });
    items.forEach((v) => {
      const id = EM.srs.cardId(v.en);
      const addBtn = h('button', { class: 'btn btn-sm', type: 'button' });
      const refresh = () => {
        const c = EM.srs.get(id);
        addBtn.textContent = c ? '✓ En repaso' : '+ Repasar';
        addBtn.setAttribute('aria-pressed', String(!!c));
      };
      addBtn.onclick = () => {
        if (EM.srs.get(id)) EM.srs.remove(id);
        else EM.srs.add(v, { src, lvl });
        refresh();
      };
      refresh();
      ul.append(
        h('li', { class: 'vocab' },
          h('div', { class: 'v-head' },
            h('span', { class: 'v-en', lang: 'en' }, v.en),
            C.sayBtn(v.en),
            h('span', { class: 'v-es' }, '= ' + v.es)
          ),
          v.ex ? h('p', { class: 'v-ex' }, h('span', { lang: 'en' }, v.ex), ' ', C.sayBtn(v.ex, 'Escuchar ejemplo')) : null,
          v.exEs ? h('p', { class: 'v-exes' }, v.exEs) : null,
          v.col || v.pron || v.use
            ? h('p', { class: 'v-meta small' },
                v.col ? h('span', {}, h('b', {}, 'Combina: '), v.col, ' ') : null,
                v.pron ? h('span', {}, h('b', {}, '🗣 '), v.pron, ' ') : null,
                v.use ? h('span', {}, h('b', {}, 'Uso: '), v.use) : null
              )
            : null,
          h('div', { class: 'v-actions' }, addBtn, lvl ? h('span', { class: 'badge' }, lvl) : null)
        )
      );
    });
    return ul;
  };

  /* ---------- Barra de progreso accesible ---------- */
  C.bar = (val, label) =>
    h('div', { class: 'bar', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': Math.round(val || 0), 'aria-label': label },
      h('span', { style: `width:${Math.max(0, Math.min(100, val || 0))}%` })
    );
})();
