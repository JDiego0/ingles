/* Repetición espaciada sencilla basada en cajas (tipo Leitner).
   Intervalos orientativos: mismo día, 1, 3, 7, 14, 30, 60 y 120 días.
   - "Otra vez": vuelve a la caja 0 (se repite hoy) y cuenta un olvido.
   - "Difícil": se queda en la caja actual con la mitad del intervalo.
   - "Bien": sube una caja.  - "Fácil": sube dos cajas.
   El intervalo se adapta al desempeño del estudiante, no es una fórmula fija. */
(function () {
  'use strict';
  const EM = window.EM;
  const U = EM.u;
  const S = () => EM.store;
  const INTERVALS = [0, 1, 3, 7, 14, 30, 60, 120];
  const LEARNED_BOX = 4;

  const srs = (EM.srs = {
    INTERVALS,
    cardId: (en) => 'v-' + U.slug(en),

    /** Añade (o actualiza) una tarjeta a partir de un elemento de vocabulario. */
    add(item, { src = '', lvl = '', own = false, kind = 'vocab' } = {}) {
      const cards = S().data.cards;
      const id = item.id || srs.cardId(item.en);
      if (cards[id]) return cards[id];
      cards[id] = {
        id,
        kind,
        en: item.en,
        es: item.es,
        ex: item.ex || '',
        exEs: item.exEs || '',
        col: item.col || '',
        pron: item.pron || '',
        use: item.use || '',
        src,
        lvl,
        own,
        fav: false,
        status: 'pending',
        box: 0,
        seen: false,
        due: U.today(),
        added: U.today(),
        reps: 0,
        lapses: 0,
        hist: [],
      };
      S().save();
      return cards[id];
    },
    remove(id) {
      delete S().data.cards[id];
      S().save();
    },
    has: (en) => !!S().data.cards[srs.cardId(en)],
    get: (id) => S().data.cards[id],

    /** Estado manual: aprendida / dudosa / pendiente. */
    setStatus(id, status) {
      const c = S().data.cards[id];
      if (!c) return;
      const t = U.today();
      c.status = status;
      if (status === 'learned') {
        c.box = Math.max(c.box, LEARNED_BOX);
        c.due = U.addDays(t, INTERVALS[c.box]);
        c.seen = true;
      } else if (status === 'doubtful') {
        c.box = Math.min(c.box, 1);
        c.due = t;
        c.seen = true;
      } else {
        c.box = 0;
        c.due = t;
        c.seen = false;
      }
      S().save();
    },
    toggleFav(id) {
      const c = S().data.cards[id];
      if (c) {
        c.fav = !c.fav;
        S().save();
      }
      return c && c.fav;
    },

    /** Próximo intervalo (en días) para cada respuesta, para mostrarlo en los botones. */
    preview(c) {
      const b = c.box || 0;
      return {
        again: 0,
        // Tarjeta nueva o recién fallada: "Difícil" la vuelve a mostrar hoy.
        hard: b === 0 ? 0 : Math.max(1, Math.round(INTERVALS[b] / 2)),
        good: INTERVALS[Math.min(b + 1, INTERVALS.length - 1)],
        easy: INTERVALS[Math.min(b + 2, INTERVALS.length - 1)],
      };
    },

    grade(id, r) {
      const c = S().data.cards[id];
      if (!c) return;
      const t = U.today();
      const p = srs.preview(c);
      if (!c.seen) {
        c.seen = true;
        c.firstSeen = t;
      }
      c.reps++;
      if (r === 'again') {
        c.box = 0;
        c.lapses++;
        c.status = 'doubtful';
      } else if (r === 'hard') {
        c.box = Math.max(1, c.box);
        c.status = 'doubtful';
      } else if (r === 'good') {
        c.box = Math.min(c.box + 1, INTERVALS.length - 1);
      } else if (r === 'easy') {
        c.box = Math.min(c.box + 2, INTERVALS.length - 1);
      }
      c.due = U.addDays(t, p[r]);
      if (r === 'good' || r === 'easy') c.status = c.box >= LEARNED_BOX ? 'learned' : 'learning';
      c.hist.push({ d: t, r });
      if (c.hist.length > 30) c.hist.shift();
      c.lastReview = t;
      S().logActivity('reviews');
      S().save();
    },

    /** Cola diaria: tarjetas vencidas (prioriza olvidos) + nuevas hasta el límite diario. */
    queue() {
      const t = U.today();
      const st = S().s;
      const all = Object.values(S().data.cards);
      const due = all
        .filter((c) => c.seen && c.due <= t)
        .sort((a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : b.lapses - a.lapses));
      const introducedToday = all.filter((c) => c.firstSeen === t).length;
      const newLeft = Math.max(0, (st.newPerDay || 10) - introducedToday);
      const fresh = all
        .filter((c) => !c.seen)
        .sort((a, b) => (a.added < b.added ? -1 : a.added > b.added ? 1 : 0))
        .slice(0, newLeft);
      return due.slice(0, st.maxReviews || 40).concat(fresh);
    },
    counts() {
      const t = U.today();
      const all = Object.values(S().data.cards);
      const q = srs.queue();
      return {
        total: all.length,
        due: q.filter((c) => c.seen).length,
        fresh: q.filter((c) => !c.seen).length,
        learned: all.filter((c) => c.status === 'learned').length,
        doubtful: all.filter((c) => c.status === 'doubtful').length,
        pending: all.filter((c) => c.status === 'pending').length,
        tomorrow: all.filter((c) => c.seen && c.due === U.addDays(t, 1)).length,
      };
    },
  });
})();
