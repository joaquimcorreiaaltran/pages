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
        './css/style.css',
        './css/font-awesome.css',
        './css/font-awesome.min.css',
        './fonts/fontawesome-webfont.eot',
        './fonts/fontawesome-webfont.woff2?v=4.7.0',
        './html/about.html',
        './html/amenu-source.html',
        './html/footer.html',
        './html/cer_migracao_sicc.html',
        './html/changelog.html',
        './html/chave_orcamental_por_ano.html',
        './html/doc_buttons.html',
        './html/documentos_af_e_ar.html)',
        './html/gestao_exercicios.html)',
        './html/gestao_projetos.html)',
        './img/logos/SICC_logo_300x148.png',
        './img/logos/SPMS2016B_300x148.png',
        './img/logos/republica_portuguesa_300x148.png',
        './img/logos/imagem_background.png'
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
        './markdown/about.md',
        './markdown/cer_migracao_sicc.md)',
        './markdown/chave_orcamental_por_ano.md)',
        './markdown/documentos_af_e_ar.md)',
        './markdown/gestao_exercicios.md)',
        './markdown/gestao_projetos.md)',
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
