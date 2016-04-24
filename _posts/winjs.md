{{{
    "title"     : "WINJS: BASICS 1",
    "tags"      : [ "dev", "JavaScript", "winjs", "code", "html", "css" ],
    "category"  : "dev",
    "date"      : "08-16-2015",
    "background": "/blog/headers/winjs_d.png"
}}}


Hello tout le monde!

Développant en C# sous Windows Phone (WP) depuis quelques temps,
je me suis découvert une passion pour le __javascript__ ainsi que ses compagnons,
 l'HTML5 et le CSS3.

Et depuis que j'ai basculé vers les langages de scripting, je code tout et
n'importe quoi avec les technologies du web, de _io.js (node.js)_, en passant
par _react.js_, jusqu'à _polymer_ et _webcomponents_.

C'est donc de manière normale que j'ai voulu développer des applis sous WP
avec tout ce que j'avais appris depuis un an. Et pour réaliser cela, il faut
passer par __WinJS__.

<q>**NOTE:** _WinJS_ est un framework crée par Microsoft afin de concevoir des applications
natives en HTML, CSS et JavaScript sous Windows et Windows Phone.</q>


Nous allons voir quelques points pouvant faciliter le développement d'applis
WP en JavaScript.

<br><br>

**SOMMAIRE**

- [PRE-REQUIS](#pre-requis)
- [UTILISER LESS (À LA PLACE DU CSS)](#utiliser-du-less-%C3%A0-la-place-du-css)
- [CONTENU DYNAMIQUE UNSAFE ET INNERHTML](#contenu-dynamique-unsafe-et-innerhtml)
- [REFERENCES](#references)


<br><br>
# PRE-REQUIS<a name="pre-requis"></a>

* [Visual Studio 12, 2013, 2015 Community ou Express](https://www.visualstudio.com/fr-fr/downloads/download-visual-studio-vs.aspx)
* [SDK Windows Phone 8.1](http://www.microsoft.com/en-us/download/details.aspx?id=43719)
que vous pouvez ajouter lors de l'install de VS.
* Emulateur Windows Phone 8.1 (sera installé avec le SDK Windows Phone 8.1) // Téléphone avec WP 8.1+


<q>**IMPORTANT :** Il existe certains bugs sur VS 2015 avec les projets HTML/JavaScript,
je vous recommande donc de prendre une version ultérieure (2013 de préférence).</q>




<br><br>
# UTILISER LESS (À LA PLACE DU CSS)<a name="utiliser-du-less-%C3%A0-la-place-du-css"></a>

Le langage [less](http://lesscss.org/) est un préprocesseur CSS qui étend
les fonctionnalités du langage. Il est alors possible d'utiliser des variables,
 des fonctions, et bien plus. Il permet surtout d'écrire des règles CSS imbriquées.

Au lieu d'écrire cela:
```css
#espace {
    height          : auto;
    width           : auto;
    position        : absolute;
    background-color: black;
}

#espace .etoiles {
    display         : inline-block;
    background-color: white;
}
```

On écrit ceci:

```less
#espace {
    height          : auto;
    width           : auto;
    position        : absolute;
    background-color: black;

    .etoiles {
        display         : inline-block;
        background-color: white;
    }
}
```

Bien mieux n'est-ce pas?
Cela permet aisément de préciser les sélecteurs CSS -
[chose très importante dans une appli WinJS mobile.](http://mcnextpost.com/2014/05/27/best-practices-for-winjs-applications/)


Pour utiliser _less_, procédons comme ceci :

1. Ouvrir un projet Windows Phone JavaScript existant ou en créer un nouveau.

2. Aller dans les _outils_ > _Gestionnaire de package NuGets_ >
_Gérer les packages NuGet pour la solution..._
<img type='screenshot' alt='MetroLess 1' src='/blog/attachements/winjs_basics1/winjs_basics1_1.png' />
<br><br>

3. Sur la nouvelle fenêtre, cliquer sur _En ligne_ dans le panel de gauche
4. Dans le champ de recherche en haut à droite, tapez _"metroless"_
<img type='screenshot' alt='MetroLess 2' src='/blog/attachements/winjs_basics1/winjs_basics1_2.png'>
<br>
<br>
<br>

5. Attendez quelques secondes le temps qu'il effectue la recherche,
puis sélectionnez le package _MetroLess_, et installez-le aux projets
de votre solution.

6. Quand l'installation est terminée,
vous pouvez créer un nouveau fichier _style.less_ dans votre projet,
et le référencer dans votre page _.html_ avec l'extension _.css_ comme suit:

```markup
<link href='style.css' rel='stylesheet'></link>
```

Ainsi, lors de la compilation du projet, les fichiers _.css_ correspondant seront
automatiquement générés. Pour ma part, j'ai également modifié l'extension
des feuilles de style existantes et générées lors de l'ajout d'une nouvelle page.


<br><br>
# CONTENU DYNAMIQUE UNSAFE ET INNERHTML <a name="contenu-dynamique-unsafe-et-innerhtml"></a>

Quand on crée une application Windows Phone 8.1, par défaut
on ne peut pas utiliser les méthodes innerHTML et outerHTML
[pour des raisons de sécurité.](https://msdn.microsoft.com/en-us/library/windows/apps/hh849625.aspx)
On doit se rabattre par exemeple sur du _textContent_
qui ne permet pas de créer des éléménts HTML à la volée.
Bon, on peut très bien passer par un _document.createElement('div')_.

Les complications arrivent quand on veut utiliser une bibliothèque
telles que [AngularJS](https://angularjs.org/), [EmberJS](http://emberjs.com/)
ou quelque chose de plus simple comme [Prismjs](http://prismjs.com/index.html).
Ces frameworks ont tendance à modifier le contenu html des élémennts du DOM,
ce qui provoque une erreur à l'exécution.

<q>NOTE: Cette restriction a été retirée dans les applications Windows 10.</q>


<br><br>
![AngularJS error](https://raw.githubusercontent.com/MSOpenTech/winstore-jscompat/master/error.PNG?token=3019602__eyJzY29wZSI6IlJhd0Jsb2I6TVNPcGVuVGVjaC93aW5zdG9yZS1qc2NvbXBhdC9tYXN0ZXIvZXJyb3IuUE5HIiwiZXhwaXJlcyI6MTQwNjU3OTYyOX0%3D--101970399d1c4e94bbe251e71e78f8be6af6d7ba "Erreur de contenu taggué unsafe dans une application WP")


<br>
Pour pallier à ce problème, il est possible d'utiliser des fonctions telles que :

```javascript
WinJS.Utilities.setInnerHTMLUnsafe(DOMelement, text);
```

Mais il est préférable d'utiliser cette seconde méthode qui est plus radicale :)

Microsoft conscient du problème a mis à disposition un petit script
permettant d'enlever cette sécurité:

1. [Naviguer vers la page GitHub](https://github.com/MsopenTech/winstore-jscompat)
2. Télécharger le contenu du répertoire grâce au bouton __download__ sur la droite.
3. Dézipper le dossier _.zip_ et ajouter le fichier __winstore-jscompat.js__
à votre projet WP.
4. Dans la page __defautl.html__, inclure ce fichier avant tout autre script.

Maintenant vous ne devriez plus avoir d'erreur lors de l'utilisation des frameworks
précédemment cités ou lors de l'utilisation de la méthode _element.innerHTML()_.


Cet article est le premier d'une longue série. Stay tuned! ;)

<br><br>
# REFERENCES<a name="references"></a>

* https://openclassrooms.com/courses/creez-des-applications-pour-windows-8-en-html-et-javascript/winjs
* http://mcnextpost.com/2014/05/27/best-practices-for-winjs-applications/
<br><br>
