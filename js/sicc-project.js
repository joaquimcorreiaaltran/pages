/*
Functions to use in SICC project (https://spmssicc.github.io/pages)
Author: SPMS, EPE
Feb-2017
*/


// functions

//load and convert Markdown to Html and show it
function convertMdToHtml(docName, elementId) {
   var request = new XMLHttpRequest();
   //Asynchronous request (true=asynchronous)
   request.open('GET', '../markdown/'+ docName +'.md',true);
   request.onreadystatechange = function() {
                                       if(request.readyState == XMLHttpRequest.DONE && request.status === 200) {
                                          var converter = new showdown.Converter() //instancia
                                          ,text = request.responseText //guarda o documento em string
                                          ,htmlDoc = converter.makeHtml(text); //converte a string em HTML
                                          $(function(){
                                              document.getElementById(elementId).innerHTML = htmlDoc//carrega html no elementId
                                              zommClickImagem();
                                          });
                                       }/*if*/
                                    }/*function*/
   request.send();
}


//Preparar imagem para zoom ou para não zoom (mostra ou não mostra a lupa)
function zommClickImagem() {
      var show = true;
    $('#documento p img').each(function() {
      var alt = $(this).attr("alt")
      //if(alt != "figAlteracaoSenha" && alt != "figLogin" && alt !="figLoginRecuperacao")
      $(this).wrap("<a class='imagem' href='"+$(this).attr( "src" ) + "' onclick='return hs.expand(this)'></a>");
});
}




/*
  Para
*/


function loadCommitHistory() {
  //get the current html document name
  var path = window.location.pathname;
  var page = path.split("/").pop();
  //remove .html or .htm extension(s)
  if(page.search(/.htm/i) != -1){
    docName = page.replace(/.html|htm/gi,"");
  }

  if (docName == "changelog"){
      var branch, callback, container, limit, repo, url, username;

      container = $('#latest-commits');
      callback = function(response) {
                    var index, items, result, ul, _results, username, repo;
                    username = "SPMSSICC";
                    repo = "pages";
                    items = response.data;
                    ul = $('#commit-history');
                    ul.empty();
                    _results = [];
                    for (index in items) {
                      result = items[index];
                      _results.push((function(index, result) {
                        if (result.author != null) {
                          return ul.append("<li>\n <div>\n\n </div>\n <div>\n Autor: <a href=\"https://github.com/" + result.author.login + "\"><b>" + result.author.login + "</b></a>\n <br />\n <b>Data: " + ($.timeago(result.commit.committer.date)) + "</b><br /><i>SHA: " + result.sha + "</i>\n <br />\n Descrição: <a href=\"https://github.com/" + username + "/" + repo + "/commit/" + result.sha + "\" target=\"_blank\">" + result.commit.message + "</a>\n  </div>\n</li><br />");
                        }
                        else {
                          return ul.append("<li>[erro] GitHub response: "+response+";\n\nGitHub result"+result+".</li>");
                        }
                      })(index, result));
                    }/*for*/
                    return _results;
                  };/*function*/

      url = "https://api.github.com/repos/"+username+"/"+repo+"/commits?callback=callback&callback=jQuery171010727564072631068_1487000384850&per_page=10&_=1487000384930";

      return $.ajax(url,
                    { data:{per_page: "10"},
                      dataType: "jsonp",
                      type: "GET",
                    }).done(function(response) {
                              return callback(response);
                            });
    }/*if(docName == "changelog")*/
}/*loadCommitHistory()*/
