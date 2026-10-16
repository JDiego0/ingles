/* Utilidades compartidas: DOM, fechas, normalización de respuestas, avisos y diálogos. */
(function () {
  'use strict';
  const EM = (window.EM = window.EM || {});
  const U = (EM.u = {});

  // append/prepend/replaceChildren convierten null en el texto "null"; en esta app
  // se pasan hijos condicionales (cond ? nodo : null), así que se filtran aquí.
  const clean = (args) => args.flat(Infinity).filter((x) => x != null && x !== false);
  ['append', 'prepend', 'replaceChildren'].forEach((fn) => {
    const orig = Element.prototype[fn];
    Element.prototype[fn] = function (...args) {
      return orig.apply(this, clean(args));
    };
  });

  U.$ = (s, r = document) => r.querySelector(s);
  U.$$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /** Crea un elemento: h('button', {class:'btn', onclick: fn}, 'Texto') */
  U.h = function (tag, attrs, ...kids) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const k in attrs) {
        const v = attrs[k];
        if (v == null || v === false) continue;
        if (k === 'class') e.className = v;
        else if (k === 'html') e.innerHTML = v;
        else if (k === 'text') e.textContent = v;
        else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
        else if (k === 'dataset') Object.assign(e.dataset, v);
        else if (v === true) e.setAttribute(k, '');
        else e.setAttribute(k, v);
      }
    }
    for (const c of kids.flat(Infinity)) {
      if (c == null || c === false) continue;
      e.append(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return e;
  };

  U.esc = (s) =>
    String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- Fechas (siempre en hora local, formato AAAA-MM-DD) ---------- */
  U.today = (d = new Date()) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  U.addDays = (dateStr, n) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return U.today(new Date(y, m - 1, d + n));
  };
  U.daysBetween = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5);
  U.fmtDate = (s) => {
    if (!s) return '';
    const [y, m, d] = s.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  /* ---------- Normalización de respuestas ----------
     Se aplica a la respuesta del estudiante y a la respuesta correcta, así que
     "don't" y "do not" se consideran equivalentes, y se ignoran mayúsculas,
     puntuación final, comas y espacios repetidos. */
  const CONTR = [
    [/\bcan't\b/g, 'can not'],
    [/\bcannot\b/g, 'can not'],
    [/\bwon't\b/g, 'will not'],
    [/\bshan't\b/g, 'shall not'],
    [/\bain't\b/g, 'is not'],
    [/\bi'm\b/g, 'i am'],
    [/\blet's\b/g, 'let us'],
    [/n't\b/g, ' not'],
    [/'re\b/g, ' are'],
    [/'ve\b/g, ' have'],
    [/'ll\b/g, ' will'],
    [/'d\b/g, ' would'],
    [/\b(it|he|she|that|what|there|who|where|here|how|this)'s\b/g, '$1 is'],
    [/\bgonna\b/g, 'going to'],
    [/\bwanna\b/g, 'want to'],
  ];
  U.norm = (s) => {
    let t = String(s == null ? '' : s)
      .toLowerCase()
      .replace(/[’‘`´]/g, "'")
      .replace(/[“”]/g, '"');
    for (const [r, rep] of CONTR) t = t.replace(r, rep);
    return t
      .replace(/[.,!?;:"¿¡()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };
  U.matches = (given, answers) => {
    const g = U.norm(given);
    if (!g) return false;
    return (Array.isArray(answers) ? answers : [answers]).some((a) => U.norm(a) === g);
  };

  /* ---------- Aleatorio con semilla (orden estable de fichas) ---------- */
  U.seeded = (seedStr) => {
    let h = 2166136261;
    for (const c of String(seedStr)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    return () => {
      h += 0x6d2b79f5;
      let t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };
  U.shuffle = (arr, rnd = Math.random) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  U.slug = (s) =>
    String(s)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60);

  U.pct = (n) => (n == null || isNaN(n) ? '—' : Math.round(n) + ' %');
  U.avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null);
  U.wordCount = (s) => (String(s).trim().match(/\S+/g) || []).length;
  U.debounce = (fn, ms) => {
    let t;
    return (...a) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...a), ms);
    };
  };

  /* ---------- Avisos accesibles ---------- */
  let toastTimer;
  U.toast = (msg) => {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  };

  /** Confirmación con <dialog> propio (no bloquea como window.confirm). */
  U.confirm = (msg, okText = 'Aceptar', cancelText = 'Cancelar') =>
    new Promise((resolve) => {
      const dlg = document.getElementById('dlg');
      if (!dlg || typeof dlg.showModal !== 'function') return resolve(true);
      dlg.replaceChildren(
        U.h('form', { method: 'dialog', class: 'dlg-body' },
          U.h('p', { text: msg }),
          U.h('div', { class: 'row end' },
            U.h('button', { class: 'btn', value: 'no', type: 'submit' }, cancelText),
            U.h('button', { class: 'btn btn-primary', value: 'yes', type: 'submit' }, okText)
          )
        )
      );
      dlg.addEventListener('close', () => resolve(dlg.returnValue === 'yes'), { once: true });
      dlg.returnValue = '';
      dlg.showModal();
    });

  /** Inyecta un <script> (para cargar módulos bajo demanda). Rutas relativas: compatibles con GitHub Pages. */
  const loading = {};
  U.loadScript = (src) => {
    if (loading[src]) return loading[src];
    loading[src] = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => {
        delete loading[src];
        reject(new Error('No se pudo cargar ' + src));
      };
      document.head.append(s);
    });
    return loading[src];
  };
})();
