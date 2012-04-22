losDatosDelSlider = {
   'anchoImagen': 350,
   'altoImagen': 200,
   'anchoTotal': 500,
   'alturaCajaTextos': 50,
   'carpetaImagenes': '../../imgb/',
   'imagenes':[
      {'url': '1.gif', 'Link': '1.cristalab.com', 'tit': 'Uno', 'subt': '1'},
      {'url': '2.gif', 'Link': '2.cristalab.com', 'tit': 'Dos', 'subt': '2'},
      {'url': '3.gif', 'Link': '3.cristalab.com', 'tit': 'Tres', 'subt': '3'},
      {'url': '4.gif', 'Link': '4.cristalab.com', 'tit': 'Cuatro', 'subt': '4'}
   ]   
}
losDatosDelSliderB = {
	'anchoImagen': 733,
	'altoImagen': 350,
	'anchoTotal': 930,
	'alturaCajaTextos': 75,
	'carpetaImagenes': '../../img/',
	'imagenes':[
		{'url': '1.jpg', 'Link': '1.cristalab.com', 'tit': 'Uno', 'subt': '1'},
		{'url': '2.jpg', 'Link': '2.cristalab.com', 'tit': 'Dos', 'subt': '2'},
		{'url': '3.jpg', 'Link': '3.cristalab.com', 'tit': 'Tres', 'subt': '3'},
		{'url': '4.jpg', 'Link': '4.cristalab.com', 'tit': 'Cuatro', 'subt': '4'},
		{'url': '5.jpg', 'Link': '5.cristalab.com', 'tit': 'Cinco', 'subt': '5'}
	] 
}
$(document).ready(function () {
	
	crearSlider(losDatosDelSlider, '#contenedorSlider');
	$('<div id="contenedorB" />').insertBefore('#contenedorSlider');
	crearSlider(losDatosDelSliderB, '#contenedorB');
	
	function crearSlider(datos, contenedorSlider) {
		var contenedor = $(contenedorSlider),
			carpetaImagenes = datos.carpetaImagenes,
			anchoImagen = datos.anchoImagen,
			altoImagen = datos.altoImagen,
			anchoTotal = datos.anchoTotal,
			imagenes = datos.imagenes,
			totalImagenes = imagenes.length,
			boxNegro = datos.alturaCajaTextos,
			anchoMedia = anchoTotal/totalImagenes;		
		contenedor.width(anchoTotal).height(altoImagen).addClass('bloqueDisplay');		
		for (indice in imagenes) {
			contenedor
				.append($('<div class="imagen sombraIzquierda"'+
					'id="imagen'+indice+'"'+
					'style="width:'+anchoImagen+'px;'+
					'height:'+altoImagen+'px;'+
					'left:'+(anchoMedia*indice)+'px;'+
					'z-index:'+indice+';'+
					'background: url('+carpetaImagenes+imagenes[indice].url+')" />')
				.append($('<div class="links">').html(imagenes[indice].Link))
				.append($('<div class="parpadeo" />').fadeTo(0, 0).dequeue())
				.append($('<div class="cajaTextos" style="height:'+boxNegro+'px" />')
					.append('<div class="fondoOscuro" />')
					.append($('<div class="titular" />').html(imagenes[indice].tit))
						.append($('<div class="subtitular" />').fadeTo(0, 0).dequeue()
						.append($('<div class="titulo" />').html(imagenes[indice].tit))
						.append('<br />'+imagenes[indice].subt)
					)
				)
			)
		}
		reiniciarListeners()
	}	
	function reiniciarListeners () {
		$('.imagen').unbind();		
		$('.imagen').click(function () {
			var url = $(this).find('.links').html();      
			window.location.href = '#/'+url;
		});		
		$('.imagen').hover(
			function /*OVER*/ () {         
				var num = $($(this).parent().find('.imagen')).index(this),
					anchoTotal = $(this).parent().width(),
					anchoImagen = $(this).width(),
					totalImagenes = $($(this).parent().find('.imagen')).index($(this).parent().find('.imagen:last'))+1,
					cerrado = (anchoTotal-anchoImagen)/(totalImagenes-1),
					titulos = $(this).find('div:eq(2)'),
					parp = $(this).find('.parpadeo'),
					arr = [];
				
				parp.fadeTo(0, 0.5).dequeue();
				parp.fadeTo(500, 0).dequeue();
				titulos.find('div:eq(1)').fadeTo(300,0).dequeue();
				titulos.find('div:eq(2)').fadeTo(300,1).dequeue();
				for (i=1; i<totalImagenes; i++) {
					if (i <= num) {arr.push(cerrado*i)}
					else {arr.push(anchoImagen+(cerrado*(i-1)))}
				}
				reposicionar(arr, $(this).parent().attr('id'))
			},
			function /*OUT*/ () {
				var titulos = $(this).find('div:eq(2)'),
					anchoTotal = $(this).parent().width(),
					totalImagenes = $($(this).parent().find('.imagen'))
						.index($(this).parent().find('.imagen:last'))+1,
					posiciones = [];
				titulos.find('div:eq(1)').fadeTo(300, 1).dequeue();
				titulos.find('div:eq(2)').fadeTo(300, 0).dequeue();
				for (i=1; i<totalImagenes; i++) {
					posiciones.push((anchoTotal/totalImagenes)*i)
				}
				reposicionar(posiciones, $(this).parent().attr('id'))
		});   
	}	
	function reposicionar (posiciones, slider) {
		var contenedor = '#'+slider;
		for (i=1; i<=posiciones.length; i++) {
			var objetivo = '#imagen'+i;
			$(contenedor).find(objetivo).animate({left:posiciones[i-1]}, 200).dequeue();
		}
	}	
});