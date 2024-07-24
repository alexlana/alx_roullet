
var alx_t = -0.243; // para o primeiro item iniciar na frente
var alx_opt = new Array();
var alx_timeout;
var itematual = -1;
var escala_antes = new Array();
var crescendo = new Array();
var alternou = new Array();
var tempoframe;
var stepfurther;
var clockwise_org;
var clockwise_rot;
var eyeview;
var passos;
var time;
var duration;
var tini;
var tfim;

var rwrapper = document.querySelector('#roullete-wrapper');
var rbullets = document.querySelectorAll('.roullete-bullets');
var rodantes = document.querySelectorAll('.roullete-item');
var espaco = 6.3/rodantes.length; // 6.3 eh o valor da volta completa. soh sei q eh assim
for ( var i=0; i<rodantes.length; i++ ) {
	var divdraggable = document.createElement('DIV');
	divdraggable.setAttribute('class', 'roullete-dragit');
	divdraggable.setAttribute('onmousedown', 'alx_mdown(event)');
	// divdraggable.setAttribute('ontouchstart', 'alx_mdown(event,{passive:true})');
	divdraggable.setAttribute('onclick', 'event.stopPropagation()');
	rodantes[i].getElementsByClassName('roullete-item-inner')[0].appendChild(divdraggable);
	rodantes[i].setAttribute('id', 'rit-'+i);

	if ( !rbullets[i].getAttribute('bullet-num') )
		rbullets[i].setAttribute('bullet-num', i);
	rbullets[i].addEventListener( 'click', alx_rodar );
	escala_antes[i] = -10000;
	crescendo[i] = false;
}
var dd = document.querySelectorAll('.roullete-dragit');
for ( var i=0; i<dd.length; i++ ) {
	dd[i].addEventListener('touchstart', alx_mdown, {passive:false});
}

function alx_rodar (e) {
	clearTimeout(alx_timeout);

	if ( e==undefined )
		var bnum = alx_opt['primeiro'];
	else if ( !isNaN(e) )
		var bnum = e;
	else
		var bnum = e.target.getAttribute('bullet-num');

	var bullaesq = (itematual*1+1) - ((bnum*1)+1); // o +1 eh para equiparar ao .length e o *1 eh para garantir um numero, evitar string
	if ( bullaesq < 0 )
		bullaesq = rbullets.length + bullaesq;

	var bulladir = ((bnum*1)+1) - (itematual*1+1); // o +1 eh para equiparar ao .length e o *1 eh para garantir um numero, evitar string
	if ( bulladir < 0 )
		bulladir = rbullets.length + bulladir;

	alx_opt['clockwise_rot'] = ( bulladir < bullaesq );

	clockwise_org = -1 + !( alx_opt['clockwise_org'] == true ) * 2; // evitando if
	clockwise_rot = -1 + !( alx_opt['clockwise_rot'] == true ) * 2; // evitando if
	eyeview = -1 + ( alx_opt['eyeview'] == 'top' ) * 2; // evitando if

	distancia = ( clockwise_rot != 1 ) * bulladir + ( clockwise_rot == 1 ) * bullaesq; // evitando if
	freiador = 2*1/(rodantes.length-distancia); // reduz a velocidade de troca entre elementos muito proximos
	tempoframe = (freiador*alx_opt['voltasporsegundo']/alx_opt['framesporsegundo']);
	stepfurther = clockwise_rot * tempoframe;
	time = 0;


	passos = 0;
	var _escala_antes = -10000;
	var _crescendo = true;
	var _alternou = false;
	var _alx_t = alx_t;
	var _phasev = espaco*bnum + 1.57618;
	while ( ( _crescendo || !_alternou ) && passos < 10000 ) { // passos < 10000 eh para nao travar, mas precisa sair depois
		var _crescia = _crescendo;
		_escala = 1/2 * Math.cos(_phasev/2 + _alx_t * Math.PI);
		_escala = escala_transform(_escala);
		_crescendo = ( _escala_antes <= _escala );
		_alternou = ( _crescia != _crescendo );
		_escala_antes = _escala;
		_alx_t += stepfurther;
		passos++;
	}
	passos--; // para igualar aos frames reais, pq o ultimo loop acima conta o ultimo ciclo, que eh quando a funcao da animacao para antes de atualizar o quadro


	tini = alx_t + stepfurther;
	tfim = alx_t + stepfurther*(passos-1);

	alx_rotacao( bnum );
}

function alx_roulette ( opcoes ) {
	alx_opt = {
			'primeiro': 0,
			'blur': true,
			'eyeview': 'top',
			'radius': 50, // percentual do tamanho do wrapper
			'clockwise_org': false,
			'clockwise_rot': true,
			'framesporsegundo': 60,
			'aberturafundo': 1,
			'voltasporsegundo': 0.6, // eh uma base de calculo, mas para mudanca entre itens proximos esse valor eh reduzido, assim nao fica rapido demais
		};
	alx_rodar();
}

function alx_rotacao ( item ) {

	if ( itematual == item ) {
		return false; // corta a funcao se nao trocou de item
	} else if ( ! isNaN(item) ) {
		itematual = item;
	}

	var cur = document.querySelector('.roullete-current');
	cur.classList.remove('roullete-current');
	rodantes[itematual].classList.add('roullete-current');
	document.querySelector('.roullete-bullets[bullet-num="'+itematual+'"]').classList.add('roullete-current');
	var cur = document.querySelector('.roullete-right');
	cur.classList.remove('roullete-right');
	rodantes[( (1*itematual+1<rodantes.length)*(1*itematual+1) )].classList.add('roullete-right');
	document.querySelector('.roullete-bullets[bullet-num="'+((1*itematual+1<rodantes.length)*(1*itematual+1))+'"]').classList.add('roullete-right');
	var cur = document.querySelector('.roullete-left');
	cur[i].classList.remove('roullete-left');
	rodantes[( (itematual-1>=0)*(itematual-1) + (itematual-1<0)*(rodantes.length-1) )].classList.add('roullete-left');
	document.querySelector('.roullete-bullets[bullet-num="'+((itematual-1>=0)*(itematual-1) + (itematual-1<0)*(rodantes.length-1))+'"]').classList.add('roullete-left');
	document.getElementById('alx_roulette').classList.add('movin');

	var radius = alx_opt['radius']; // % da largura do wrapper

	alx_t = alx_t + stepfurther;

	time += 1 / alx_opt['framesporsegundo'];
	duration = (1 / alx_opt['framesporsegundo']) * passos;
	var dif = tfim - tini;

	for ( var i=0; i<rodantes.length; i++ ) {

		var desvio = 1;
		if ( !rodantes[i].classList.contains('roullete-current') && !rodantes[i].classList.contains('roullete-right') && !rodantes[i].classList.contains('roullete-left') )
			desvio = alx_opt['aberturafundo'];

		var phase = 0 + espaco*i;
		var phasev = phase + 1.57618; // movimento perpendicular ao do phase

		var ease = easeInOutQuad( (time / duration) ); // retorna o percentual do andamento
		ahora = dif * ease + tini; // quanto andou + ponto inicial
		var onde = Math.cos(phase + ahora * 2 * Math.PI) * clockwise_org;
		var onde2 = Math.cos(phasev + ahora * 2 * Math.PI * eyeview);
		var blur = escala = 0.5 * Math.cos(phasev/2 + ahora * Math.PI);

		escala = escala_transform(escala);

		onde = onde * radius;

		// interrompe a funcao antes do settimeout se o item selecionado estah na frente
		if ( clockwise_rot*tfim < clockwise_rot*alx_t ) {
			document.getElementById('alx_roulette').classList.remove('movin');
			rodantes[itematual].style.filter = '';
			// rodantes[itematual].style.left = '0%';
			return false;
		}

		blur *= 8;
		blur = Math.abs(blur);
		blur = 5 - blur;
		blur = Math.floor(blur,2);

		if ( escala < 52.3 )
			escala = 52.3; // se melhorar a formula para tirar isso aqui vai ser o ideal
		ptop = rwrapper.offsetHeight * (onde2*50) / 100;
		rodantes[i].style.transform = 'scale('+(escala/100)+') translateX( -50% ) translateY( '+ptop+'px )';
		rodantes[i].style.left = desvio*onde+'%';
		rodantes[i].style.marginLeft = '50%';
		rodantes[i].style.filter = 'blur('+blur+'px) ';
		rodantes[i].style.zIndex = Math.round(onde2*20);

	}

	alx_timeout = setTimeout( function(){alx_rotacao();}, (1000/alx_opt['framesporsegundo']) );
}

var mouse_ini = new Array();
var elem_dragged;
function alx_mdown (e) {
	e.stopPropagation();
	e.preventDefault();
	mouse_d = mouse_ini = alx_pos(e);
	elem_dragged = e.target;
	document.onmouseup = alx_mup;
	document.onmousemove = alx_drag;
	document.ontouchend = alx_mup;
	document.ontouchmove = alx_drag;
}
function alx_mup (e) {
	e.stopPropagation();
	e.preventDefault();

	var dist_x = mouse_d['x'] - mouse_ini['x'];
	var dist_y = mouse_d['y'] - mouse_ini['y'];
	elem_dragged.removeAttribute('style');
	document.onmouseup = null;
	document.onmousemove = null;
	document.ontouchend = null;
	document.ontouchmove = null;
	mouse_ini['x'] = 0;
	mouse_ini['y'] = 0;
	if ( (dist_x>=-25 && dist_x<=25) ) {
		var href = elem_dragged.parentElement.parentElement.getAttribute('href');
		if ( href != undefined && href != null )
			elem_dragged.parentElement.parentElement.click();
		return false;
	}

	itematual *= 1; // garantir q vai ser um numero
	var nitem = (dist_x<-25)*(itematual+1) + (dist_x>25)*(itematual-1);
	nitem = nitem - (nitem>rodantes.length-1)*nitem + (nitem<0)*(rodantes.length);
	alx_rodar(nitem);
	elem_dragged.style.marginTop = '';
	elem_dragged.style.marginLeft = '';
	window.dispatchEvent(dragev);
}
var mouse_d = new Array();
function alx_drag (e) {
	e.stopPropagation();
	e.preventDefault();
	mouse_d = alx_pos(e);
	var dist_x = mouse_d['x'] - mouse_ini['x'];
	var dist_y = mouse_d['y'] - mouse_ini['y'];
	elem_dragged.style.marginTop = dist_y+'px';
	elem_dragged.style.marginLeft = dist_x+'px';
}

function alx_pos (e) {
	var ret = new Array();
	ret['x'] = e.clientX || e.pageX || (e.touches.length>0 && e.touches[0].pageX) || (e.originalEvent && e.originalEvent.touches.length>0 && e.originalEvent.touches[0].pageX);
	ret['y'] = e.clientY || e.pageY || (e.touches.length>0 && e.touches[0].pageY) || (e.originalEvent && e.originalEvent.touches.length>0 && e.originalEvent.touches[0].pageY);
	return ret;	
}


///////////////////////////////////////////////////
// funcoes para auxiliar
function escala_transform ( escala ) {
	escala *= 200;
	escala = Math.abs(escala);
	escala += 50;
	escala /= 1.48;
	return escala;
}

function easeInOutQuad(t) {
	return t<.5 ? 2*t*t : -1+(4-2*t)*t; // easeInOutQuad
}

///////////////////////////////////////////////////
// gatilhos
var dragev = document.createEvent('Event');
dragev.initEvent('rolldrag',true,true);


