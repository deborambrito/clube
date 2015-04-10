var baseUrl = "http://api.clubehnd.com.br/";
//var baseUrl = "http://192.168.0.14:11907/";
var db;

$(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
});

function onBackKeyDown() {
             navigator.app.exitApp();
            }

function onDeviceReady() { 

    document.addEventListener("backbutton", onBackKeyDown, false);

    /*
    db = window.openDatabase("Contatos", "1.0", "ContatosDTO", 1000);
    db.transaction(function(tx) {
          tx.executeSql('DROP TABLE IF EXISTS CONTATOS');
          tx.executeSql('DROP TABLE IF EXISTS OPERADORA');
          tx.executeSql("CREATE TABLE IF NOT EXISTS CONTATOS(" +   
                "ContatoID,"+
                "UsuarioFK,"+
                "OrigemContatoFK,"+
                "Nome,"+
                "Email,"+
                "Telefone1,"+
                "Telefone2,"+
                "Operadora1FK,"+
                "Operadora2FK,"+
                "Observacao,"+
                "CriadoEm,"+
                "Ativo,"+
                "Aniversario,"+
                "Endereco,"+
                "Cidade,"+
                "Estado,"+
                "Bairro,"+
                "CEP,"+
                "NumeroEndereco,"+
                "Complemento,"+
                "Comprou,"+
                "InteressadoProduto,"+
                "Rede,"+
                "InteressadoRede,"+
                "EnvioEmails,"+
                "CPF)");

          tx.executeSql("CREATE TABLE IF NOT EXISTS OPERADORA(" +   
                "OperadoraID,"+
                "Nome,"+
                "CodigoTelein,"+
                "Ativo)");

    }, function(e) {
      alert("ERROR: " + e.message);
    });
    */
    window.localStorage.clear();    

    if (window.StatusBar) {
        window.StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#FFF");
        StatusBar.styleDefault();
    }

    if (window.localStorage.getItem("token") == "" || window.localStorage.getItem("token") == null) {
        $.mobile.pageContainer.pagecontainer("change", "index.html", {});
        //$.mobile.changePage( "../index.html", {transition: "flip"});
        logado = false;
    } else if ((window.localStorage.getItem("token") != "" && window.localStorage.getItem("token") != null) && $.mobile.activePage.attr('id') == "login-page") {
        
            
        $.ajax({  
            url: baseUrl + "api/account/is-alive",
            method: "GET",
            xhrFields: { withCredentials: true },
            headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
            beforeSend: function() {            
                //$(".loader").show();          
            },
            success: function(json) {   
            alert("passou default");                    
                $.mobile.changePage( "../home.html", {transition: "slide"});
            },
            error: function(xhr, ajaxOptions, thrownError) {
                ErrorAjaxPadrao(xhr, ajaxOptions, thrownError);
                logado = false;
            },
            complete: function() {
                $(".loader").hide();    
            }
        });                
    }

    pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);
             
             function fileSystemSuccess(fileSystem) {
    
                var directoryEntry = fileSystem.root; 
                var rootdir = fileSystem.root;
                 filee = rootdir.toURL(); 
                

            }

            function fileSystemFail(evt) {
            alert(evt.target.error.code);
            }  
}

function ErrorAjaxPadrao(xhr, ajaxOptions, thrownError) {
    var json = $.parseJSON(xhr.responseText);
    console.log(xhr);
    console.log(xhr.status);
    console.log(json.Message);
    if (xhr.status == 401 && json.Message == "Authorization has been denied for this request.") {
        navigator.notification.alert(
            "Sua sessão expirou.", 
            function() { 
                window.localStorage.setItem("token", ""); 
                $.mobile.changePage("../index.html", {transition: "slide", reverse: true}); 
            }, 
            "Erros:", 
            "Ok");
    }
    else{
        navigator.notification.alert("Ocorreu um erro no sistema. Por favor dentro novamente dentro alguns minutos.", null, "Erros:", "Ok");
    }
}