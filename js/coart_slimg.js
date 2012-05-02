var coart = coart || {};

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
	
	actualizar: function (nuevaX) {
		$(this.imagen).animate({left: nuevaX}, this.velocidad).dequeue()
	}
}