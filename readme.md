**_English version at the end of this doc._**

Carrossel estilo "roleta", como um carrossel de parquinho mesmo. Os elementos se movem em um círculo em perspectiva tentando obedecer a física :) mas como a imperfeição é bela, tem muita coisa diferente da realidade aí 😅

# Modo de usar

O HTML deve seguir essa estrutura:

```
<div id="alx_roulette"><!-- isso deve mudar no futuro, hoje esse id deve ser mantido -->
	<div class="roullete-wrapper"><!-- onde os elementos do carrossel devem ficar contidos -->
		<div class="roullete-item">A</div><!-- um elemento do carrossel. todos devem ter essa classe e não precisam ser div, podem ser links (<a>). diagrame o conteúdo aí dentro -->
		<div class="roullete-item">B</div>
		<div class="roullete-item">C</div>
		<div class="roullete-item">D</div>
		<div class="roullete-item">E</div>
	</div>
	<div class="roullete-bullets-wrapper"><!-- os elementos clicáveis para selecionar o item do carrossel devem ficar aqui dentro -->
		<div class="roullete-bullets"></div><!-- um dos elementos clicáveis para atualizar aposição do carrossel. precisa ter o mesmo número de elementos aqui q há no conteiner anterior -->
		<div class="roullete-bullets"></div>
		<div class="roullete-bullets"></div>
		<div class="roullete-bullets"></div>
		<div class="roullete-bullets"></div>
	</div>
</div>
```

O limite de elementos deve ser bem grande, não foi testado ou avaliado sobre isso, mas devem caber 100 elementos no carrossel tranquilamente.

Para funcionar, insira o seu HTML seguindo a estrutura acima, adicione o arquivo CSS entre as tags `<head>` e `</head>` e o JavaScript imediatamente antes da tag `</body>`. Carregue ambos usando as tags:

```
<link rel='stylesheet' href='rotacao.css' type='text/css' media='all' />
<script type="text/javascript" src="rotacao.js"></script>
<script type="text/javascript">
	alx_roulette(); // comando para iniciar o carrossel
</script>
```

## Largura e altura da elipse por onde os itens circulam

O "raio" do círculo é a largura do elemento `roullete-wrapper`. A altura da elipse é a altura do `roullete-wrapper`. Você pode controlar isso usando CSS.

# Opções

Em andamento...

# Contribua!

Se você encontrar bugs ou soluções melhores (olha q não tá difícil...), abra sua issue ou mande seu pull request! Vai ser ótimo!

---


...........
### !!!!! DOC'S ENGLISH VERSION !!!!
...........


Roullet style carousel. It's like a real playground carousel. The items move in a circle in perspective and try to obey physics :) but I think that imperfection is beautiful, so there are several things that differ from reality 😅


# How to use

The HTML code need to be like this:

```
<div id="alx_roulette"><!-- it will be change, but today you want to use this ID -->
	<div class="roullete-wrapper"><!-- it's the wrapper where all carousel elements have to be contained -->
		<div class="roullete-item">A</div><!-- it's one carousel element. all the items have to receive this class. you can use other tags like <a> instead <div>. your design can be placed inside it. -->
		<div class="roullete-item">B</div>
		<div class="roullete-item">C</div>
		<div class="roullete-item">D</div>
		<div class="roullete-item">E</div>
	</div>
	<div class="roullete-bullets-wrapper"><!-- the clickable elements to select the carousel items must remain here -->
		<div class="roullete-bullets"></div><!-- this is one of the clickable elements that update the carousel position. must have the same number of elements here and there, on previous wrapper -->
		<div class="roullete-bullets"></div>
		<div class="roullete-bullets"></div>
		<div class="roullete-bullets"></div>
		<div class="roullete-bullets"></div>
	</div>
</div>
```

The elements limit must be very large, I haven't tested it yet, but 100 elements must fit in the carousel.

In order to carousel work, place your HTML following the above structure, add the CSS file between the tags `<head>` and `</head>` and the JavaScript imediatelly before the tag `</body>`. Load both using this tags:

```
<link rel='stylesheet' href='rotacao.css' type='text/css' media='all' />
<script type="text/javascript" src="rotacao.js"></script>
<script type="text/javascript">
	alx_roulette(); // this is to start the carousel
</script>
```

## Carousel's ellipse width and height

The "radius" of the circle is the width of `roullete-wrapper`. The height of the ellipse is the height of `roullete-wrapper`. You can control it through CSS.

# Options

Soon...

# Contribute!

If you find bugs or better solutions, please open an issue or send your pull request! It will be great!
