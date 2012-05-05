var coart = coart || {};

coart.extender = function (Objeto, propiedades) {
	var objeto;
	
	objeto = Object.create(Objeto);
	
	for (propiedad in propiedades) {
		if (propiedades.hasOwnProperty(propiedad)) {
			objeto[propiedad] = propiedades[propiedad]
		}
	}
	
	return objeto;
}