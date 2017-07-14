$(document).ready(function(){ 

	/*validación de formulario*/
	var correo = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
	var contra = /^[0-9]+(\.[0-9]{8})?$/;

	$("#boton").click(function(){
		var email = $("#email").val();
        var pass = $("#password").val();

        if(email == "" || !correo.test(email)){
            $("#mensaje").fadeIn("slow");
                return false;
        }else{
            $("#mensaje").fadeOut();
        }

        if(pass == "" || !contra.test(pass)){
            $("#mensaje2").fadeIn("slow");
                return false;
        }
	})

	/*guardar números de tarjetas bip*/
	$(".btn2").click(function(){
		var tarjeta = $("#tarjeta").val();
		$(".caja").append("<p>" + tarjeta + "</p>");
		$("#opcion").append("<option>" + tarjeta + "</option>");
		$("#tarjeta").val("");
	})

	
	/*API saldo*/

	$(".btn3").click(function(){
		var tarjeta = $("#tarjeta").val();

			$.ajax({
				url: 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?data',
				type: 'GET',
				dataType: 'json',
				data: {'bip' : tarjeta}			
			})

			.done(function(el) {			
				$(".saldo").append('<h3>Saldo total</h3>'+'<br>'+'<h5>'+el.saldoTarjeta+'</h5>');
				/*console.log(el);*/
			})

			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			}); 

			$("#tarjeta").val("");
	})	
})