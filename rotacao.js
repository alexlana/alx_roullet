
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

var rbullets = document.querySelectorAll('.roullete-bullets');
for ( var i=0; i<rbullets.length; i++ ) {
	rbullets[i].setAttribute('bullet-num', i);
	rbullets[i].addEventListener( 'click', alx_rodar );
	escala_antes[i] = -10000;
	crescendo[i] = false;
}
var rodantes = document.querySelectorAll('.roullete-item');
var espaco = 6.3/rodantes.length; // 6.3 eh o valor da volta completa. soh sei q eh assim

function alx_rodar (e) {
	clearTimeout(alx_timeout);

	if ( e==undefined )
		var bnum = 0;
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
			'blur': true,
			'eyeview': 'top',
			'radius': 50, // percentual do tamanho do wrapper
			'clockwise_org': false,
			'clockwise_rot': true,
			'framesporsegundo': 60,
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

	document.getElementById('alx_roulette').classList.add('movin');

	var radius = alx_opt['radius']; // % da largura do wrapper

	alx_t = alx_t + stepfurther;

	time += 1 / alx_opt['framesporsegundo'];
	duration = (1 / alx_opt['framesporsegundo']) * passos;
	var dif = tfim - tini;

	for ( var i=0; i<rodantes.length; i++ ) {

		var phase = 0 + espaco*i;
		var phasev = phase + 1.57618; // movimento perpendicular ao do phase

		var ease = easeInOutQuad( (time / duration) ); // retorna o percentual do andamento
		ahora = dif * ease + tini; // quanto andou + ponto inicial
		var onde = Math.cos(phase + ahora * 2 * Math.PI) * clockwise_org;
		var onde2 = Math.cos(phasev + ahora * 2 * Math.PI * eyeview);
		var blur = escala = 0.5 * Math.cos(phasev/2 + ahora * Math.PI);

		escala = escala_transform(escala);

		onde = (onde * radius);

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

		rodantes[i].setAttribute('escala', escala);
		rodantes[i].style.top = (onde2*50)+'%';
		if ( escala < 52.3 )
			escala = 52.3; // se melhorar a formula para tirar isso aqui vai o ideal
		rodantes[i].style.transform = 'scale('+escala+'%) translateX(-50%)';
		rodantes[i].style.left = onde+'%';
		rodantes[i].style.marginLeft = '50%';
		rodantes[i].style.filter = 'blur('+blur+'px) ';
		rodantes[i].style.zIndex = Math.round(onde2*20);

	}

	alx_timeout = setTimeout( function(){alx_rotacao();}, (1000/alx_opt['framesporsegundo']) );
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