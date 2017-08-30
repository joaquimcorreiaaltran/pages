/*
Functions to use in SICC project (https://spmssicc.github.io/pages)
Author: SPMS, EPE
Project: SICC
Date: Aug-2017
*/

//get the current html document name without extension
doc_name = window.location.pathname.split("/").pop().replace(/.html|htm/gi,"");

//highslide-with-gallery configs
graphicsDir = '../img/highslide/graphics/';
fadeInOut = true;
align = 'center';
transitions = ['expand', 'crossfade'];
outlineType = 'rounded-white';//'rounded-white';'rounded-black'
numberPosition = 'caption';
dimmingOpacity = 0.5;
dimmingGeckoFix = true;
blockRightClick = true;

//load and convert Markdown to Html and show it
function convertMdToHtml (elementId, funcao) {
    $.get('../markdown/'+ doc_name +'.md', function (data) {
        var converter = new showdown.Converter(),  data, html = converter.makeHtml(data);
        $("#"+elementId).html(html);
        zommClickImagem();
        responsiveTable();
        if(funcao != undefined && typeof funcao == "function"){
          funcao();
        }
    });
}/*close convertMdToHtml()*/

//Load html to the end of the document
function loadFooter(page) {

  var fileDirectory = "footer.html";

  if(page == "index"){

    fileDirectory = "html/footer.html";

    $.get(fileDirectory, function (data) {
        while (data.indexOf("../img") != -1) {
            data = data.replace("../img","../pages/img");
        }
        $("footer").append(data);
    });
  }
  else{
    $.get(fileDirectory, function (data) {
      $("footer").append(data);
    });
  }


}

//Adds auxilary buttons to the interface
function loadDocButtons (funcao, btnsToHide, page) {

  var fileDirectory = "doc_buttons.html";
  var path = window.location.pathname;

  if( page == "index" ){
    fileDirectory = "html/doc_buttons.html";
  }

  $.get(fileDirectory, function (data) {

        $("#docButtons").html(data);

        $("#btnMenu").click(function(){
            showMenu();
        });

        if( page != "index" ){

           $("#btnEditarDoc").click(function(){
             window.open("https://github.com/SPMSSICC/pages/edit/master/markdown/"+doc_name+".md","_blank");
           });

           /*btnPDF*/
           if(doc_name == "snc_ap_circular_dgo_1381"){
             $("#btnPDF").click(function(){window.open("http://www.dgo.pt/instrucoes/Instrucoes/2016/ca1381.pdf","_blank")});
           }
           else if(doc_name == "snc_ap_circular_dgo_1382"){
             $("#btnPDF").click(function(){window.open("http://www.dgo.pt/instrucoes/Instrucoes/2016/ca1382.pdf","_blank")});
           }
           else if(doc_name == "snc_ap_decreto_lei_85_2016"){
             $("#btnPDF").click(function(){window.open("https://dre.pt/application/conteudo/105583346","_blank")});
           }
           else if(doc_name == "snc_ap_decreto_lei_192_2015"){
             $("#btnPDF").click(function(){window.open("https://dre.pt/application/conteudo/70262478","_blank")});
           }
           else if(doc_name == "snc_ap_apresentacao"){
             $("#btnPDF").click(function(){window.open("https://view.officeapps.live.com/op/embed.aspx?src=https://spmssicc.github.io/pages/pptx/SPMS_SICC_SNC_AP_20160606_04-pics.pptx","_blank")});
           }
           else{
             $("#btnPDF").click(function(){window.open("https://spmssicc.github.io/pages/pdf/"+doc_name+".pdf","_blank");});
           }

           $("#btnShowToc").click(function(){
             showToc();
           });

          if(funcao != undefined && typeof funcao == "function"){
            funcao();
          }
        }/*if != index*/

        removeElements(btnsToHide);

     });

}//close loadDocButtons()

function removeElements(elements){
    for(i=0; i < elements.length; i++){
      $("#"+elements[i]).remove();
    }
}



// Add zoom functionality to images in the HTML
function zommClickImagem() {

    var show = true;

    $('#documento img').each(function() {
      var alt = $(this).attr("alt")
      $(this).wrap("<a class='imagem' href='"+$(this).attr( "src" ) + "' onclick='return hs.expand(this)'></a>");
    });
}/*close zommClickImagem*/

/* Add auto scroll to document tables */
function responsiveTable(){
    $('#documento table').each(function() {
        $(this).wrap("<div style='overflow-x:auto;'></div>");
      });
}/*close responsiveTable()*/

//Loads the gitHub repository and insert insert into the HTML
function loadCommitHistory() {
  if (doc_name == "changelog"){
      var branch, callback, container, limit, repo, url, username;
      username = "SPMSSICC";
      repo = "pages";

      container = $('#latest-commits');
      callback = function(response, textStatus, jqXHR) {
                    var index, items, result, ul, _results;
                    // Request limit to the gitHub API per hour
                    var rate_limit = response.meta["X-RateLimit-Limit"];
                    // Requests left to the gitHub API in the current hour
                    var rate_limit_remaining = response.meta["X-RateLimit-Remaining"];
                    var timestamp = Math.abs(new Date() - response.meta["X-RateLimit-Reset"] - new Date());
                    var time_to_reset = new Date(timestamp*1000);
                    time_to_reset =  time_to_reset.getHours()+":"+time_to_reset.getMinutes();

                    items = response.data;
                    ul = $('#commit-history');
                    ul.empty();
                    _results = [];

                    if (rate_limit_remaining > 0) {
                      for (index in items) {
                        result = items[index];
                        _results.push((function(index, result) {
                          if (result.author != null) {
                            return ul.append("<li>\n\n <div>\n\n </div>\n <div>\n <b>" + ($.timeago(result.commit.committer.date)) + "</b>: <i>\"" + result.commit.message + "\" </i>(<a href=\"https://github.com/" + username + "/" + repo + "/commit/" + result.sha + "\" target=\"_blank\">ver alterações</a>).<br />\n  </div>\nAutor: <a href=\"https://github.com/" + result.author.login + "\"><b>" + result.author.login + "</b></a>.</li><br />");
                          }
                        })(index, result));
                      }
                      //Show an UI message if the request limit to the API was reached
                    }else if (rate_limit_remaining == 0) {
                       return ul.append("<b>Atenção: </b> Não foi possível mostrar as atualizações devido a sobrecarga de pedidos (>" + rate_limit + "/hr), realizados pelo seu atual IP. Pode utilizar outro IP ou voltar a tentar depois das " + time_to_reset + ":59s de hoje. <br /><br />Mensagem do servidor: \"<i>"+ response.data.message +"</i>\"");
                     }else{
                       return ul.append("Ops! :( <br /><br /> Ocorreu algo inesperado.")
                     }
                    return _results;
                  };/*callback function*/

      return $.ajax({ url: "https://api.github.com/repos/" + username + "/" + repo + "/commits?callback=callback&callback=jQuery171010727564072631068_1487000384850&per_page=10&_=1487000384930",
                      data:{per_page: "20"},
                      dataType: "jsonp",
                      type: "GET",
                    })
                    .done(function(response, textStatus, jqXHR) {
                      return callback(response, textStatus, jqXHR);
                    });
    }/*if(doc_name == "changelog")*/
}/*loadCommitHistory()*/


/*
TOC - Builds the table of contents based on HTML elements choosen and insert the TOC in th "elementToPopulate"
*/
function loadToc(elementToPopulate){

  elementToPopulate = "#"+elementToPopulate;

  if ($(elementToPopulate)){

    var toc_html =
        "<div><h2>Índice</h2></div><nav role='navigation' class='table-of-contents'>" +
  		    /*"<h2>Índice</h2>" +*/
  		    "<ul>";

  		var newLine, el, title, link;

      //chose the HTML elements to include in the Table of Content
  		$("article h2,h3,h4").each(function() {

  		  el = $(this);
  		  link = "#" + el.attr("id");
        title = el.text();
        nodeName = el.get(0).nodeName.toLowerCase();

        newLine = "<li>" +
                    "<a class='toc_"+nodeName+"' href='" + link + "'>"  + title + "</a>" +
                  "</li>";

        toc_html += newLine;
  		});

  		toc_html +=  "</ul>" + "</nav>";

      $(elementToPopulate).html(toc_html);
      showToc();
      /*Dependency: jquery-ui.js*/
      $("#tocDropdown").draggable({ /*containment: "body",*/snap: "#docButtons, #content", cursor: "move", cursorAt: { top: 30, left: 30 } });
      /*$("#tocDropdown").resizable();
      $(".dropdown-content").resizable();
      $("#table-of-contents").resizable();*/
  }/*if*/
  else {
    console.log("Não foi possível criar o índice porque o elemento \"" + elementToPopulate + "\" não existe no HTML!");
  }
}/*builds toc*/

function showToc() {
    $(".dropdown-content").toggleClass("show");
    $("#btnShowToc").toggleClass("show");
};

function showMenu(){
  $("#accordion").toggleClass("showMenu");
  $("#btnMenu").toggleClass("showMenu");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn, #tocDropdown *, #btnMenu, #btnMenu i, #btnMenu a') && $("#btnMenu.show").hasClass("show")) {
    showToc();
  }
} /*close showToc()*/

/*********************************************************************
override standard href-id navigation on page without change HTML markup
for smooth scrolling
*********************************************************************/

// handle links with @href started with '#' only
$(document).on('click', 'a[href^="#"]', function(e) {

    // target element id
    var id = $(this).attr('href');

    // target element
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // top position relative to the document
    var pos = $id.offset().top - 55;

    // animated top scrolling
    $('body, html').animate({scrollTop: pos});
});


/*to add support for IE to endsWith()*/
String.prototype.endsWith = function(pattern) {
  var d = this.length - pattern.length;
  return d >= 0 && this.lastIndexOf(pattern) === d;
};
