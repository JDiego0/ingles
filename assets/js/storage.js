/* Persistencia local (localStorage) con valores por defecto, versionado,
   migración, registro de actividad y copia de seguridad JSON. */
(function () {
  'use strict';
  const EM = window.EM;
  const U = EM.u;
  const KEY = 'englishMastery.v1';
  const VERSION = 1;

  function defaults() {
    return {
      version: VERSION,
      created: U.today(),
      settings: {
        theme: 'auto', // auto | light | dark
        voiceURI: '',
        rate: 0.9,
        newPerDay: 10,
        maxReviews: 40,
        direction: 'mixed', // mixed | es-en | en-es
        freeMode: false, // desbloquea todos los módulos
        fontScale: 1,
      },
      lessons: {}, // lessonId -> { visited, completed, speakDone }
      ex: {}, // exerciseId -> { best, last, attempts, date, skill, self }
      assess: {}, // moduleId | 'stage-N' -> { best, passed, attempts: [] }
      rubrics: {}, // taskId -> { scores, pct, date, kind }
      writing: {}, // taskId -> texto
      checks: {}, // checklistId -> { idx: true }
      reflections: {}, // lessonId -> { expressions, difficulties, confidence, notes, date }
      notes: {}, // clave libre -> texto
      cards: {}, // cardId -> tarjeta de repaso
      errors: {}, // errorId -> error registrado
      log: {}, // AAAA-MM-DD -> { min, ex, lessons, reviews }
      diag: [], // resultados de diagnóstico
      placement: 0, // índice de módulo desbloqueado por diagnóstico
      last: null, // última ubicación (hash) de estudio
      timer: null, // estado del temporizador
    };
  }

  // Completa claves que falten (por ejemplo, tras actualizar la app).
  const isObj = (v) => v && typeof v === 'object' && !Array.isArray(v);
  function fill(target, base) {
    for (const k in base) {
      if (!(k in target)) target[k] = base[k];
      else if (isObj(base[k]) && isObj(target[k])) fill(target[k], base[k]);
    }
    return target;
  }

  function migrate(d) {
    if (!d || typeof d !== 'object') return defaults();
    // Versión 1 es la actual. Futuras migraciones: if (d.version < 2) { ...; d.version = 2; }
    d.version = VERSION;
    return fill(d, defaults());
  }

  const store = (EM.store = {
    KEY,
    VERSION,
    ok: true,
    data: null,
    load() {
      try {
        const raw = localStorage.getItem(KEY);
        this.data = raw ? migrate(JSON.parse(raw)) : defaults();
      } catch (e) {
        console.warn('Almacenamiento no disponible; se usará memoria temporal.', e);
        this.ok = false;
        this.data = defaults();
      }
      return this.data;
    },
    saveNow() {
      if (!this.ok) return;
      try {
        localStorage.setItem(KEY, JSON.stringify(this.data));
      } catch (e) {
        this.ok = false;
        console.error(e);
        U.toast('No se pudo guardar el progreso (almacenamiento lleno o bloqueado). Exporta una copia.');
      }
    },
    save: null, // se asigna abajo (con retardo)
    get s() {
      return this.data.settings;
    },

    /* ---------- Registro diario ---------- */
    day(date = U.today()) {
      const l = this.data.log;
      if (!l[date]) l[date] = { min: 0, ex: 0, lessons: [], reviews: 0 };
      return l[date];
    },
    logActivity(kind, value = 1) {
      const d = this.day();
      if (kind === 'lesson') {
        if (!d.lessons.includes(value)) d.lessons.push(value);
      } else d[kind] = (d[kind] || 0) + value;
      this.save();
    },

    /* ---------- Ejercicios ---------- */
    recordEx(id, pct, skill, extra = {}) {
      const r = this.data.ex[id] || { best: 0, attempts: 0 };
      r.last = pct;
      r.best = Math.max(r.best || 0, pct);
      r.attempts = (r.attempts || 0) + 1;
      r.date = U.today();
      r.skill = skill;
      Object.assign(r, extra);
      this.data.ex[id] = r;
      this.logActivity('ex');
      this.save();
      return r;
    },

    /* ---------- Errores (banco de errores recurrentes) ---------- */
    addError({ key, prompt, wrong, right, why, source }) {
      const id = key || 'e-' + U.slug(wrong + '-' + right);
      const e = this.data.errors[id] || { count: 0, first: U.today() };
      Object.assign(e, { id, prompt, wrong, right, why, source, last: U.today(), resolved: false });
      e.count += 1;
      this.data.errors[id] = e;
      this.save();
    },

    /* ---------- Copia de seguridad ---------- */
    exportJSON() {
      return JSON.stringify({ app: 'english-mastery', exported: new Date().toISOString(), data: this.data }, null, 2);
    },
    importJSON(text) {
      const obj = JSON.parse(text);
      const d = obj && obj.app === 'english-mastery' ? obj.data : obj;
      if (!d || typeof d !== 'object' || !('lessons' in d) || !('settings' in d)) {
        throw new Error('El archivo no parece una copia de English Mastery.');
      }
      this.data = migrate(d);
      this.saveNow();
    },
    reset() {
      this.data = defaults();
      this.saveNow();
    },
  });
  store.save = U.debounce(() => store.saveNow(), 300);
  // Si el curso está abierto en otra pestaña y guarda cambios, recargarlos aquí
  // para que una pestaña no sobrescriba el progreso de la otra.
  window.addEventListener('storage', (e) => {
    if (e.key !== KEY || !e.newValue) return;
    try {
      store.data = migrate(JSON.parse(e.newValue));
      if (EM.applyTheme) EM.applyTheme();
      if (EM.route && !document.activeElement?.matches?.('input, textarea')) EM.route();
    } catch (err) {
      console.warn('No se pudo sincronizar con otra pestaña', err);
    }
  });
  window.addEventListener('pagehide', () => store.saveNow());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') store.saveNow();
  });
})();
