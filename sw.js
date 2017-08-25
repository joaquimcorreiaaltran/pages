/*service worker to allow page to work offline*/

/* For security reasons, a service worker can only control the pages that are in its same directory
or its subdirectories. This means that if you place the service worker file in a scripts directory
it will only be able to interact with pages in the scripts directory or below.*/


importScripts('js/cache-polyfill.js');

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
