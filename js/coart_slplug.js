var coart = coart || {};

coart.extender = function (Objeto, propiedades) {
	var propiedades, objeto;
	objeto = Object.create(Objeto);
	
	for (propiedad in propiedades) {
		if (propiedades.hasOwnProperty(propiedad)) {
			objeto[propiedad] = propiedades[propiedad]
		}
	}
	
	return objeto;
};

coart.imagen = {
	y: 0,
	x: 0,
	width: 0,
	posicion: null,
	velocidad: null,
	imagen: null,
	src: null,
	origPos: null,
	
	iniciar: function (media) {
		this.origPos = media*this.posicion;
		
		$(this.imagen).attr({
			'src': this.src,
			'pos':this.posicion
			})
			.css({
				'left': this.origPos,
				'position': 'absolute'
			});
	},
	
	actualizar: function (nuevaPosicion) {
		console.log(this.origPos);
		var posicion;
		
		if (nuevaPosicion != 0) {posicion = nuevaPosicion}
		else {posicion = this.origPos}
		console.log(posicion);
		$(this.imagen).animate({left: posicion}, this.velocidad).dequeue()
	}
};

coart.slider = {
	objetivo: null,
	ancho: null,
	imagenes: new Array(),
	
	totalImagenes: function () {
		return this.imagenes.length;
	},
	
	nuevaImagen: function (imagen) {
		this.imagenes.push(imagen);
	},
	
	actualizar: function (tamImg) {
		var i,
			x = 0,
			total = this.totalImagenes(),
			posicion = parseInt(this.objetivo),
			media = (this.ancho - tamImg)/(total-1);
			
		for (i=1; i<total; i++) {
			if (i<=posicion) {x = media*i}
			else {x = (media*(i-1))+tamImg}
			this.imagenes[i].actualizar(x)
		}
	}
};

coart.core = {
	slider: null,
	contendor: null,
	ancho: null,
	imagenes: null,
	
	iniciar: function (imgs, vel) {
		this.contenedor = $('.coart_Sld');
		this.ancho = $(this.contenedor).width();
		this.slider = coart.extender(coart.slider, {ancho: this.ancho});
		this.eventos();
		this.imagenes = imgs;
		this.instanciar(vel);
	},
	
	eventos: function () {
		var contenedor = this; 
		$(this.contenedor).live('mousemove', function (evento) {contenedor.escuchas(evento)});
		$(this.contenedor).live('mouseout', function (evento) {contenedor.escuchas(evento)});
		//En proyecto mental (Hacerlo alternativo);
		//$(this.contenedor).live('click', this.navegar());
	},
	
	escuchas: function (evento) {
		var objetivo, ancho;
		
		switch (evento.type) {
			case 'mousemove':
			
				objetivo = $(evento.target).attr('pos');
				
				if (objetivo != this.objetivo) {
					this.objetivo = objetivo;
					ancho = $(evento.target).width();
					this.slider.actualizar(ancho);
				};
				
				break;
			case 'mouseout':
				this.objetivo = null;
				this.actualizar(0);
				break;
		}
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
			imagen = coart.extender(coart.imagen, {
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