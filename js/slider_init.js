$('document').ready(function () {
	var scripts = [
		'js/coart_slext.js',
		'js/coart_slimg.js',
		'js/coart_slslid.js',
		'js/coart_slcore.js'
	],
		total = 0;
	
	for (script in scripts) {
		$.getScript(scripts[script], function () {
			total++;
			cargar();
		})
	}
	
	function cargar () {
		if (total == scripts.length) {
			$.getScript('js/coart_slplug.js')
		}
		return false;
	}
})