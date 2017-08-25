/*service worker to allow page to work offline*/

/* For security reasons, a service worker can only control the pages that are in its same directory
or its subdirectories. This means that if you place the service worker file in a scripts directory
it will only be able to interact with pages in the scripts directory or below.*/


importScripts('js/cache-polyfill.js');

self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open('airhorner').then(cache => {
      return cache.addAll([
        './',
        './index.html?timestamp=${timeStamp}',
        './index.html',
        './js/jquery-3.1.1.js',
        './js/sicc-project.js',
        './js/libs/accordion-menu.js'
      ])
      .then(() => self.skipWaiting());
    })
  )
});


self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
