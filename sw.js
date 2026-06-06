// =============================================
// SERVICE WORKER - CarteraApp
// Este archivo hace que la app funcione
// sin conexión a internet
// =============================================

var CACHE_NAME = 'carteraapp-v1';

// Archivos que guardamos para usar sin internet
var ARCHIVOS = [
  '/index.html',
  '/cobros.html',
  '/cliente.html',
  '/style.css',
  '/manifest.json'
];

// Cuando se instala por primera vez
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ARCHIVOS);
    })
  );
});

// Cuando el usuario pide una página
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(respuesta) {
      // Si está en caché la devolvemos, si no la buscamos en internet
      return respuesta || fetch(event.request);
    })
  );
});

// Cuando hay una versión nueva, limpiamos el caché viejo
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(nombres) {
      return Promise.all(
        nombres.filter(function(nombre) {
          return nombre !== CACHE_NAME;
        }).map(function(nombre) {
          return caches.delete(nombre);
        })
      );
    })
  );
});
