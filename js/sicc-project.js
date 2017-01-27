/*
Miscellaneous functions to use in SICC project (https://spmssicc.github.io/pages)
Author: SPMS, EPE
Feb-2017
*/


<!-- functions -->

//load and convert Markdown to Html and show it
function convertMdToHtml(docName,elementId){
   var request = new XMLHttpRequest();
   //Asynchronous request (true=asynchronous)
   request.open('GET', '../markdown/'+docName+'.md',true);
   request.onreadystatechange = function() {
                                       if(request.readyState == XMLHttpRequest.DONE && request.status === 200) {
                                          var converter = new showdown.Converter() //instancia
                                          ,text = request.responseText //guarda o documento em string
                                          ,htmlDoc = converter.makeHtml(text); //converte a string em HTML
                                          document.getElementById(elementId).innerHTML = htmlDoc;//coloca o html no elemento #documento
                                       }/*if*/
                                    }/*function*/
   request.send();
}


/**preparar imagem para zoom ou para não zoom (mostra ou não mostra a lupa)*/
function zommClickImagem() {
    $('#documento img').each(function(){
      var alt = $(this).attr("alt")
      //if(alt != "figAlteracaoSenha" && alt != "figLogin" && alt !="figLoginRecuperacao")
      $(this).wrap("<a class='imagem' href='"+$(this).attr( "src" ) + "' onclick='return hs.expand(this)'></a>");
});
}


function setAttribute(element_id,attr,attr_value){
   document.getElementById(element_id).setAttribute(attr, attr_value);
}



function mostraElemento(elementId) {
    document.getElementById(elementId).style.display = 'block';
}
function ocultaElemento(elementId) {
 document.getElementById(elementId).style.display = 'none';
}
