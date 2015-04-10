    var logIn = "";
    var logCon = "";
    var timeout;
    var dt = new Date();
    var date = (dt.getDate() < 10) ? "0" + dt.getDate() : dt.getDate();
    var dthoje = (dt.getMonth() < 10 ) ? date + "/" + "0" + (dt.getMonth()+1) + "/" + dt.getFullYear() : date + "/" +  (dt.getMonth()+1)  + "/" + dt.getFullYear();
    var hour = (dt.getHours() < 10 ) ? "0" + dt.getHours() : dt.getHours();
    var minutes = (dt.getMinutes() < 10) ? "0" + dt.getMinutes() : dt.getMinutes(); 
    var datet = ((dt.getDate() - 1) < 10) ? "0" + dt.getDate() -1 : dt.getDate()-1;
    var dtontem = (dt.getMonth() < 10 ) ? datet + "/" + "0" + (dt.getMonth()+1) + "/" + dt.getFullYear() : datet + "/" + (dt.getMonth()+1)  + "/" + dt.getFullYear(); 
    var linkurl = "http://api.clubehnd.com.br";
    //var linkurl = "http://192.168.0.14:11907";
    var filee = ""; 

    $(function() {
        document.addEventListener("deviceready", onDeviceReady, false);
    
    });

   
    function TextArea(){

        $("#divmedia").attr("class","group-footer chat-active");

    }


    function ListaContatos(){

            var link = linkurl + "/api/Chat/ListarContatos"; 

            var data = {"idto":logIn};

            data = JSON.stringify(data);

            $.ajax({
               type: 'POST',
                cache: false,
                contentType: 'application/json; charset=utf-8',
                url: link,
                data:data,
                dataType: "json",
                xhrFields: { withCredentials: true },
                headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
                success: function (json)
                {     
                    var a = "";

                    $(json).each(function(){
                        
                        a += "<li class='ul-li-has-thumb-profile lista-contatos'>"+
                            "<a  href='chat-mensagens.html' id='"+ this.Id +"' data-transition='slide' class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='Conversa("+this.Id+");'>"+
                                "<h2>"+ this.Nome + " " +this.Sobrenome+"</h2>"+
                            "</a>"+
                        "</li>";
                          
                    });   

                  $("#contatoconversa").html(a);
     
                } 
            });
        $("#contatoconversa li:first").addClass('ui-first-child');
        $("#contatoconversa li:last").addClass('ui-last-child');
    }

    var body = "";
    
   
    function Conversa(clickid){

            logCon = clickid;
            var link = linkurl + "/api/Chat/BuscarNome";
            var data = {"idfrom":logCon};

            data = JSON.stringify(data);

             $.ajax({
                type: 'POST',
                cache: false,
                contentType: 'application/json; charset=utf-8',
                url: link,
                data:data,
                dataType: "json",
                xhrFields: { withCredentials: true },
                headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
                success: function (json)
                {     
                    body = json;
                    $(".titulomsg").html(body); 
                    $("#headermensagem").toolbar("refresh");
                    Messagem(logCon);  
                } 
            });

                            
            

    }


    function VoltarMensagem(){

            //clearInterval(time);
            ListaContatos();

    }
       
        

        function Chat(){

            var link = linkurl +"/api/Chat/MensagemRecente";
            
            var data = {"idto": logIn};

            data = JSON.stringify(data);


           $.ajax({
               type: 'POST',
                cache: false,
                contentType: 'application/json; charset=utf-8',
                url: link,
                data:data,
                dataType: "json",
                xhrFields: { withCredentials: true },
                headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
                success: function (json)
                {  
                    var lista = "";
                    $(json).each(function(){

                        var de = this.De;
                        var para = this.Para;

                        if(de == logIn){   
                                           
                         lista += "<li class='ul-li-has-thumb-profile new-message'>"+
                                    "<a  href='chat-mensagens.html' data-transition='slide' class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='Conversa("+para+");'>"+                                       
                                        "<h2>"+this.UsuarioPara_Nome + " " + this.UsuarioPara_SobreNome+"</h2>"+
                                        "<p class='ultima-mensagem'>"+this.UsuarioDe_Nome+": "+this.Texto+"</p>"+                                        
                                    "</a>"+
                                "</li>";   
                        } else if (para == logIn){
                         lista += "<li class='ul-li-has-thumb-profile new-message'>"+
                                    "<a  href='chat-mensagens.html' data-transition='slide' class='ui-btn ui-btn-icon-right ui-icon-carat-r' onclick='Conversa("+de+");'>"+
                                        "<h2>"+this.UsuarioDe_Nome + " " + this.UsuarioDe_SobreNome+"</h2>"+
                                        "<p class='ultima-mensagem'>"+this.UsuarioDe_Nome+": "+this.Texto+"</p>"+                                        
                                    "</a>"+
                                "</li>";   

                        }                 
                        
                         $("#listamsgrecente").html(lista);
                    });
    
                       
                    
                } 
            });


        }

        function Enviar(){

            var dt = new Date();
            var msg = $("#inbox-continue-conversation").val();

            $("#divmedia").attr("class","group-footer");
     
            $("#inbox-continue-conversation").val("");

             
             $("#listamensagem").append("<div class='mensagem enviada mensagem-texto'>"+
                                        "<div class='msg'>"+
                                        "<p>"+msg+"</p>"+
                                        "<div class='status-time'>"+
                                        "<time class='msg-time'>"+dthoje+" " + hour + ":" + minutes + "</time>"+
                                        "<span  class='status ok'>"+
                                        "<i id='statusmsg' class='ionicons ion-android-time'></i>"+
                                        "</span>"+
                                        "</div>"+
                                        "</div>"+
                                    "</div>");
             $("html,body").animate({scrollTop: $(document).height()}, 0);
             
            var data = {
                "FromId": logIn,
                "Message": msg,
                "ToId": logCon
            }

            data = JSON.stringify(data);
                 
          
            

            $.ajax({
                type: 'POST',
                cache: false,
                contentType: 'application/json; charset=utf-8',
                url: linkurl + '/api/Chat/SalvarMensagem',
                data: data,
                dataType: "json",
                xhrFields: { withCredentials: true },
                headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
                success: function ()
                {    
                    /*
                    db.transaction(function (tx) {
                        
                    tx.executeSql('INSERT INTO MENSAGENS (TipoFK,Assunto,Texto,De,Para,Visualizada,AtivoDe,AtivoPara,EnviadoEm,TipoMsg,Imagem) VALUES (" "," ","'+msg+'","'+logIn+'", "'+logCon+'"," ", " ", " ", "'+ dthoje +'"," ", " ")');
                    tx.executeSql("SELECT m.Texto, m.De, m.Para, m.EnviadoEm, m.TipoMsg, m.Imagem FROM MENSAGENS m where (m.De='"+logIn+"' and m.Para='"+logCon+"') or m.De='"+logCon+"' and m.Para='"+logIn+"' ",[],getEmployees_success);
                   
                   }, function(error){alert( error.code + " " + error.message);}, function(){});
                   */
                 
                   Messagem(logCon);

                }
            });
           
        }

        function getEmployees_success (tx, results)
        {
           
             var len = results.rows.length;
             for (var i=0; i<len; i++) {
             var employee = results.rows.item(i);
             alert(employee.Texto + employee.De + employee.Para);
             }
        }

        var path ="";
        var aux = "";

        function imagem (texto)
        {

            alert("entrou");
            aux = texto;
            alert(aux);
        }



        function Messagem(click){
            $("#statusmsg").attr("class","ionicons ion-android-done");

            var dt = new Date();
            var link = linkurl +"/api/Chat/ListarMensagens";
            
            
            var data = {"idto":logIn, "idfrom": click};

             data = JSON.stringify(data);  

            $.ajax({
                type: 'POST',
                cache: false,
                contentType: 'application/json; charset=utf-8',
                url: link,
                data:data,
                dataType: "json",
                xhrFields: { withCredentials: true },
                headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
                success: function (json)
                {
                    var s ="";
                    var ultimaData = "";
                    

                    $(json).each(function(){


                        $(this).each(function(){
                            
                          var DataMsg = this.DateTime;
                          var TipoMsg = this.TipoMsg;
                          var FromId = this.FromId;

                         if (ultimaData == "" || ultimaData != DataMsg.substr(0,10))
                          {
                                 ultimaData = DataMsg.substr(0,10);


                              if(DataMsg.substr(0,10) == dthoje)
                              {
                                 s += "<div class='data-mensagens'><span>Hoje</span></div>";

                              }else if (DataMsg.substr(0,10) == dtontem)
                              {

                                s += "<div class='data-mensagens'><span>Ontem</span></div>";
                              
                              }else{

                                s+= "<div class='data-mensagens'><span>"+DataMsg.substr(0,10)+"</span></div>";
                              }
                         }                                

                            if(TipoMsg == "I")
                            {

                                
                                    var fileTransfer = new FileTransfer();
                                    var uri = encodeURI(this.Message);
                                    var filePath = filee + "SuperConsultor/Imagens/" +this.Imagem;                                    
                                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
                                        fileSystem.root.getFile(filePath.replace("file:///","/"), { create: false }, function(){
                                            
                                        }, function(){ 

                                            fileTransfer.download(
                                                uri,
                                                filePath,
                                                function(entry) {
                                                                              
                                                },
                                                function(error) {
                                                    alert("Erro ao carregar imagem");
                                                   
                                                },
                                                false,
                                                {
                                                    headers: {
                                                        "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
                                                    }
                                                }
                                            );

                                        });
                                    });
                                   
                                    
                           
                                if (logIn == FromId){
                                                
                                        s+= "<div class='mensagem enviada mensagem-imagem'>"+
                                                "<div class='msg'>"+
                                                    "<div class='image-preview'>"+
                                                        "<a href='#popupImagemConversa' class='msgpopup' data-src='"+filePath+"' data-rel='popup' data-position-to='window' data-transition='pop'>"+
                                                            "<img src='"+filePath+"'>"+
                                                        "</a>"+
                                                    "</div>"+
                                                    "<div class='status-time'>"+
                                                        "<time class='msg-time'>"+this.DateTime+"</time>"+
                                                        "<span  class='status ok'>"+
                                                            "<i id='statusmsg' class='ionicons ion-android-done'></i>"+
                                                        "</span>"+
                                                    "</div>"+
                                                "</div>"+
                                            "</div>";

                                           
                                }else{

                                        s+= "<div class='mensagem recebida mensagem-imagem'>"+
                                                "<div class='msg'>"+
                                                    "<div class='image-preview'>"+
                                                        "<a href='#popupImagemConversa' class='msgpopup' data-src='"+filePath+"' data-rel='popup' data-position-to='window' data-transition='pop'>"+
                                                            "<img src='"+filePath+"'>"+
                                                        "</a>"+
                                                    "</div>"+
                                                    "<div class='status-time'>"+
                                                        "<time class='msg-time'>"+this.DateTime+"</time>"+
                                                         "<span  class='status ok'>"+
                                                            "<i id='statusmsg' class='ionicons ion-android-done'></i>"+
                                                        "</span>"+
                                                    "</div>"+
                                                "</div>"+
                                            "</div>";
                                }
                                
                            }else if (TipoMsg == "" || TipoMsg == null){
                                   
                                    if (logIn == FromId){
                                    s+= "<div class='mensagem enviada mensagem-texto'>"+
                                            "<div class='msg'>"+
                                                "<p>"+this.Message+"</p>"+
                                                "<div class='status-time'>"+
                                                    "<time class='msg-time'>"+this.DateTime+"</time>"+
                                                    "<span class='status ok'>"+
                                                        "<i id='statusmsg' class='ionicons ion-android-done'></i>"+
                                                    "</span>"+  
                                                "</div>"+
                                            "</div>"+
                                    "</div>" ;


                                    }else{          
                                        
                                        s+= "<div class='mensagem recebida mensagem-texto'>"+
                                            "<div class='msg'>"+
                                                "<p>"+this.Message+"</p>"+
                                                "<div class='status-time'>"+
                                                    "<time class='msg-time'>"+this.DateTime+"</time>"+
                                                    "<span  class='status ok'>"+
                                                        "<i id='statusmsg' class='ionicons ion-android-done'></i>"+
                                                    "</span>"+                                                      
                                                "</div>"+
                                            "</div>"+
                                    "</div>" ;
                                    }
                            }
   
       
                       });
                       

                    }); 

                        s+="<script>$('.msgpopup').click(function(){"+ 
                             "var linkmsg = $(this).data('src');"+
                             "$('.popphoto').attr('src',''+ linkmsg);"+
                             "}); </script>";

 
                           setTimeout(function(){

                                $("#listamensagem").html(s);

                                $("html,body").animate({scrollTop: $(document).height()}, 0);

                          },5000); 


                }
        
            });
      }
        // LISTA CONTATOS


 function Popup()
 {
    
    var linkmsg = $(this).data("src");
    alert(linkmsg);
    $(".popphoto").attr('src',""+ linkmsg);

    //$("#poppopup").append("AAA" + link);
 }


      // valida Login 

    function login()
    {
      var link = linkurl + "/api/Chat/BuscarId";

        var data = {"email":""};

        data = JSON.stringify(data);

     $.ajax({
                type: 'POST',
                cache: false,
                contentType: 'application/json; charset=utf-8',
                url: link,
                data:data,
                dataType: "json",
                xhrFields: { withCredentials: true },
                headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
                success: function (json)
                {

                    $.mobile.changePage("home.html", {transition: "slide"});
                    logIn = json;
                    init(logIn);  
                    
                    
               }

        });   


    }

// tirar foto

function clearCache() {

    navigator.camera.cleanup();
}


function Picture(){
    $("#menuUpload").popup("close");
    navigator.camera.getPicture(
                uploadPhoto,
                function(message) {},
                {
                    quality         : 50,
                    destinationType : Camera.DestinationType.FILE_URI
                }
            );
}

   
function getPhoto() {
    $("#menuUpload").popup("close");
      navigator.camera.getPicture(
                uploadPhoto,
                function(message) { },
                {
                    quality         : 50,
                    destinationType : Camera.DestinationType.FILE_URI,
                    sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM
                }
            );
    }   

 
  function uploadPhoto(imageURI) {


     setTimeout(function() {
        $("html,body").animate({scrollTop: $(document).height()}, 0);
     }, 10);
     $("#listamensagem").append( "<div class='mensagem enviada mensagem-imagem'>"+
                                    "<div class='msg'>"+
                                    "<div class='image-preview'>"+
                                    "<a align='center' href='' class='msgpopup' data-src='' data-rel='popup' data-position-to='window' data-transition='pop'>"+
                                    "<img src='download.gif' align='center'>"+
                                    "</a>"+
                                    "</div>"+
                                    "<div class='status-time'>"+
                                    "<time class='msg-time'>"+dthoje+" " + hour + ":" + minutes + "</time>"+
                                    "<span  class='status ok'>"+
                                    "<i id='statusmsg' class='ionicons ion-android-time'></i>"+
                                    "</span>"+
                                    "</div>"+
                                    "</div>"+
                                    "</div>");

             

        var dt = new Date();
        var time = dt.getDate() + "-" + dt.getMonth() + "-" +dt.getFullYear() + "-" + dt.getHours() + "-" + dt.getMinutes() + "-" + dt.getSeconds();
        var options = new FileUploadOptions();
        options.fileKey="file";
        options.fileName=time + ".jpg";
        options.mimeType="image/jpeg";

        var params = new Object();
        params.value1 = logIn;
        params.value2 = logCon;
        params.headers = {"Authorization": "Bearer " + window.localStorage.getItem("token")};
        params.xhrFields = {withCredentials: true};
        options.params = params;
        alert(imageURI);

        var ft = new FileTransfer();
        ft.upload(imageURI, linkurl + "/api/Download/downloadimagem", win, fail, options);
       
     
  }

function win(r) {

    Messagem(logCon);
}

function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            alert("upload error source " + error.source);
            alert("upload error target " + error.target);
}





// GRAVAR AUDIO
var d = new Date();
var name = "" + d.getDate() +  d.getMonth() + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds();
var mediaRecFile = name + ".mp3";
var my_recorder = null;
var my_player = null;

function GravarAudio(){

        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccessAudio, function(){alert("erro!!")});
            
        my_recorder = new Media("PushPush/Media/" + mediaRecFile, function(){uploadMedia();},  function(){alert("my_recorder fail");});
        
        recordNow();

}

function recordNow() {
        
        my_recorder.startRecord();
        $(".stopped").attr("style","display:none");
            $(".recording").attr("style"," ");
        alert("gravando");
/*
        // Get duration
        var counter = 0;
        var timerDur = setInterval(function() {
            counter = counter + 100;
            if (counter > 2000) {
                clearInterval(timerDur);
            }        
        var dur = my_recorder.getDuration();
            if (dur > 0) {
                clearInterval(timerDur);
                document.getElementById('timerecord').innerHTML = (dur) + " sec";
            }

        }, 100);

        setTimeout(function() {

        my_recorder.stopRecord();
        document.getElementById('RecStatusID').innerHTML = "Forçado a parar, duração: " + my_recorder.getDuration();
    }, 10000);// apos 10 sec ele para 
*/
}

// Stop recording
function stopRecording() {
     alert("stop");
        my_recorder.stopRecord(); 
        document.getElementById('RecStatusID').innerHTML = "Stop, duração: " + my_recorder.getDuration();
}

function CancelarMidia(){

    my_recorder = null;
    alert("Media cancelada! ");
}

function onSuccessAudio(fileSystem) {
        // criando pasta
         fileSystem.root.getDirectory("PushPush/Media", { create: true, exclusive: false }, function(){},function(){});
}


 function uploadMedia() {

        alert("entrou uploadMedia");
        alert("Media name: " + mediaRecFile);
        alert("Duracao: " + my_recorder.getDuration())

             var fp = "";
        
  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccesss, fileSystemFaill);

            function fileSystemSuccesss(fileSystem) {
    
                var directoryEntry = fileSystem.root; // to get root path of directory
                var rootdir = fileSystem.root;
                 fp = rootdir.toURL(); // Returns Fulpath of local directory
                 alert("fileSystemSuccesss:("+fp+")");

            var fileURI = "" + fp + my_recorder.src;
            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName= fileURI.substr(fileURI.lastIndexOf('/')+1);
            options.mimeType = "audio/mp3";

            var params = new Object();

            params.arquivo = mediaRecFile;
            params.logado = logIn;
            params.conversa = logCon; 

            options.params = params;

            alert("fileURI: " + fileURI);

            var ft = new FileTransfer();

            ft.upload(fileURI, linkurl + "/Home/Media", win, function(){Messagem(logCon);}, options);

            }

            function fileSystemFaill(evt) {
            //Unable to access file system
            alert(evt.target.error.code);
            }

          
        
  }



    // onError Callback
    //
    function onErrorAudio(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }


    // gravar video


      function captureSuccess(mediaFiles) {
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            uploadFile(mediaFiles[i]);
        }
    }

    // Called if something bad happens.
    //
    function captureError(error) {
        var msg = 'An error occurred during capture: ' + error.code;
        navigator.notification.alert(msg, null, 'Uh oh!');
    }

    // A button will call this function
    //
    function getVideo() {
        // Launch device video recording application,
        // allowing user to capture up to 2 video clips
        //navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1});
        navigator.camera.getPicture(uploadFile, function(error){}, { quality:
            50, destinationType: Camera.DestinationType.FILE_URI , sourceType: pictureSource.PHOTOLIBRARY ,
            mediaType:Camera.MediaType.VIDEO });
    }

    function Video() {

       // navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 1});
    
    }

    // Upload files to server
    function uploadFile(mediaFile) {
        alert("entrou uploadFile");

    

        var ft = new FileTransfer(),
            path = mediaFile,
            name = "teste.mp4";

            alert("mediaFile: "  + path);
        
            
        

        var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName= mediaFile.substr(mediaFile.lastIndexOf('/')+1);
            options.mimeType = "video/mpeg";
            

         var params = new Object();

            params.arquivo = name;
            params.logado = logIn;
            params.conversa = logCon; 

        options.params = params;

        ft.upload(path, linkurl + "/api/download/DownloadVideo",function(result) {},function(error) {},
            options);
    
 }

