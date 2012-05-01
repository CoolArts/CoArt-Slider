var coart = coart || {};

coart.imagen = {
	y: 0,
	x: 0,
	width: 0,
	posicion: null,
	velocidad: null,
	imagen: null,
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
	
	actualizar: function (total) {
		//Accion de mover la imagen
		console.log(this.contenedor);
	}
}