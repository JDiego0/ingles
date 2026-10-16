/* Temporizador opcional de sesión. Recorre la agenda de la lección (bloques de
   minutos), registra los minutos reales estudiados y sobrevive a recargas. */
(function () {
  'use strict';
  const EM = window.EM;
  const U = EM.u;
  const h = U.h;
  const S = () => EM.store;
  let tick = null;

  const T = (EM.timer = {
    get st() {
      return S().data.timer;
    },
    elapsed() {
      const t = this.st;
      if (!t) return 0;
      return t.elapsed + (t.running ? Date.now() - t.startedAt : 0);
    },
    start(label, href, blocks) {
      if (this.st && this.st.running) this.stop(true);
      S().data.timer = { label, href, blocks: blocks || [], elapsed: 0, running: true, startedAt: Date.now(), logged: 0, lastBlock: -1 };
      S().save();
      this.loop();
      U.toast('Sesión iniciada: ' + label);
      this.render();
    },
    toggle() {
      const t = this.st;
      if (!t) return;
      if (t.running) {
        t.elapsed += Date.now() - t.startedAt;
        t.running = false;
      } else {
        t.startedAt = Date.now();
        t.running = true;
      }
      S().save();
      this.loop();
      this.render();
    },
    stop(silent) {
      const t = this.st;
      if (!t) return;
      this.flush();
      const mins = Math.floor(this.elapsed() / 60000);
      S().data.timer = null;
      S().saveNow();
      clearInterval(tick);
      tick = null;
      if (!silent) U.toast(`Sesión terminada: ${mins} min registrados.`);
      this.render();
    },
    /** Registra en el historial los minutos completos transcurridos. */
    flush() {
      const t = this.st;
      if (!t) return;
      const mins = Math.floor(this.elapsed() / 60000);
      if (mins > t.logged) {
        S().logActivity('min', mins - t.logged);
        t.logged = mins;
      }
    },
    current() {
      const t = this.st;
      if (!t || !t.blocks.length) return null;
      const m = this.elapsed() / 60000;
      let acc = 0;
      for (let i = 0; i < t.blocks.length; i++) {
        acc += t.blocks[i][0];
        if (m < acc) return { i, block: t.blocks[i], left: Math.ceil((acc - m) * 60) };
      }
      return { i: t.blocks.length, block: null, left: 0 };
    },
    loop() {
      clearInterval(tick);
      if (this.st && this.st.running) tick = setInterval(() => this.onTick(), 1000);
    },
    onTick() {
      const t = this.st;
      if (!t) return;
      this.flush();
      const cur = this.current();
      if (cur && cur.i !== t.lastBlock) {
        if (t.lastBlock !== -1) {
          U.toast(cur.block ? `Siguiente bloque: ${cur.block[2]}` : 'Agenda completa. ¡Buen trabajo!');
          if (navigator.vibrate) navigator.vibrate([120, 80, 120]);
        }
        t.lastBlock = cur.i;
        S().save();
      }
      this.render();
    },
    render() {
      const chip = document.getElementById('timer-chip');
      if (!chip) return;
      const t = this.st;
      if (!t) {
        chip.replaceChildren();
        chip.hidden = true;
        return;
      }
      chip.hidden = false;
      const cur = this.current();
      const e = Math.floor(this.elapsed() / 1000);
      const label = cur && cur.block ? `${EM.ui.fmt(cur.left)} · ${cur.block[1]}` : EM.ui.fmt(e);
      let btn = chip.querySelector('button');
      if (!btn) {
        btn = h('button', { class: 'timer-btn', type: 'button', onclick: () => T.panel() });
        chip.append(btn);
      }
      btn.textContent = (t.running ? '⏱ ' : '⏸ ') + label;
      btn.setAttribute('aria-label', `Temporizador de sesión: ${label}. Abrir controles`);
    },
    panel() {
      const dlg = document.getElementById('dlg');
      const t = this.st;
      if (!t || !dlg.showModal) return;
      const cur = this.current();
      const total = t.blocks.reduce((a, b) => a + b[0], 0);
      dlg.replaceChildren(
        h('div', { class: 'dlg-body' },
          h('h2', {}, 'Sesión en curso'),
          h('p', {}, t.label),
          h('p', { class: 'big' }, `${EM.ui.fmt(Math.floor(this.elapsed() / 1000))}${total ? ' de ' + total + ':00' : ''}`),
          t.blocks.length
            ? h('ol', { class: 'agenda' },
                t.blocks.map((b, i) =>
                  h('li', { class: cur && cur.i === i ? 'now' : cur && i < cur.i ? 'past' : '' },
                    h('b', {}, b[0] + ' min · ' + b[1]), ' — ', b[2], cur && cur.i === i ? ' (ahora)' : '')
                ))
            : null,
          h('div', { class: 'row wrap end' },
            h('a', { class: 'btn btn-ghost', href: t.href, onclick: () => dlg.close() }, 'Ir a la lección'),
            h('button', { class: 'btn', type: 'button', onclick: () => { T.toggle(); dlg.close(); } }, t.running ? '⏸ Pausar' : '▶ Reanudar'),
            h('button', { class: 'btn btn-danger', type: 'button', onclick: () => { T.stop(); dlg.close(); } }, '⏹ Terminar'),
            h('button', { class: 'btn btn-primary', type: 'button', onclick: () => dlg.close() }, 'Cerrar')
          )
        )
      );
      dlg.showModal();
    },
    init() {
      this.loop();
      this.render();
      document.addEventListener('visibilitychange', () => this.render());
    },
  });
})();
