const CACHE_NAME = 'gymlog-pro-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  // Se quiser, pode voltar a colocar os JS aqui depois:
  // './js/core.js',
  // './js/treino.js',
  // './js/nutri.js',
  // './js/charts.js',
  // './icons/icon-192.png',
  // './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Em vez de cache.addAll (que quebra se 1 falhar),
      // fazemos add() individual com catch.
      return Promise.all(
        URLS_TO_CACHE.map((url) =>
          cache.add(url).catch((err) => {
            console.warn('Falha ao adicionar ao cache:', url, err);
          })
        )
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
