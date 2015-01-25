JAVASCRIPT
----------

###QUELLE EST LA PARTICULARITE DES TYPES DE VARIABLES EN JS?

Le JS est faiblement typé => type générique 'var'
On peut faire du transtypage => une var peut changer de type de données

```javascript
var chaine = "Salut toto";
chaine = 223;
```

<br>
<br>
###COMMENT DECLARE-T-TON UNE FONCION?

```javascript
function jeVaisObtenirMonStage() {
    // corps de ma fonction
    return réussite;
}
```

<br>
<br>
###QU'EST-CE QU'UNE FONCTION ANONYME?

Une fonction qui n'a pas d'identificateur (de nom).
Elle sert à exécuter immédiatement du code
(à vérifier sur le net, ce n'est pas une bonne définition)

Exemples d'utitilisation :

Exemple 1 :
Le code est exécuté

```javascript
(function () {
    // Corps et âme
})();
```

Exemple 2

```javascript
var maVar = function () {
    console.log("stage");
};

maVar();
```

<br>
<br>
###QU'EST-CE QU'UNE FONCTION DE CALLBACK?

Une fonction qui est passé à une autre fonction comme paramètre.

```javascript
function reussir(nom, age, metier, function () {
    alert("callback");
});
```
ou

```javascript
function reussir(nom, age, callback){
    console.log("" + nom + " a réussi sa vie à l'age de "+age+" ans");
    callback(nom);
}

function call(nom){
    console.log(nom);
}

reussir("somia","22",call);
```

```javascript
(function () {
    //c ode
    })();
```

<br>
<br>
###PEUT-ON FAIRE DE LA POO?

Oui, on peut faire de la programmation orienté objet en utilisant notamment un constructeur et des fonctions prototypes.


<br>
<br>
###COMMENT ON DECLARE UN OBJET?

On déclare un objet via son constructeur

```javascript
function Personne(nom, age, sexe, parents, boulot, relations) {
    this.nom = nom;
    this.age = age;
    this.sexe = sexe;
    this.parents = parents;
    this.boulot = boulot;
    this.relation = relations;
}

var p = new Personne('som', '22', 'F', 'Parents', 'DEV');
```

[Plus d'informations](http://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/les-objets-5)


<br>
<br>
###QU'EST-CE QU'UNE FONCTION PROTOTYPE?

```javascript
Personne.prototype.ajouterRelation = function(nom, age, sexe, parents, boulot, relation) {
    this.relation.push(new Personne(nom, age, sexe, parents, boulot, relations));
}
```

[Plus d'informations](http://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/les-objets-5)


<br>
<br>
###QUE REPRESENTE 'THIS' DANS UNE FONCTION?

**This** représente l'objet courant.


<br>
<br>
###COMMENT DECLARE T-ON UNE VARIABLE GLOBALE?

Il suffit de la déclarer en dehors de tout block de code, ou la déclarer sans le mot clé var.

```javascript
_GLOBAL = 1024;
```

<br>
<br>
###A QUOI SERVENT LES ATTRIBUTS 'ASYNC' ET 'DEFERE' DANS UNE BALISE SCRIPT?

    * **async** : charger/exécuter les scripts de façon asynchrone.
    * **defer** : différer l'exécution à la fin du chargement du document.

[Plus d'informations ici](http://www.alsacreations.com/astuce/lire/1562-script-attribut-async-defer.html)


<br>
<br>
###QU'EST-CE QU'UN POLYFILL?

Un polyfill est un script qui a pour but de fournir une technologie à tous les navigateurs existants

[Plus d'informations sur le sujet](http://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/les-polyfills-et-les-wrappers)



<br>
<br>
###QU'EST-CE QU'UN WRAPPERS?

Un wrapper est un code qui a pour but d'encadrer l'utilisation de certains éléments du JavaScript. Il peut ainsi contrôler la manière dont ils sont employés et peut réagir en conséquence pour fournir des fonctionnalités supplémentaires aux développeurs.

[Plus d'informations sur le sujet](http://openclassrooms.com/courses/dynamisez-vos-sites-web-avec-javascript/les-polyfills-et-les-wrappers)

<br>
<br>
