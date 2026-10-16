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
