var coart = coart || {};

coart.slider = {
	imagenes: new Array(),
	
	totalImagenes: function () {
		return this.imagenes.length;
	},

	extender: function () {
		var objeto;
		objeto = Object.create(this);
		return objeto;
	},
	
	nuevaImagen: function (imagen) {
		this.imagenes.push(imagen);
	},
	
	actualizar: function () {
		var i;
		
		for (i=0; i<this.totalImagenes(); i++) {
			imagenes[i].actualizar(totalImagenes()-1);
		}
	}
}