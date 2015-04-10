

    

var contatoselec;

$(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
    $(document).on('click', '.btncontatos', CarregaContatos); 
    $(document).on('click','.contato-novo', CarregaOperadora); 
    $(document).on('click','.btneditar',EditaContato); 
    $(document).on('click','.btn-gravar-edit',AlterarContato); 


});

    
function GravarContato(){

	var nome = $("#nomecont").val();
	var email = $("#emailcont").val();
	var telefone1 = $("#telefone1cont").val();
	var telefone2 = $("#telefone2cont").val();
    var cpf = $("#cpfcont").val();
    var aniversario = $("#anicont").val();
    var operadora1 = $("#select-operadora-1").val();
    var operadora2 = $("#select-operadora-2").val();
    var endereco = $("#enderecocont").val();
    var numero = $("#numerocont").val();
    var complemento = $("#complementocont").val();
    var cep = $("#cepcont").val();
    var bairro = $("#bairrocont").val();
    var cidade = $("#cidadecont").val();
    var estado = $("#estadocont").val();
    var comprou = document.getElementById("comproucont").checked;
    var envioemail =  document.getElementById("envioemailcont").checked;
    var intproduto =  document.getElementById("intprodutocont").checked;
    var intrede =  document.getElementById("intredecont").checked;
    var rede =  document.getElementById("redecont").checked;
    var observacao = $("#observacaocont").val();



    var link = baseUrl + "/contatos/gravarcontato"; 
	
    var data = {
                "Nome": nome,
                "Email": email,
                "Telefone1": telefone1,
                "Telefone2": telefone2,
                "Operadora1": operadora1,
                "Operadora2": operadora2,
                "Observacao": observacao,
                "Aniversario": aniversario,
                "Endereco": endereco,
                "Cidade": cidade,
                "Bairro": bairro,
                "Estado": estado,
                "CEP": cep,
                "NumeroEndereco": numero,
                "Complemento": complemento,
                "CPF": cpf,
                "Comprou": comprou,
                "InteressadoProduto": intproduto,
                "Rede": rede,
                "InteressadoRede": intrede,
                "EnvioEmail": envioemail
               }


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
                success: function (result)
                {     
                   
                    alert(result); 
     
                } 
            });

}

function CarregaContatos()
{
   
        $.ajax({
        url: baseUrl + "contatos/carregacontatos",
        method: "GET",
        xhrFields: { withCredentials: true },
        headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
        success: function(json) {

            var text = "";

             $(json).each(function(){
                        
                 $(this).each(function(){
                   /*
                    db.transaction(function (tx) {
                        
                        tx.executeSql('INSERT INTO CONTATOS (ContatoID,UsuarioFK,OrigemContatoFK,
                            Nome,Email,Telefone1,Telefone2,Operadora1FK,Operadora2FK,Observacao,
                            CriadoEm,Ativo,Aniversario,Endereco,Cidade,Estado,Bairro,CEP,NumeroEndereco,
                            Complemento,Comprou,InteressadoProduto,Rede,InteressadoRede,EnvioEmails,CPF) 
                            VALUES ("'+this.ContatoID+'","'+this.UsuarioFK+'","'+this.OrigemContatoFK+'",
                                "'+this.Nome+'","'+this.Email+'","'+this.Telefone1+'","'this.telefone2'","'+this.Operadora1FK+'","'+this.Operadora2FK+'",
                                "'+this.Observacao+'","'+this.CriadoEm+'","'+this.Ativo+'","'+this.Aniversario+'","'this.Endereco'","'+this.Cidade+'",
                                "'+this.Estado+'","'+this.Bairro+'","'+this.CEP+'","'+this.NumeroEndereco+'","'+this.Complemento+'","'+this.Comprou+'",
                                "'+this.InteressadoProduto+'","'+this.Rede+'","'+this.InteressadoRede+'","'+this.EnvioEmails+'","'+this.CPF+'")');
                    
                        }, function(error){alert( error.code + " " + error.message);}, function(){});
                    */
                   text += "<li>"+
                           "<a href='contatos-detalhe.html' data-transition='slide' onclick='DetalheContato("+this.ContatoID+")'>"+
                           "<h2>"+this.Nome+"</h2>"+
                           "</a>"+
                           "</li>";       
                          
                 });        
                          
            });
            $("#carregalista").html(text);  
            $("#carregalista").listview('refresh');
             $(".contato-nome-list").html("<li><p>E-mail</p><h2></h2></li>"+
                               "<li><p>Operadora 1</p><h2></h2></li>"+
                               "<li><p>Telefone 1</p><h2></h2></li>"+
                               "<li><p>Operadora 2</p><h2></h2></li>"+
                               "<li><p>Telefone 2</p><h2></h2></li>"+
                               "<li><p>Aniversário</p><h2></h2></li>"+
                               "<li><p>CPF</p><h2></h2></li>"+
                               "<li><p>Endereço </p><h2></h2></li>"+
                               "<li><p>NumeroEndereco </p><h2></h2></li>"+
                               "<li><p>Complemento </p><h2></h2></li>"+
                               "<li><p>CEP </p><h2></h2></li>"+
                               "<li><p>Bairro </p><h2></h2></li>"+
                               "<li><p>Cidade </p><h2></h2></li>"+
                               "<li><p>Estado </p><h2></h2></li>"+
                               "<li><p>Contato criado </p><h2></h2></li>"+
                               "<li><p>Interessado Produto </p><h2></h2></li>"+
                               "<li><p>Interessado Rede </p><h2></h2></li>"+
                               "<li><p>Rede </p><h2></h2></li>"+
                               "<li><p>Observação </p><h2></h2></li>");
      $(".contato-nome-list").listview('refresh');

        }
    });


}

function DetalheContato(contatoID)
{

    

    var link = baseUrl + "contatos/detalhecontato"; 
    
    var data = {"ContatoID": contatoID};


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
                   var b ="";

                    $(json).each(function(){
                        
                         $(this).each(function(){
                            
                          contatoselec = this.ContatoID;

                          $(".contato-nome").html(this.Nome);
                          $(".btncontatos").attr('data-idcontato',this.ContatoID);
                          
                          var arrniver = (this.Aniversario).split("/");
                          var dtniver = (arrniver[1] < 10 ? "0" + arrniver[1] : arrniver[1]) + "/" + (arrniver[0] < 9 ? "0" + arrniver[0] : arrniver[0]) + "/" + arrniver[2] 
                                        
                            b = "<li><p>E-mail</p><h2>"+this.Email+"</h2></li>"+
                               "<li><p>Operadora 1</p><h2>"+this.Operadora1+"</h2></li>"+
                               "<li><p>Telefone 1</p><h2>"+this.Telefone1+"</h2></li>"+
                               "<li><p>Operadora 2</p><h2>"+this.Operadora2+"</h2></li>"+
                               "<li><p>Telefone 2</p><h2>"+this.Telefone2+"</h2></li>"+
                               "<li><p>Aniversário</p><h2>"+dtniver+"</h2></li>"+
                               "<li><p>CPF</p><h2>"+this.CPF+"</h2></li>"+
                               "<li><p>Endereço </p><h2>"+this.Endereco+"</h2></li>"+
                               "<li><p>NumeroEndereco </p><h2>"+this.NumeroEndereco+"</h2></li>"+
                               "<li><p>Complemento </p><h2>"+this.Complemento+"</h2></li>"+
                               "<li><p>CEP </p><h2>"+this.CEP+"</h2></li>"+
                               "<li><p>Bairro </p><h2>"+this.Bairro+"</h2></li>"+
                               "<li><p>Cidade </p><h2>"+this.Cidade+"</h2></li>"+
                               "<li><p>Estado </p><h2>"+this.Estado+"</h2></li>"+
                               "<li><p>Contato criado </p><h2>"+this.CriadoEm+"</h2></li>"+
                               "<li><p>Interessado Produto </p><h2>"+this.InteressadoProduto+"</h2></li>"+
                               "<li><p>Interessado Rede </p><h2>"+this.InteressadoRede+"</h2></li>"+
                               "<li><p>Envio de email </p><h2>"+this.EnvioEmail+"</h2></li>"+
                               "<li><p>Comprou</p><h2>"+this.Comprou+"</h2></li>"+
                               "<li><p>Rede </p><h2>"+this.Rede+"</h2></li>"+
                               "<li><p>Observação </p><h2>"+this.Observacao+"</h2></li>";                            

                         });   
                          
                    });   
                    
                    $(".contato-nome-list").html(b);
                    $(".contato-nome-list").listview('refresh');

                } 
            });

}


function CarregaOperadora(){

    $.ajax({
                url: baseUrl + "contatos/carregaoperadora",
                method: "GET",
                dataType: "json",
                xhrFields: { withCredentials: true },
                headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
                success: function (json)
                {    
                    var select = "";

                    $(json).each(function(){
                        /*
                        db.transaction(function (tx) {
                        
                        tx.executeSql('INSERT INTO OPERADORA (OperadoraID,Nome,CodigoTelein,Ativo) VALUES ("'+json.OperadoraID+'","'+json.Nome+'","'+json.CodigoTelein+'","'+json.Ativo+'")');
                    
                        }, function(error){alert( error.code + " " + error.message);}, function(){});
                        */

                        $(this).each(function(){

                            select += "<option value='"+this.OperadoraID+"'>"+this.Nome+"</option>";

                        });
                   });

                    $("#select-operadora-1").append(select);
                    $("#select-operadora-2").append(select);
                }
            });

}

function EditaContato(){
 
    CarregaOperadora();
       var data = {"ContatoID": contatoselec};


        data = JSON.stringify(data);

       $.ajax({
                type: 'POST',
                cache: false,
                contentType: 'application/json; charset=utf-8',
                url: baseUrl + "contatos/detalhecontato",
                data:data,
                dataType: "json",
                xhrFields: { withCredentials: true },
                headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
                success: function (json)
                {  

                  $(json).each(function(){

                    $(this).each(function(){

                         var arr = this.Aniversario.substr(0,10);
                         var dtniver = arr.split("/");
                         var dtc = dtniver[2].substr(0,4) + "-" + (dtniver[0] < 9 ? "0" + dtniver[0] : dtniver[0]) + "-" + (dtniver[1] < 10 ? "0" + dtniver[1] : dtniver[1]);
                         
                         $("#nomeedit").val(this.Nome);       
                         $("#emailedit").val(this.Email);
                         $("#telefone1edit").val(this.Telefone1);
                         $("#telefone2edit").val(this.Telefone2);
                         $("#cpfedit").val(this.CPF);
                         $("#aniedit").val(dtc);
                         $("#select-operadora-1").val(this.Operadora1FK);
                         $("#select-operadora-1").selectmenu('refresh');
                         $("#select-operadora-2").val(this.Operadora2FK);
                         $("#select-operadora-2").selectmenu('refresh');
                         $("#enderecoedit").val(this.Endereco);
                         $("#numeroedit").val(this.NumeroEndereco);
                         $("#complementoedit").val(this.Complemento);
                         $("#cepedit").val(this.CEP);
                         $("#bairroedit").val(this.Bairro);
                         $("#cidadeedit").val(this.Cidade);
                         $("#estadoedit").val(this.Estado);
                         $("#comprouedit").attr("checked",this.ComprouCheck).checkboxradio("refresh") ;
                         $("#envioemailedit").attr("checked",this.EnvioEmailCheck).checkboxradio("refresh"); 
                         $("#intprodutoedit").attr("checked",this.InteressadoProdutoCheck).checkboxradio("refresh");
                         $("#intredeedit").attr("checked",this.InteressadoRedeCheck).checkboxradio("refresh");
                         $("#redeedit").attr("checked",this.RedeCheck).checkboxradio("refresh");
                         $("#observacaoedit").val(this.Observacao);

                    });
                  });
                }
        
        }); 

}

function AlterarContato()
{

    var nome = $("#nomeedit").val();
    var email = $("#emailedit").val();
    var telefone1 = $("#telefone1edit").val();
    var telefone2 = $("#telefone2edit").val();
    var cpf = $("#cpfedit").val();
    var aniversario = $("#aniedit").val();
    var operadora1 = $("#select-operadora-1").val();
    var operadora2 = $("#select-operadora-2").val();
    var endereco = $("#enderecoedit").val();
    var numero = $("#numeroedit").val();
    var complemento = $("#complementoedit").val();
    var cep = $("#cepedit").val();
    var bairro = $("#bairroedit").val();
    var cidade = $("#cidadeedit").val();
    var estado = $("#estadoedit").val();
    var comprou = document.getElementById("comprouedit").checked;
    var envioemail =  document.getElementById("envioemailedit").checked;
    var intproduto =  document.getElementById("intprodutoedit").checked;
    var intrede =  document.getElementById("intredeedit").checked;
    var rede =  document.getElementById("redeedit").checked;
    var observacao = $("#observacaoedit").val();
    var idcontato = $(".btncontatos").data('idcontato');

    var data = {
                "ContatoID": contatoselec,
                "Nome": nome,
                "Email": email,
                "Telefone1": telefone1,
                "Telefone2": telefone2,
                "Operadora1": operadora1,
                "Operadora2": operadora2,
                "Observacao": observacao,
                "Aniversario": aniversario,
                "Endereco": endereco,
                "Cidade": cidade,
                "Bairro": bairro,
                "Estado": estado,
                "CEP": cep,
                "NumeroEndereco": numero,
                "Complemento": complemento,
                "CPF": cpf,
                "Comprou": comprou,
                "InteressadoProduto": intproduto,
                "Rede": rede,
                "InteressadoRede": intrede,
                "EnvioEmail": envioemail
               }


        data = JSON.stringify(data);
    
          $.ajax({
               type: 'POST',
                cache: false,
                contentType: 'application/json; charset=utf-8',
                url: baseUrl + "contatos/alterarcontato",
                data:data,
                dataType: "json",
                xhrFields: { withCredentials: true },
                headers: {"Authorization": "Bearer " + window.localStorage.getItem("token")},
                success: function (result)
                {     
                   
                    alert(result); 
     
                } 
            });
}