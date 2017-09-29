var arrDocNames = ['about','cer_migracao_sicc','chave_orcamental_por_ano','menus','processos'];
var arrDocs = []; // array

//load all markdown documents synchronously
function loadAllMdownDocs(){
  $.each(arrDocNames, function(i, name){
      $.get("./markdown/" + name +".md").done(
          function(content) {
            var doc = {name:"",title:"",content:""};
            doc.name = name;
            doc.content = content;
            doc.title = content.substring(content.indexOf("#",0)+2,content.indexOf("\n",0));
            doc.title = doc.title.trim();
            arrDocs.push(doc);
          } //function
        ); //done
    } //function
  ); //each
  console.log(arrDocs);
}


function findInDocs(){

  $("#resultsList").remove();

  var str = $("#textToSearch")["0"].value;


    if(str.length > 1){
      var regexp = new RegExp(str.toUpperCase(),"g"),match, arrMatches = [],html_1, html_2="", html_final;

      $.each(arrDocs, function(i, d){
          while ((match = regexp.exec(d.content.toUpperCase())) != null) {

            var start = (match.index - 15), end = (match.index + 25);
            html_2 = html_2 + '<li onclick="loadMdDoc(\'' + d.name +
                              '\', [\'btnMenu\'],\'\', event)">['+d.title+']<i>'+
                              '\"...'+d.content.substring(start,end) +
                              '...\"'+'</i>'+
                              '</li>';

            arrMatches.push(d.name + "|" + match.index);

          } //while
        } //each
      ); //each
      //alert(html_2);

      html_1 = "<div id='resultsList'><h3>"+arrMatches.length+" resultados encontrados.</h3>";
      html_final = html_1 + html_2 + "</div>";

      $("#searchDiv").after(html_final);
      }



}/*kateryna*/


function startDictation() {

  $("#speech>img").css({'background-color':'red'});


  if (window.hasOwnProperty('webkitSpeechRecognition') || window.hasOwnProperty('SpeechRecognition')) {

    if(window.hasOwnProperty('webkitSpeechRecognition')){var recognition = new webkitSpeechRecognition();}
    if(window.hasOwnProperty('SpeechRecognition')){var recognition = new SpeechRecognition();}

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "pt-PT";
    recognition.start();

    recognition.onresult = function(e) {
      document.getElementById('textToSearch').value = e.results[0][0].transcript;
      recognition.stop();
      findInDocs();
      //console.log("onresult:", e.results[0][0].transcript);
      //document.getElementById('labnol').submit();
    };

    recognition.onerror = function(e) {
      recognition.stop();
    }

  }
}
