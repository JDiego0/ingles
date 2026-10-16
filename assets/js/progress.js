/* Lógica de progreso: desbloqueo de módulos, secuencia semanal, lección
   recomendada, racha basada en actividad real y progreso por habilidades. */
(function () {
  'use strict';
  const EM = window.EM;
  const U = EM.u;
  const S = () => EM.store.data;
  const PASS = 80;

  const P = (EM.prog = {
    PASS,
    mods: () => EM.curriculum.modules,
    meta: (id) => EM.curriculum.modules.find((m) => m.id === id),
    index: (id) => EM.curriculum.modules.findIndex((m) => m.id === id),
    lessonIds: (m) => Array.from({ length: m.n }, (_, i) => `${m.id}-l${i + 1}`),

    lessonDone: (lid) => !!(S().lessons[lid] && S().lessons[lid].completed),
    consolDone: (mid) => !!(S().lessons[mid + '-c'] && S().lessons[mid + '-c'].completed),
    assessPassed: (key) => !!(S().assess[key] && S().assess[key].passed),

    modulePassed(m) {
      if (typeof m === 'string') m = P.meta(m);
      if (m.assess === false) return P.lessonIds(m).every(P.lessonDone);
      return P.assessPassed(m.id);
    },
    unlocked(m) {
      if (typeof m === 'string') m = P.meta(m);
      const i = P.index(m.id);
      if (i <= 1 || EM.store.s.freeMode) return true;
      if (i <= (S().placement || 0)) return true;
      return P.modulePassed(P.mods()[i - 1]);
    },
    moduleState(m) {
      if (typeof m === 'string') m = P.meta(m);
      const ids = P.lessonIds(m);
      const done = ids.filter(P.lessonDone).length;
      const passed = P.modulePassed(m);
      const unlocked = P.unlocked(m);
      const a = S().assess[m.id];
      return {
        done,
        total: ids.length,
        passed,
        unlocked,
        best: a ? a.best : null,
        label: passed ? 'Superado' : !unlocked ? 'Bloqueado' : done || a ? 'En curso' : 'Disponible',
      };
    },

    /** Secuencia semanal de un módulo: L1, L2, consolidación, L3, L4, evaluación. */
    steps(m) {
      if (typeof m === 'string') m = P.meta(m);
      const ids = P.lessonIds(m);
      const out = [];
      const half = Math.ceil(ids.length / 2);
      ids.forEach((lid, i) => {
        out.push({ type: 'lesson', id: lid, n: i + 1, href: `#/lesson/${m.id}/${lid}`, done: P.lessonDone(lid) });
        if (m.consol !== false && i === half - 1 && ids.length > 2)
          out.push({ type: 'consol', id: m.id + '-c', href: `#/consol/${m.id}`, done: P.consolDone(m.id) });
      });
      if (m.assess !== false)
        out.push({ type: 'assess', id: m.id, href: `#/assess/${m.id}`, done: P.assessPassed(m.id) });
      return out;
    },

    /** Siguiente paso recomendado según el progreso real. */
    next() {
      if (!S().diag.length && !P.lessonDone('m00-l1'))
        return { type: 'diag', href: '#/diagnostic', title: 'Diagnóstico inicial', modId: 'm00' };
      const place = S().placement || 0;
      for (const [i, m] of P.mods().entries()) {
        if (!P.unlocked(m)) continue;
        if (P.modulePassed(m)) continue;
        // Módulos anteriores a la ubicación del diagnóstico: repaso opcional.
        // M00 (método y sonidos) se recomienda siempre.
        if (i < place && i > 0) continue;
        const st = P.steps(m).find((s) => !s.done);
        if (st) return { ...st, modId: m.id, mod: m };
      }
      // Exámenes de etapa pendientes
      for (const st of EM.curriculum.stages) {
        if (!st.exam) continue;
        const mods = P.mods().filter((m) => m.stage === st.n);
        if (mods.every(P.modulePassed) && !P.assessPassed('stage-' + st.n))
          return { type: 'stage', href: `#/stage/${st.n}`, title: 'Examen de la etapa ' + st.n, stage: st.n };
      }
      return null;
    },

    stageUnlocked(n) {
      if (EM.store.s.freeMode) return true;
      return P.mods().filter((m) => m.stage === n).every(P.modulePassed);
    },

    /** Racha: días consecutivos con actividad registrada. Se permite un día de
        descanso por cada 7 días (el séptimo día del plan) sin romper la racha. */
    streak() {
      const log = S().log;
      const active = (d) => {
        const r = log[d];
        return r && (r.min >= 5 || r.ex > 0 || r.reviews > 0 || (r.lessons && r.lessons.length));
      };
      let d = U.today();
      if (!active(d)) d = U.addDays(d, -1); // hoy aún puede estudiar
      let count = 0;
      let lastRest = -99;
      let i = 0;
      while (i < 2000) {
        if (active(d)) count++;
        else if (count > 0 && i - lastRest >= 7 && active(U.addDays(d, -1))) lastRest = i;
        else break;
        d = U.addDays(d, -1);
        i++;
      }
      return count;
    },

    /** Progreso por habilidades a partir de resultados reales. */
    skills() {
      const groups = {
        listening: [],
        reading: [],
        grammar: [],
        vocabulary: [],
        pronunciation: [],
        speaking: [],
        writing: [],
      };
      for (const r of Object.values(S().ex)) {
        if (r.skill && groups[r.skill]) groups[r.skill].push(r.best);
      }
      const selfS = [];
      const selfW = [];
      for (const r of Object.values(S().rubrics)) {
        if (r.kind === 'speaking') selfS.push(r.pct);
        if (r.kind === 'writing') selfW.push(r.pct);
      }
      return [
        { key: 'listening', label: 'Listening', val: U.avg(groups.listening), n: groups.listening.length, auto: true },
        { key: 'reading', label: 'Reading', val: U.avg(groups.reading), n: groups.reading.length, auto: true },
        { key: 'grammar', label: 'Grammar', val: U.avg(groups.grammar), n: groups.grammar.length, auto: true },
        { key: 'vocabulary', label: 'Vocabulary', val: U.avg(groups.vocabulary), n: groups.vocabulary.length, auto: true },
        { key: 'pronunciation', label: 'Pronunciation', val: U.avg(groups.pronunciation), n: groups.pronunciation.length, auto: true },
        { key: 'speaking', label: 'Speaking', val: U.avg(selfS.concat(groups.speaking)), n: selfS.length, auto: false },
        { key: 'writing', label: 'Writing', val: U.avg(selfW.concat(groups.writing)), n: selfW.length, auto: false },
      ];
    },

    /** Total de minutos estudiados y días activos. */
    totals() {
      const log = Object.values(S().log);
      return {
        minutes: log.reduce((a, r) => a + (r.min || 0), 0),
        days: log.filter((r) => r.min >= 5 || r.ex || r.reviews || (r.lessons && r.lessons.length)).length,
        lessons: Object.values(S().lessons).filter((l) => l.completed).length,
      };
    },
  });
})();
