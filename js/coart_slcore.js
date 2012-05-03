var coart = coart || {};

coart.core = {
	slider: null,
	contendor: null,
	imagenes: null,
	objetivo: null,
	
	iniciar: function (datos) {
		this.contenedor = $(datos.id);
		this.contenedor.css({
			display: 'block',
			position: 'relative',
			overflow: 'hidden',
			cursor: 'pointer'
		})
		this.slider = coart.extender(coart.slider, {
			ancho: $(this.contenedor).width()
		});
		this.eventos();
		this.imagenes = datos.imagenes;
		this.instanciar(datos.velocidad);
	},
	
	eventos: function () {
		var contenedor = this;
		
		this.contenedor.hover(
			function () {MouseMove()},
			function (evento) {
				MouseDie();
				contenedor.escuchas(evento);
			}
		);
		
		function MouseMove () {
			contenedor.contenedor.live(
				'mousemove', function (evento) {contenedor.escuchas(evento)}
			)
		}
		
		function MouseDie () {
			contenedor.contenedor.die('mousemove');
		}
	},
	
	escuchas: function (evento) {
		var $objetivo = $(evento.target),
			ancho;
			
		switch (evento.type) {
			case 'mousemove':
				if (this.objetivo != $objetivo.attr('pos')) {
					this.objetivo = $objetivo.attr('pos');
					ancho = $(evento.target).width();
					this.slider.actualizar(ancho, this.objetivo);
				}
				break;
			case 'mouseleave':
				this.objetivo = null;
				this.slider.actualizar(0);
				break;
		}
	},
	
	crearImagen: function (link) {
        var imagen = document.createElement('img');
		$(this.contenedor)
			.append($('<a />')
				.attr('href', link)
				.append(imagen));
		return imagen;
    },
	
	instanciar: function (vel) {
		var i,
			imagen,
			total = this.imagenes.length;
		
		for (i=0; i<total; i++) {
			imagen = coart.extender(coart.imagen, {
				imagen: this.crearImagen(this.imagenes[i].url),
				posicion: i,
				velocidad: vel,
				src: this.imagenes[i].imagen,
				titulo: this.imagenes[i].titulo
			});
			
			imagen.iniciar(this.slider.ancho/total);
			this.slider.nuevaImagen(imagen);
		}
	}
}