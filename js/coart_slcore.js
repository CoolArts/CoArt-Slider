jQuery.fn.coolArtSlider = function () {
	if(typeof Object.create !== "function") {
		Object.create = function (o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	}
	
	var slider,
		$contendor,
		ancho,
		alto,
		velocidad, //En milisegundos
		imagenes;
	
	function crearSlider(cont, imgs, vel) {
		slider = coart.slider.extender();
		$contenedor = $(cont);
		ancho = $contenedor.width();
		alto = $contenedor.height();
		velocidad = vel;
		imagenes = imgs;
		instanciarSlider();
	}
	
	function instanciarSlider() {
		var i, imagen;
		
		for (i=0; i<imagenes.length; i++) {
			imagen = coart.imagen.extender({
				contenedor: $contenedor,
				posicion: i,
				velocidad: velocidad,
				src: imagenes[i]				
			});
			
			imagen.instanciar();
			slider.nuevaImagen(imagen);
		}
	}
		
	return this;
}