//Configuramos nuestro espacio de nombres
var coart = coart || {};

/*
	Definiremos nuestro Objeto core,
	lo instanciaremos a través de nuestra función extender.
	Este objeto se encargará de crear el slider,
	las imágenes y los eventos asociados al slider.
*/
coart.core = {
	//definimos las propiedades iniciales
	/*
		slider:		Contendrá una copia de nuestro Objeto slider.
		contenedor:	Contendrá nuestro slider seleccionado.
		objetivo:	Contendrá el número de nuestra imagen en over.
	*/	
	slider: null,
	contendor: null,
	objetivo: null,
	
	//Definimos la propiedad iniciar que será una función,
	//La llamada a esta función será la que inicie el slider
	//Esta llamada está en el plug-in "coArtSld"
	//Le pasaremos un Objeto con los datos del slider
	//datos{id, velocidad, carpeta, [imagenes]}
	iniciar: function (datos) {
		//Almacenamos nuestro contenedor seleccionado
		this.contenedor = $(datos.id);
		
		//Iniciamos los estilos básicos del slider
		this.contenedor.css({
			display: 'block',
			position: 'relative',
			overflow: 'hidden',
			cursor: 'pointer'
		})
		
		//Almacenamos una copia de nuestro objeto "coart.slider"
		this.slider = coart.extender(coart.slider, {
			//Definimos el ancho del slider en el objeto
			ancho: $(this.contenedor).width()
		});
		
		//arrancamos los eventos
		this.eventos();
		
		//Ejecutamos "instanciar()",
		//pasamos la velocidad,
		//y el array con los datos de las imágenes
		this.instanciar(datos.velocidad, datos.imagenes);
	},
	
	//Definimos la propiedad eventos que será una función,
	//Esta función se encargará de vincular los eventos del mouse
	eventos: function () {
		//almacenamos nuestro objeto "coart.core --> this",
		//para usarla cuendo perdamos las rutas
		var contenedor = this;
		
		//Vinculamos hover al slider
		//para no tener que controlar el burbujeo
		this.contenedor.hover(
			//Cuando el mouse haga OVER sobre el slider
			//ejecutaremos "MouseMove()"
			function () {MouseMove()},
			
			//Cuando el mouse haga OUT del slider
			//ejecutaremos "MouseDie()", y después
			//ejecutaremos escuchas pasando el evento
			function (evento) {
				MouseDie();
				contenedor.escuchas('mouseleave');
			}
		);
		
		//Definimos la función "MouseMove()"
		function MouseMove () {
			//Vinculamos el evento mousemove al slider
			//y con cada movimiento del mouse ejecutaremos
			//"escuchas()" pasando el tipo de evento
			//y el objetivo del evento
			contenedor.contenedor.live(
				'mousemove', function (evento) {
					contenedor.escuchas('mousemove', evento.target)
				}
			)
		}
		
		//Definimos la función "MouseDie()"
		function MouseDie () {
			//Eliminamos el evento 'mousemove' del slider
			contenedor.contenedor.die('mousemove');
		}
	},
	
	//Definimos la propiedad escucha que será una función,
	//Esta función se encargará de cribar los datos
	//recibidos del evento "mousemove" 
	escuchas: function (evento, destino) {
		//Definimos la variable que ancho
		//Que contendrá el ancho de la imagen con OVER
		var ancho;
		
		//Si la función recibe el parámetro destino
		if (destino) {
			//Almacenamos la imagen con over seleccionada
			var $objetivo = $(destino)
		}
		
		//Cribamos el parámetro evento
		switch (evento) {
			//Si la función recibe 'mousemove'
			case 'mousemove':
				//Si el objetivo almacenado en nuestro Objeto
				//es diferente del objetivo del mousemove
				if (this.objetivo != $objetivo.attr('pos')) {
					//Almacenamos el nuevo objetivo
					this.objetivo = $objetivo.attr('pos');
					
					//Almacenamos el nuevo ancho de la imagen
					ancho = $objetivo.width();
					
					//Ejecutamos "actualizar()",
					//en nuestro objeto slider almacenado
					//pasamos como parámetros el ancho de la imagen
					//y el numero de la imagen parseado
					this.slider.actualizar(ancho, parseInt(this.objetivo));
				}
				
				//Salimos del bucle
				break;
			
			//Si la función recibe 'mouseleave'
			case 'mouseleave':
				//Almacenamos null en el objetivo
				this.objetivo = null;
				
				//Ejecutamos "actualizar()",
				//en nuestro objeto slider almacenado
				//y pasamos un 0
				this.slider.actualizar(0);
				
				//Salimos del bucle
				break;
		}
	},
	
	//Definimos la propiedad crearImagen que será una función,
	//recibiá la ruta de un link
	crearImagen: function (href) {
		//Creamos un elemento img en el DOM y lo almacenamos
        var imagen = document.createElement('img');
		
		//Seleccionamos el contenedor del slider
		$(this.contenedor)
			//le agregamos un elemento <a><a>
			.append($('<a />')
				//le configuramos el atributo href
				//con el parametro que recibimos
				.attr('href', href)
				//Le insertamos la imagen al <a>
				.append(imagen));
				
		//Devolvemos el elemento imagen
		return imagen;
    },
	
	//Definimos la propiedad instanciar que será una función,
	//recibiá la velocidad y un array con los datos de las imágenes
	//se encargará de ordenar la creación de todas las imágenes
	//y le pasará al Objeto slider cada imagen
	//para que la almacene en su array
	instanciar: function (vel, imgs) {
		//definimos la i que usaremos en el bucle
		var i,
		//definimos una variable vacía donde almacenaremos
		//las nuevas copias de nuestro Objeto "coart.imagen"
			imagen,
		//Almacenamos la longitud de nuestro array imgs recibido
			total = imgs.length;
		
		//Por cada objeto imagen en el array
		for (i=0; i<total; i++) {
			//creamos y almacenamos una copia de nuestro Objeto
			imagen = coart.extender(coart.imagen, {
				//Iniciamos las propiedades
				imagen: this.crearImagen(imgs[i].href),
				posicion: i,
				velocidad: vel,
				src: imgs[i].source,
				titulo: imgs[i].titulo
			});
			//Iniciamos la imagen pasando la media
			imagen.iniciar(this.slider.ancho/total);
			//Pasamos la imagen a nuestro Objeto slider para que la almacene
			this.slider.nuevaImagen(imagen);
		}
	}
}