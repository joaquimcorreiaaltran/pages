/*service worker to allow page to work offline*/

/* For security reasons, a service worker can only control the pages that are in its same directory
or its subdirectories. This means that if you place the service worker file in a scripts directory
it will only be able to interact with pages in the scripts directory or below.*/

importScripts('../pages/js/cache-polyfill.js');

var cacheName = 'spmssicc_' + Date.now();
var cacheFiles = [
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
    './html/documentos_af_e_ar.html',
    './html/gestao_exercicios.html',
    './html/gestao_projetos.html',
    './html/help.html',
    './html/importacao_csvs.html',
    './html/macro_tarefas.html',
    './html/menus.html',
    './html/mu_snc_ap.html',
    './html/processos.html',
    './html/reposicao_pagamentos_cobrancas.html',
    './html/snc_ap_apresentacao.html',
    './html/snc_ap_circular_dgo_1381.html',
    './html/snc_ap_circular_dgo_1382.html',
    './html/snc_ap_decreto_lei_85_2016.html',
    './html/snc_ap_decreto_lei_192_2015.html',
    './html/snc_ap_faqs.html',
    './html/snc_ap_questionario.html',

    './img/logos/SICC_logo_300x148.png',
    './img/logos/SPMS2016B_300x148.png',
    './img/logos/republica_portuguesa_300x148.png',
    './img/logos/imagem_background.png',
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
    './markdown/cer_migracao_sicc.md',
    './markdown/chave_orcamental_por_ano.md',
    './markdown/documentos_af_e_ar.md',
    './markdown/gestao_exercicios.md',
    './markdown/gestao_projetos.md',
    './markdown/help.md',
    './markdown/importacao_csvs.md',
    './markdown/macro_tarefas.md',
    './markdown/menus.md',
    './markdown/mu_snc_ap.md',
    './markdown/processos.md',
    './markdown/reposicao_pagamentos_cobrancas.md',
    './markdown/snc_ap_faqs.md',

    './pdf/about.pdf',
    './pdf/chave_orcamental_por_ano.pdf',
    './pdf/documentos_af_e_ar.pdf',
    './pdf/gestao_exercicios.pdf',
    './pdf/gestao_projetos.pdf',
    './pdf/help.pdf',
    './pdf/importacao_csvs.pdf',
    './pdf/macro_tarefas.pdf',
    './pdf/menus.pdf',
    './pdf/processos.pdf',
    './pdf/reposicao_pagamentos_cobrancas.pdf',
    './pdf/snc_ap_faqs.pdf',

    './pptx/SPMS_SICC_SNC_AP_20160606_04-pics.pptx'
];


self.addEventListener('install', e => {
  console.log("[ServiceWorker] Installed");

  e.waitUntil(

    caches.open(cacheName).then(cache => {

      console.log("[ServiceWorker] Caching cacheFiles");
      return cache.addAll(cacheFiles)
      .then(() => self.skipWaiting());

    })
  )
});


self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});


self.addEventListener('fetch', event => {
  console.log("[ServiceWorker] Fetching", event.request.url);
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
