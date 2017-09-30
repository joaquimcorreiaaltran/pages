var arrDocNames = ['about', 'apresentacao_snc_ap', 'cer_migracao_sicc','chave_orcamental_por_ano', 'documentos_af_e_ar','gestao_exercicios', 'gestao_projetos','help','importacao_csvs','macro_tarefas','menus_draft','menus','mu_snc_ap','perguntas_frequentes','processos','reposicao_pagamentos_cobrancas','snc_ap_faqs'];
var arrDocs = []; // array

//load all markdown documents synchronously
function loadAllMdownDocs(){
  $.each(arrDocNames, function(i, name){
      $.get("./markdown/" + name +".md").done(
          function(content) {
            var doc = {name:"",title:"",content:""};
            doc.name = name;
            doc.content = content;
            doc.content = doc.content.replace(/#/g,"");
            doc.content = doc.content.replace(/>/g,"");
            doc.content = doc.content.replace(/\r?\n|\r/g,"");
            doc.content = doc.content.replace("*","");
            doc.content = doc.content.replace("|","");
            doc.content = doc.content.replace("\t","");
            doc.content = doc.content.replace(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,"");
            doc.title = content.substring(content.indexOf("#",0)+2,content.indexOf("\n",0));
            doc.title = doc.title.trim();
            arrDocs.push(doc);
          } //function
        ); //done
    } //function
  ); //each
  console.log(arrDocs);
}

var mobileDeviceCheck = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

function findInDocs(){

  startLoader();

  $("#resultsList").remove();

  var str = $("#textToSearch")["0"].value, minLen;

  if (mobileDeviceCheck) {minLen=4;} //to reduce interface block
  else {minLen=2;}

    if(str.length >= minLen){
      var regexp = new RegExp(str.toUpperCase(),"g"),match, arrMatches = [],html_1, html_2="", html_final;

      $.each(arrDocs, function(i, d){
          while ((match = regexp.exec(d.content.toUpperCase())) != null) {

            var start = (match.index - 60), end = (match.index + 50);
            citation = "\"..." + d.content.substring(start,end) + "...\"";
            html_2 = html_2 + '<li title="Ver documento '+d.title+'" onclick="loadMdDoc(\'' + d.name +
                              '\', [\'btnMenu\'],\'\', event)"><span class="title">['+d.title+']</span><p><span class=' + 'citation' + '>'+
                              citation+'</span></p>'+
                              '</li>';

            arrMatches.push(d.name + "|" + match.index);
          } //while
        } //each
      ); //each
      //alert(html_2);

      html_1 = "<div id='resultsList'><h3>"+arrMatches.length+" resultados encontrados.</h3>";
      html_final = html_1 + html_2 + "</div>";

      //var regexp2 = new RegExp(str,"g")
      //html_2.replace(regexp2,"<span>" + str + "</span>");

      $("#searchDiv").after(html_final);

      //var citations = $("#resultsList li span.citation");

    //  console.log(citations);

    var spanMatch =  $("span");

      $.each($("#resultsList li span.citation"),function(i,val){
        var innerHTML = val.innerHTML;
        var index = innerHTML.toUpperCase().indexOf(str.toUpperCase());
        if ( index >= 0 )
        {
            innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+str.length) + "</span>" + innerHTML.substring(index + str.length);
            val.innerHTML = innerHTML;
        }
      });
    }
    stopLoader();
}/*kateryna*/


function startDictation() {

  if (window.hasOwnProperty('webkitSpeechRecognition') || window.hasOwnProperty('SpeechRecognition')) {

    if (window.hasOwnProperty('webkitSpeechRecognition')){var recognition = new webkitSpeechRecognition();}
    if (window.hasOwnProperty('SpeechRecognition')){var recognition = new SpeechRecognition();}

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "pt-PT";
    recognition.start();

    recognition.onresult = function(e) {
      document.getElementById('textToSearch').value = e.results[0][0].transcript;
      recognition.stop();
      $(".speech img").css({'background-color':'none'});
      findInDocs();
      //console.log("onresult:", e.results[0][0].transcript);
      //document.getElementById('labnol').submit();
    };

    recognition.onerror = function(e) {
      recognition.stop();
      $(".speech img").css({'background-color':'none'});
    }

    recognition.onstart = function() {
      $(".speech img").css({'background-color':'rgba(252,0,0,.4)'});
      $("#textToSearch").attr({'placeholder':'A escutar...'});
    }
    recognition.onend = function() {
      $(".speech img").css({'background-color':'rgba(252,0,0,0)'});
      $("#textToSearch").attr({'placeholder':'Texto a pesquisar...'});
    }

    }
}
