/*service worker to allow page to work offline*/

/* For security reasons, a service worker can only control the pages that are in its same directory
or its subdirectories. This means that if you place the service worker file in a scripts directory
it will only be able to interact with pages in the scripts directory or below.*/


importScripts('js/cache-polyfill.js');

self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open('spmssicc').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './js/libs/accordion-menu.js',
        './js/libs/jquery.zoom.js',
        './js/libs/jquery.zoom.min.js',
        './js/libs/showdown.js',
        './js/cache-polyfill.js',
        './js/highslide-with-gallery.js',
        './js/jquery-3.1.1.js',
        './js/jquery.timeago.js',
        './js/jquery.zoom.js',
        './js/sicc-project.js',
        './css/style.css',
        './css/font-awesome.css',
        './css/font-awesome.min.css',
        './html/about.html',
        './markdown/about.md',
        './img/',
        './img/logos/',
        './img/highslide/',
        './html/',
        './markdown/',
        './markdown/*',
        './markdown/*.html'
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
