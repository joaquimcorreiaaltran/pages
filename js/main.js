/*
Functions to use in SICC project (https://spmssicc.github.io/pages)
Author: SPMS, EPE
Project: SICC
Date: Aug-2017
*/
//get the current html document name without extension
doc_name = window.location.pathname.split("/").pop().replace(/.html|htm/gi, "");

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


function startLoader(){

		if( $("#loader").length ){
				console.log("[startLoader] Loader já tinha sido carregado anteriormente");
		}
		else{
				var spinnerHtml = "<div id ='loader'> <img  class='loader' src='./img/icons/sicc.ico' alt='Loader'></img></div>";

				$(spinnerHtml).insertAfter("#header");
				console.log("[startLoader] Novo spinner adicionado");
		}
}

function stopLoader(){
		while($("#loader").length){
				$("#loader").remove();
				console.log("[stopLoader] Loader removido");
		}
}

function loadIndexContent(btnsToShow) {

	startLoader();

	$("footer").removeClass("documentMode");

	console.log("\n[loadIndexContent] btnsToShow: ", btnsToShow);

	$("body")
		.attr("style", "margin:0 0 0 0;  width:100%");
	$("#content").attr("style", "min-height: 90vh; margin: 0 0 0 0; padding:1em 1em 1em 1em; widht: 100%; max-width:5000px");

	$.get("./html/index_content.html", function(data) {
		$("#content").html(data);
	});

	loadDocButtons("", "", "index");
	showElements(btnsToShow);
	stopLoader();

}

function loadIframe(option, btnsToShow) {

		startLoader();

		if($("#documento").length < 1){
			//adjust html style and structure
				$("body, #content").removeAttr("style");
				$("#content").html("<article id='documento' class='modulo'></article>");
				$("footer").addClass("documentMode");
		}

		var htmlcontent;

		if (option == "apresSncAp") {
			htmlcontent = "<h1 style='text-align: center;margin-top: 1em;adding: 0 1em 0em 1em'>SNC-AP para entidades de saúde</h1>" +
				"<div style='position: relative; width: 100%; height: 0px; padding-bottom: 79%;'>" +
				"<iframe src='https://view.officeapps.live.com/op/embed.aspx?src=https://spmssicc.github.io/pages/pptx/SPMS_SICC_SNC_AP_20160606_04-pics.pptx' style='position: absolute; border-top:0; width: 99.5%; height: 100%; margin: 0 auto 0 auto; alignment: middle;' title='Apresentação Powerpoint SICC SNC-AP'></iframe>" +
				"</div>";

				$("#btnPDF").click(function() {
						window.open("https://view.officeapps.live.com/op/embed.aspx?src=https://spmssicc.github.io/pages/pptx/SPMS_SICC_SNC_AP_20160606_04-pics.pptx", "_blank");
					});

		} else if (option == "circ1381") {
			htmlcontent = "<h1 style='text-align: center;padding: 0 1em 0em 1em'>Circular DGO n.º 1381 (05/04/2016)</h1>" +
				"<iframe src='https://docs.google.com/gview?url=http://www.dgo.pt/instrucoes/Instrucoes/2016/ca1381.pdf&embedded=true&rm=minimal' style='width:100%; height:700px' frameborder='1'></iframe>";

				$("#btnPDF").click(function() {
						window.open("http://www.dgo.pt/instrucoes/Instrucoes/2016/ca1381.pdf", "_blank");
					});

		} else if (option == "decLei192") {
			htmlcontent = "<h1 style='text-align: center;padding: 0 1em 0em 1em'>Decreto-Lei n.º 192/2015 (11/09/2015)</h1>" +
				"<iframe src='https://docs.google.com/gview?url=https://dre.pt/application/conteudo/70262478&embedded=true' style='width:100%; height:700px' frameborder='1'></iframe>";

				$("#btnPDF").click(function() {
						window.open("https://dre.pt/application/conteudo/70262478", "_blank");
					});

		} else if (option == "decLei85") {
			htmlcontent = "<h1 style='text-align: center;padding: 0 1em 0em 1em'>Decreto-Lei n.º 85/2016 (21/12/2016)</h1>" +
				"<iframe src='https://docs.google.com/gview?url=https://dre.pt/application/conteudo/105583346&embedded=true' style='width:100%; height:700px' frameborder='1'></iframe>";

				$("#btnPDF").click(function() {
						window.open("https://dre.pt/application/conteudo/105583346", "_blank");
					});
		} else if (option == "circ1382") {
			htmlcontent = "<h1 style='text-align: center;padding: 0 1em 0em 1em'>Circular DGO n.º 1382 (05/04/2016)</h1>" +
				"<iframe src='https://docs.google.com/gview?url=http://www.dgo.pt/instrucoes/Instrucoes/2016/ca1382.pdf&embedded=true' style='width:100%; height:700px' frameborder='1'></iframe>";

				$("#btnPDF").click(function() {
						window.open("http://www.dgo.pt/instrucoes/Instrucoes/2016/ca1382.pdf", "_blank");
					});

		} else {
			htmlcontent = "<h1>Não foi possível apresentar o conteúdo escolhido</h1>";
		}


		$("#documento").html(htmlcontent);
		showElements(btnsToShow);
		stopLoader();

}

function loadMdDoc(mdFile, btnsToShow) {

		startLoader();

		if($("#documento").length < 1){
			//adjust html style and structure
				$("body, #content").removeAttr("style");
				$("#content").html("<article id='documento' class='modulo'></article>");
				$("footer").addClass("documentMode");
		}

		convertMdToHtml("documento", function() {
			loadDocButtons(function() {
				loadToc("tocDropdown");
			}, btnsToShow, mdFile);
		}, mdFile);
		showElements(btnsToShow);
}

function getScript(path) {
	$.getScript(path)
		.done(function(script, textStatus) {
			console.log("[Carregamento de Script]:" + textStatus);
		})
		.fail(function(jqxhr, settings, exception) {
			$("div.log")
				.text("Triggered ajaxError handler.");
		});
}

//load and convert Markdown to Html and show it
function convertMdToHtml(elementId, funcao, mdFile) {

	var file = doc_name;

	if (elementId == undefined || mdFile.length < 1) {
		elementId = "documento";
		console.log("[convertMdToHtml] elementId = \"documento\";");
	}

	if (mdFile !== undefined || mdFile.length > 1) {
		file = mdFile;
		console.log("[convertMdToHtml] file: " + file);
	}

	console.log("[convertMdToHtml] elementId: " + elementId + ",\nmdFile" + mdFile + ", \nfuncao: " + funcao);

	//Vai buscar o ficheiro markdown ao diretório ./markdown/
	$.get('./markdown/' + file + '.md', function(data) {

		//declara 3 variáveis: converter, data e a html. A variável html irá conter o ficheiro markdown convertido em HTML.
		var converter = new showdown.Converter(),	data, html = converter.makeHtml(data);

		console.log("[convertMdToHtml] file converted!");

		//seleciona o elemento "elementId" e coloca o documento markdown convertido dentro desse "elementId"
		$("#" + elementId).html(html);

		zommClickImagem();
		responsiveTable();
		if (funcao != undefined && typeof funcao == "function") {
			funcao();
		}
	});

} /*close convertMdToHtml()*/

//Adds auxilary buttons to the interface
function loadDocButtons(funcao, btnsToShow, file) {

		console.log("[loadDocButtons] file: " + file);

			if (file != "index"){

				$("#btnEditarDoc").click(function() {
						window.open("https://github.com/SPMSSICC/pages/edit/master/markdown/" + file + ".md", "_blank");
					});

				$("#btnPDF").attr({"onclick":"window.open('https://spmssicc.github.io/pages/pdf/" + file + ".pdf', '_blank')"});
			}


			console.log("[loadDocButtons] $('#btnPDF').attr(onclick): " + $("#btnPDF").attr("onclick"));

			if (funcao != undefined && typeof funcao == "function") {
				funcao();
			}
		//}

} //close loadDocButtons()

function showElements(elements) {

	hideElements();

	for (i = 0; i < elements.length; i++) {
		$("#" + elements[i]).addClass("show");
		var arrVal = elements[i];
		console.log("[showElements] show: ", arrVal);
	}
}

function hideElements() {

	var elements = ["btnMenu","btnPDF","btnEditarDoc","btnShowToc","tocDropdown"];

	for (i = 0; i < elements.length; i++) {
		$("#" + elements[i]).removeClass("show");
			//.remove();
		var arrVal = elements[i];
		console.log("[hideElements] hide: ", arrVal);
	}
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

		console.log("[loadCommitHistory] started");

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
				per_page: "20"
			},
			dataType: "jsonp",
			type: "GET",
		})
		.done(function(response, textStatus, jqXHR) {
			return callback(response, textStatus, jqXHR);
		});
} /*loadCommitHistory()*/

/*detect if a selector returns null
Used like:
$("#notAnElement").exists();*/
$.fn.exists = function() {
	return this.length !== 0;
};

function loadToc(elementId) {

	elementId = "#" + elementId;

	if ($(elementId).exists() == false) {
		$("#docButtons").after("<div id='tocDropdown' class='dropdown-content'></div>");
	} /*if*/
	else {
		console.log("Não foi possível criar o índice porque o elemento \"" + elementId + "\" não existe no HTML.");
	}

	if ($(elementId).exists()) {
		$(elementId).html("");

		var toc_html =
			"<i id='drag1' title='Arraste-me...' class='fa fa-arrows fa-fw' style='cursor: move;'></i>" +
			"<nav role='navigation' class='table-of-contents'>" +
			"<ul>";

		var newLine, el, title, link;

		//chose the HTML elements to include in the Table of Content
		$("article h2,h3,h4")
			.each(function() {

				el = $(this);
				link = "#" + el.attr("id");
				title = el.text();
				nodeName = el.get(0)
					.nodeName.toLowerCase();

				newLine = "<li>" +
					"<a class='toc_" + nodeName + "' href='" + link + "'>" + title + "</a>" +
					"</li>";

				toc_html += newLine;
			});

		toc_html += "</ul>" + "</nav>" + "<div><i id='drag2' title='Arraste-me...' class='fa fa-arrows fa-fw' style='cursor: move;'></i></div>";

		$(elementId).html(toc_html);

		console.log("[loadToc] $(" + elementId + ").html:\n\n" + $(elementId).html());

		if (!$(elementId).hasClass("show")) {
			showToc();
		}

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

		stopLoader();
	}
} /*builds toc*/

function showToc() {
	$(".dropdown-content").toggleClass("show");
	$("#btnShowToc").toggleClass("enabled");

	console.log("[showToc] visibility:" + $(".dropdown-content").hasClass("show"));
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
	if (!event.target.matches('.dropbtn, #tocDropdown *, #btnMenu i, #btnMenu a, #docButtons p') && $("#tocDropdown").hasClass("show")) {
		showToc();
	}
	if (!event.target.matches('.dropdown, #tocDropdown *, #btnMenu i, #btnMenu a, #docButtons p, #accordion *, #btnShowToc') && $("#btnMenu").hasClass("showMenu")) {
		showMenu();
	}
};

/*********************************************************************
override standard href-id navigation on page without change HTML markup
for smooth scrolling
*********************************************************************/

// handle links with @href started with '#' only
$(document)
	.on('click', 'a[href^="#"]', function(e) {

		// target element id
		var id = $(this)
			.attr('href');

		// target element
		var $id = $(id);
		if ($id.length === 0) {
			return;
		}

		// prevent standard hash navigation (avoid blinking in IE)
		e.preventDefault();

		// top position relative to the document
		var pos = $id.offset()
			.top - 55;

		// animated top scrolling
		$('body, html')
			.animate({
				scrollTop: pos
			});
	});


/*to add support for IE to endsWith()*/
String.prototype.endsWith = function(pattern) {
	var d = this.length - pattern.length;
	return d >= 0 && this.lastIndexOf(pattern) === d;
};
