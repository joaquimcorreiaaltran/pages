function Kateryna(){

  var str = "cabimentos";
  var regexp = new RegExp(str.toUpperCase(),"g");
  var doc = {name:"",content:""}, // object with properties
      arrDocs = []; // array
  var htmlResults = "<div id='behindSearchMatches' class='active'><div id='searchMatches' class='search-matches active'>"+
                      "<h3>Resultados da pesquisa:</h3>"+
                      "<i onclick='loadContent()' title='Voltar à página inicial' class='fa fa-times fa-fw fa-2x' aria-hidden='true'></i>";

    //load all markdown documents synchronously
    var arrDocNames = ['about','cer_migracao_sicc','chave_orcamental_por_ano','menus','processos'];
    jQuery.ajaxSetup({async:false}); // to execute the .get requests synchronously

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

    jQuery.ajaxSetup({async:true});

    var match, arrMatches = [];

    $.each(arrDocs, function(i, d){
          while ((match = regexp.exec(d.content.toUpperCase())) != null) {

          var start = (match.index - 15), end = (match.index + 25);

          htmlResults = htmlResults + '<li><a onclick="loadMdDoc(\'' + d.name + '\', [\'btnMenu\'],\'\', event)">'+
                                      '\'...'+d.content.substring(start,end) +'...\' (ver documento: '+d.name+');'+'</a></li>';

              //arrMatches.push(d.name + "|" + match.index);

          } //while

        } //each
    ); //each

    htmlResults = htmlResults + "</div></div>";

    setTimeout(function () {
      $("#content").before(htmlResults);
    }, 100);



}/*kateryna*/
