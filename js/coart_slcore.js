var coart = coart || {};

coart.core = {
	slider: null,
	contendor: null,
	objetivo: null,
	
	iniciar: function (datos) {
		this.contenedor = $(datos.id);
		
		this.contenedor.css({
			display: 'block',
			position: 'relative',
			overflow: 'hidden',
			cursor: 'pointer'
		});
		
		this.slider = coart.extender(coart.slider, {
			ancho: $(this.contenedor).width()
		});
		
		this.eventos();
		this.instanciar(datos.velocidad, datos.imagenes);
	},
	
	eventos: function () {
		var contenedor = this;
		
		this.contenedor.hover(
			function () {MouseMove()},
			function (evento) {
				MouseDie();
				contenedor.escuchas('mouseleave');
			}
		);
		
		function MouseMove () {
			contenedor.contenedor.live(
				'mousemove', function (evento) {
					contenedor.escuchas('mousemove', evento.target)
				}
			)
		};
		
		function MouseDie () {
			contenedor.contenedor.die('mousemove');
		};
	},
	
	escuchas: function (evento, destino) {
		var ancho;
		
		if (destino) {var $objetivo = $(destino)};
		
		switch (evento) {
			case 'mousemove':
				if (this.objetivo != $objetivo.attr('pos')) {
					this.objetivo = $objetivo.attr('pos');
					ancho = $objetivo.width();
					this.slider.actualizar(ancho, parseInt(this.objetivo));
				}
				
				break;
				
			case 'mouseleave':
				this.objetivo = null;
				this.slider.actualizar(0);
				break;
		}
	},
	
	crearImagen: function (href) {
        var imagen = document.createElement('img');
		
		$(this.contenedor)
			.append($('<a />')
				.attr('href', href)
				.append(imagen));

		return imagen;
    },
	
	instanciar: function (vel, imgs) {
		var i, imagen, total = imgs.length;
		
		for (i=0; i<total; i++) {
			imagen = coart.extender(coart.imagen, {
				imagen: this.crearImagen(imgs[i].href),
				posicion: i,
				velocidad: vel,
				src: imgs[i].source,
				titulo: imgs[i].titulo
			});
			
			imagen.iniciar(this.slider.ancho/total);
			this.slider.nuevaImagen(imagen);
		}
	}
}