//Definimos la función que iniciará nuestro plug-in
//Le pasaremos la ruta con nuestro archivo .slider
//y alternativamente un función que será el callback
//y devolverá el Objeto "coart.core".
jQuery.coArtSld = function (contenidos, funcion) {
	//Definimos un array con los scripts a cargar
	var scripts = [
		'js/coart_slext.js',
		'js/coart_slimg.js',
		'js/coart_slslid.js',
		'js/coart_slcore.js'],
		
		//Definimos la variable que usaremos en el bucle
		script;
		
		//Definimos una varibale total
		total = 0;
	
	//Por cada script definido en nuestro array
	for (script in scripts) {
		//Cargamos el script
		$.getScript(scripts[script], function () {
			//cuando cargue sumamos 1 a total
			total ++;
			
			//si total es igual al número de scripts
			//ejecutamos "iniciar()"
			if (total == scripts.length) {iniciar()}
		})
	};
	
	//Si no existe Object.create como función
	//Lo creamos
	if(typeof Object.create !== "function") {
		//Le pasaremos un objeto "o"
		Object.create = function (o) {
			//Definimos una funcíon vacía "F"
			function F() {}
			//convertimos "F"
			//en un prototipo del objeto "o"
			F.prototype = o;
			//devolvemos "F"
			return new F();
		};
	};
	
	//Definimos nuestra función iniciar
	function iniciar () {
		//Cargamos nuestro archivo .slider
		$.getJSON(
			//Cargamos la URL que recibimos en los parámetros
			contenidos,
			function (datos) {
				//Definimos x para usarla en el bucle
				var x,
					//Creamos una copia del Objeto coart.core
					//Y lo almacenamos
					slider = Object.create(coart.core);
				
				//Si el objeto recibido,
				//contiene la propiedad carpeta
				if (datos.carpeta) {
					//Por cada imagen en el array imágenes del obejto
					for (x in datos.imagenes) {
						//Cambiamos su propiedad source
						//anteponiéndole la ruta de la carpeta
						datos.imagenes[x].source = datos.carpeta+datos.imagenes[x].source
					}
				}
				
				//Iniciamos nuestro objeto slider (coart.core)
				slider.iniciar(datos);
				
				//Si le hemos pasado una función como segundo argumento,
				//la ejecutamos y le pasamos como argumento el slider instanciado
				//"coart.core[nuevaInstancia].contenedor"
				if (funcion) {funcion(slider.contenedor)}
		})
	}
}

