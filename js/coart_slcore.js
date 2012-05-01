var coart = coart || {};

coart.core = {
	slider: null,
	$contendor: null,
	ancho: null,
	alto: null,
	velocidad: null, //En milisegundos
	imagenes: null,
	
	iniciar: function (sel, imgs, vel) {
		slider = coart.slider.extender();
		$contenedor = $(sel);
		ancho = $contenedor.width();
		alto = $contenedor.height();
		velocidad = vel;
		imagenes = imgs;
	
		this.instanciar();
	},
	
	instanciar: function () {
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
}