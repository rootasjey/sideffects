{{{ "title" : "WinJS: ListView et Repeater", "tags" : [ "dev", "JavaScript", "winjs", "listview", "virtualizartion", "Repeater" ], "category" : "dev", "date" : "11-29-2015", "background": "/modules/blog/headers/winjs_d.png" }}}

Bonjour à tous!

Au cours de mes derniers développement, je me suis familiarisé avec le control de la [ListView](https://msdn.microsoft.com/en-us/library/windows/apps/br211837.aspx) possédant des avantages incontournables dans certaines situations.


###SOMMAIRE

* [ListView versus Repeater](#listVSRep)
* [Utiliser la ListView](#listview)
* [Gérer les évènements à l'intérieur de la ListView](#events)
* data-win-bind="this['data-link']: url WinJS.Binding.setAttribute


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

# <a name="listview"></a> UTILISER LA LISTVIEW

Pour utiliser la ListView, on commence par déclarer le contrôle dans le HTML:

>page.html
```html
<!-- Déclaration du contrôle dans le HTML -->
<div class="listView win-selectionstylefilled"
     id="listauthors"
     data-win-control="WinJS.UI.ListView"
     data-win-options="{
        itemDataSource: Authors.ListView.data.dataSource,
        itemTemplate: myfunction,
        groupDataSource: Authors.ListView.data.groups.dataSource,
        groupHeaderTemplate: select('.listLayoutTopHeaderTemplate'),
        selectionMode: 'single',
        tapBehavior: 'directSelect',
        layout: { type: WinJS.UI.GridLayout }
}">
</div>

<!-- data-win-control: nom du contrôle utilisé -->
<!-- -->
<!-- -->
<!-- itemTemplate: modèle de chaque élément de la ListView -->
<!-- -->
<!-- -->
```

# <a name="events"></a> GERER LES EVENEMTNS À L'INTERIEUR DE LA LISTVIEW
