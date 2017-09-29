var arrDocNames = ['about', 'apresentacao_snc_ap', 'cer_migracao_sicc','chave_orcamental_por_ano', 'documentos_af_e_ar','gestao_exercicios', 'gestao_projetos','help','importacao_csvs','macro_tarefas','menus_draft','menus','mu_snc_ap','perguntas_frequentes','processos','reposicao_pagamentos_cobrancas','snc_ap_faqs'];
var arrDocs = []; // array

//load all markdown documents synchronously
function loadAllMdownDocs(){
  $.each(arrDocNames, function(i, name){
      $.get("./markdown/" + name +".md").done(
          function(content) {
            var doc = {name:"",content:""};
            doc.name = name;
            doc.content = content;
            arrDocs.push(doc);
          } //function
        ); //done
    } //function
  ); //each
}


function findInDocs(){

  $("#resultsList").html("");

  var str = $("#textToSearch")["0"].value;
  var regexp = new RegExp(str.toUpperCase(),"g");

    var match, arrMatches = [];
    var htmlTest = "<div id='resultsList'>";

    if(str.length > 5){

        $.each(arrDocs, function(i, d){
              while ((match = regexp.exec(d.content.toUpperCase())) != null) {
              var start = (match.index - 15), end = (match.index + 25);
              htmlTest = htmlTest + '<li><a onclick="loadMdDoc(\'' + d.name + '\', [\'btnMenu\'],\'\', event)">'+
                                          '\'...'+d.content.substring(start,end) +'...\' (ver documento: '+d.name+');'+'</a></li>';

                  //arrMatches.push(d.name + "|" + match.index);

              } //while
            } //each
        ); //each
      }
    htmlTest = htmlTest + "</div>";

  $("#btnSearch").after(htmlTest);

}/*kateryna*/


function startDictation() {

  if (window.hasOwnProperty('webkitSpeechRecognition')) {

    var recognition = new webkitSpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "pt-PT";
    recognition.start();

    recognition.onresult = function(e) {
      document.getElementById('textToSearch').value = e.results[0][0].transcript;
      recognition.stop();
      console.log("onresult:", e.results[0][0].transcript);
      document.getElementById('labnol').submit();
    };

    recognition.onerror = function(e) {
      recognition.stop();
    }

  }
}
