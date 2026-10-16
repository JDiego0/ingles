/* Texto a voz (Web Speech API, SpeechSynthesis) y grabadora opcional (MediaRecorder).
   Todo está condicionado a la compatibilidad del navegador: si no existe, la app
   muestra un aviso y el estudiante usa la transcripción para leer en voz alta. */
(function () {
  'use strict';
  const EM = window.EM;
  const U = EM.u;

  const sp = (EM.speech = {
    supported: 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
    voices: [],
    allVoices: [],
    token: 0,
    speaking: false,
    paused: false,
    listeners: new Set(),

    init() {
      if (!this.supported) return;
      const load = () => {
        this.allVoices = speechSynthesis.getVoices();
        this.voices = this.allVoices.filter((v) => /^en([-_]|$)/i.test(v.lang));
        this.emit();
      };
      load();
      if ('onvoiceschanged' in speechSynthesis) speechSynthesis.addEventListener('voiceschanged', load);
      // Algunos Android cargan las voces tarde.
      setTimeout(load, 800);
      setTimeout(load, 2500);
    },
    onChange(fn) {
      this.listeners.add(fn);
      return () => this.listeners.delete(fn);
    },
    emit() {
      this.listeners.forEach((fn) => {
        try {
          fn(this);
        } catch (e) {
          /* listener eliminado */
        }
      });
    },

    /** Ordena voces: primero inglés estadounidense. */
    ranked() {
      const us = this.voices.filter((v) => /en[-_]US/i.test(v.lang));
      const rest = this.voices.filter((v) => !/en[-_]US/i.test(v.lang));
      return us.concat(rest);
    },
    /** alt = 0 voz principal; alt = 1 segunda voz (otro interlocutor) si existe. */
    pick(alt = 0) {
      const ranked = this.ranked();
      if (!ranked.length) return null;
      const pref = EM.store.s.voiceURI;
      let main = ranked.find((v) => v.voiceURI === pref) || ranked[0];
      if (alt === 0) return main;
      const us = ranked.filter((v) => /en[-_]US/i.test(v.lang) && v !== main);
      return us[alt - 1] || ranked.filter((v) => v !== main)[alt - 1] || main;
    },

    /** Reproduce un texto. Devuelve una promesa que se resuelve al terminar. */
    /** Voz para una variedad concreta (en-GB, en-AU, en-IN…), si el dispositivo la tiene. */
    pickLang(lang) {
      if (!lang) return null;
      const re = new RegExp('^' + lang.replace('-', '[-_]'), 'i');
      return this.voices.find((v) => re.test(v.lang)) || null;
    },
    say(text, { alt = 0, rate, lang } = {}) {
      return new Promise((resolve) => {
        if (!this.supported) return resolve(false);
        const u = new SpeechSynthesisUtterance(String(text).replace(/\s*\/\s*/g, ', '));
        const v = this.pickLang(lang) || this.pick(alt);
        if (v) u.voice = v;
        u.lang = v ? v.lang : 'en-US';
        u.rate = rate || EM.store.s.rate || 0.9;
        // Si una voz no tiene tono distinto, al menos variamos el tono para el segundo interlocutor.
        u.pitch = alt && v === this.pick(0) ? 0.85 : 1;
        u.onend = () => resolve(true);
        u.onerror = () => resolve(false);
        speechSynthesis.speak(u);
      });
    },

    /** Reproduce una lista de líneas [{text, alt}] en orden; se puede detener. */
    async play(lines, { onLine, rate } = {}) {
      if (!this.supported) return;
      this.stop();
      const my = ++this.token;
      this.speaking = true;
      this.paused = false;
      this.emit();
      for (let i = 0; i < lines.length; i++) {
        if (my !== this.token) return;
        onLine && onLine(i);
        await this.say(lines[i].text, { alt: lines[i].alt || 0, rate, lang: lines[i].lang });
        if (my !== this.token) return;
        await new Promise((r) => setTimeout(r, 250));
      }
      if (my === this.token) {
        this.speaking = false;
        onLine && onLine(-1);
        this.emit();
      }
    },
    stop() {
      if (!this.supported) return;
      this.token++;
      speechSynthesis.cancel();
      this.speaking = false;
      this.paused = false;
      this.emit();
    },
    togglePause() {
      if (!this.supported || !this.speaking) return;
      if (this.paused) {
        speechSynthesis.resume();
        this.paused = false;
      } else {
        speechSynthesis.pause();
        this.paused = true;
      }
      this.emit();
    },
  });

  /** Divide un texto en frases para reproducirlo por partes. */
  sp.sentences = (text) =>
    String(text)
      .replace(/<[^>]+>/g, '')
      .split(/(?<=[.!?])\s+(?=[A-Z"“'(])/)
      .map((s) => s.trim())
      .filter(Boolean);

  /* ---------- Grabadora (opcional) ---------- */
  EM.recorder = {
    supported: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder),
  };

  window.addEventListener('pagehide', () => sp.stop());
  U.noop = () => {};
})();
