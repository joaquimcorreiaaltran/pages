/*
Functions to use in SICC project (https://spmssicc.github.io/pages)
Author: SPMS, EPE
Feb-2017
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
function convertMdToHtml (elementId) {
   var request = new XMLHttpRequest();
   //Asynchronous request (true=asynchronous)
   request.open('GET', '../markdown/'+ doc_name +'.md',true);
   request.onreadystatechange = function() {
         if(request.readyState == XMLHttpRequest.DONE && request.status === 200) {
            var converter = new showdown.Converter() //instancia
            ,text = request.responseText //guarda o documento em string
            ,htmlDoc = converter.makeHtml(text); //converte a string em HTML
                document.getElementById(elementId).innerHTML = htmlDoc;//carrega html no elementId
                zommClickImagem();
         }
      }
   request.send();
}

//Carrega footer
function loadFooter () {
  $("footer").load("footer.html");
}

//Adiciona botões ao doc e atribui-lhes o link
function loadDocButtons () {
  $.get("doc_buttons.html", function (data) {

             $("#content").append(data);

             $("#btnEditarDoc").click(function(){
               window.open("https://github.com/SPMSSICC/pages/edit/master/markdown/"+doc_name+".md","_blank");
             });

             $("#btnPDF").click(function(){
               window.open("https://spmssicc.github.io/pages/pdf/"+doc_name+".pdf","_blank");
             });

             $("#btnBackToTop").click(function(){
               $('html, body').animate({ scrollTop: 0 }, 'slow');
             });

             $("#btnShowToc").click(function(){
               showToc();
             });
             $("#btnShowToc i").click(function(){
               showToc();
             });
             toc("tocDropdown");


              //Mostra ou oculta o botão para voltar ao topo da página
              $(window).scroll(function() {
                if ($(this).scrollTop() > 2000) {
                  //add effect / animation
                  $('.showWithScroll').stop(true).animate({
                     opacity: 1
                  }, 500);
                } else {
                  if ($(this).scrollTop() < 1000) {
                    $('.showWithScroll').stop(true).animate({
                       opacity: 0
                    }, 500);
                  }
                }
              });
         });
}//fecha loadDocButtons()

// Preparar imagem para zoom ou para não zoom (mostra ou não mostra a lupa)
function zommClickImagem() {
      var show = true;
    $('#documento p img').each(function() {
      var alt = $(this).attr("alt")
      //if(alt != "figAlteracaoSenha" && alt != "figLogin" && alt !="figLoginRecuperacao")
      $(this).wrap("<a class='imagem' href='"+$(this).attr( "src" ) + "' onclick='return hs.expand(this)'></a>");
});
}


//Carrega o histórico do repo github
function loadCommitHistory() {
  if (doc_name == "changelog"){
      var branch, callback, container, limit, repo, url, username;
      username = "SPMSSICC";
      repo = "pages";

      container = $('#latest-commits');
      callback = function(response, textStatus, jqXHR) {
                    var index, items, result, ul, _results;

                    var rate_limit = response.meta["X-RateLimit-Limit"];//p/ saber quantas consultas é que o gitHub permite
                    var rate_limit_remaining = response.meta["X-RateLimit-Remaining"];//p/ saber quantas consultas é que o gitHub ainda permite
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
                    }/*if*/else if (rate_limit_remaining == 0) {
                      //mostra se o limite de visualizações no github foi atingido
                       return ul.append("<b>Atenção: </b> Não foi possível mostrar as atualizações devido a sobrecarga de pedidos (>" + rate_limit + "/hr), realizados pelo seu atual IP. Pode utilizar outro IP ou voltar a tentar depois das " + time_to_reset + ":59s de hoje. <br /><br />Mensagem do servidor: \"<i>"+ response.data.message +"</i>\"");
                     }else{
                       return ul.append("Ops! :( <br /><br /> Ocorreu algo inesperado.")
                     }
                    return _results;
                  };/*function*/

      return $.ajax({ url: "https://api.github.com/repos/"+username+"/"+repo+"/commits?callback=callback&callback=jQuery171010727564072631068_1487000384850&per_page=10&_=1487000384930",
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
TOC - Builds the table of contents after the conversion of markdown to HTML
*/
function toc(elementToPopulate){

  console.log("Entrou na toc(). elementToPopulate = "+elementToPopulate);

  var toc_html =
      "<nav role='navigation' class='table-of-contents'>" +
		    "<h1>Índice</h1>" +
		    "<ul>";

		var newLine, el, title, link;

    //insert here the HTML elements to include in the Table of Content
		$("article h2,h3,h4").each(function() {

		  el = $(this);
		  link = "#" + el.attr("id");
      title = el.text();
      nodeName = el.get(0).nodeName.toLowerCase();

      newLine = "<li>" +
                  "<a class='toc_"+nodeName+"' href='" + link + "'>"  + title + "</a>" +
                "</li>";
      //console.log(newLine);

      toc_html += newLine;
		});

		toc_html +=
		   "</ul>" +
		  "</nav>";

    //$(".dropdown-content").prepend(toc_html);
    console.log(toc_html);
    document.getElementById(elementToPopulate).innerHTML = toc_html;

}


/* toc dropdown:*/
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showToc() {
    document.getElementById("tocDropdown").classList.toggle("show");
};

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
