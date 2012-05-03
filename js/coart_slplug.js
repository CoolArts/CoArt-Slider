jQuery.coArtSld = function (contenidos) {
	var scripts = [
		'js/coart_slext.js',
		'js/coart_slimg.js',
		'js/coart_slslid.js',
		'js/coart_slcore.js'
	],
		total = 0,
		script;
	
	for (script in scripts) {
		$.getScript(scripts[script], function () {
			total++;
			cargar();
		})
	}
	
	if(typeof Object.create !== "function") {
		Object.create = function (o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	};
	
	function cargar () {
		if (total == scripts.length) {
			iniciar();
		}
	}
	
	function iniciar () {		
		$.getJSON(
			contenidos,
			function (datos) {				
				var x,
					slider = Object.create(coart.core);
				
				if (datos.carpeta) {
					for (x in datos.imagenes) {
						datos.imagenes[x].imagen = datos.carpeta+datos.imagenes[x].imagen
					}
				}
				
				slider.iniciar(datos);
		});
	};
}

