/*service worker to allow page to work offline*/

/* For security reasons, a service worker can only control the pages that are in its same directory
or its subdirectories. This means that if you place the service worker file in a scripts directory
it will only be able to interact with pages in the scripts directory or below.*/

importScripts('/pages/js/cache-polyfill.js');

var cacheName = 'spmssicc_' + Date.now();
var cacheFiles = [
    '/pages/',
    '/pages/index.html',
    '/pages/css/style.css',
    '/pages/css/font-awesome.css',
    '/pages/css/font-awesome.min.css',
    '/pages/fonts/fontawesome-webfont.eot',
    '/pages/fonts/fontawesome-webfont.woff2?v=4.7.0',

    '/pages/html/about.html',
    '/pages/html/amenu-source.html',
    '/pages/html/footer.html',
    '/pages/html/cer_migracao_sicc.html',
    '/pages/html/changelog.html',
    '/pages/html/chave_orcamental_por_ano.html',
    '/pages/html/doc_buttons.html',
    '/pages/html/documentos_af_e_ar.html',
    '/pages/html/gestao_exercicios.html',
    '/pages/html/gestao_projetos.html',
    '/pages/html/help.html',
    '/pages/html/importacao_csvs.html',
    '/pages/html/macro_tarefas.html',
    '/pages/html/menus.html',
    '/pages/html/mu_snc_ap.html',
    '/pages/html/processos.html',
    '/pages/html/reposicao_pagamentos_cobrancas.html',
    '/pages/html/snc_ap_apresentacao.html',
    '/pages/html/snc_ap_circular_dgo_1381.html',
    '/pages/html/snc_ap_circular_dgo_1382.html',
    '/pages/html/snc_ap_decreto_lei_85_2016.html',
    '/pages/html/snc_ap_decreto_lei_192_2015.html',
    '/pages/html/snc_ap_faqs.html',
    '/pages/html/snc_ap_questionario.html',

    '/pages/img/logos/SICC_logo_300x148.png',
    '/pages/img/logos/SPMS2016B_300x148.png',
    '/pages/img/logos/republica_portuguesa_300x148.png',
    '/pages/img/logos/imagem_background.png',
    '/pages/js/libs/accordion-menu.js',
    '/pages/js/libs/jquery.zoom.js',
    '/pages/js/libs/jquery.zoom.min.js',
    '/pages/js/libs/showdown.js',
    '/pages/js/cache-polyfill.js',
    '/pages/js/highslide-with-gallery.js',
    '/pages/js/jquery-3.1.1.js',
    '/pages/js/jquery.timeago.js',
    '/pages/js/jquery.zoom.js',
    '/pages/js/sicc-project.js',

    '/pages/markdown/about.md',
    '/pages/markdown/cer_migracao_sicc.md',
    '/pages/markdown/chave_orcamental_por_ano.md',
    '/pages/markdown/documentos_af_e_ar.md',
    '/pages/markdown/gestao_exercicios.md',
    '/pages/markdown/gestao_projetos.md',
    '/pages/markdown/help.md',
    '/pages/markdown/importacao_csvs.md',
    '/pages/markdown/macro_tarefas.md',
    '/pages/markdown/menus.md',
    '/pages/markdown/mu_snc_ap.md',
    '/pages/markdown/processos.md',
    '/pages/markdown/reposicao_pagamentos_cobrancas.md',
    '/pages/markdown/snc_ap_faqs.md',

    '/pages/pdf/about.pdf',
    '/pages/pdf/chave_orcamental_por_ano.pdf',
    '/pages/pdf/documentos_af_e_ar.pdf',
    '/pages/pdf/gestao_exercicios.pdf',
    '/pages/pdf/gestao_projetos.pdf',
    '/pages/pdf/help.pdf',
    '/pages/pdf/importacao_csvs.pdf',
    '/pages/pdf/macro_tarefas.pdf',
    '/pages/pdf/menus.pdf',
    '/pages/pdf/processos.pdf',
    '/pages/pdf/reposicao_pagamentos_cobrancas.pdf',
    '/pages/pdf/snc_ap_faqs.pdf',

    '/pages/pptx/SPMS_SICC_SNC_AP_20160606_04-pics.pptx'
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
