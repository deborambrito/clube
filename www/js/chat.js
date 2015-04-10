$(function() {
	
	setTimeout(function () {
        //$('.foo').addClass('bar');
        $('.chat-textarea').css({
            'height': 'auto'
        });
    }, 100);
   
    
    
    if($(".mensagem-audio").length){
        

        $('.mensagem-audio audio').mediaelementplayer({
            alwaysShowControls: true,
            features: ['progress','playpause', 'current','duration'],
            audioWidth: 210,
            audioHeight: 30,
            enableKeyboard: false,
            /*iPadUseNativeControls: true,
            iPhoneUseNativeControls: true,
            AndroidUseNativeControls: true*/
        });
    }

    $(".footer-upload").on("click", function(){
        console.log("oi");
        $( "#menuUpload" ).popup("open", { 
            history: false,
            positionTo: ".custom-footer",
            transition: "slideup"
        });
    });

});
