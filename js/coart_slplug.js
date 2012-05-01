jQuery.coArtSld = function (sel, imgs, vel) {
	var i=0,
		scripts = ['coart_imagen', 'coart_slider', 'coart_slcore'];
	
	if(typeof Object.create !== "function") {
		Object.create = function (o) {
			function F() {}
			F.prototype = o;
			return new F();
		};
	};
	
	function cargarScripts () {
		if (i < scripts.length) {
			$.getScript('js/'+scripts[i]+'.js', function () {
				i++;
				cargarScripts();
			});
		}
		else {iniciar(sel, imgs, vel)};
	};
	
	function iniciar (sel, imgs, vel) {
		var slider = Object.create(coart.core);
		slider.iniciar(sel, imgs, vel);
		return slider;
	}
	
	cargarScripts();
};