/***************************************************************************
Functions to use in SICC project (https://spmssicc.github.io/pages)
Author: SPMS, EPE
Project: SICC
Date: Sep-2017
****************************************************************************/

//get the current html document name without extension
//doc_name = window.location.pathname.split("/").pop().replace(/.html|htm/gi, "");

//highslide-with-gallery configs
graphicsDir = './img/highslide/graphics/';
fadeInOut = true;
align = 'center';
transitions = ['expand', 'crossfade'];
outlineType = 'rounded-white'; //'rounded-white';'rounded-black'
numberPosition = 'caption';
dimmingOpacity = 0.5;
dimmingGeckoFix = true;
blockRightClick = true;

var uAgent = window.navigator.userAgent.toUpperCase()
  , mobileDeviceCheck = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))
  , arrDocs = []
  , reformatedArrDocs = []
  , arrDocNames = [ 'about','apresentacao_snc_ap','cer_migracao_sicc','chave_orcamental_por_ano','circ1381','circ1382','dec_lei85','dec_lei192','documentos_af_e_ar','gestao_exercicios','gestao_projetos','help','importacao_csvs','macro_tarefas','menus_draft','menus','mu_snc_ap','perguntas_frequentes','processos','reposicao_pagamentos_cobrancas','snc_ap_faqs']
  , lastSearchStr = "";
/*Carregar documento através de parametros no URL (queryString)*/
function loadFirstContent(){

	var qs = window.location.search; //Get QueryString
	//  qs = "?doc=documentos_af_e_ar&anchor=3-criação-de-novo-tipo-de-documento-–-anulação-de-receita-ar";

	if ( qs.length ){
		var doc, anchor, paramArr = qs.split("&",100); // Returns paramArr passed of the query string. splits until the max of 10 paramArr

		if (paramArr.length >= 2) {
			doc = paramArr[0].substring(paramArr[0].indexOf("=") + 1, 99); // Returns doc name
			anchor = decodeURI( paramArr[1].substring(paramArr[1].indexOf("=") + 1, 99) );
		}
		else{
			doc = qs.substring(qs.indexOf("=")+1,qs.length);
		}
		loadAllMdownDocs(doc, anchor);
	}/*close if*/
	else{
		console.log("[loadFirstContent] Querystring not detected/not valid.");
		loadIndexContent(["btnMenu"], null);
		loadAllMdownDocs(doc, anchor);
	}
	stopLoader("[loadFirstContent-1]");
}

//load all markdown documents
function loadAllMdownDocs(doc, anchor){

		var promises = [];

		$.each(arrDocNames, function(i, name){
			promises.push(
				new Promise(function (resolve, reject) {
						 $.get("./markdown/" + name + ".md")
							 .done(function (value) {resolve({value:value, name:name})})
							 .fail(function () {reject("The document loading failed. Check the elements in the array arrDocNames[]")});
				 }
			));
			} //function
		); //each

		Promise.all(promises).then(function (array) {
			arrDocs = array.map(function (item) {
				return {
					name: item.name,
					title: item.value.substring(item.value.indexOf("#",0)+2,item.value.indexOf("\n",0)).trim(),
					content: item.value
				}
			});
			if(doc != null) loadMdDoc(doc, ['btnMenu','btnEditarDoc','btnToc','btnOpt'], anchor, null);

      // array to be used in the find functionality
      reformatedArrDocs = arrDocs.map(
        function(doc){
          var rDoc = {name:"",content:"",title:""};
          rDoc.name = doc.name;
          rDoc.title = doc.title;
          // removes some markdown and HTML sintax
          rDoc.content = doc.content.replace(/!\[(.*?)\)|(#{1,} )|(\*{2})|(\_{2})|(\|:-*)\||(:-{2,})|(<div .*>)|(<\/div>)|(<iframe .*>)|(<\/iframe>)|(<button .*>)|(<\/button>)/g,'');
          return rDoc;
        }
      );

		})
} //function

function loadIndexContent(btnsToShow, event) {

	startLoader();

	$("#fileHistory, #behindFileHistory").remove();
	$("body").attr("style", "margin:0 0 0 0;  width:100%;");
	$("#content").attr("style", "min-height: 90vh; margin: 0 0 0 0; padding:1em 1em 1em 1em; widht: 100%; max-width:5000px;");

	var filePath ='./html/index_content.html';

	$.get(filePath, function() {
		//console.log("[loadIndexContent] Loaded requested file");
	})
	.done(function(data){
			$("#content").html(data);
			showElements(btnsToShow);
			$("footer").removeClass("documentMode");
			highlightMenuItem(event);
      if (!window.hasOwnProperty('webkitSpeechRecognition') && !window.hasOwnProperty('SpeechRecognition')){
					console.log("Browser doesn't support speech recognition");
					$("#mic").remove();
          $("#textToSearch").css({'width': 'calc(80% - 30px)'});
			}
			setTimeout(function(){stopLoader("[loadIndexContent_1]");},800);
			$("#docOptions").removeClass("active");
	})
	.fail(function(){
			console.log("[loadIndexContent] Error on loading requested file: " + filePath);
			stopLoader("[loadIndexContent_2]");
	})
	.always(function(){
			window.scrollTo(0,0);
			$('#docOptions').removeClass('active');
			var stateObj = { foo: 'bar' };
			history.replaceState(stateObj, "SICC Documentação - página inicial", location.href.split("?")[0]);
	});
}

function loadMdDoc(mdFile, btnsToShow, anchor, event) {

	startLoader();

	if( mdFile != null && mdFile != undefined ){

  	$.each(arrDocs, function(i, doc){
  		if(mdFile == doc.name && doc.content.length){

        highlightMenuItem(event);
        window.scrollTo(0,0);
        if($('#fileHistory').length) {$('#fileHistory').remove();}

        //if the HTML element "#documento" doesn't exist, then create it inside the "documento" element
        if($('#documento').length < 1){
            $('body, #content').removeAttr('style'); 																 //adjust html style and structure
            $('#content').html("<article id='documento' class='modulo'></article>"); //adjust html style and structure
            $('footer').addClass('documentMode'); 																	 //adjust html style and structure
        }

  			var converter = new showdown.Converter(),	data2, html = converter.makeHtml(doc.content); //declara 3 variáveis: converter, data e a html. A variável html irá conter o ficheiro markdown convertido em HTML.
        $('#documento').html(html);//Place the converted markdown into the page

        responsiveTables($(html).filter('table'));
        loadToc($(html).filter('h2,h3,h4'), $('#tocDropdown'));
        toggle('toc',true); // hide table-of-contents
        addSharelinks(doc.name, doc.title);
        imageZoom();
        showElements(btnsToShow);

        $("#btnEditarDoc, #btnHistory" ).off("click");
        $("#btnEditarDoc").click(function() {window.open("https://github.com/SPMSSICC/pages/edit/master/markdown/" + doc.name + ".md", "_blank");});
        $("#btnHistory").click(function() {loadFileHistory(doc.name, event);});

        if (doc.name == "apresentacao_snc_ap") {$("#btnPDF").attr({"onclick":"window.open('https://view.officeapps.live.com/op/embed.aspx?src=https://spmssicc.github.io/pages/pptx/SPMS_SICC_SNC_AP_20160606_04-pics.pptx','_blank')"});}
        else if (doc.name == "circ1381") {$("#btnPDF").attr({"onclick":"window.open('http://www.dgo.pt/instrucoes/Instrucoes/2016/ca1381.pdf','_blank')"});}
        else if (doc.name == "circ1382") {$("#btnPDF").attr({"onclick":"window.open('http://www.dgo.pt/instrucoes/Instrucoes/2016/ca1382.pdf','_blank')"});}
        else if (doc.name == "dec_lei192") {$("#btnPDF").attr({"onclick":"window.open('https://dre.pt/application/conteudo/70262478','_blank')"});}
        else if (doc.name == "dec_lei85") {$("#btnPDF").attr({"onclick":"window.open('https://dre.pt/application/conteudo/105583346','_blank')"});}
        else {$("#btnPDF").attr({"onclick":"window.open('https://spmssicc.github.io/pages/pdf/" + doc.name + ".pdf','_blank')"});}

        enableDocOptions();
        disableDocOptions(doc.name);

        if(anchor != undefined && anchor.length >= 2){
          setTimeout( function(){ scrollToAnchor(doc.name, anchor); }, 2500);
        }
        else{
          var stateObj = { foo: "bar" }, url =  location.protocol + '//' + location.host + location.pathname + "?doc=" + doc.name;
          history.pushState(stateObj, "SICC - Documentação", url);
        }

  			return false; //to stop the .each loop

  	  }else if ( i + 1  >= arrDocs.length){
  			console.log("[convertMdToHtml] Error on loading the file \"" + mdFile + "\". Check if it exists in the markdown folder and in the arrayDoc.");
  			loadIndexContent(['btnMenu'],null);
  			return false; //to stop the .each loop
  		}else if(mdFile == doc.name && doc.content.length <= 0){
  			console.log("[convertMdToHtml] Error on loading file contents. The file \"" + mdFile + "\" exists but has no content.");
  			loadIndexContent(['btnMenu'],null);
  			return false; //to stop the .each loop
  		}else{
  			return true; //to continue the .each loop
  		}
  	});
	}
	stopLoader("[loadMdDoc_1]");
}

//to know the type of a variable
function varType( obj ) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function scrollToAnchor(mdFile, anchor){//the anchor parameter can not have the character "#"
	startLoader();
	var anchorId;

	if(anchor.length > 1 && anchor != undefined){
		anchorId = '#' + anchor;
	}

	try { $(anchorId); }
  catch(e) {
		console.log('[scrollToAnchor] URL anchor parameter is invalid: ' + anchorId);
		anchorId = '';
		stopLoader("[scrollToAnchor]");
		return;
	}

	if ($(anchorId).length) {
		var pos = $(anchorId).offset().top - 250;// get top position relative to the document //- 250 to compensate the doc bar
		$('body, html').animate({scrollTop: pos});// set animated top scrolling to the anchorId
		var stateObj = { foo: "bar" }, url = location.protocol + '//' + location.host + location.pathname + "?doc=" + mdFile + "&anchor=" + anchor; //the anchor parameter can not have the character "#"
		history.pushState(stateObj, "SICC - Documentação", url);
		anchor = ""; // clear the anchor
		}
		else{
			window.scrollTo(0,0);// top scrolling
		}
	stopLoader("[scrollToAnchor]");
}

function startLoader(){
	$('#loader').addClass('active');
	$('*').css('cursor','progress');
}

function stopLoader(origin){
	$('#loader').removeClass('active');
	$('*').css('cursor','');
}

function toggle(op, off){
  var el, btn;

  if (op == "menu" ){ el = $('#accordion'); btn = $('#btnMenu'); }
  else if (op == "toc") { el = $('#tocDropdown'); btn = $('#btnToc'); }
  else if (op == "docOptions"){ el = $('#docOptions'); btn = $('#btnOpt'); }
  else{ return; }

	if( el.hasClass('show') || btn.hasClass('active') || off)	{
    el.removeClass('show');
    btn.removeClass('active');
  }	else{
    el.addClass('show');
    btn.addClass('active');
  }
}

function showElements(elements) {
	hideElements();
  $.each(elements, function(i, el){
    $("#" + el).addClass("show");
  });
}

function hideElements() {
	var elements = ["btnMenu","btnToc","tocDropdown","btnOpt"];
  $.each(elements, function (i,el) {
		$("#" + el).removeClass("show");
	});
}

function highlightMenuItem (event) {
	if(event != null){
		if(event.target != undefined){
			var el;
			$("#accordion .active").each(function() {
				el = $(this);
				if (!el.hasClass('caret')){el.removeClass('active');}
			});

			$(event.target.parentNode.children).addClass("active")
			$(event.target).parents().addClass("active");
		}
	}else{return;}
}

function disableDocOptions(mdFile){
  if ($.inArray(mdFile, ['about','help']) != -1) {
    $("#btnEditarDoc").addClass("disabled");
    $("#btnEditarDoc").off("click");
    return;
  }
  if ($.inArray(mdFile, ['apresentacao_snc_ap','perguntas_frequentes','snc_ap_faqs','cer_migracao_sicc','mu_snc_ap']) != -1) {
    $("#btnPDF").addClass("disabled");
    $("#btnPDF").off("click");
    return;
  }
}

function enableDocOptions() {
  $("#docOptions>div").removeClass("disabled");
  $("#docOptions>div").on("click");
}

function imageZoom() {// Add zoom functionality to images in the HTML
	$('#documento img').each(function(i, img) {
		$(img).wrap("<a class='imagem' href='" +
    $(img).attr("src") +	"' onclick='return hs.expand(this)'></a>");
	});
} /*close zommClickImagem*/

function responsiveTables(arrTables) {// Add scroll to document tables
  arrTables.map( function (i, table) {
		$(table).wrap("<div style='overflow-x:auto;'></div>");
	});
} /*close responsiveTables()*/

function addSharelinks(docName, docTitle){//add link to the share button in the doc options
	var anchor, sectionURL, docURL = location.protocol + '//' + location.host + location.pathname + "?doc=" + docName;
	$("#btnShare").attr("onclick","window.open('" + encodeURI("mailto:?Subject=SPMS|SICC|Partilha de documentação: "
	 																							+ docTitle + "&body=\n\nDocumento: " + docTitle + ".\n\nEndereço: " + docURL + "')"));
  $('#documento h1,h2,h3,h4,h5').each(function(i, h){

    anchor = "&anchor="+ $(h).attr("id");
    sectionURL = docURL + anchor;
    sectionURL = encodeURI(sectionURL);
    var teste = "TESTE";
    var iId = "i-" + docName + "-" + $(h).attr("id").replace('#','');

    $(h).wrap("<span class='shareable-section'></span>");
    $(h).prepend( "<a><i class='fa fa-link fa-4x' title='Copiar link' id="+iId+" data-section-url="+sectionURL+" onclick='copyLinkToClipBoard(event)'></i></a>");
    } // fucntion
  ); // each
}

function copyLinkToClipBoard(event,docName){

    var elId = event.target.id, el = $("#"+elId);

    // gets the link (URI) to the document header
    var sectionURL = el.attr('data-section-url');

    // Create a dummy element
    var dummy = document.createElement("input");
    // Add it to the document
    document.body.appendChild(dummy);
    // Set its ID
    dummy.setAttribute("id", "dummy_id");
    // Output the array into it
    document.getElementById("dummy_id").value=sectionURL;
    // Select it
    dummy.select();
    // Copy its contents
    document.execCommand("copy");
    // Remove it as its not needed anymore
    document.body.removeChild(dummy);

    el.css({'background':'rgba(41, 97, 93, 0.9)','color':'white'});
    el.removeClass('fa-link');
    el.addClass('fa-check');

    setTimeout(function () {
      el.css({'background':'rgb(240, 240, 240)','color':'rgb(128, 128, 128)'});
      el.removeClass('fa-check');
      el.addClass('fa-link');
    }, 1200);
}

function loadCommitHistory(btnsToShow) { //Loads the gitHub repository and insert insert into the HTML

		startLoader();
    stopFindInDocs();

		if($("#documento").length < 1){
			//adjust html style and structure
				$("body, #content").removeAttr("style");
				$("#content").html("<article id='documento' class='modulo'></article>");
				$("footer").addClass("documentMode");
		}

		var htmlcontent = "<div id='latest-commits'>" +
											"<div id='latest-commits-header'>" +
											"<h1>Atualizações  <i class='fa fa-github gh-icon'></i></h1>" +
											"</div>" +
											"<ul id='commit-history'></ul>" +
											"</div>";

		$("#documento").html(htmlcontent);

		showElements(btnsToShow);
		highlightMenuItem(event);

		$("footer").addClass("documentMode");

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
				var time_to_reset = new Date(timestamp * 1000);
				time_to_reset = time_to_reset.getHours() + ":" + time_to_reset.getMinutes();

				items = response.data;
				ul = $('#commit-history');
				ul.empty();
				_results = [];

				if (rate_limit_remaining > 0) {
					for (index in items) {
						result = items[index];
						_results.push((function(index, result) {
							if (result.author != null) {
								return ul.append("<li>\n\n <div>\n\n </div>\n <div>\n <b>" + ($.timeago(result.commit.committer.date)) + "</b>: <i>\"" + result.commit.message + "\" </i>(<a href=\"https://github.com/" + username + "/" + repo + "/commit/" + result.sha + "\" target=\"_blank\">ver alterações</a>).<br />\n  </div>\nAutor: <a href=\"https://github.com/" + result.author.login + "\"><b>" + result.author.login + "</b></a>.</li><br />");
							}
						})(index, result));
					}

					window.scrollTo(0,0);
					stopLoader("[loadCommitHistory_1]");
					//Show an UI message if the request limit to the API was reached
				} else if (rate_limit_remaining == 0) {
					alert("### Atingido limite máximo de pedidos à API GitHub ###\nO seu IP realizou "
									+ rate_limit + " pedidos na última hora.\nPara consultar o histórico, neste momento, poderá utilizar outra ligação à internet ou tentar novamente a partir das "
									+ time_to_reset + ":59s de hoje. \n\n### Mensagem Github ### \n\"" + response.data.message + "\"");
					stopLoader("[loadFileHistory_2]");
					return;
				} else {
					alert("Ops! :( \n\n Ocorreu algo inesperado.\n\n\n\n\n### Detalhe ###\nficheiro: main.js\nfunção: loadFileHistory()\nGithub rate_limit_remaining: "
								+ rate_limit_remaining + "\nGithub time_to_reset: " + time_to_reset);
					stopLoader("[loadFileHistory_3]");
					return;
				}
			return _results;
		}; /*callback function*/

		return $.ajax({
				url: "https://api.github.com/repos/" + username + "/" + repo + "/commits?",
				data: {
					per_page: "200"
				},
				dataType: "jsonp",
				type: "GET",
			})
			.done(function(response, textStatus, jqXHR) {
				return callback(response, textStatus, jqXHR);
			});
} /*loadCommitHistory()*/

function loadFileHistory(file, e){

	startLoader();

	if( !$("#fileHistory").length ) {

			var ext = '.md';
			//var file = 'menus';

			var branch, callback, container, limit, repo, url, username;
			username = "SPMSSICC";
			repo = "pages";
			container = $('#latest-commits');

			callback = function(response, textStatus, jqXHR) {

				var rate_limit = response.meta["X-RateLimit-Limit"]; // Request limit to the gitHub API per hour
				var rate_limit_remaining = response.meta["X-RateLimit-Remaining"]; // Requests left to the gitHub API in the current hour
				var timestamp = Math.abs(new Date() - response.meta["X-RateLimit-Reset"] - new Date());
				var time_to_reset = new Date(timestamp * 1000);
				time_to_reset = time_to_reset.getHours() + ":" + time_to_reset.getMinutes();

				if (rate_limit_remaining > 0) {

							var d = response.data, html_commits ="";

							//console.log(d); //all file updates
							html_commits = "<div id='behindFileHistory' class='active'><div id='fileHistory' class='file-history active'>"+
															"<h3>Últimas alterações ao documento:</h3>"+
															"<i onclick='loadFileHistory()' title='Voltar ao documento' class='fa fa-times fa-fw fa-2x' aria-hidden='true'></i>";

							for (i = 0; i < d.length; i++){
								html_commits = html_commits + "<div>";
								html_commits = html_commits +	" <a href='" +	d[i].html_url+"' target='_blank' title='Ver detalhes'><i class='fa fa-external-link fa-fw' aria-hidden='true'></i></a> " +
															$.timeago(d[i].commit.author.date) + ": \"" + d[i].commit.message + "\";" ;
								html_commits = html_commits + "</div>";
							}

							html_commits = html_commits + "</div></div>"

							$("#content").after(html_commits);
							$("#btnHistory").addClass("active");

							stopLoader("[loadFileHistory_1]");
					}
					else if (rate_limit_remaining == 0) {
						alert("### Atingido limite máximo de pedidos à API GitHub ###\nO seu IP realizou "
										+ rate_limit + " pedidos na última hora.\nPara consultar o histórico, neste momento, poderá utilizar outra ligação à internet ou tentar novamente a partir das "
										+ time_to_reset + ":59s de hoje. \n\n### Mensagem Github ### \n\"" + response.data.message + "\"");
						stopLoader("[loadFileHistory_2]");
						return;
					} else {
						alert("Ops! :( \n\n Ocorreu algo inesperado.\n\n\n\n\n### Detalhe ###\nficheiro: main.js\nfunção: loadFileHistory()\nGithub rate_limit_remaining: "
									+ rate_limit_remaining + "\nGithub time_to_reset: " + time_to_reset);
						stopLoader("[loadFileHistory_3]");
						return;
					}

				}; /*callback function*/

				return $.ajax({
						url: "https://api.github.com/repos/SPMSSICC/pages/commits?path=markdown/"+file+ext,
						data: {
							per_page: "200"
						},
						dataType: "jsonp",
						type: "GET",
					})
					.done(function(response, textStatus, jqXHR) {
						return callback(response, textStatus, jqXHR);
					});
	}
	else if ( $("#fileHistory").length && !$("#fileHistory").hasClass("active") ) {
		$("#btnHistory, #fileHistory, #behindFileHistory").addClass("active");
		//console.log("adicionada classe active");
		stopLoader("[loadFileHistory_2]");
	}
	else if( $(".file-history").length && $("#fileHistory").hasClass("active") ){
		$("#fileHistory, #btnHistory, #behindFileHistory").removeClass("active");
		stopLoader("[loadFileHistory_4]");
		//console.log("histórico escondido");
	}
	else{
		console.log("[loadFileHistory] Erro");
		stopLoader("[loadFileHistory_5]");
	}
}

function loadToc(arrHeaders, tocEl) {

	if (arrHeaders.length >= 1 && tocEl.length) {
		var toc="", newLine, el, title, link;

		arrHeaders.each(function(i, h) {//chose the HTML elements to include in the Table of Content
				el = $(this);
				link = "#" + el.attr("id");
				title = el.text();
				nodeName = el.get(0).nodeName.toLowerCase();
				newLine = "<li><a class='toc_" + nodeName + "' href='" + link + "'>" + title + "</a></li>";
				toc += newLine;
			});

		if ( toc.length > 1 ) {
      toc_top_html ="<nav role='navigation' class='table-of-contents'><ul>";
			tocEl.html(toc_top_html + toc + "</ul></nav>");
		}

		// if ($("#tocDropdown").length) {
		// 	$("#tocDropdown").draggable({/*Dependency: jquery-ui.js*/
		// 			containment: "window",
		// 			handle: "i",
		// 			snap: "#docButtons, #content",
		// 			cursor: "move"
		// 		});
    //   $("nav.table-of-contents").before("<div><i id='drag1' title='Arraste-me...' class='fa fa-arrows fa-fw' style='cursor: move;'></i></div>");
    //   $("nav.table-of-contents").after("<div><i id='drag2' title='Arraste-me...' class='fa fa-arrows fa-fw' style='cursor: move;'></i></div>");
		// }
	}
} /*builds toc*/

// Close one or multiple menus if the user clicks outside of it
window.onclick = function(event) {
  var t = event.target;

	if(uAgent.indexOf("MSIE") == -1 && uAgent.indexOf("MICROSOFT") == -1){
    if (!t.matches('#tocDropdown *, .dropdown-content, #btnMenu i, #btnMenu a, #docButtons p, .drop-doc-options, #btnOpt *,#btnOpt, #docOptions *') ) {
      if (!t.matches('#btnToc, #accordion *, .dropdown') && ($("#btnMenu").hasClass("active") || $("#accordion").hasClass("show")) ){
        toggle("menu",true); // hide menu
      }
      if (!t.matches('.dropbtn') && $("#tocDropdown").hasClass("show")) {
        toggle("toc",true); // hide table of contents
      }
      if (!t.matches('#docOptions *, #btnOpt *, #btnOpt, .drop-doc-options')){
  			toggle("docOptions",true); // hide document options
  		}
		}
	}
}; //window.onclick

/*********************************************************************
override standard href-id navigation on page without change HTML markup
for smooth scrolling
*********************************************************************/

// handle links in the table of contents with @href started with '#' only
$('#tocDropdown').on('click', 'a[href^="#"]', function(e) {

	var id = $(this).attr('href');// target element id
	var $id = $(id);// target element

	if ($id.length === 0) {
		return;
	}
	else{
		$('#tocDropdown *').removeClass('active');
		$(e.target).addClass('active');
		$(e.target.parentNode).addClass('active');
	}

	e.preventDefault(); // prevent standard hash navigation (avoid blinking in IE)

	var pos = parseInt($id.offset().top - 50); // top position relative to the document
	window.scrollTo(0, pos);
	// $('html, body').css({'scrollTop' : pos});
});


var searchDocs;

function startFindInDocs() {
    searchDocs = setInterval(function(){ findInDocs() }, 500);
    console.log("[stopFindInDocs] Search started");
}

function stopFindInDocs() {
    clearTimeout(searchDocs);
    console.log("[stopFindInDocs] Search stopped");
}


function findInDocs(){

  var txtInserted = $("#textToSearch")["0"].value;

  if (txtInserted == lastSearchStr || txtInserted.length  <= 0){
    console.log("Do not search txtInserted: " + txtInserted + ", lastSearchStr: " + lastSearchStr);
    if(txtInserted.length  <= 0){ $("#resultsList").remove(); }
    return; // exit function
  }
  else{
    console.log("Search! txtInserted: " + txtInserted + ", lastSearchStr: " + lastSearchStr);

    startLoader();

    lastSearchStr = txtInserted;
    var str = txtInserted;

    if (mobileDeviceCheck) {minLen=4;} //to reduce interface block
    else {minLen=2;}

    if(str.length >= minLen){

      var regexp = new RegExp(str.toUpperCase(),"g"),match, arrMatches = [],html_1, html_2="", html_final;

      $.each(reformatedArrDocs, function(i, d){
          while ((match = regexp.exec(d.content.toUpperCase())) != null) {

            var start = d.content.indexOf(" ",match.index - 70)+1,
                end =  d.content.indexOf(" ",match.index + 70);
            citation = "\"..." + d.content.substring(start,end) + "...\"";
            html_2 = html_2 + '<li title="Ver documento '+d.title+'" onclick="loadMdDoc(\'' + d.name +
                              '\', [\'btnMenu\',\'btnToc\',\'btnOpt\',\'tocDropdown\'],\'\', null)"><span class="title">['+d.title+']</span><p><span class=' + 'citation' + '>'+
                              citation+'</span></p>'+
                              '</li>';

            arrMatches.push(d.name + "|" + match.index);
          } //while
        } //each
      ); //each
      //alert(html_2);

      html_1 = "<div id='resultsList'><h3>"+arrMatches.length+" resultados encontrados.</h3>";
      html_final = html_1 + html_2 + "</div>";
      $("#resultsList").remove();
      $("#searchDiv").after(html_final);

      var spanMatch =  $("span");

      $.each($("#resultsList li span.citation"),function(i,val){
        var innerHTML = val.innerHTML, index = innerHTML.toUpperCase().indexOf(str.toUpperCase());
        if ( index >= 0 )
        {
          innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+str.length) + "</span>" + innerHTML.substring(index + str.length);
          val.innerHTML = innerHTML;
        }
      });
    }
  } // else
  stopLoader();
} // findInDocs()

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
