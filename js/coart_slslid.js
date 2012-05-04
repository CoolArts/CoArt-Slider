//Configuramos nuestro espacio de nombres
var coart = coart || {};

/*
	Definiremos nuestro Objeto slider,
	lo instanciaremos a través de nuestra función extender
	desde "coart.core" contendrá un array con las imágenes
	y se encargará de decir a las imágenes
	a donde han de moverse
*/
coart.slider = {
	//definimos las propiedades iniciales
	/*
		ancho:		Almacenaremos el ancho total del slider,
					se sacará de su contenedor.
		imagenes:	Almacenaremos nuestros objetos imagen.
	*/
	ancho: null,
	imagenes: new Array(),
	
	//Definimos la propiedad totalImagenes que será una función,
	//esta función devolverá la cantidad de imágenes
	//que hay en el array imágenes
	totalImagenes: function () {
		return this.imagenes.length;
	},
	
	//Definimos la propiedad nuevaImagen que será una función,
	//recibirá un objeto imagen y lo insertará en el array imagenes
	nuevaImagen: function (imagen) {
		this.imagenes.push(imagen);
	},
	
	//Definimos la propiedad actualizar que será una función
	//está función se encargará de enviar a cada imagen
	//de nuestro array la pocición a donde ha de moverse
	//y recibirá el tamaño de la imagen con over
	//y el número de la imagen con over
	actualizar: function (tamImg, objetivo) {
		//definimos las variables iniciales
		/*
			i:			la usaremos en el bucle.
			reinicio:	Lo estableceremos en true, si en el momento
						de pasar las posiciones a las imágenes está
						en false, se le dirá a la imagen que se mueva
						a su posición original.
			mediaC:		Almacenaremos lo que ocupa una imagen si hay
						alguna otra imagen con over.
		*/
		var i,
			reinicio = true,
			mediaC = (this.ancho-tamImg)/(this.imagenes.length-1);
		
		//Comprobamos:
		//Si el tamaño de la imagen es diferente y mayor que 0
		//cambiamos reinicio a false
		if (tamImg != 0 && tamImg > 0) {reinicio = false}
		
		//Ahora por cada imagen en nuestro array
		for (i=1; i<this.totalImagenes(); i++) {
			//Si reinicio es true
			if (reinicio) {
				//Le decimos a las imágenes que vuelvan a su posición original
				this.imagenes[i].actualizar(this.imagenes[i].origPos)
			}
			//Si reinicio es false
			else {
				//Le decimos a las imágenes su nueva posición,
				//Usamos la función "discriminar()"
				//para ver que fórmula hemos de aplicar
				this.imagenes[i].actualizar(discriminar(i, objetivo))
			}
		}
		
		//Definimos la función discriminar,
		//le pasaremos el número de la imagen a moverse
		//y el número de la imagen con el OVER
		function discriminar (a, b) {
			//Si la imagen a moverse es inferior o igual
			//a la imagen con el OVER
			if (a <= b) {return mediaC*a}
			
			//Si no lo es
			else {return tamImg+(mediaC*(a-1))}
		}
	}
}