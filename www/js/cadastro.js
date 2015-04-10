var jsonLeads;
var jsonDetalheLead;
var nomePagina;

$(function() {
	$(document).on("pageinit", "#cadastro-page", BuscarLandingPages);
    $(document).on('click', '.carregar-cadastros-interna', ClickCadastrosInterna);
    $(document).on('click', '.carregar-lead', ClickCarregarLead);
    $(document).on('pageinit', "#cadastros-interna-page", ConstruirTelaLeads);
    $(document).on('pageinit', "#detalhe-lead-page", ConstruirTelaDetalheLead);    
});

function BuscarLandingPages() {		
	  $.ajax({
	    url: baseUrl + "landingpages/buscar",
	    method: "GET",
	    xhrFields: { withCredentials: true },
	    headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
	    beforeSend: function() {	    	
	    	//$(".loader").show();	    	
        },
	    success: function(json) {	    		    	
	    	ConstruirTelaLandingPages(json);
	    },
	    error: function(xhr, ajaxOptions, thrownError) {
	        ErrorAjaxPadrao(xhr, ajaxOptions, thrownError);
	    },
	    complete: function() {
        	$(".loader").hide();	
        }
	});
}

function ConstruirTelaLandingPages(json) {
	var html = "";

	$(json).each(function(index, obj) {		
		html = html + '<li class="ul-li-has-thumb-profile">' + 
							'<a data-nomepagina="'+ obj.Nome +'" class="carregar-cadastros-interna" data-id="' + obj.LandingPageID +'" href="">' +
								'<div class="img-profile"><img src="'+ obj.Imagem +'"></div>' +
								'<h2>'+ obj.Nome +'</h2>'+
								'<p>Página criada em '+ obj.CriadoEm +'</p>'+
							'</a>'+
						'</li>'
	});

    $("#lista-landing").html(html);
    $('#lista-landing').listview('refresh');
}

function ClickCadastrosInterna(e) {
	e.preventDefault();	
	BuscarLeads($(this).data('id'), $(this).data('nomepagina'));	
}

function ClickCarregarLead(e) {
	e.preventDefault();	
	BuscarDetalheLead($(this).data('id'));	
}

function BuscarDetalheLead(id) {
	$.ajax({
	    url: baseUrl + "landingpages/buscar-detalhe-lead",
	    method: "GET",
	    data: { leadId: id },
	    xhrFields: { withCredentials: true },
	    headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
	    beforeSend: function() {	    	
	    	//$(".loader").show();	    	
        },
	    success: function(json) {	    		    	
	    	jsonDetalheLead = json;	    	
	    	$.mobile.pageContainer.pagecontainer("change", "cadastros-detalhes.html", { reload: true, transition: "slide"});
			//$.mobile.changePage("../cadastros-detalhes.html", { transition: 'slide' });
	    },
	    error: function(xhr, ajaxOptions, thrownError) {
	        ErrorAjaxPadrao(xhr, ajaxOptions, thrownError);
	    },
	    complete: function() {
        	$(".loader").hide();	
        }
	});
}

function BuscarLeads(id, nome_pagina) {
	nomePagina = nome_pagina;

	$.ajax({
	    url: baseUrl + "landingpages/buscar-leads",
	    method: "GET",
	    data: { landingPageId: id },
	    xhrFields: { withCredentials: true },
	    headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
	    beforeSend: function() {	    	
	    	//$(".loader").show();	    	
        },
	    success: function(json) {	    		    	
	    	jsonLeads = json;	
	       $.mobile.pageContainer.pagecontainer("change", "cadastros-interna.html", { reload: true, transition: "slide"});    	
			//$.mobile.changePage("../cadastros-interna.html", { transition: 'slide' });
	    },
	    error: function(xhr, ajaxOptions, thrownError) {
	        ErrorAjaxPadrao(xhr, ajaxOptions, thrownError);
	    },
	    complete: function() {
        	$(".loader").hide();	
        }
	});
}

function ConstruirTelaLeads() {
	var html = "";

	$(jsonLeads).each(function(index, obj) {		
		html = html + '<li><a class="carregar-lead" data-id="'+ obj.LeadID +'"><h2>'+ obj.CriadoEm +'</h2><h3>'+ obj.Nome +'</h3></a></li>';
	});	

	$(".nome-pagina").text(nomePagina);
	
    $("#lista-cadastros").html(html);
    $('#lista-cadastros').listview('refresh');
}

function ConstruirTelaDetalheLead() {
	var html = "";

	$(".nome-lead").text(jsonDetalheLead.Nome);
	$(".email-lead").html(jsonDetalheLead.Email);
	$(".email-lead").attr('href', "mailto:" + jsonDetalheLead.Email);
	$(".telefone1").text(jsonDetalheLead.Telefone1);
	$(".telefone2").text(jsonDetalheLead.Telefone2);
	$(".cep").text(jsonDetalheLead.Cep);
	$(".criadoem").text(jsonDetalheLead.CriadoEm);
	$(".carta").text(jsonDetalheLead.Carta);

	$(".nome-pagina").text(nomePagina);
	
    $("#lista-cadastros").html(html);
    $('#lista-cadastros').listview('refresh');
}

