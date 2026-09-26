const CACHE_NAME = 'stackgen-shell-v1';
const APP_SHELL = [
  '/', '/index.html', '/login.html', '/register.html', '/lessons.html',
  '/lesson-detail.html', '/roadmap.html', '/progress.html', '/projects.html',
  '/notes.html', '/profile.html', '/settings.html', '/offline.html',
  '/manifest.webmanifest', '/icons/stackgen.svg', '/css/style.css', '/js/pwa.js',
  '/js/app.js', '/js/auth.js', '/js/dashboard.js', '/js/lessons.js',
  '/js/lesson-detail.js', '/js/roadmap.js', '/js/progress.js',
  '/js/projects.js', '/js/notes.js', '/js/profile.js'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('stackgen-shell-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/') || url.pathname.startsWith('/uploads/')) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then(response => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
      }
      return response;
    }).catch(async () => (await caches.match(request)) || (await caches.match('/offline.html'))));
    return;
  }

  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
    }
    return response;
  })));
});
