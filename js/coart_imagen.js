var coart = coart || {};

coart.imagen = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	posicion: null,
	velocidad: null,
	src: null,
	
	extender: function (propiedades) {
		var propiedades, objeto;
		objeto = Object.create(this);
		
		for (propiedad in propiedades) {
			if (propiedades.hasOwnProperty(propiedad)) {
				objeto[propiedad] = propiedades[propiedad]
			}
		}
		
		return obj;
	},
	
	actualizarOver: function (posicion, ancho, ocupado) {
		if (this.posicion <= posicion) {
			
		}
	},
	
	actualizarOut: function (media) {
		$(this).animate({'left', media*posicion}, 350).dequeue();
	}
}