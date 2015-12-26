{{{ "title" : "WinJS: ListView et Repeater", "tags" : [ "dev", "JavaScript", "winjs", "listview", "virtualizartion", "Repeater" ], "category" : "dev", "date" : "11-29-2015", "background": "/modules/blog/headers/winjs_d.png" }}}

Bonjour à tous!

Au cours de mes derniers développement, je me suis familiarisé avec le control de la [ListView](https://msdn.microsoft.com/en-us/library/windows/apps/br211837.aspx) possédant des avantages incontournables dans certaines situations.


###SOMMAIRE

* [ListView versus Repeater](#listVSRep)
* [Utiliser la ListView](#listview)
* [Gérer les évènements à l'intérieur de la ListView](#events)


>Cette article suppose que vous possédez déjà un projet d'app Windows 10 en JavaScript avec la bibliothèque WinJS

# <a name="listVSRep"></a>LISTVIEW VERSUS REPEATER

Lors du développement de mes applications Windows 10, j'avais tendance à choisir le contrôle du Repeater plutôt que la ListView car aux premiers abords mettre en pratique le [Repeater] (https://msdn.microsoft.com/en-us/library/windows/apps/dn301916.aspx) est plus simple:

>home.html
```html
<div id="listquotes" data-win-control="WinJS.UI.Repeater" data-win-options="{data: data.quotes}">
    <div class="quote-square">
        <div class="quote-content">
            <div class="quote-txt" data-win-bind="textContent: content"></div>
            <div class="quote-author" data-win-bind="textContent: author; this['datalink']: authorLink"></div>
        </div>
        <div class="quote-actions">
            <div data-win-bind="className : this data.bindingFavorite"></div>
            <div class="quote-share"></div>
            <div class="quote-copy"></div>
        </div>
    </div>
</div>
```

>data.js
```JavaScript
var sampleData = [
  {content: "Content 1", author: "Author 1", authorLink: "Author-link 1"},
  {content: "Content 2", author: "Author 2", authorLink: "Author-link 2"},
  {content: "Content 3", author: "Author 3", authorLink: "Author-link 3"},
  {content: "Content 4", author: "Author 4", authorLink: "Author-link 4"},
];
WinJS.Namespace.define("data", {
    quotes: new WinJS.Binding.List(sampleData), // main quotes
});
```

Simple, surtout pour ajouter des évènements sur le contenu HTML généré à partir des données fournies:

>home.js
```JavaScript
// Ajoute des évènements sur le HTML généré
// Lancer ce code dans la fonction 'ready' de la page pour s'assurer que le rendu a été fait
function addEventsOnRepeater() {
  // Récupère la liste des éléments du DOM
  nodeList = document.getElementsByClassName("quote-favorite");
  // Pour chaque élément, applique la fonction anonyme
  // La fonction anonyme ajoute l'évènement de click sur l'élément
  [].forEach.call(nodeList, function (node, index) {
    node.addEventListener("click", function (event) {
      // Ajoute/Supprime la classe 'active' de l'élément node
      WinJS.Utilities.toggleClass(node, "active");
    });
  });
}
```

Malheureusement, on atteint très rapidement les limites de ce contrôle (Repeater) dès qu'on a un large volume de données.
Avec une liste d'environ 930 éléments, le rendu prend 3 secondes et l'interface freeze durant ce laps de temps ce qui provoque une mauvaise expérience utilisateur.
En effet, contrairement à la ListView, le Repeater ne fait pas **virtualisation**.

La virtualisation est une technique qui permet de faire le rendu que d'une partie des éléments d'une liste en fonction de la surface d'affichage. Ainsi, en reprenant l'exemple de code ci-dessus, que l'application possède 10 citations ou 10 000 ne produira pas de fuite de mémoire à cause du rendu. La fluidité est conservée.


* [Exemple d'utilisation du Repeater](http://winjs.azurewebsites.net/#repeater)
* [Exmeple d'utilisation de la ListView](http://winjs.azurewebsites.net/#listviewinteractions)

# <a name="listview"></a>UTILISER LA LISTVIEW

Pour utiliser la ListView, on commence par déclarer le contrôle dans le HTML:

>authors.html
```html
<!-- Template des éléments de la ListView -->
<div class="author-template" data-win-control="WinJS.Binding.Template" style="display: none">
    <div class="author-square">
        <img class="author-img"/>
        <div class="author-name" data-win-bind="textContent: name"></div>
    </div>
</div>
<!-- Déclaration du contrôle dans le HTML -->
<!-- data-win-control: nom du contrôle utilisé -->
<!-- data-win-option: paramètres du contrôle -->
<!-- itemDataSource: source de données -->
<!-- itemTemplate: modèle de chaque élément de la ListView -->
<!-- groupDataSource: à indiquer si les données sont groupées par paquet -->
<!-- groupHeaderTemplate: modèle des headers des groupes de données -->
<!-- selectionMode: si les éléments sont sélectionnable de manière individuelle ou multiple -->
<!-- tapBehavior: réaction quand un item est cliqué -->
<!-- layout: disposition du rendu des éléments -->
<div class="listView win-selectionstylefilled"
     id="listauthors"
     data-win-control="WinJS.UI.ListView"
     data-win-options="{
        itemDataSource: Authors.ListView.data.dataSource,
        itemTemplate: select('.author-template'),
        groupDataSource: Authors.ListView.data.groups.dataSource,
        groupHeaderTemplate: select('.listLayoutTopHeaderTemplate'),
        selectionMode: 'single',
        tapBehavior: 'directSelect',
        layout: { type: WinJS.UI.GridLayout }
    }">
</div>
```

>data.js
```JavaScript
WinJS.Namespace.define("data", {
    // Déclaration de la liste et de ses données
    authors: new WinJS.Binding.List([
      {id: "1", name: "Balzac", url: "url 1"},
      {id: "2", name: "Appolinaire", url: "url 2"},
      {id: "3", name: "Stendhal", url: "url 3"},
      {id: "4", name: "Flaubert", url: "url 4"},
    ]),
});
// Création des groupes de données en se basant sur les noms des auteurs
var grouped = data.authors.createGrouped(function (item) {
    return item.name.toUpperCase().charAt(0);
}, function (item) {
    return {
        name: item.name.toUpperCase().charAt(0)
    };
}, function (left, right) { // fonction de rangement par ordre croissant A-Z
    return left.charCodeAt(0) - right.charCodeAt(0);
});
// Déclaration de la ListView groupée
WinJS.Namespace.define("Authors.ListView", {
    data: grouped,
});
```

Et on a une belle liste d'élément rangés par ordre alphabétique :)

# <a name="events"></a> GERER LES EVENEMTNS À L'INTERIEUR DE LA LISTVIEW

Un dernier point qui me chagrinait par rapport à la ListView était la difficulté de lier des évènements sur les éléments d'un template (modèle), car la liaison ne marche pas en l'ajoutant directement dans le HTML:

>authors.html
```html
<div class="author-template" data-win-control="WinJS.Binding.Template" style="display: none">
    <div class="author-square">
        <img class="author-img" data-win-bind="onclick: clickImg"/>
        <div class="author-name" data-win-bind="textContent: name"></div>
    </div>
</div>
```

>authors.js
```JavaScript
function clickImg(event) {
    console.log("image clicked!");
}
```

Pour lier un évènement sur un élément d'un template, on doit redéfinir le template:

```JavaScript
/*
 * Génère un template pour les éléments de la ListView des auteurs
 * @param {object} Item promise provenant de la ListView, il est passé automatiquement
 * @return {HTMLElement}
 */
function authorsTemplate(itemPromise) {
    // Le paramètre itemPromise est passé automatiquement par la ListView grâce au binding
    return itemPromise.then(function (currentItem) {
        // L'objet currentItem est le modèle de données courant
        // et ainsi pour chaque auteur, cette fonction sera appelée
        // --------------------------------------------------------
        // C'est ici qu'on va construire notre HTML
        // pour le template des éléments de la ListView
        var square, img, name;
        
        // On crée des éléments en leur ajoutant des classes
        square = document.createElement("div");
        square.classList.add("author-square");

        img = document.createElement("img");
        img.classList.add("author-img");

        name = document.createElement("div");
        name.classList.add("author-name");
        
        // On accède aux attributs du modèle de données grâce à l'attribut 'data'
        name.textContent = currentItem.data.name;

        square.appendChild(img);
        square.appendChild(name);

        // On définit un évènement de click sur l'image du template
        img.addEventListener("click", function (event) {
            console.log("IMG");
        });
        
        // On définit un évènement de click sur le texte du template
        name.addEventListener("click", function (event) {
            console.log("TXT");
        });

        return square;
    });
}
// Cette fonction de WinJS permet de spécifier que la fonction 'authorsTemplate' 
// est compatible avec le traitement déclaratif, car cette fonction sera utilisée comme paramètre pour la ListView.
WinJS.Utilities.markSupportedForProcessing(authorsTemplate);
```

Enfin, il suffit de renseigner le template dans la ListView (le changement est au niveau de l'attribut itemTemplate):

```html
<div class="listView win-selectionstylefilled"
     id="listauthors"
     data-win-control="WinJS.UI.ListView"
     data-win-options="{
        itemDataSource: Authors.ListView.data.dataSource,
        itemTemplate: authorsTemplate,
        groupDataSource: Authors.ListView.data.groups.dataSource,
        groupHeaderTemplate: select('.listLayoutTopHeaderTemplate'),
        selectionMode: 'single',
        tapBehavior: 'directSelect',
        layout: { type: WinJS.UI.GridLayout }
}">
</div>
```

Maintenant cliquer sur l'image ou le nom d'un auteur lancera deux fonctions différentes.
Ce scénario est surtout nécessaire quand on possède des templates complexes, sinon utiliser la fonction 'selectionChanged' sera largement suffisant.

Scénario avec l'event _selectionChanged_ de la ListView: 

>authors.js
```JavaScript
var list = document.querySelector("#listauthors");
list.addEventListener("selectionchanged", clickAuthor);
// Click event (on author item)
function clickAuthor (event) {
    var author = null; // sera remplie avec les infos de l'auteur
    // Obtient la sélection de la listview
    var selected =
        authors.elements.listViewAuthors.selection.getItems().done(
        function (results) {
            author = results[0].data; // récupère le premier élément sélectionné
    });
    // Traitement
    // [...]
}
```
