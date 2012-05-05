var coart = coart || {};

coart.imagen = {
	posicion: null,
	velocidad: null,
	imagen: null,
	src: null,
	origPos: null,
	titulo: null,
	
	iniciar: function (media) {
		this.origPos = media*this.posicion;
		
		$(this.imagen).attr({
			'src': this.src,
			'pos':this.posicion,
			'title': this.titulo
			})
			.css({
				'left': this.origPos,
				'position': 'absolute'
			});
	},
	
	actualizar: function (nuevaX) {
		$(this.imagen).animate({left: nuevaX}, this.velocidad)
			.dequeue()
	}
}