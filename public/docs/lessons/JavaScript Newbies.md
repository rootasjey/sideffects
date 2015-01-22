JAVASCRIPT
----------

*   QUELLE EST LA PARTICULARITE DES TYPES DE VARIABLES EN JS?
    Le JS est faiblement typé => type générique 'var'
    On peut faire du transtypage => une var peut changer de type de données

    ````
    var chaine = "Salut toto";
    chaine = 223;
    ````

*   COMMENT DECLARE-T-TON UNE FONCION?

    ````
    function jeVaisObtenirMonStage() {
        // corps de ma fonction
        return réussite;
    }
    ````

*   QU'EST-CE QU'UNE FONCTION ANONYME?

    Une fonction qui n'a pas d'identificateur (de nom).
    Elle sert à exécuter immédiatement du code
    (à vérifier sur le net, ce n'est pas une bonne définition)

    Exemples d'utitilisation :

    Exemple 1 :
    Le code est exécuté
    ````
    (function () {
        // Corps et âme
    })();
    ````

    Exemple 2
    ````
    var maVar = function () {
        console.log("stage");
    };

    maVar();
    ````

*   QU'EST-CE QU'UNE FONCTION DE CALLBACK?

    Une fonction qui est passé à une autre fonction comme paramètre.


    ````
    function reussir(nom, age, metier, function () {
        alert("callback");
    });
    ````
    ou

    ````
    function reussir(nom, age, callback){
        console.log("" + nom + " a réussi sa vie à l'age de "+age+" ans");
        callback(nom);
    }

    function call(nom){
        console.log(nom);
    }

    reussir("somia","22",call);
    ````

    ````
    (function () {
        //c ode
        })();
    ````

*   PEUT-ON FAIRE DE LA POO?


*   COMMENT ON DECLARE UN OBJET?


*   QUE REPRESENTE 'THIS' DANS UNE FONCTION?

*   QU'EST-CE QU'UNE FONCTION PROTOTYPE?

* COMMENT DECLARE T-ON UNE VARIABLE GLOBALE?

* A QUOI SERVENT LES ATTRIBUTS 'ASYNC' ET 'DEFERE' DANS UNE BALISE SCRIPT?
