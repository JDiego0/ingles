/* Vistas: inicio, ruta curricular, página de módulo y menú "Más". */
(function () {
  'use strict';
  const EM = window.EM;
  const U = EM.u;
  const h = U.h;
  const S = () => EM.store;
  const V = (EM.views = EM.views || {});

  const pageHead = (title, sub) => h('header', { class: 'page-head' }, h('h1', { tabindex: '-1' }, title), sub ? h('p', { class: 'sub' }, sub) : null);
  EM.pageHead = pageHead;

  /* ================= INICIO ================= */
  V[''] = async function home() {
    const root = h('div', { class: 'view home' });
    root.append(pageHead('Hoy', new Date().toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })));
    if (!S().ok) root.append(h('p', { class: 'note warn' }, 'Tu navegador no permite guardar datos. El progreso se perderá al cerrar. Exporta una copia desde Ajustes.'));

    const nx = EM.prog.next();
    const today = S().day();
    const counts = EM.srs.counts();

    // Tarjeta principal: objetivo de hoy y siguiente paso
    const main = h('section', { class: 'card hero', 'aria-label': 'Sesión de hoy' });
    if (!nx) {
      main.append(h('h2', {}, '¡Ruta completada!'), h('p', {}, 'Has superado todos los módulos y exámenes registrados. Consulta el plan de mantenimiento en el módulo 19 y sigue con el banco de speaking y el repaso diario.'));
    } else {
      let goal = '';
      let title = nx.title || '';
      let mod = null;
      if (nx.modId) {
        try {
          mod = await EM.loadModule(nx.modId);
        } catch (e) {
          /* módulo no disponible */
        }
      }
      if (nx.type === 'lesson' && mod) {
        const L = mod.lessons[nx.n - 1];
        title = `${mod.id.toUpperCase()} · Lección ${nx.n}: ${L.title}`;
        goal = L.goal;
      } else if (nx.type === 'consol' && mod) {
        title = `${mod.id.toUpperCase()} · Sesión de consolidación`;
        goal = 'Repasar, escuchar de nuevo, hacer shadowing y hablar con el banco de preguntas del módulo.';
      } else if (nx.type === 'assess' && mod) {
        title = `${mod.id.toUpperCase()} · Evaluación del módulo`;
        goal = 'Demostrar el dominio del módulo (mínimo 80 % en la parte objetiva) y autoevaluar speaking y writing.';
      } else if (nx.type === 'diag') {
        goal = 'Estimar tu nivel de partida y recibir un plan de nivelación (unos 45–60 minutos).';
      } else if (nx.type === 'stage') {
        goal = 'Examen acumulativo de la etapa: preguntas objetivas y tareas abiertas.';
      }
      main.append(
        h('p', { class: 'eyebrow' }, 'Próximo paso recomendado'),
        h('h2', {}, title),
        goal ? h('p', {}, h('b', {}, 'Objetivo de hoy: '), goal) : null,
        h('p', { class: 'muted small' }, '⏱ Tiempo estimado: 60 min'),
        h('div', { class: 'row wrap' }, h('a', { class: 'btn btn-primary btn-lg', href: nx.href }, 'Empezar'))
      );
    }
    const last = S().data.last;
    if (last && (!nx || last.href !== nx.href)) {
      main.append(h('p', { class: 'small' }, h('a', { href: last.href }, '↩ Continuar donde lo dejaste: ' + last.title)));
    }
    root.append(main);

    // Indicadores reales
    const streak = EM.prog.streak();
    root.append(
      h('section', { class: 'stats', 'aria-label': 'Indicadores' },
        stat('🔥', streak, streak === 1 ? 'día de racha' : 'días de racha'),
        stat('⏱', today.min || 0, 'min hoy'),
        h('a', { class: 'stat link', href: '#/review' }, h('span', { class: 'stat-ico', 'aria-hidden': 'true' }, '🔁'), h('span', { class: 'stat-n' }, counts.due + counts.fresh), h('span', { class: 'stat-l' }, 'por repasar'))
      )
    );

    // Progreso por habilidades
    const sk = EM.prog.skills();
    const skSec = h('section', { class: 'card', 'aria-label': 'Progreso por habilidades' }, h('h2', {}, 'Progreso por habilidades'));
    const ul = h('ul', { class: 'skills' });
    sk.forEach((s) => {
      ul.append(
        h('li', {},
          h('div', { class: 'sk-top' }, h('span', {}, s.label), h('span', { class: 'small muted' }, s.val == null ? 'sin datos' : U.pct(s.val) + (s.auto ? '' : ' (autoeval.)'))),
          EM.ui.bar(s.val || 0, s.label)
        )
      );
    });
    skSec.append(ul, h('p', { class: 'small muted' }, 'Listening, reading, gramática, vocabulario y pronunciación: mejor resultado en ejercicios corregidos automáticamente. Speaking y writing: tus autoevaluaciones con rúbrica.'));
    root.append(skSec);

    // Ruta: progreso general
    const mods = EM.curriculum.modules;
    const passed = mods.filter(EM.prog.modulePassed).length;
    root.append(
      h('section', { class: 'card' },
        h('h2', {}, 'Progreso general'),
        h('p', {}, `${passed} de ${mods.length} módulos superados · ${EM.prog.totals().lessons} lecciones completadas · ${EM.prog.totals().minutes} min registrados`),
        EM.ui.bar((passed / mods.length) * 100, 'Módulos superados'),
        h('div', { class: 'row wrap' }, h('a', { class: 'btn', href: '#/path' }, 'Ver ruta'), h('a', { class: 'btn btn-ghost', href: '#/history' }, 'Historial'))
      )
    );

    // Plan semanal
    root.append(
      h('section', { class: 'card' },
        h('h2', {}, 'Tu semana (6 × 60 min)'),
        h('ol', { class: 'week' }, EM.curriculum.week.map((w) => h('li', {}, h('b', {}, w.day + ': '), w.what))),
        h('p', { class: 'small muted' }, 'Si un día no puedes, no te saltes pasos: continúa con el siguiente de la secuencia.')
      )
    );
    return root;
  };
  function stat(ico, n, label) {
    return h('div', { class: 'stat' }, h('span', { class: 'stat-ico', 'aria-hidden': 'true' }, ico), h('span', { class: 'stat-n' }, n), h('span', { class: 'stat-l' }, label));
  }

  /* ================= RUTA ================= */
  V.path = async function path() {
    const root = h('div', { class: 'view' });
    root.append(pageHead('Ruta curricular', 'De A1+ a B2, con extensión hacia C1. Cada módulo ≈ una semana de 6 sesiones.'));
    for (const st of EM.curriculum.stages) {
      const mods = EM.curriculum.modules.filter((m) => m.stage === st.n);
      const sec = h('section', { class: 'stage' },
        h('h2', {}, h('span', { class: 'badge' }, 'Etapa ' + st.n), ' ', st.title, ' ', h('span', { class: 'muted small' }, st.cefr)),
        h('p', { class: 'small' }, st.desc)
      );
      const ol = h('ol', { class: 'mod-list' });
      mods.forEach((m) => {
        const ms = EM.prog.moduleState(m);
        ol.append(
          h('li', {},
            h('a', { class: 'mod-card ' + (ms.unlocked ? '' : 'locked') + (ms.passed ? ' passed' : ''), href: '#/module/' + m.id },
              h('div', { class: 'mod-top' },
                h('span', { class: 'mod-id' }, m.id.toUpperCase()),
                h('span', { class: 'badge' }, m.cefr),
                h('span', { class: 'state' }, (ms.passed ? '✔ ' : !ms.unlocked ? '🔒 ' : '') + ms.label)
              ),
              h('strong', { class: 'mod-title', lang: 'en' }, m.title),
              h('span', { class: 'mod-es' }, m.es),
              EM.ui.bar((ms.done / ms.total) * 100, `Lecciones completadas de ${m.id}`),
              h('span', { class: 'small muted' }, `${ms.done}/${ms.total} lecciones` + (ms.best != null ? ` · evaluación: ${U.pct(ms.best)}` : ''))
            )
          )
        );
      });
      sec.append(ol);
      if (st.exam) {
        const r = S().data.assess['stage-' + st.n];
        sec.append(
          h('a', { class: 'btn ' + (EM.prog.stageUnlocked(st.n) ? '' : 'btn-ghost'), href: '#/stage/' + st.n },
            (EM.prog.stageUnlocked(st.n) ? '📝 ' : '🔒 ') + 'Examen de la etapa ' + st.n + (r ? ` (mejor: ${U.pct(r.best)})` : ''))
        );
      }
      root.append(sec);
    }
    return root;
  };

  /* ================= MÓDULO ================= */
  V.module = async function moduleView(id) {
    const meta = EM.prog.meta(id);
    if (!meta) return V.notfound();
    const m = await EM.loadModule(id);
    const ms = EM.prog.moduleState(meta);
    const root = h('div', { class: 'view' });
    root.append(
      h('nav', { class: 'crumbs', 'aria-label': 'Migas' }, h('a', { href: '#/path' }, 'Ruta'), ' › ', meta.id.toUpperCase()),
      pageHead(`${meta.id.toUpperCase()} · ${m.title}`, `${m.es} · Nivel aproximado ${m.cefr}`)
    );
    if (!ms.unlocked) {
      const prev = EM.curriculum.modules[EM.prog.index(id) - 1];
      root.append(h('p', { class: 'note warn' }, `🔒 Bloqueado. Supera la evaluación de ${prev.id.toUpperCase()} (80 %) para desbloquearlo. También puedes activar el modo libre en Ajustes si estás repasando.`));
    }
    root.append(h('p', {}, m.summary));

    // Secuencia semanal
    // Avance parcial de una lección empezada (ejercicios comprobados).
    const stepPartial = (s, mod) => {
      if (s.type !== 'lesson') return '';
      const L = mod.lessons[s.n - 1];
      const sc = L && L._blocks ? EM.blockScores(L._blocks) : null;
      if (sc && sc.attempted) return `◐ en curso · ${sc.attempted}/${sc.total} ejercicios`;
      return S().data.lessons[s.id] && S().data.lessons[s.id].visited ? '◐ empezada' : '';
    };
    const steps = EM.prog.steps(meta);
    const ol = h('ol', { class: 'steps' });
    steps.forEach((s, i) => {
      let label;
      if (s.type === 'lesson') label = `Lección ${s.n}: ${m.lessons[s.n - 1].title}`;
      else if (s.type === 'consol') label = 'Sesión de consolidación';
      else label = 'Evaluación del módulo' + (ms.best != null ? ` (mejor: ${U.pct(ms.best)})` : '');
      ol.append(
        h('li', { class: s.done ? 'done' : '' },
          h('span', { class: 'step-day' }, 'Día ' + (i + 1)),
          ms.unlocked ? h('a', { href: s.href }, label) : h('span', {}, label),
          h('span', { class: 'step-st' }, s.done ? '✔ hecho' : stepPartial(s, m) || 'pendiente')
        )
      );
    });
    root.append(h('section', { class: 'card' }, h('h2', {}, 'Secuencia de la semana'), ol,
      m.assessment && ms.unlocked && !ms.passed && ms.done === 0
        ? h('p', { class: 'small' }, '¿Ya dominas este contenido? Puedes hacer la evaluación como ', h('a', { href: '#/assess/' + id }, 'prueba de salto'), '. Si obtienes 80 % o más y completas las tareas abiertas, el módulo cuenta como superado.')
        : null
    ));

    root.append(
      h('section', { class: 'card' },
        h('h2', {}, 'Objetivos comunicativos'),
        EM.ui.list(m.objectives),
        h('h3', {}, 'Conocimientos previos'),
        EM.ui.list(m.prereq),
        h('h3', {}, 'Al terminar podrás (resultados verificables)'),
        EM.ui.list(m.outcomes, 'checks')
      )
    );
    if (m.errors && m.errors.length) {
      root.append(
        h('section', { class: 'card' },
          h('h2', {}, 'Errores frecuentes de hispanohablantes'),
          h('ul', { class: 'errs' }, m.errors.map((e) => h('li', {}, h('s', { lang: 'en' }, e[0]), ' → ', h('b', { lang: 'en' }, e[1]), e[2] ? h('span', { class: 'small muted' }, ' · ' + e[2]) : null)))
        )
      );
    }
    const allV = m.lessons.flatMap((L) => L.chunks || []);
    root.append(
      h('section', { class: 'card' },
        h('h2', {}, `Expresiones y vocabulario objetivo (${allV.length})`),
        h('div', { class: 'row wrap' },
          h('button', {
            class: 'btn', type: 'button',
            onclick: () => {
              allV.forEach((v) => EM.srs.add(v, { src: m.id, lvl: m.cefr }));
              U.toast(`${allV.length} expresiones en tu repaso.`);
              EM.route();
            },
          }, '+ Añadir todas al repaso')
        ),
        EM.ui.reveal('Ver lista completa', EM.ui.vocabList(allV, { src: m.id, lvl: m.cefr }))
      )
    );
    if (m.transfer) root.append(h('section', { class: 'card' }, h('h2', {}, 'Transferencia a la vida real'), EM.ui.html(m.transfer)));
    return root;
  };

  /* ================= MÁS ================= */
  V.more = async function more() {
    const items = [
      ['#/diagnostic', '🧭', 'Diagnóstico', 'Estimar tu nivel y plan de nivelación'],
      ['#/speaking', '🗣', 'Banco de speaking', 'Preguntas por nivel y técnicas para desbloquearte'],
      ['#/pron', '👄', 'Pronunciación', 'Sonidos difíciles, pares mínimos, ritmo y entonación'],
      ['#/errors', '🩹', 'Mis errores', 'Errores recurrentes para corregir y reutilizar'],
      ['#/vocab', '📚', 'Vocabulario', 'Todas tus expresiones, favoritas y propias'],
      ['#/history', '📅', 'Historial', 'Días, minutos, resultados y comparación'],
      ['#/settings', '⚙️', 'Ajustes y copia de seguridad', 'Voz, repaso, tema, exportar e importar'],
      ['#/help', '❓', 'Ayuda', 'Cómo usar el curso y organizar la hora'],
    ];
    return h('div', { class: 'view' },
      pageHead('Más'),
      h('ul', { class: 'more-grid' }, items.map(([href, ico, t, d]) => h('li', {}, h('a', { class: 'more-item', href }, h('span', { class: 'mi-ico', 'aria-hidden': 'true' }, ico), h('span', {}, h('strong', {}, t), h('span', { class: 'small muted' }, d))))))
    );
  };

  V.notfound = async () => h('div', { class: 'view' }, pageHead('Página no encontrada'), h('p', {}, h('a', { href: '#/' }, 'Volver al inicio')));
})();
