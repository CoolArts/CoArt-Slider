//Configuramos nuestro espacio de nombres
var coart = coart || {};

/*
	Definiremos nuestro Objeto imagen,
	lo instanciaremos a través de nuestra función extender
	desde el Objeto "coart.core"
*/
coart.imagen = {
	//definimos las propiedades iniciales
	/*
		posicion:	Lo usaremos para guardar la capa.
		velocidad:	Será la velocidad a la que las imagenes
					harán el slide.
		imagen:		Lo usaremos para almacenar
					el elemento imagen del DOM.
		src:		Lo usaremos para almacenar la ruta de la imagen.
		origPos:	Aquí almacenaremos la posición inicial
					de la imagen dentro del slider.
		titulo:		Almacenará el atributo "title" de la imagen
	*/
	posicion: null,
	velocidad: null,
	imagen: null,
	src: null,
	origPos: null,
	titulo: null,
	
	
	//Definimos la propiedad iniciar que será una función,
	//se llamará a esta función sólo la primera que se instancie
	//una imagen y le deberemos pasar lo que ocupa cada imagen
	//cerrada en el slider (anchoSlider/totalImagenes)
	//que llamaremos media.
	iniciar: function (media) {
		//Inicializamos la variable "origPos",
		//será la media por la posición
		this.origPos = media*this.posicion;
		
		//Configuramos los atributos de la imagen
		$(this.imagen).attr({
			'src': this.src,
			'pos':this.posicion,
			'title': this.titulo
			})
			//y aplicamos los primeros estilos
			.css({
				'left': this.origPos,
				'position': 'absolute'
			});
	},
	
	//Por último definimos la propiedad actualizar,
	//será otra función y se encargará de mover la imagen
	//Habrá que pasarle el nuevo left de la imagen
	actualizar: function (nuevaX) {
		//Y con un animate movemos la imagen,
		//le damos un "dequeue()" para que no se almacenen
		//las animaciones en la cola de animaciones de la imagen
		$(this.imagen).animate({left: nuevaX}, this.velocidad)
			.dequeue()
	}
}