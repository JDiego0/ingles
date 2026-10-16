/* Service worker: "red primero, caché como respaldo".
   Con conexión siempre obtiene la versión más reciente; sin conexión sirve lo
   que ya se haya visitado. Rutas relativas al alcance (compatibles con GitHub Pages). */
const CACHE = 'english-mastery-v5';
const CORE = [
  './',
  'index.html',
  'manifest.webmanifest',
  'assets/css/styles.css',
  'assets/css/responsive.css',
  'assets/images/icon.svg',
  'assets/js/util.js',
  'assets/js/storage.js',
  'assets/js/speech.js',
  'assets/js/srs.js',
  'assets/js/progress.js',
  'assets/js/components.js',
  'assets/js/exercises.js',
  'assets/js/timer.js',
  'assets/js/views-home.js',
  'assets/js/views-lesson.js',
  'assets/js/views-assess.js',
  'assets/js/views-tools.js',
  'assets/js/app.js',
  'data/helpers.js',
  'data/rubrics.js',
  'data/curriculum.js',
  'data/speaking-bank.js',
  'data/pronunciation.js',
  'data/help.js',
  'data/assessments/diagnostic.js',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).catch(() => null).then(() => self.skipWaiting())
  );
});
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    // cache: 'no-cache' obliga a revalidar con el servidor (evita servir versiones viejas
    // desde la caché HTTP del navegador tras publicar una actualización).
    fetch(req, { cache: 'no-cache' })
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((r) => r || caches.match('index.html')))
  );
});
