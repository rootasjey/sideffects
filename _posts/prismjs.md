{{{
    "title"     : "Prismjs: un colorateur syntaxique moderne",
    "tags"      : [ "dev", "JavaScript", "Syntax highlighter", "code", "pre", "prism", "highlightjs" ],
    "category"  : "dev",
    "date"      : "07-26-2015",
    "background": "/modules/blog/headers/prismjs.jpg"
}}}



Prism est un colorateur syntaxique JavaScript léger, extensible, écrit par [Lea Verou](http://lea.verou.me).
Il facile d'utilisation et est utile quand on affiche des bout de code sur son site ou blog, un peu comme ici :D. Donc non, Prism n'a rien à voir avec le programme de renseignement de la NSA.

<br>
<br>
# PRESENTATION

Plutôt bien conçu, ce petit framework est utilisé par:
* [Mozilla Developer Network](https://developer.mozilla.org/fr/)
* [WebPlatform.org](https://www.webplatform.org)
* [CSS Tricks](https://css-tricks.com)
* et d'autes (rien que ça!)

Ses avantages comparés à une autre bibliothèque comme [Highlightjs](https://highlightjs.org)
sont:

* Sa légèreté (quelques dizaines, voir centaines de Kilo-octects avec tous les plugins).
* Il est facilement extensible avec des [regex](https://regex101.com) ou des plugins.
* Il respect [les standards du W3C](http://www.w3.org/TR/html5/text-level-semantics.html#the-code-element) sur la déclaration de bloques de code
* L'héritage de définition des langages. Par exemple, pour définir du _CoffeScript_, il suffit d'hériter du _JavaScript_ et de changer quelques règles de syntaxes. Ce qui accélère l'ajout de nouveaux langages.
* L'highlight asyncrhone avec des Web Workers pour des gros bloques de code.
* L'highlight de langages intégré dans d'autres, par ex. du _CSS_ dans du _HTML_.
* L'affichage de caractères invisibles grâce un plugin.
* Le support de plusieurs navigateurs et le tralala.


Il possède quelques limitations, mais très spécifiques donc pas très génantes, comme l'absence de support pour IE 6-8, quelques problèmes d'highlight sur [des exemples particuliers](http://prismjs.com/examples.html#failures), et l'écrasement de markup _HTML_ dans le code s'il y en avait.


<br>
<br>
# UTILISATION

Passons à la partie intéressante qui est l'utilisation de ce petit framework.

Afin de l'intégrer à un projet en cours, les étapes à suivre sont:

1. [Télécherger les fichiers prism.js et prism.css sur cette page.](http://prismjs.com/download.html)
2. Le mettre dans le répertoire de votre projet.
3. L'inclure dans votre page _HTML_ en linkant **prism.css** et **prism.js**, comme ci-après

```html
<!DOCTYPE html>
<html>
<head>
	...


<link href="themes/prism.css" rel="stylesheet" />

</head>
<body>
	...


<script src="prism.js"></script>

</body>
</html>
```

Insérer ce bout de code dans la balise ```body``` pour vérifier que tout fonctionne bien

```html
<pre><code class="language-css">p { color: red }</code></pre>
```

Des plugins permettant d'étendre les fonctionnalités de base de Prism existent.
Voici les plus intéressant:

* [L'highlight de ligne (permet de mettre une portion en surbrillance)](http://prismjs.com/plugins/line-highlight)
* [L'affichage des numéros de lignes (normal :)](http://prismjs.com/plugins/line-numbers)
* [L'affichage des caractères invisibles](http://prismjs.com/plugins/show-invisibles)
* [L'autolinker qui parle de lui-même](http://prismjs.com/plugins/autolinker)
* [Le WebPlatform Docs qui link certains éléménts à la doc (cliquer sur une balise div par ex. nour ramène sur le site de documentation)](http://prismjs.com/plugins/wpd)
* [L'highlight des mots clés](http://prismjs.com/plugins/highlight-keywords)


<br>
<br>
# DEFINIR DE NOUVEAUX LANGAGES

Développant actuellement un [client _GitHub_ sous Windows Phone 8.1](https://github.com/rootasjey/octopull), j'ai dû intégrer cette bibliothèque qui n'a pas été de tout repos.

Sachant que je voulais highlighter des fichiers qui ne sont pas en local mais sur les serveurs de _GitHub_, je devais ajouter des classes sur la balise ```<code> ``` comme ceci ```<code class='language-css'> ``` après avoir détecter le langage grâce à l'extension du fichier.

Je me suis vite retrouver avec une dizaine de tests très bêtes de ce genre:

```javascript
// HTML
if (this.options.path.indexOf(".html") !== -1) {
  this.lang = " language-markup";

// ActionScript
} else if (this.options.path.indexOf(".as") !== -1) {
  this.lang = " language-actionscript";

// Apache Config
} else if (( this.options.path.indexOf(".conf") !== -1 )     ||
         ( this.options.path.indexOf(".htaccess") !== -1 ) ||
         ( this.options.path.indexOf(".htgroups") !== -1 ) ||
         ( this.options.path.indexOf(".htgroups") !== -1 ) ||
         ( this.options.path.indexOf(".htpasswd") !== -1)) {

  this.lang = " language-apacheconf";
}
```

Ne voulant pas me retrouver avec 30 ```if () else {}``` j'ai cherché pendant quelques heures une solution (pendant deux épisodes de S.H.I.E.L.D). La première était de former simplement un pattern pour n'importe quel fichier. Ca donnait ça:

```javascript
// On récupère l'extension du fichier
// en cherchant le dernier point rencontré
var index = this.options.path.lastIndexOf(".");

// On extrait le chaîne de caratères
var ext = this.options.path.substr(index + 1);

// On forme un pattern general pour n'importe quel langage
this.lang = " language-" + ext;
```

Cela semblait parfait mais seulement il y avait deux problèmes:

* L'extension du fichier ne correspondait pas toujours à la classe du langage: les fichiers _javascript_ qui ont l'extension _.js_ et non _.javascript_.

* Les langages qui possèdent plusieurs extensions tels que le _markdown (.md, .markdown)_, ou les fichies de configuration Apache _Apache Config_.


Là, je me suis dit que si j'ajoutais simplement ces classes customs au _CSS_ alors le tour serait joué, mais pas si vite car les langages ne sont définis dans **prism.css**.

Il m'a fallu quelques temps en plus pour [découvrir comment définir un nouveau langage](http://prismjs.com/extending.html) en héritant d'un parent.

Du coup, en rajouter ce bout de code, j'ai pu définir un langage __js__ qui est tout bêtement du __javascript__.

```javascript
Prism.languages.js = Prism.languages.extend('clike', {
    'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,
    'number': /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
    'function': /(?!\d)[a-z0-9_$]+(?=\()/i
});

Prism.languages.insertBefore('js', 'keyword', {
    'regex': {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: true
    }
});

Prism.languages.insertBefore('js', 'class-name', {
    'template-string': {
        pattern: /`(?:\\`|\\?[^`])*`/,
        inside: {
            'interpolation': {
                pattern: /\$\{[^}]+\}/,
                inside: {
                    'interpolation-punctuation': {
                        pattern: /^\$\{|\}$/,
                        alias: 'punctuation'
                    },
                    rest: Prism.languages.javascript
                }
            },
            'string': /[\s\S]+/
        }
    }
});

if (Prism.languages.markup) {
    Prism.languages.insertBefore('markup', 'tag', {
        'script': {
            pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/i,
            inside: {
                'tag': {
                    pattern: /<script[\w\W]*?>|<\/script>/i,
                    inside: Prism.languages.markup.tag.inside
                },
                rest: Prism.languages.javascript
            },
            alias: 'language-js'
        }
    });
}
;
```

Après quelques tests, cela marche bien, mais cela fait de la dupliquation de code. Cependant, je n'ai pas encore trouvé de moyen plus rapide d'ajouter des extentions à un langage.
