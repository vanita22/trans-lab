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
				url: 'https://bip-servicio.herokuapp.com/api/v1/solicitudes.json?data',
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

			if((('#opciones option:selected').val()).to('click')){
				$("#tarjeta").disable();
				alert("no puedes ingresar numero");
			}
	})	

	/*API calculo*/

	$(".btn4").click(function(){
		var tarjeta = $("#tarjeta").val();
				$.ajax({
						url: 'https://bip-servicio.herokuapp.com/api/v1/solicitudes.json?data',
						type: 'GET',
						dataType: 'json',
						data: {'bip' : tarjeta}			
					})	

					.done(function(el) {
						var uno = el.saldoTarjeta;							
						var res = uno.split("");
						var res2 = res.splice(1,3);	
						var res3 = res2.join("");
						var dos = 740;
						var resta = res3 - dos;												
						$(".calculo").append('<h3>Saldo total si estas en horario alto: $740</h3>'+'<br>'+'<h5>'+ '$'+resta +'</h5>');
						/*console.log(resta);*/
					})					

					.done(function(el) {
						var uno = el.saldoTarjeta;							
						var res = uno.split("");
						var res2 = res.splice(1,3);	
						var res3 = res2.join("");
						var dos = 680;
						var resta = res3 - dos;												
						$(".calculo").append('<h3>Saldo total si estas en horario medio: $680</h3>'+'<br>'+'<h5>'+ '$'+resta +'</h5>');
						/*console.log(resta);*/
					})
					
					.done(function(el) {
						var uno = el.saldoTarjeta;							
						var res = uno.split("");
						var res2 = res.splice(1,3);	
						var res3 = res2.join("");
						var dos = 640;
						var resta = res3 - dos;												
						$(".calculo").append('<h3>Saldo total si estas en horario bajo: $640</h3>'+'<br>'+'<h5>'+ '$'+resta +'</h5>');
						/*console.log(resta);*/
					})
					
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						console.log("complete");
					});
					
		$("#opciones").on('change', function(){
					
			switch($('#opciones option:selected').val()) {				
				case '1':					
					$(".calculo").prepend('<h3>Costo Pasaje</h3>'+'<br>'+'<h5>$740</h5>');	
									
				break;

                case '2':
                	$(".calculo").prepend('<h3>Costo Pasaje</h3>'+'<br>'+'<h5>$680</h5>');  
                		              	
                break;

                case '3':
                	$(".calculo").prepend('<h3>Costo Pasaje</h3>'+'<br>'+'<h5>$640</h5>'); 
                		               	
                break;	
                default: $(".calculo").clear(); break;                                	
			};								
		});	
		$("#tarjeta").val("");
	});
})	
