var coart = coart || {};

coart.imagen = {
	top: 0,
	left: 0,
	width: 0,
	height: 0,
	posicion: null,
	velocidad: null,
	contenedor: null,
	src: null,
	
	extender: function (propiedades) {
		var propiedades, objeto;
		objeto = Object.create(this);
		
		for (propiedad in propiedades) {
			if (propiedades.hasOwnProperty(propiedad)) {
				objeto[propiedad] = propiedades[propiedad]
			}
		}
		
		return objeto;
	},
	
	comprobarDatos: function () {
		var sinErrores = true;
		
		if (this.posicion === null) {
			throw new Error('Se necesita una capa para la imagen');
			sinErrores = false;
		}
		
		if (this.velocidad === null) {
			throw new Error('Se necesita una velocidad de movimiento');
			sinErrores = false;
		}
		
		if (this.contendor === null) {
			throw new Error('Se necesita un contendor para la imagen');
			sinErrores = false;
		}
		
		if (this.src === null) {
			throw new Error('Se necesita una ruta de imagen');
			sinErrores = false;
		}
		
		return sinErrores;
	},

	instanciar: function () {
		if (this.comprobarDatos()) {
			this.contenedor.append($('<img />')
				.attr('src', this.src)
				.attr('z-index', this.posicion)
				.attr('velocidad', this.velocidad)
			);
		}
		
		else {return false};
	}
}