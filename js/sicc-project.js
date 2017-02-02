/*
Miscellaneous functions to use in SICC project (https://spmssicc.github.io/pages)
Feb-2017
*/
"use strict"; //Ajuda no debug

// functions

//load and convert Markdown to Html and show it
function convertMdToHtml(docName, elementId) {
    var request = new XMLHttpRequest();
    var msg_erro_1 = "<H2 style='text-align:center'>Não foi possível carregar o conteúdo :(";
    request.open('GET', '../markdown/' + docName + '.md', true);//Asynchronous request (true=asynchronous)
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var converter = new showdown.Converter(); //instancia
            var html_from_md = converter.makeHtml(request.responseText);
            $("#" + elementId).html(html_from_md); //converte markdown para html e coloca o html no elemento #documento
            zommClickImagem();
        } else if (request.readyState === XMLHttpRequest.DONE && request.status !== 200) {
            $("#" + elementId).html(msg_erro_1);
        }
    };/*function*/
    request.send();
}


//Preparar imagem para zoom ou para não zoom (mostra ou não mostra a lupa)
function zommClickImagem() {
    $('#documento img').each(function () {
        //var alt = $(this).attr("alt");
        //if(alt != "figAlteracaoSenha" && alt != "figLogin" && alt !="figLoginRecuperacao")
       $(this).wrap("<a class='imagem' href='" +$(this).attr("src") + "' onclick='return hs.expand(this)'></a>");
    });
}

function setAttribute(element_id, attr, attr_value) {
   document.getElementById(element_id).setAttribute(attr, attr_value);
}

function mostraElemento(elementId) {
    document.getElementById(elementId).style.display = 'block';
}
function ocultaElemento(elementId) {
   document.getElementById(elementId).style.display = 'none';
}

//Browser Zoom

var currFFZoom = 1;
var currIEZoom = 100;

function zoomInBrowser() {
    if (isFirefox) {
        var FFstep = 0.02;
        currFFZoom += FFstep;
        $('body').css('MozTransform', 'scale(' + currFFZoom + ')');
    } else {
        var IEstep = 2;
        currIEZoom += IEstep;
        $('body').css('zoom', ' ' + currIEZoom + '%');
    }
}

function zoomOutBrowser() {
    if (isFirefox) {
        var FFstep = 0.02;
        currFFZoom -= FFstep;
         $('body').css('MozTransform', 'scale(' + currFFZoom + ')');
    } else {
        var IEstep = 2;
        currIEZoom -= IEstep;
         $('body').css('zoom', ' ' + currIEZoom + '%');
    }
}

//verifica se um elemento html tem conteúdo
function isEmpty(el) {
    return !$.trim(el.html());
}
