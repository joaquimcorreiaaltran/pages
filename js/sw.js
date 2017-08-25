/*service worker to allow page to work offline*/

importScripts('./js/cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('spmssicc').then(function(cache) {
      return cache.addAll([
          '/',
          '/index.html',
          '/js/jquery-3.1.1.js',
          '/js/sicc-project.js',
          '/js/libs/accordion-menu.js',
          '/sounds/airhorn.mp3'
          ]);
      })
  );
});


self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
});
