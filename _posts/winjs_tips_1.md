{{{ "title" : "WinJS: Tips 1", "tags" : [ "dev", "JavaScript", "winjs", "back" ], "category" : "dev", "date" : "11-29-2015", "background": "/modules/blog/headers/winjs_d.png" }}}

Hello!

Je me suis mis au développement d'applications en JavaScript sous Windows 10 (Desktop & Mobile), 
et j'utilise [WinJS](https://github.com/winjs/winjs) comme bibliothèque principale.
WinJS est une bibliothèque JavaScript créée par Microsoft pour faciliter la création d'apps en offrant 
des fonctions utilitaires telles que la création simplifiée 
d'un objet [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest):

```JavaScript
WinJS.xhr(options).done( /* Your success and error handlers */ );
```

Bien que le développement d'application JavaScript sous Windows 10 
est très similaire à ce qu'on peut retrouver sur la toile, 
il existe des particularités qui peuvent ralentir le développement.
C'est pour cette raison que je souhaite regrouper les différentes choses à savoir dans une série 
de posts qui permettra d'accélérer la mise en production de nos applications.

Chaque poste présentera quelques astuces que j'ai découvert au cours de la semaine.

##SOMMAIRE

* [Override Back Button](#override-back-button)

#Override Back Button<a name="override-back-button"></a>

Par défaut, le boutton retour (sur les mobiles ou le bouton virtuel sous Windows 10 Desktop) navigue vers la page précédente, mais il peut arriver qu'on veut modifier ce comportement. Voici un exemple de cas:

On a une page avec une liste d'éléments. En cliquant sur un élément on a une vue détaillée de celui-ci.
Un utilisateur appuyant sur le bouton retour s'attendrait à fermer la vue détaillée pour retourner sur la liste d'éléments.

Pour permettre ce comportement, il faut surcharger la méthode de retour de navigation.
On attache dabord l'évènement à WinJS.

```JavaScript
WinJS.Navigation.addEventListener("beforenavigate", this.beforenavigate);
```

Puis on définit l'écouteur en annulant la navigation avec la fonction ```event.preventDefault();```

```JavaScript
// Execute additional code before navigation
beforenavigate: WinJS.Class.define(function (eventObject) {
  // This function gives you a chance to veto navigation. This demonstrates that capability
  if (true /* should cancel navigation */) {
    event.preventDefault();
  }
}),
```

>_[docs sur les events de navigation](https://msdn.microsoft.com/en-us/library/windows/apps/br229838.aspx)_

> [Gist exemple complet](https://gist.github.com/rootasjey/87e6cca1c0e37e1eb868)

Alors oui, on pourrait créer une autre page pour la vue détaillée, mais paradoxalement, cela pourrait être plus long à coder et ajouterait des fichiers supplémentaires (html, css, js).


