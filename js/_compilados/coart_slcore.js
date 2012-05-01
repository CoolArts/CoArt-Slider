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
	
	iniciar: function (media) {
		$(this.imagen).attr('src', this.src)
			.css({
				'left': media*this.posicion,
				'position': 'absolute'
			});
	},
	
	actualizar: function (total) {
	
	}
};

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
};

coart.core = {
	slider: null,
	contendor: null,
	ancho: null,
	imagenes: null,
	
	iniciar: function (imgs, vel) {
		this.slider = coart.slider.extender();
		this.contenedor = $('.coart_Sld');
		this.ancho = $(this.contenedor).width();
		this.imagenes = imgs;
		this.instanciar(vel);
	},
	
	crearImagen: function () {
        var imagen = document.createElement('img');
		$(this.contenedor).append(imagen);
		return imagen;
    },
	
	instanciar: function (vel) {
		var i,
			imagen,
			total = this.imagenes.length;
		
		for (i=0; i<total; i++) {
			imagen = coart.imagen.extender({
				imagen: this.crearImagen(),
				posicion: i,
				velocidad: vel,
				src: this.imagenes[i]	
			});
			
			imagen.iniciar(this.ancho/total);
			this.slider.nuevaImagen(imagen);
		}
	}
};

jQuery.coArtSld = function (imgs, vel) {	
	if(typeof Object.create !== "function") {
		Object.create = function (o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	};
	
	function iniciar () {
		var slider = Object.create(coart.core);
		slider.iniciar(imgs, vel);
		return slider;
	};
	
	iniciar();
};