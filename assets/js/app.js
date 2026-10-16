/* Arranque de la aplicación: router por hash, carga de módulos bajo demanda,
   tema, navegación activa y service worker (uso sin conexión tras la 1.ª visita). */
(function () {
  'use strict';
  const EM = window.EM;
  const U = EM.u;
  const h = U.h;

  EM.loadModule = async (id) => {
    if (EM.modules[id]) return EM.modules[id];
    const meta = EM.curriculum.modules.find((m) => m.id === id);
    if (!meta) throw new Error('Módulo desconocido: ' + id);
    await U.loadScript(`data/modules/${id}.js`);
    if (!EM.modules[id]) throw new Error(`El archivo del módulo ${id} no registró contenido.`);
    return EM.modules[id];
  };
  EM.loadAll = () => Promise.all(EM.curriculum.modules.map((m) => EM.loadModule(m.id).catch(() => null)));

  EM.applyTheme = () => {
    const s = EM.store.s;
    const r = document.documentElement;
    if (s.theme === 'auto') r.removeAttribute('data-theme');
    else r.setAttribute('data-theme', s.theme);
    r.style.setProperty('--fs', s.fontScale || 1);
    const dark = s.theme === 'dark' || (s.theme === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#121821' : '#1d5fbf');
  };

  const main = () => document.getElementById('main');
  let routing = 0;

  /** Secciones desplegables: el título abre o recoge la sección y el estado
      se guarda (por página) para conservarlo al cerrar el navegador. */
  function folds(root, page) {
    const store = EM.store.data.fold || (EM.store.data.fold = {});
    const all = [];
    root.querySelectorAll('section.lsec, section.stage').forEach((s, i) => {
      const h2 = s.querySelector(':scope > h2');
      if (!h2) return;
      const key = page + '|' + (s.id || h2.textContent.trim() || i);
      // Estado de los ejercicios de la sección (comprobados / total), visible aunque esté recogida.
      const exIds = [...s.querySelectorAll('section.ex[id^="ex-"]')].map((x) => x.id.slice(3));
      const badge = exIds.length ? h('span', { class: 'fold-st' }) : null;
      const upd = () => {
        if (!badge) return;
        const n = exIds.filter((id) => EM.store.data.ex[id]).length;
        badge.textContent = (n === exIds.length ? '✔ ' : '') + n + '/' + exIds.length;
        badge.classList.toggle('ok', n === exIds.length);
        badge.title = `Ejercicios comprobados: ${n} de ${exIds.length}`;
      };
      upd();
      s.addEventListener('ex-scored', upd);
      const btn = h('button', { type: 'button', class: 'fold-btn', 'aria-expanded': 'true' }, ...h2.childNodes, badge, h('span', { class: 'fold-ico', 'aria-hidden': 'true' }, '▾'));
      h2.replaceChildren(btn);
      const set = (folded, save) => {
        s.classList.toggle('folded', folded);
        btn.setAttribute('aria-expanded', String(!folded));
        if (!save) return;
        if (folded) store[key] = 1;
        else delete store[key];
        EM.store.save();
      };
      s._unfold = () => s.classList.contains('folded') && set(false, true);
      btn.onclick = () => set(!s.classList.contains('folded'), true);
      if (store[key]) set(true, false);
      all.push({ s, set });
    });
    // Desplegar / recoger todo en páginas con varias secciones.
    if (all.length >= 3) {
      const every = (folded) => () => all.forEach((x) => x.set(folded, true));
      all[0].s.before(
        h('div', { class: 'fold-all' },
          h('button', { type: 'button', class: 'btn btn-sm btn-ghost', onclick: every(false) }, '▾ Desplegar todo'),
          h('button', { type: 'button', class: 'btn btn-sm btn-ghost', onclick: every(true) }, '▸ Recoger todo')
        )
      );
    }
  }

  EM.route = async function route() {
    const my = ++routing;
    const raw = location.hash.replace(/^#\/?/, '');
    const parts = raw.split('/').filter(Boolean).map(decodeURIComponent);
    const name = parts[0] || '';
    const view = EM.views[name] || EM.views.notfound;
    EM.speech.stop();
    const m = main();
    m.setAttribute('aria-busy', 'true');
    let node;
    try {
      node = await view(...parts.slice(1));
    } catch (e) {
      console.error(e);
      node = h('div', { class: 'view' },
        EM.pageHead('No se pudo abrir esta página'),
        h('p', {}, e.message || String(e)),
        h('p', { class: 'small muted' }, 'Si abriste el archivo directamente (file://), usa un servidor local: ver README.'),
        h('a', { class: 'btn', href: '#/' }, 'Volver al inicio'));
    }
    if (my !== routing) return; // otra navegación más reciente
    m.replaceChildren(node);
    folds(m, raw);
    m.removeAttribute('aria-busy');
    // Navegación activa
    const section = ['', 'path', 'review', 'vocab'].includes(name) ? name : ['module', 'lesson', 'consol', 'assess', 'stage'].includes(name) ? 'path' : 'more';
    U.$$('[data-nav]').forEach((a) => {
      const on = a.dataset.nav === section || (a.dataset.nav === name);
      a.classList.toggle('on', on);
      if (on) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
    const h1 = m.querySelector('h1');
    if (h1 && EM._navigated) h1.focus({ preventScroll: true });
    EM._navigated = true;
    document.title = (h1 ? h1.textContent + ' · ' : '') + 'English Mastery';
  };

  function init() {
    EM.store.load();
    // Pide al navegador que no borre el progreso guardado para liberar espacio.
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => null);
    EM.applyTheme();
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', EM.applyTheme);
    EM.speech.init();
    EM.timer.init();
    window.addEventListener('hashchange', EM.route);
    EM.route();
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
      navigator.serviceWorker.register('sw.js').catch((e) => console.warn('SW no registrado', e));
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
