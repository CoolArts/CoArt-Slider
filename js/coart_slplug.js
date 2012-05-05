jQuery.coArtSld = function (contenidos, funcion) {

	var scripts = ['js/coart_slext.js','js/coart_slimg.js','js/coart_slslid.js','js/coart_slcore.js'],
		script, total = 0;
		
	for (script in scripts) {
		$.getScript(scripts[script], function () {
			total ++;
			if (total == scripts.length) {iniciar()}
		})
	};
	
	if(typeof Object.create !== "function") {
		Object.create = function (o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	};
	
	function iniciar () {
		$.getJSON(
			contenidos,
			function (datos) {
				var x, slider = Object.create(coart.core);
					
				if (datos.carpeta) {
					for (x in datos.imagenes) {
						datos.imagenes[x].source = datos.carpeta+datos.imagenes[x].source
					}
				}
				
				slider.iniciar(datos);
				if (funcion) {funcion(slider.contenedor)}
		})
	}
}

