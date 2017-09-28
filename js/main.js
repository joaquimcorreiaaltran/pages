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

	 //console.log("[loadContent] Query string (1): " + qs);

	if ( qs.indexOf("=") != -1 ){

					//console.log("[loadContent] Query string (2): " + qs);

					var doc, paramArr = qs.split("&",10); // Returns paramArr passed of the query string. splits until the max of 10 paramArr
					/*console.log("[loadContent] paramArr: " + paramArr +
										"\n[loadContent] paramArr.length: " + paramArr.length +
										"\n[loadContent] paramArr[0]: " + paramArr[0] +
										"\n[loadContent] paramArr[1]: " + paramArr[1]);
					*/
					if (paramArr.length >= 1) {
							doc = paramArr[0].substring(paramArr[0].indexOf("=") + 1, 99); // Returns doc name

							var anchor;

							if (paramArr.length >= 2){
									anchor = paramArr[1].substring(paramArr[1].indexOf("=") + 1, 99); // Returns anchor of the document
									anchor = decodeURI(anchor);
								}
							//console.log("[loadContent] doc: " + doc + "\n[loadContent] anchor: " + anchor);

							if (doc.length) {
									loadMdDoc(doc, ['btnMenu','btnEditarDoc','btnShowToc','tocDropdown','btnOpt'], anchor, null);
							}
							else{
									//console.log("[loadContent] Invalid document name: " + doc);
									loadIndexContent(["btnMenu"], null);
									stopLoader("[loadContent-1]");
							}
					}
	}/*close if*/
	else if ( qs.length <= 1  ) {
				//console.log("[loadContent] Query string not detected/not valid: " + qs);
				loadIndexContent(["btnMenu"], null);

	}/*close else if*/
	else{
		console.log("[loadContent] Erro. window.location.href: " + window.location.href);
		loadIndexContent(["btnMenu"], null);
		stopLoader("[loadContent-3]");
	}
}

function startLoader(){
	$('#loader').addClass('active');
	$( "*" ).css( "cursor", "progress" );
	//console.log("[startLoader]",$('#loader'));
}

function stopLoader(origin){
	//window.alert("origin->" + origin + "\ncursor->"+$( "*" ).css( "cursor"));
	$('#loader').removeClass('active');
	$( "*" ).css( "cursor", "" );
	//console.log("[stopLoader]");
}

function loadIndexContent(btnsToShow, event) {

	//console.log("[loadIndexContent] btnsToShow: ", btnsToShow);

	startLoader();

	$("#fileHistory, #behindFileHistory").remove();
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
			highlightMenuItem(event);
			setTimeout(function(){stopLoader("[loadIndexContent_1]");},1000);
	})
	.fail(function(){
			console.log("[loadIndexContent] Error on loading requested file: " + filePath);
			stopLoader("[loadIndexContent_2]");
	})
	.always(function(){
			window.scrollTo(0,0);
			$("#docOptions").removeClass("active");
			var stateObj = { foo: "bar" };
			history.replaceState(stateObj, "SICC Documentação - página inicial", location.href.split("?")[0]);

	});

}

function highlightMenuItem (event) {
	if(event != null){
		if(event.target != undefined){
			var el;

			$("#accordion .active").each(function() {
				el = $(this);

				if (!el.hasClass('caret')){
					el.removeClass('active');
				}
			});

			$(event.target.parentNode.children).addClass("active")
			$(event.target).parents().addClass("active");
		}
	}
	else {
		return;
	}
}

function loadMdDoc(mdFile, btnsToShow, anchor, event) {

		startLoader();

		highlightMenuItem(event);

		$("#fileHistory").remove();

		//if the HTML element "#documento" doesn't exist, then create it inside the "documento" element
		if($("#documento").length < 1){
				$("body, #content").removeAttr("style"); 																 //adjust html style and structure
				$("#content").html("<article id='documento' class='modulo'></article>"); //adjust html style and structure
				$("footer").addClass("documentMode"); 																	 //adjust html style and structure
		}

		convertMdToHtml("documento", mdFile, anchor);

		$("#btnEditarDoc, #btnHistory" ).off("click");

		$("#btnEditarDoc").click(function() {
				window.open("https://github.com/SPMSSICC/pages/edit/master/markdown/" + mdFile + ".md", "_blank");
			});
		$("#btnHistory").click(function() {
				loadFileHistory(mdFile, event);
			});

		//$("#btnPDF").attr({"onclick":"window.open('https://spmssicc.github.io/pages/pdf/" + mdFile + ".pdf', '_blank')"});

		if (mdFile == "apresentacao_snc_ap") {$("#btnPDF").attr({"onclick":"window.open('https://view.officeapps.live.com/op/embed.aspx?src=https://spmssicc.github.io/pages/pptx/SPMS_SICC_SNC_AP_20160606_04-pics.pptx','_blank')"});}
		else if (mdFile == "circ1381") {$("#btnPDF").attr({"onclick":"window.open('http://www.dgo.pt/instrucoes/Instrucoes/2016/ca1381.pdf','_blank')"});}
		else if (mdFile == "circ1382") {$("#btnPDF").attr({"onclick":"window.open('http://www.dgo.pt/instrucoes/Instrucoes/2016/ca1382.pdf','_blank')"});}
		else if (mdFile == "dec_lei192") {$("#btnPDF").attr({"onclick":"window.open('https://dre.pt/application/conteudo/70262478','_blank')"});}
		else if (mdFile == "dec_lei85") {$("#btnPDF").attr({"onclick":"window.open('https://dre.pt/application/conteudo/105583346','_blank')"});}
		else {$("#btnPDF").attr({"onclick":"window.open('https://spmssicc.github.io/pages/pdf/" + mdFile + ".pdf','_blank')"});}

		showElements(btnsToShow);
		window.scrollTo(0,0);
}

//load and convert Markdown to Html and show it
function convertMdToHtml(elementId, mdFile, anchor) {

	startLoader();

	//Check if the "elementId" has value to place the converted markdown into the page
	if ( elementId.length < 1 || elementId == undefined ) {
		//window.alert("elementID está vazio! elementId:"+ elementId);
		elementId = "documento";
	}

	//console.log("[convertMdToHtml] mdFile: " + mdFile + "\n[convertMdToHtml] elementId to place the html: " + elementId);

	//Vai buscar o ficheiro markdown ao diretório ./markdown/
	$.get('./markdown/' + mdFile + '.md', function() {
				//console.log("[convertMdToHtml] sucess");
	})
		.done(function(data) {
		    //console.log("[convertMdToHtml] mdFile \"" + mdFile + "\"  loaded");

				//declara 3 variáveis: converter, data e a html. A variável html irá conter o ficheiro markdown convertido em HTML.
				var converter = new showdown.Converter(),	data2, html = converter.makeHtml(data);

				//console.log("[convertMdToHtml] mdFile  \"" + mdFile + "\"  converted to HTML!");

				//Place the converted markdown into the elementID
				$("#" + elementId).html(html).promise().done(function(){

						loadToc(mdFile, "tocDropdown");
						addSharelink(mdFile);

						if(anchor != undefined && anchor.length >= 2){
							setTimeout( function(){ scrollToAnchor(mdFile, anchor); }, 2500);
						}
						else{
							var stateObj = { foo: "bar" }, url =  location.protocol + '//' + location.host + location.pathname + "?doc=" + mdFile;

							history.pushState(stateObj, "SICC - Documentação", url);
							//console.log("[convertMdToHtml] Adicionada entrada no histórico: " + url);
						}
						responsiveTable();
						imageZoom();
				});
				stopLoader("[convertMdToHtml_1]");
  })
		.fail(function() {
				console.log("[convertMdToHtml] Error on document loading. The file \"" + mdFile + "\" exists in the markdown folder?");
				loadIndexContent(['btnMenu'],null);
				stopLoader("[convertMdToHtml_3]");
	});

} /*close convertMdToHtml()*/

//to know the type of a variable
function tipoObj( obj ) {
		return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function scrollToAnchor(mdFile, anchor){

	//the anchor parameter can not have the character "#"

	startLoader();
	var anchorId;

	if(anchor.length > 1){
		anchorId = '#' + anchor;
	}

	try {
			$(anchorId);
		} catch(e) {
			console.log('[scrollToAnchor] URL anchor parameter is invalid: ' + anchorId);
			anchorId = '';
			stopLoader("[scrollToAnchor]");
			return;
		}

	if ($(anchorId).length) {

				var pos = $(anchorId).offset().top - 250;// get top position relative to the document //- 250 to compensate the doc bar

				$('body, html').animate({scrollTop: pos});// set animated top scrolling to the anchorId

				//console.log("[scrollToAnchor] anchorId:" + anchorId + "\n Positions should be the same: " + $(anchorId).offset().top + " <-> " + (pos + 250));

				var stateObj = { foo: "bar" }, url = location.protocol + '//' + location.host + location.pathname + "?doc=" + mdFile + "&anchor=" + anchor; //the anchor parameter can not have the character "#"
				history.pushState(stateObj, "SICC - Documentação", url);
				//console.log("[scrollToAnchor] Adicionada entrada no histórico: " + url);

				anchor = ""; // clear the anchor
		}
		else{
				window.scrollTo(0,0);// top scrolling
				//console.log("[scrollToAnchor] anchorId not found in the html: " + anchorId);
		}
	stopLoader("[scrollToAnchor]");
}

function showElements(elements) {

	hideElements();

	for (i = 0; i < elements.length; i++) {
		$("#" + elements[i]).addClass("show");
	}
	//console.log("[showElements] show: ", elements);
}

function hideElements() {

	var elements = ["btnMenu","btnShowToc","tocDropdown","btnOpt"];

	for (i = 0; i < elements.length; i++) {
		$("#" + elements[i]).removeClass("show");
	}

	if($("#docOptions").hasClass("active")){
		$("#docOptions").removeClass("active");
	}
	//console.log("[hideElements] hide: ", elements);
}

function hideOptions(){
	var options = ["btnEditarDoc","btnPDF", "btnShare", "btnHistory"];

	if($("#documento").length <1){
		$("#btnPdf");
	}
}

// Add zoom functionality to images in the HTML
function imageZoom() {

	var i=0, imgs = $('#documento img'),img;

	if(imgs.length){
		imgs.each(function() {
			img = $(this), alt = img.attr("alt");
			img.wrap("<a class='imagem' href='" + img.attr("src") +	"' onclick='return hs.expand(this)'></a>");

				// add height and width properties to the img tags Works only after the images have been loaded
				/*if(img[0]['height'] > 0 && img[0]['width'] > 0){
						img.attr({'height':img[0]['height']+"px",'width':img[0]['width']+"px"})
				}*/
				//console.log(img);/*+
				i++;
			});
		//console.log("[imageZoom] " + imgs.length + " imgs ready for zoom");
	}
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

		//console.log("[loadCommitHistory] started. Buttons to show: " + btnsToShow);

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

				console.log(response);

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

							//console.log(html_commits);
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
					//.always(){
						//stopLoader();
					//}
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


function addSharelink(mdFile){

	var el, href, i, docURL, docTitle = $("article h1").html();

	docURL = location.protocol + '//' + location.host + location.pathname + "?doc=" + mdFile;
	//add href to the share button in the doc options
	$("#btnShare").attr("onclick","window.open('" + encodeURI("mailto:?Subject=SPMS|SICC|Partilha de documentação: "
	 																							+ docTitle + "&body=\n\nDocumento: " + docTitle + ".\n\nEndereço: " + docURL + "')"));
}


function loadToc(mdFile, elementId) {

	elementId = "#" + elementId;

	if ($(elementId).length) {

		$(elementId).html("");

		var toc="", newLine, el, title, link;
		var toc_top_html =	"<i id='drag1' title='Arraste-me...' class='fa fa-arrows fa-fw' style='cursor: move;'></i>" +
										"<nav role='navigation' class='table-of-contents'>" +
											"<ul>";

		//chose the HTML elements to include in the Table of Content
		$("article h2,h3,h4").each(function() {

				el = $(this);
				link = "#" + el.attr("id");
				title = el.text();
				nodeName = el.get(0).nodeName.toLowerCase();
				newLine = "<li><a class='toc_" + nodeName + "' href='" + link + "'>" + title + "</a></li>";

				toc += newLine;
			});

		toc_bottom_html = "</ul>" + "</nav>" + "<div><i id='drag2' title='Arraste-me...' class='fa fa-arrows fa-fw' style='cursor: move;'></i></div>";

		if ( toc.length > 1 ) {
			$(elementId).html(toc_top_html + toc + toc_bottom_html);
			if(!$(elementId).hasClass("show")){
					$(elementId).addClass("show");
				}
		}
		else{
			$(elementId).removeClass("show");
		}

		//console.log("[loadToc] $(" + elementId + ").html:\n\n" + $(elementId).html());

		/*Dependency: jquery-ui.js*/
		if ($("#tocDropdown").length) {

			$("#tocDropdown").draggable({
					containment: "window",
					handle: "i",
					snap: "#docButtons, #content",
					cursor: "move"/*,
					cursorAt: {top: 5,left: 5}*/
				});
				//$("#tocDropdown").resizable();
		}

		if ($("#tocDropdown").hasClass("show")) {
			$("#btnShowToc").addClass("enabled");
		}
	}
} /*builds toc*/

function showToc() {
	if( $('.dropdown-content').hasClass('show') )	{$('.dropdown-content').removeClass('show');}
	else{ $('.dropdown-content').addClass('show'); }
	if( $('#btnShowToc').hasClass('enabled') )	{$('#btnShowToc').removeClass('enabled');}
	else{ $('#btnShowToc').addClass('enabled'); }
}

function showMenu() {
	if( $('#accordion, #btnMenu').hasClass('showMenu') )	{	$('#accordion, #btnMenu').removeClass('showMenu');}
	else{	$('#accordion, #btnMenu').addClass('showMenu');	}
}

function toggleDocOptions(){
	if( $('.dropdown-doc-options, #btnOpt').hasClass('active') )	{$('.dropdown-doc-options, #btnOpt').removeClass('active');}
	else{ $('.dropdown-doc-options, #btnOpt').addClass('active'); }
}


// Close the dropdown menu and the menu if the user clicks outside of it
window.onclick = function(event) {
	if (!event.target.matches('.dropbtn,#search, #tocDropdown *, .dropdown-content, #btnMenu i, #btnMenu a, #docButtons p') && $("#tocDropdown").hasClass("show")) {
		showToc();
	}
	if (!event.target.matches('.dropdown, #search, #tocDropdown *, .dropdown-content, #btnMenu i, #btnMenu a, #docButtons p, #accordion *, #btnShowToc') && $("#btnMenu").hasClass("showMenu")) {
		console.log($("#btnMenu").hasClass("showMenu"));
		showMenu();
	}
	if (event.target.id == 'behindFileHistory'){
		$("#behindFileHistory, #fileHistory, #btnHistory").removeClass("active");
	}
	if (event.target.id == 'behindSearchMatches'){
		$("#behindSearchMatches, #searchMatches, #searchMatches i").removeClass("active");
	}
};

/*********************************************************************
override standard href-id navigation on page without change HTML markup
for smooth scrolling
*********************************************************************/

// handle links in the table of contents with @href started with '#' only
$('#tocDropdown').on('click', 'a[href^="#"]', function(e) {

		// target element id
		var id = $(this).attr('href');

		// target element
		var $id = $(id);

		if ($id.length === 0) {
			return;
		}
		else{
			$('#tocDropdown *').removeClass('active');
			$(e.target).addClass('active');
			$(e.target.parentNode).addClass('active');
		}

		// prevent standard hash navigation (avoid blinking in IE)
		e.preventDefault();

		// top position relative to the document
		var pos = parseInt($id.offset().top - 50);


		//$('html, body').css({'scrollTop' : pos});

		// animated top scrolling
		$('html, body').animate({'scrollTop' : pos},1000);

		console.log($('html, body').css('scrollTop'));


});
