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


/*Carregar documento através de parametros no URL (queryString)*/
function loadContent(){

	 var qs = window.location.search; //Get QueryString

	 console.log("[loadContent] Query string (1): " + qs);

	// qs = "?doc=menus&anchor=#225-responsáveis"; // TEST

	if ( qs.indexOf("=") != -1 ){

					console.log("[loadContent] Query string (2): " + qs);

					var paramArr = qs.split("&",10); // Returns paramArr passed of the query string. splits until the max of 10 paramArr
					console.log("[loadContent] paramArr: " + paramArr +
										"\n[loadContent] paramArr.length: " + paramArr.length +
										"\n[loadContent] paramArr[0]: " + paramArr[0] +
										"\n[loadContent] paramArr[1]: " + paramArr[1]);

					var doc;

					if (paramArr.length >= 1) {
							doc = paramArr[0].substring(paramArr[0].indexOf("=") + 1, 99); // Returns doc name

							var anchor;

							if (paramArr.length >= 2){
									anchor = paramArr[1].substring(paramArr[1].indexOf("=") + 1, 99); // Returns anchor of the document
									anchor = decodeURI(anchor);
								}
							console.log("[loadContent] doc: " + doc +
												"\n[loadContent] anchor: " + anchor);

							if (doc.length) {

									loadMdDoc(doc, ['btnMenu','btnEditarDoc','btnShowToc','tocDropdown'], anchor);

									//to-do: chamar loadICommitHistory se for um PDF ou pptx
							}
							else{
									console.log("[loadContent] Invalid document name: " + doc);
									loadIndexContent(["btnMenu"]);
									stopLoader();
							}
					}
	}/*close if*/
	else if ( qs.length <= 1  ) {

				console.log("[loadContent] Query string not detected/not valid: " + qs);
				loadIndexContent(["btnMenu"]);
				stopLoader();

	}/*close else if*/
	else{
		console.log("[loadContent] Erro. window.location.href: " + window.location.href);
		loadIndexContent(["btnMenu"]);
		stopLoader();
	}
}

function startLoader(){

		if( $("#loader .loader").length ){
				console.log("[startLoader] Loader started previously");
		}
		else{
				var spinnerHtml = "<div id ='loader'> <img  class='loader' src='./img/icons/sicc.png' alt='Loader'></img></div>";
				$(spinnerHtml).insertAfter("#header").promise().done(function(){
						console.log("[startLoader] Adicionado");
				});
		}
}

function stopLoader(){
		if($("#loader").length){
				$("#loader").remove();
				console.log("[stopLoader] Removido");
		}
		else{
			console.log("[stopLoader] Loader stopped previously");
		}
}

function loadIndexContent(btnsToShow) {

	console.log("[loadIndexContent] btnsToShow: ", btnsToShow);

	startLoader();

	$("body").attr("style", "margin:0 0 0 0;  width:100%");
	$("#content").attr("style", "min-height: 90vh; margin: 0 0 0 0; padding:1em 1em 1em 1em; widht: 100%; max-width:5000px");

	var filePath ='./html/index_content.html';

	$.get(filePath, function() {
		//console.log("[loadIndexContent] Loaded requested file");
	})
	.done(function(data){
			$("#content").html(data);
			showElements(btnsToShow);
			$("footer").removeClass("documentMode");
	})
	.fail(function(){
			console.log("[loadIndexContent] Error on loading requested file: " + filePath);
	})
	.always(function(){
			window.scrollTo(0,0);
			var stateObj = { foo: "bar" };
			history.replaceState(stateObj, "SICC Documentação - página inicial", location.href.split("?")[0]);
			stopLoader();
	});

}

function loadMdDoc(mdFile, btnsToShow, anchor) {

		startLoader();

		if($("#documento").length < 1){
				$("body, #content").removeAttr("style"); 																 //adjust html style and structure
				$("#content").html("<article id='documento' class='modulo'></article>"); //adjust html style and structure
				$("footer").addClass("documentMode"); 																	 //adjust html style and structure
		}

		convertMdToHtml("documento", mdFile, anchor);

		$("#btnEditarDoc").click(function() {
				window.open("https://github.com/SPMSSICC/pages/edit/master/markdown/" + mdFile + ".md", "_blank");
			});


		//$("#btnPDF").attr({"onclick":"window.open('https://spmssicc.github.io/pages/pdf/" + mdFile + ".pdf', '_blank')"});

		if (mdFile == "apresentacao_snc_ap") {$("#btnPDF").attr({"onclick":"window.open('https://view.officeapps.live.com/op/embed.aspx?src=https://spmssicc.github.io/pages/pptx/SPMS_SICC_SNC_AP_20160606_04-pics.pptx','_blank')"});}
		else if (mdFile == "circ1381") {$("#btnPDF").attr({"onclick":"window.open('http://www.dgo.pt/instrucoes/Instrucoes/2016/ca1381.pdf','_blank')"});}
		else if (mdFile == "circ1382") {$("#btnPDF").attr({"onclick":"window.open('http://www.dgo.pt/instrucoes/Instrucoes/2016/ca1382.pdf','_blank')"});}
		else if (mdFile == "dec_lei192") {$("#btnPDF").attr({"onclick":"window.open('https://dre.pt/application/conteudo/70262478','_blank')"});}
		else if (mdFile == "dec_lei85") {$("#btnPDF").attr({"onclick":"window.open('https://dre.pt/application/conteudo/105583346','_blank')"});}
		else {$("#btnPDF").attr({"onclick":"window.openn'window.open('https://spmssicc.github.io/pages/pdf/" + mdFile + ".pdf','_blank')"});}

		showElements(btnsToShow);
		window.scrollTo(0,0);

		stopLoader();
}

//load and convert Markdown to Html and show it
function convertMdToHtml(elementId, mdFile, anchor) {

	startLoader();

	if (elementId == undefined || mdFile.length < 1) {
		elementId = "documento";
	}

	console.log("[convertMdToHtml] mdFile: " + mdFile + "\n[convertMdToHtml] elementId to place the html: " + elementId);

	//Vai buscar o ficheiro markdown ao diretório ./markdown/
	$.get('./markdown/' + mdFile + '.md', function() {
				//console.log("[convertMdToHtml] sucess");
	})
		.done(function(data) {
		    //console.log("[convertMdToHtml] mdFile \"" + mdFile + "\"  loaded");

				//declara 3 variáveis: converter, data e a html. A variável html irá conter o ficheiro markdown convertido em HTML.
				var converter = new showdown.Converter(),	data2, html = converter.makeHtml(data);

				//console.log("[convertMdToHtml] mdFile  \"" + mdFile + "\"  converted to HTML!");

				$("#" + elementId).html(html).promise().done(function(){

						zommClickImagem();
						responsiveTable();
						loadToc(mdFile, "tocDropdown");

						if(anchor.length > 1){
							setTimeout( function(){ scrollToAnchor(mdFile, anchor); }, 2500);
						}
						else{
							var stateObj = { foo: "bar" } ,url =  location.protocol + '//' + location.host + location.pathname + "?doc=" + mdFile + "&anchor=" + anchor;
							history.pushState(stateObj, "SICC - Documentação", url);
							//console.log("[convertMdToHtml] Adicionada entrada no histórico: " + url);
						}
						stopLoader();
				});
				stopLoader();
  })
		.fail(function() {
				console.log("[convertMdToHtml] Error on document loading. The file \"" + mdFile + "\" exists in the markdown folder?");
				loadIndexContent(['btnMenu']);
				stopLoader();
	});

} /*close convertMdToHtml()*/

function tipoObj( obj ) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function scrollToAnchor(mdFile, anchor){

	startLoader();
	var anchorId;

	if(anchor.length > 1){
		anchorId = '#' + anchor;
	}

	try {
			$(anchorId);
		} catch(e) {
			console.log('[scrollToAnchor] Your URL anchor parameter is invalid: ' + anchorId);
			anchorId = '';
			stopLoader();
			return;
		}

	if ($(anchorId).length) {

				var pos = $(anchorId).offset().top - 250;// get top position relative to the document //- 250 to compensate the doc bar

				$('body, html').animate({scrollTop: pos});// set animated top scrolling to the anchorId

				console.log("[scrollToAnchor] anchorId:" + anchorId + "\n Positions should be the same: " + $(anchorId).offset().top + " <-> " + (pos + 250));

				var stateObj = { foo: "bar" }, url = location.protocol + '//' + location.host + location.pathname + "?doc=" + mdFile + "&anchor=" + anchor;
				history.pushState(stateObj, "SICC - Documentação", url);
				console.log("[scrollToAnchor] Adicionada entrada no histórico: " + url);

				anchor = ""; // clear the anchor
		}
		else{
				window.scrollTo(0,0);// top scrolling
				console.log("[scrollToAnchor] anchorId not found in the html: " + anchorId);
		}
	stopLoader();
}

function showElements(elements) {

	hideElements();

	for (i = 0; i < elements.length; i++) {
		$("#" + elements[i]).addClass("show");
	}
	console.log("[showElements] show: ", elements);
}

function hideElements() {

	var elements = ["btnMenu","btnPDF","btnEditarDoc","btnShowToc","tocDropdown"];

	for (i = 0; i < elements.length; i++) {
		$("#" + elements[i]).removeClass("show");
	}
	console.log("[hideElements] hide: ", elements);
}

// Add zoom functionality to images in the HTML
function zommClickImagem() {

	$('#documento img').each(function() {
			var alt = $(this).attr("alt");
			$(this).wrap("<a class='imagem' href='" +
			$(this).attr("src") + "' onclick='return hs.expand(this)'></a>");
		});

	console.log("[zommClickImagem] image zoom ready!");

} /*close zommClickImagem*/

/* Add auto scroll to document tables */
function responsiveTable() {
	$('#documento table').each(function() {
			$(this).wrap("<div style='overflow-x:auto;'></div>");
		});
} /*close responsiveTable()*/

//Loads the gitHub repository and insert insert into the HTML
function loadCommitHistory(btnsToShow) {

		startLoader();

		console.log("[loadCommitHistory] started. Buttons to show: " + btnsToShow);

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
			stopLoader();
			window.scrollTo(0,0);
			//Show an UI message if the request limit to the API was reached
		} else if (rate_limit_remaining == 0) {
			stopLoader();
			return ul.append("<b>Atenção: </b> Não foi possível mostrar as atualizações devido a sobrecarga de pedidos (>" + rate_limit + "/hr), realizados pelo seu atual IP. Pode utilizar outro IP ou voltar a tentar depois das " + time_to_reset + ":59s de hoje. <br /><br />Mensagem do servidor: \"<i>" + response.data.message + "</i>\"");
		} else {
			stopLoader();
			return ul.append("Ops! :( <br /><br /> Ocorreu algo inesperado.");
		}
		return _results;
	}; /*callback function*/

	return $.ajax({
			url: "https://api.github.com/repos/" + username + "/" + repo + "/commits?callback=callback&callback=jQuery171010727564072631068_1487000384850&per_page=10&_=1487000384930",
			data: {
				per_page: "100"
			},
			dataType: "jsonp",
			type: "GET",
		})
		.done(function(response, textStatus, jqXHR) {
			return callback(response, textStatus, jqXHR);
		});

} /*loadCommitHistory()*/

function loadToc(mdFile, elementId) {

	showToc();

	elementId = "#" + elementId;

	if ($(elementId).length) {

		$(elementId).html("");

		var toc_top_html =	"<i id='drag1' title='Arraste-me...' class='fa fa-arrows fa-fw' style='cursor: move;'></i>" +
										"<nav role='navigation' class='table-of-contents'>" +
											"<ul>";

		var toc="", newLine, el, title, link, a, i, docURL, href, docTitle = $("article h1").html();

		docURL = location.protocol + '//' + location.host + location.pathname + "?doc=" + mdFile;


		$("article h1").each(function() {

				el = $(this);

				href = encodeURI("mailto:?Subject=SPMS|SICC|Partilha de documentação: "+docTitle+
								"&body=\n\nDocumento: " + docTitle + ".\n\nEndereço: " + docURL);

				i = $("<a title='Partilhar este documento' href='" + href + "' target='_top'>" +
								"<i class='fa fa-share-alt fa-fw'></i>" +
							"</a>");

				el.append(i);
		});

		//chose the HTML elements to include in the Table of Content
		$("article h2,h3,h4").each(function() {

				el = $(this);
				link = "#" + el.attr("id");
				title = el.text();
				nodeName = el.get(0).nodeName.toLowerCase();

				a = $('<a></a>');
				a.attr('href', link);
				el.prepend(a);

				newLine = "<li><a class='toc_" + nodeName + "' href='" + link + "'>" + title + "</a></li>";

				toc += newLine;
			});



		toc_bottom_html = "</ul>" + "</nav>" + "<div><i id='drag2' title='Arraste-me...' class='fa fa-arrows fa-fw' style='cursor: move;'></i></div>";

		if ( toc.length > 1 && !$(elementId).hasClass("show")) {
			$(elementId).html(toc_top_html + toc + toc_bottom_html);
			showToc();
		}
		else{
			$(elementId).removeClass("show");
		}

		//console.log("[loadToc] $(" + elementId + ").html:\n\n" + $(elementId).html());



		/*Dependency: jquery-ui.js*/
		if ($("#tocDropdown").length) {

			$("#tocDropdown").draggable({
					containment: "window",handle: "i",snap: "#docButtons, #content",cursor: "move",cursorAt: {top: 5,left: 5}
				});
				//$("#tocDropdown").resizable();

		}

		if ($("#tocDropdown").hasClass("show")) {
			$("#btnShowToc").addClass("enabled");
		}
	}
	stopLoader();

} /*builds toc*/

function showToc() {
	$(".dropdown-content").toggleClass("show");
	$("#btnShowToc").toggleClass("enabled");

	console.log("[showToc] TOC visibility:" + $(".dropdown-content").hasClass("show"));
	console.log("[showToc] #btnShowToc visibility:" + $("#btnShowToc").hasClass("show"));
}

function showMenu() {
	$("#accordion").toggleClass("showMenu");
	$("#btnMenu").toggleClass("showMenu");

	console.log("[showMenu] #accordion visibility:" + $("#accordion").hasClass("showMenu"));
	console.log("[showMenu] #btnMenu visibility:" + $("#accordion").hasClass("showMenu"));
}

// Close the dropdown menu and the menu if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.dropbtn, #tocDropdown *, .dropdown-content, #btnMenu i, #btnMenu a, #docButtons p') && $("#tocDropdown").hasClass("show")) {
		showToc();
	}
	if (!event.target.matches('.dropdown, #tocDropdown *, .dropdown-content, #btnMenu i, #btnMenu a, #docButtons p, #accordion *, #btnShowToc') && $("#btnMenu").hasClass("showMenu")) {
		showMenu();
	}
};

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

		//console.log("[TOC link click] position: " + pos);

		// animated top scrolling
		$('body, html').animate({
				scrollTop: pos
			});
	});


/*to add support for IE to endsWith()*/
String.prototype.endsWith = function(pattern) {
	var d = this.length - pattern.length;
	return d >= 0 && this.lastIndexOf(pattern) === d;
};
