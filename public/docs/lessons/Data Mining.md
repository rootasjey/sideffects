![img-cover](/images/lessons/africa-0.jpg)

### ORGANISATION DU MODULE

* 8 séances de 3h cours/TD
* 4 séances de 3h **projet** -> début le 4 fév.
  * 1 séance présentation
* 1 contrôle?


### INTRODUCTION
Extraction de connaissances à partir de données = L’extraction d’informations originales, auparavant inconnues, potentiellement utiles à partir de données

Contexte de Big Data
Plusieurs domaines : Marketing, Etudes de marchés, Médical, Industriels

Outils de fouille de données

*	Weka
*	Orange
*	Tanagra

### DEFINITIONS

* Fouille de données = application d’algorithmes efficaces qui identifient les motifs contenus dans une base de données.
* Détection d’outlier = une mesure se trouvant à l’extérieur de la courbe de convergence.
* Clustering = détecter des groupes de données (dans un repère orthonormé) (pour connaître la distance des entités les plus proches).
* Classification = ranger des données par classes pour ensuite créer un modèle.
* Evaluation = présentation des motifs découverts avec une visualisation appropriée

<!-- Extraction de motif fréquent : -->
<!--
      |  A1 |  A2 |  An |
---------------------------
  I1  |     |     |     |
---------------------------
  I2  |     |     |     |     => A1 = V11 & A2 + V32
---------------------------
  ... |     |     |     |
---------------------------
  In  |     |     |     |
-->

Les techniques de fouille sert à **superviser**

**Superviser** = injecter une partie résultat dans l'algorithme pour arriver au résultat total.

## Qu'est-ce que la fouille de données?

* Analyser ds résultats de requêtes d'une recherche
* Analyser une structuration

Ce n'est pas juste faire une requête de recherche


## MOTIFS FREQUENTS ET REGLES D'ASSOCIATION
Sert à chercher les régularités dans les données

### DONNEES

* TICKET 1
  * Farine
  * Sucre
  * Lait

* TICKET 2
  * Oeuf
  * Sucre
  * Chocolat

* TICKET 3
  * Farine
  * Oeuf
  * Sucre
  * Chocolat

* TICKET 4
  * Oeuf
  * Chocolat
  * Thé

Construire une base de données à partir de ces données

Les lignes = les transaction (individus)
Chaque élément = item


### BASE DE DONNEES BINAIRE


|TRANSACTION|farine |sucre|lait  |oeuf  |chocolat| thé  |
|--------------------------------------------------------
|T1         |  1    |  1  |   1  |   0  |  0     |   0  |
|T2         |   0   |  1  |  0   |  1   |    1   |   0  |
|T3         |   1   |  1  |   0  |   1  |   1    |   0  |
|T4         |   0   |  0  |  0   |  1   |  1     |   1  |


<br>
### BASE DE DONNEES TRANSACTIONNEL

|TRANSACTION |
|------------------------------------------------
|  T1    |farine |sucre      |lait  
|  T2    |oeuf   |sucre      |chocolat |
|  T3    |farine |oeuf       |sucre    |chocolat|
|  T4    |oeuf   |chocolat   |thé      |


<br>
### FORMAT ATTRIBUT-VALEUR

|TRANSACTION     | VOITURE | COULEUR
|------------------------------------
|P1              |C2       |rouge
|P2              |Clio     |vert
|P3              |BMW      |rouge


<br>
### ITEMS

|ITEMS
|-------------
|voiture = C2
|voiture = Clio
|voiture = BMW
|couleur = rouge
|couleur = vert

<br>
### BASE DE DONNEES TRANSACTIONNEL

| PRODUIT | MARQUE            | COULEUR
|-------------------------------------------
|P1       |voiture = C2       |couleur = rouge
|P2       |voiture = Clio     |couleur = vert
|P3       |voiture = BMW      |couleur = rouge


I = { i1, i2, i3, ... i(n) } -> ensemble d'items de la BD

### Itemset : X _C_(inclu dans) I :

X =

* {Farine, Sucre }
* farine sucre


X C T1 -> T1 contient l'itemset X

X :

* longueur 2
* 2 itemset

### Support absolu

SuppA(X) = 2  -> Transactions (Individus) contenant l'itemset X

Supp(X) (relatif) = SuppA(X) / |DELTA| = 2/4 = 50%

Est-ce que le **support relatif** est intéressant?
Oui, car en général on se fixe un seuil de 10%.
De plus, en prenant un grand échantillon (>1M), la proportion de satifaire la condition n'est pas négligeable.


### REGLES D'ASSOCIATION

X -> Y, X,Y _C_ I et X (inter) Y = 0

Supp (support) = Support relatif (par défaut)

Supp(X -> Y) = Supp(X u Y) = SuppA(X u Y) / |DELTA|


### EXEMPLE


|TRANSACTION |
|--------------------------------------------------
|T1          |farine |sucre      |lait  
|T2          |oeuf   |sucre      |chocolat |
|T3          |farine |oeuf       |sucre    |chocolat |
|T4          |oeuf   |chocolat   |thé      |



Supp(farine -> sucre) = Supp(farine sucre) = 2/4 = 50%


### CONFIANCE

C'est le rapport suivant:

Conf(X -> Y) = Supp(X u Y) / Supp(X)

Pour qu'une règle soit valide, il faut que la confiance soit au moins de 75%.
Sinon il n'y a pas une corrélation forte entre la prémice et la conclusion.

<!--
TRANSACTIONS  |
--------------------------------------------------------
              |f
              |f
              |
              |
870t {        |
              |
              |
              |                           c   ^
              |                           .   |
              |                           .   |
              |f                          c   | 30t
900t          |-----------------------------------------
              |                           .   |
              |                           c   |10t
              |
              |
              |
1000t         |
--------------------------------------------------------
-->

#### f -> c?

Dans l'exemple précédent, la règle **f -> c** n'est pas valide.

Conf(f -> c) = 30 / 900 = 1/30 = 3,3%

la règle **c -> c** est valide
Conf(c -> f) = 30 / 40 = 75%

NOTE :

* numérateur    : intervalle d'intersection entre c et f
* dénominateur  : intervalle totale contenant c


### ALGORITHME DE BASE **APRIORI**

1. Génération des candidats -> C(k)
2. Elaguage de C(k)
3. Calcul Support des itemset en C(k)
4. Itemsets en C(k) en supp >= min_supp (L(k) ensmble d'itemsets fréquents = C(k))

Complexité en O(m)

Comment calculer un nombre important d'item set?


#### Propriété d'anti-monotonie du support:

Tous les sous ensembles d'un *itmset* fréquent sont fréquents

Ajouter un *itemset* fréquent au support ne le rend pas fréquent.


#### Application de l'algorithme

I = { farine, sucre, lait, oeufs, chocolat, thé }

k = 1

1. Génération des candidats

G = {f, s, l, o, c, t}

<!--
                0
                |
                |
  ______________________________
  |       |    |     |    |     |
  |       |    |     |    |     |
  |       |    |     |    |     |
  |       |    |     |    |     |
  |       |    |     |    |     |
farine  sucre lait oeuf choco thé
  2       3     1   3     3     1
-->

|          |      |  0  |     |      |     |
|----------|------|-----|-----|------|-----|
|  farine  |sucre |lait |oeuf |choco |thé  |
|    2     |  3   |  1  | 3   |  3   |  1  |


Les nombres correspondent au nombre de fois que l'on voit les items dans la base de données.

Le min_supp est donné.

min_supp = 30% -> 1.2 => 2 transactions au minimum où l'item doit être trouvé

3. Calcul du support

4. L1 = { f, s, o, c }

k = 2


#### Déroulement de l'algo

1. Générer les candidats

On génère une jointure de gauche à droite
Pour chaque élément, on le combine avec tous les autres qui suivent

On obtient :

* fs (farine, sucre)
* fo (farine, oeuf)
* fc (farine, chocolat)
* so (sucre, oeuf)
* sc (sucre, chocolat)
* oc (oeuf, chocolat)

C2 = { fs, fo, fc, so, sc, oc }

3. Calcul du Supp

4. L2 = { fs, so, sc, oc }
