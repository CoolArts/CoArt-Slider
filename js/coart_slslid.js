var coart = coart || {};

coart.slider = {

	ancho: null,
	imagenes: new Array(),
	
	totalImagenes: function () {return this.imagenes.length},
	
	nuevaImagen: function (imagen) {this.imagenes.push(imagen)},
	
	actualizar: function (tamImg, objetivo) {
		var i,
			reinicio = true,
			mediaC = (this.ancho-tamImg)/(this.imagenes.length-1);
			
		if (tamImg != 0 && tamImg > 0) {reinicio = false}
		
		for (i=1; i<this.totalImagenes(); i++) {
			if (reinicio) {this.imagenes[i].actualizar(this.imagenes[i].origPos)}
			else {this.imagenes[i].actualizar(discriminar(i, objetivo))}
		}
		
		function discriminar (a, b) {
			if (a <= b) {return mediaC*a}
			else {return tamImg+(mediaC*(a-1))}
		}
	}
}