$(function() {
	$(document).on('submit', "#frm-login", FazerLogin);
})

var alerta = false;
var conversaid = "";
var logado = false;

function FazerLogin(e) {

	e.preventDefault();
	var erros = "";

    if ($.trim($("#login").val()) == "") {
        erros = erros + 'Login obrigatório.\n';
    }

    if ($.trim($("#senha").val()) == "") {
        erros = erros + 'Senha obrigatória.\n';
    }

    if (erros.length > 0){
        navigator.notification.alert(erros, null, "Erros:", "Ok");
        return false;
    }

    $.ajax({
        url: baseUrl + "token",
        method: "POST",        
        data: $("#frm-login").serialize(),
        beforeSend: function() {
        	//$(".loader").show();
        },
        success: function(json) {
            window.localStorage.setItem("token", json.access_token);
            login();
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert("ERRO");
        	if (xhr.status == 400 || json.error == "invalid_grant"){
		        navigator.notification.alert("Usuário ou senha incorretos.", null, "Erros:", "Ok");
		    }
		    else {
		    	ErrorAjaxPadrao(xhr, ajaxOptions, thrownError);
		    }
		},
        complete: function() {
        	$(".loader").hide();	
        }
    });
}

 var idLogin;
 var idMobile;

var app = {

    initialize: function() {
        
        this.bindEvents();
    },
    
    bindEvents: function() {
        document.addEventListener('deviceready', function(){
        var pushNotification = window.plugins.pushNotification;
        
        
        pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"911380003317","ecb":"app.onNotificationGCM"});
         
        }, false);
    },
   
    onDeviceReady: function() {
        
        app.receivedEvent('deviceready');
               
    },

    successHandler: function(result) {
       
    },

    errorHandler:function(error) {
        
    },

    
    receivedEvent: function(id) {
        
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    

    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    
                    idMobile = e.regid;

                    var dados = 
                    {
                        "idto":idlogin,
                        "idmobile": idMobile
                    };
                    dados = JSON.stringify(dados);
                    var link = "http://api.clubehnd.com.br/api/Chat/SalvarCodigoMobile";
        
                    $.ajax({

                             type: 'POST',
                             cache: false,
                             contentType: 'application/json; charset=utf-8',
                             url: link,
                             data:dados,
                             dataType: "json",
                             xhrFields: { withCredentials: true },
                            headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
                            success: function ()
                            {           
                            } 

                    });
                }
            break;
 
            case 'message':
           
            alerta = true;
            printObject(e.payload);
              // this is the actual push notification. its format depends on the data model from the push server
              //alert('message = '+e.message+' msgcnt = '+e.msgcnt);
              
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    }
};

function init(id){

    idlogin = id;
        app.initialize();

}

function printObject(o) {
  var out = '';

  for (var p in o) {
    if(p == "deid")
    {
        $.mobile.changePage("chat-mensagens.html", {transition: "pop"});
        Conversa(o[p]);
    }
    out += p + ': ' + o[p] + '\n';
  }
}

