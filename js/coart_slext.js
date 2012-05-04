//Configuramos nuestro espacio de nombres
var coart = coart || {};

//Creamos una función que nos ayude a duplicar objetos
//y configurarle propiedades, le pasaremos:
	//Objeto: Objeto a instanciar
	//propiedades: un objeto con las nuevas propiedades
coart.extender = function (Objeto, propiedades) {
	//creamos la variable donde almacenaremos el objeto instanciado
	var objeto;
	//Creamos una copia del "Objeto" pasado
	//y lo almacenamos en la variable.
	objeto = Object.create(Objeto);
	
	//Ahora, cada propiedad pasada en "propiedades"
	//se la configuramos a la nueva copia
	for (propiedad in propiedades) {
		//Si el objeto propiedades posee esta propiedad
		if (propiedades.hasOwnProperty(propiedad)) {
			//Le configuramos el nuevo valor
			objeto[propiedad] = propiedades[propiedad]
		}
	}
	
	//Devolvemos el objeto
	return objeto;
}