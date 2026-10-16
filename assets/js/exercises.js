/* Motor de ejercicios cerrados con corrección automática.
   Tipos: mc (opción múltiple), gap (completar), ord (ordenar palabras tocando
   fichas, sin teclado), tr (transformar / traducir / corregir: texto libre con
   varias respuestas aceptadas). */
(function () {
  'use strict';
  const EM = window.EM;
  const U = EM.u;
  const h = U.h;
  const S = () => EM.store;

  const SKILL_ES = {
    listening: 'Listening', reading: 'Reading', grammar: 'Gramática', vocabulary: 'Vocabulario',
    pronunciation: 'Pronunciación', speaking: 'Speaking', writing: 'Writing',
  };
  EM.SKILL_ES = SKILL_ES;

  const textInput = (label) =>
    h('input', {
      type: 'text', class: 'inp', lang: 'en', 'aria-label': label,
      autocomplete: 'off', autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false', enterkeyhint: 'next',
    });

  /** Renderiza un control para un ítem y devuelve { el, get(), set(v), lock(), show(ok) } */
  function itemControl(it, key, n) {
    const li = h('li', { class: 'item' });
    const fb = h('div', { class: 'fb', 'aria-live': 'polite' });
    let api;

    if (it.t === 'mc') {
      // Pregunta como párrafo (no <legend>) para que el número de la lista quede alineado con ella.
      const fs = h('div', { class: 'mc', role: 'radiogroup', 'aria-labelledby': key + '-q' });
      it.o.forEach((opt, i) => {
        const id = `${key}-o${i}`;
        fs.append(h('label', { class: 'opt', for: id }, h('input', { type: 'radio', name: key, id, value: i }), h('span', { html: opt })));
      });
      li.append(h('p', { class: 'q', id: key + '-q', html: it.q }), fs);
      api = {
        get: () => {
          const r = fs.querySelector('input:checked');
          return r ? +r.value : null;
        },
        check: (v) => v === it.a,
        given: (v) => (v == null ? '(sin respuesta)' : it.o[v]),
        right: () => it.o[it.a],
        reset: () => fs.querySelectorAll('input').forEach((r) => (r.checked = false)),
        raw: () => {
          const r = fs.querySelector('input:checked');
          return r ? +r.value : null;
        },
        set: (v) => fs.querySelectorAll('input').forEach((r) => (r.checked = v != null && +r.value === v)),
        lock: (on) => fs.querySelectorAll('input').forEach((r) => (r.disabled = on)),
      };
    } else if (it.t === 'gap') {
      const parts = String(it.q).split('___');
      const inp = textInput('Respuesta ' + n);
      const p = h('p', { class: 'q gap', lang: 'en' });
      p.innerHTML = parts[0];
      p.append(inp);
      if (parts[1] != null) p.insertAdjacentHTML('beforeend', parts.slice(1).join('___'));
      li.append(p);
      if (it.hint) li.append(h('p', { class: 'hint small' }, 'Pista: ', it.hint));
      api = {
        get: () => inp.value,
        check: (v) => U.matches(v, it.a),
        given: (v) => v || '(vacío)',
        right: () => [].concat(it.a)[0],
        reset: () => (inp.value = ''),
        raw: () => inp.value,
        set: (v) => (inp.value = v || ''),
        lock: (on) => (inp.readOnly = on),
        text: true,
      };
    } else if (it.t === 'ord') {
      const rnd = U.seeded(key);
      let words = U.shuffle(it.w, rnd);
      // Evita que salga ya ordenado.
      if (words.join(' ') === it.w.join(' ') && words.length > 2) words = words.slice(1).concat(words[0]);
      const pool = h('div', { class: 'pool', role: 'group', 'aria-label': 'Palabras disponibles' });
      const line = h('div', { class: 'built', role: 'group', 'aria-label': 'Tu frase', lang: 'en' });
      const picked = [];
      const render = () => {
        line.replaceChildren(
          ...(picked.length ? picked.map((wi, pi) =>
            h('button', { class: 'tile on', type: 'button', 'aria-label': `Quitar ${words[wi]}`, onclick: () => { picked.splice(pi, 1); render(); } }, words[wi])
          ) : [h('span', { class: 'muted small' }, 'Toca las palabras en orden…')])
        );
        pool.replaceChildren(
          ...words.map((w, wi) =>
            h('button', {
              class: 'tile', type: 'button', disabled: picked.includes(wi) || locked,
              onclick: () => { picked.push(wi); render(); },
            }, w)
          )
        );
        if (locked) line.querySelectorAll('button').forEach((b) => (b.disabled = true));
      };
      let locked = false;
      li.append(h('p', { class: 'q' }, it.q || 'Ordena las palabras:'), line, pool);
      render();
      api = {
        get: () => picked.map((i) => words[i]).join(' '),
        check: (v) => U.matches(v, it.a),
        given: (v) => v || '(vacío)',
        right: () => [].concat(it.a)[0],
        reset: () => { picked.length = 0; render(); },
        raw: () => picked.slice(),
        set: (v) => {
          picked.length = 0;
          if (Array.isArray(v)) v.forEach((i) => i >= 0 && i < words.length && !picked.includes(i) && picked.push(i));
          render();
        },
        lock: (on) => { locked = on; render(); },
        text: true,
      };
    } else {
      // tr: transformar, traducir, corregir
      const inp = it.long
        ? h('textarea', { class: 'inp', rows: 2, lang: 'en', 'aria-label': 'Respuesta ' + n, autocapitalize: 'off', autocorrect: 'off', spellcheck: 'false' })
        : textInput('Respuesta ' + n);
      li.append(
        h('p', { class: 'q' }, it.label ? h('span', { class: 'badge' }, it.label) : null, ' ', h('span', { html: it.q })),
        inp
      );
      if (it.hint) li.append(h('p', { class: 'hint small' }, 'Pista: ', it.hint));
      api = {
        get: () => inp.value,
        check: (v) => U.matches(v, it.a),
        given: (v) => v || '(vacío)',
        right: () => [].concat(it.a)[0],
        reset: () => (inp.value = ''),
        raw: () => inp.value,
        set: (v) => (inp.value = v || ''),
        lock: (on) => (inp.readOnly = on),
        text: true,
      };
    }
    // Ítem de escucha: botón para oír el texto (voz del navegador). Sin voz, se muestra el texto para leerlo en voz alta.
    if (it.say) {
      const sb = EM.ui.sayBtn(it.say, 'Escuchar');
      li.prepend(
        h('div', { class: 'say-row' },
          sb || h('span', { class: 'small muted' }, 'Lee en voz alta (sin voz disponible): '),
          sb ? h('span', { class: 'small muted' }, 'Escucha (puedes repetir)') : h('span', { lang: 'en' }, it.say)
        )
      );
    }
    li.append(fb);
    return { li, fb, ...api };
  }

  /**
   * Renderiza un bloque de ejercicios.
   * block: { id, title, skill, instr, items, note }
   * opts.onScore(pct) se llama tras comprobar.
   */
  EM.exercise = function (block, opts = {}) {
    const sec = h('section', { class: 'ex', id: 'ex-' + block.id, 'aria-label': block.title || 'Ejercicio' });
    const prev = S().data.ex[block.id];
    sec.append(
      h('div', { class: 'ex-head' },
        h('h4', {}, block.title || 'Práctica'),
        block.skill ? h('span', { class: 'badge sk-' + block.skill }, SKILL_ES[block.skill] || block.skill) : null
      ),
      block.instr ? h('p', { class: 'instr', html: block.instr }) : null
    );
    const ol = h('ol', { class: 'items' });
    const ctrls = block.items.map((it, i) => {
      const c = itemControl(it, `${block.id}-i${i}`, i + 1);
      ol.append(c.li);
      return c;
    });
    sec.append(ol);

    const result = h('p', { class: 'ex-result', 'aria-live': 'polite' }, prev ? `Mejor resultado: ${U.pct(prev.best)} · intentos: ${prev.attempts}` : '');
    const checkBtn = h('button', { class: 'btn btn-primary', type: 'button' }, 'Comprobar');
    const retryBtn = h('button', { class: 'btn', type: 'button', hidden: true }, 'Reintentar');
    const solBtn = h('button', { class: 'btn btn-ghost', type: 'button', hidden: true }, 'Ver todas las soluciones');
    let state = null; // array of booleans

    function score() {
      const ok = state.filter(Boolean).length;
      return Math.round((ok / state.length) * 100);
    }
    function finish(selfFlag) {
      const pct = score();
      const r = S().recordEx(block.id, pct, block.skill, selfFlag ? { self: true } : {});
      result.textContent = `Resultado: ${state.filter(Boolean).length}/${state.length} (${pct} %). Mejor: ${U.pct(r.best)}.` +
        (pct >= EM.prog.PASS ? ' ✔ Objetivo alcanzado (80 %).' : ' Repasa las explicaciones y vuelve a intentarlo.');
      opts.onScore && opts.onScore(pct);
      saveAns(true);
      sec.dispatchEvent(new CustomEvent('ex-scored', { bubbles: true, detail: { id: block.id, pct, state: state.slice() } }));
    }

    // Respuestas guardadas: se restauran al volver a abrir la página (aunque se cierre el navegador).
    function saveAns(checked) {
      S().data.ans[block.id] = { v: ctrls.map((c) => c.raw()), checked: !!checked, state: state ? state.slice() : null };
      S().save();
    }

    /** Corrige y muestra el resultado. restored: estado guardado (no se vuelve a registrar). */
    function grade(restored) {
      const vals = ctrls.map((c) => c.get());
      state = ctrls.map((c, i) => {
        const v = vals[i];
        const ok = restored ? !!restored[i] : v != null && v !== '' && c.check(v);
        const it = block.items[i];
        c.lock(true);
        c.li.classList.toggle('is-ok', ok);
        c.li.classList.toggle('is-bad', !ok);
        c.fb.replaceChildren(
          h('p', { class: ok ? 'ok' : 'bad' }, ok ? '✔ Correcto.' : '✘ Incorrecto.'),
          !ok ? h('p', {}, h('b', {}, 'Respuesta correcta: '), h('span', { lang: 'en', html: c.right() })) : null,
          !ok && [].concat(it.a).length > 1 && c.text
            ? h('p', { class: 'small muted' }, 'También se acepta: ', [].concat(it.a).slice(1).join(' · '))
            : null,
          it.why ? h('p', { class: 'why', html: '💡 ' + it.why }) : null,
          !ok && c.text && v
            ? h('button', {
                class: 'btn btn-sm btn-ghost', type: 'button',
                onclick: (e) => {
                  state[i] = true;
                  c.li.classList.remove('is-bad');
                  c.li.classList.add('is-ok');
                  e.currentTarget.replaceWith(h('p', { class: 'small muted' }, 'Marcada como válida por ti (autovalidación).'));
                  finish(true);
                },
              }, 'Mi respuesta también es válida')
            : null
        );
        if (!restored && !ok && v != null && v !== '') {
          S().addError({
            key: `${block.id}-i${i}`,
            prompt: String(it.q || (it.w ? it.w.join(' / ') : '')).replace(/<[^>]+>/g, ''),
            wrong: String(c.given(v)).replace(/<[^>]+>/g, ''),
            right: String(c.right()).replace(/<[^>]+>/g, ''),
            why: it.why ? String(it.why).replace(/<[^>]+>/g, '') : '',
            source: block.id,
          });
        }
        return ok;
      });
      checkBtn.hidden = true;
      retryBtn.hidden = false;
      solBtn.hidden = false;
    }
    checkBtn.onclick = () => {
      const vals = ctrls.map((c) => c.get());
      if (vals.every((v) => v == null || v === '')) {
        result.textContent = 'Responde al menos un ítem antes de comprobar.';
        return;
      }
      grade(null);
      finish(false);
    };
    retryBtn.onclick = () => {
      ctrls.forEach((c) => {
        c.reset();
        c.lock(false);
        c.li.classList.remove('is-ok', 'is-bad');
        c.fb.replaceChildren();
      });
      state = null;
      saveAns(false);
      checkBtn.hidden = false;
      retryBtn.hidden = true;
      solBtn.hidden = true;
      result.textContent = 'Nuevo intento. Tu mejor resultado se conserva.';
      const first = sec.querySelector('input, textarea, button.tile');
      first && first.focus();
    };
    solBtn.onclick = () => {
      ctrls.forEach((c, i) => {
        if (state && state[i]) return;
        if (!c.fb.querySelector('.sol'))
          c.fb.append(h('p', { class: 'sol' }, h('b', {}, 'Solución: '), h('span', { lang: 'en', html: c.right() })));
      });
    };

    sec.append(h('div', { class: 'row wrap ex-actions' }, checkBtn, retryBtn, solBtn), result);

    // Restaurar respuestas previas (comprobadas o a medio responder).
    const saved = S().data.ans[block.id];
    if (saved && Array.isArray(saved.v)) {
      ctrls.forEach((c, i) => c.set(saved.v[i]));
      if (saved.checked && Array.isArray(saved.state)) {
        grade(saved.state);
        const ok = state.filter(Boolean).length;
        result.textContent = `Resultado: ${ok}/${state.length} (${score()} %).` + (prev ? ` Mejor: ${U.pct(prev.best)} · intentos: ${prev.attempts}.` : '');
      }
    }
    // Guardar lo que se va respondiendo antes de comprobar.
    const saveDraft = U.debounce(() => { if (!state) saveAns(false); }, 400);
    sec.addEventListener('input', saveDraft);
    sec.addEventListener('change', saveDraft);
    sec.addEventListener('click', (e) => { if (e.target.closest('.tile')) saveDraft(); });
    return sec;
  };

  /** Puntuación media de varios bloques (mejor intento de cada uno). */
  EM.blockScores = (ids) => {
    const res = ids.map((id) => S().data.ex[id]);
    const done = res.filter(Boolean);
    return {
      attempted: done.length,
      total: ids.length,
      avg: done.length ? U.avg(done.map((r) => r.best)) : null,
      missing: ids.filter((id) => !S().data.ex[id]),
    };
  };
})();
