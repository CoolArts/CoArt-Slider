jQuery.coArtSld = function () {	
	if(typeof Object.create !== "function") {
		Object.create = function (o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	};
	
	function iniciar () {		
		$.getJSON(
			'slider_config.json',
			function (datos) {				
				var imagenes = datos.imagenes,
					velocidad = datos.velocidad,
					slider = Object.create(coart.core);
					
				slider.iniciar(imagenes, velocidad);
		});
	};
	
	iniciar();
}

$.coArtSld();