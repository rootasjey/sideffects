{{{ "title" : "WinJS: Tips 1", "tags" : [ "dev", "JavaScript", "winjs", "code", "html", "css" ], "category" : "dev", "date" : "11-29-2015", "background": "/modules/blog/headers/winjs_d.png" }}}

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

* Override Back Button
*

Override Back Button
