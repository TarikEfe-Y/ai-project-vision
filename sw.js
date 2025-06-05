const CACHE_NAME = 'ai-assistant-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Yükleme sırasında cache'e al
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Ağ isteklerini yakala
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache'de varsa döndür
        if (response) {
          return response;
        }
        
        // Yoksa ağdan getir
        return fetch(event.request);
      }
    )
  );
});
