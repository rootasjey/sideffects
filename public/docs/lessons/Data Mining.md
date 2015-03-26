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


02/03/15

## GROUPEMENT (CLUSTERING)

Classification automatique d'objets

Méthode non supervisée = on n'injecte pas de résultats dans l'algorithme

## TP (10/03/15)

### Exercice 2

* 2.3 L'algorithme sort les itemsets fréquents ainsi que les règles d'association
* 2.4.1 On ne peut pas lancer l'algorithme Apriori car certaines données du fichier *bank-data.cvs* sont continues et  l'espace de définition est infini. Il faut discrétiser les attributs en question afin de pouvoir exécuter l'algo.

* 2.4.2 SELECTION ATTRIBUTS
  * *AttributeSelection* permet de classer les attributs par pertinence
  * *RemoveUseless* supprime un (ou plusieurs) attribut inutile(s)

* 2.4.3 DISCRETISATION
    1. On discrétise les attributs en choisissant Filter -> unsupervised -> attribute -> Discretize
    2. Pour discrétiser manuellement, on définit un espace de valeurs {0,1,2,3}. On peut aussi modifier le nom des attributs

* 2.4.4 APPRIORI

On exécute l'algorithme Apriori avec les paramètres suivant

weka.associations.Apriori -N 10 -T 0 -C 0.9 -D 0.05 -U 1.0 -M 0.1 -S -1.0 -c -1

Et on obtient les règles d'association :

1. revenues='(43758.136667-inf)' 80 ==> save_act=YES 80    conf:(1)
2. age='(50.666667-inf)' revenues='(43758.136667-inf)' 76 ==> save_act=YES 76    conf:(1)
3. revenues='(43758.136667-inf)' current_act=YES 63 ==> save_act=YES 63    conf:(1)
4. age='(50.666667-inf)' revenues='(43758.136667-inf)' current_act=YES 61 ==> save_act=YES 61    conf:(1)
5. enfants=0 save_act=YES mortgage=NO pep=NO 74 ==> marrie=YES 73    conf:(0.99)
6. sex=FEMALE enfants=0 mortgage=NO pep=NO 64 ==> marrie=YES 63    conf:(0.98)
7. enfants=0 current_act=YES mortgage=NO pep=NO 82 ==> marrie=YES 80    conf:(0.98)
8. enfants=0 mortgage=NO pep=NO 107 ==> marrie=YES 104    conf:(0.97)
9. revenues='(43758.136667-inf)' current_act=YES 63 ==> age='(50.666667-inf)' 61    conf:(0.97)
10. revenues='(43758.136667-inf)' save_act=YES current_act=YES 63 ==> age='(50.666667-inf)' 61    conf:(0.97)


**INTERPRETATIONS**

1. Si une personne a des revenus inférieurs à 43758, alors elle a une épargne
2. Si une personne a des revenus inférieurs à 43758 et a moins de 50 ans, alors elle a une épargne


La variation des paramètres n'a pas d'impact significatif sur le temps d'exécution;

Le min-sup (support minimum) est un paramètre critique.

Pour la configuration suivante on obtient 41 résultats :

(weka.associations.Apriori -N 100 -T 0 -C 0.9 -D 0.05 -U 1.0 -M 0.1 -S -1.0 -c -1)

* nombre de règles à sortir : 100
* min-sup : 0.1

Pour la configuration suivante on obtient 1 résultats :

(weka.associations.Apriori -N 100 -T 0 -C 0.9 -D 0.05 -U 1.0 -M 0.2 -S -1.0 -c -1)

* nombre de règles à sortir : 100
* min-sup : 0.2

* 2.5.5 CLASSIFICATION INTUITIVE AVEC APRIORI

Les régles obtenues :

1. petalwidth='(-inf-0.34]' 41 ==> class=Iris-setosa 41    conf:(1)
2. petallength='(-inf-1.59]' 37 ==> class=Iris-setosa 37    conf:(1)
3. petallength='(-inf-1.59]' petalwidth='(-inf-0.34]' 33 ==> class=Iris-setosa 33    conf:(1)
4. petalwidth='(1.06-1.3]' 21 ==> class=Iris-versicolor 21    conf:(1)
5. petallength='(5.13-5.72]' 18 ==> class=Iris-virginica 18    conf:(1)
6. sepallength='(4.66-5.02]' petalwidth='(-inf-0.34]' 17 ==> class=Iris-setosa 17    conf:(1)
7. sepalwidth='(2.96-3.2]' class=Iris-setosa 16 ==> petalwidth='(-inf-0.34]' 16    conf:(1)
8. sepalwidth='(2.96-3.2]' petalwidth='(-inf-0.34]' 16 ==> class=Iris-setosa 16    conf:(1)
9. petallength='(3.95-4.54]' 26 ==> class=Iris-versicolor 25    conf:(0.96)
10. petalwidth='(1.78-2.02]' 23 ==> class=Iris-virginica 22    conf:(0.96)

### EXERCICE 3 : PROMOTION DANS UNE EPICERIE DE NUIT

1. On a généré le fichier .arff à l'aide d'un fichier .csv à cause de la facilité decompréhension
2. Règles obtenues avec un support de 0.5
    1. produit1=YES 5 ==> produit5=YES 5    conf:(1)
    2. produit2=NO 5 ==> produit5=YES 5    conf:(1)
    3. produit3=NO 5 ==> produit5=YES 5    conf:(1)
    4. produit4=YES 4 ==> produit5=YES 4    conf:(1)
    5. produit1=YES produit3=NO 4 ==> produit5=YES 4    conf:(1)
    6. produit2=NO produit3=NO 4 ==> produit5=YES 4    conf:(1)

3. Règles obtenues avec un support de 1 (beaucoup de résultats)
    1. produit1=YES 5 ==> produit5=YES 5    conf:(1)
    2. produit2=NO 5 ==> produit5=YES 5    conf:(1)
    3. produit3=NO 5 ==> produit5=YES 5    conf:(1)
    4. produit4=YES 4 ==> produit5=YES 4    conf:(1)
    5. produit1=YES produit3=NO 4 ==> produit5=YES 4    conf:(1)
    6. produit2=NO produit3=NO 4 ==> produit5=YES 4    conf:(1)
    7. produit1=YES produit2=NO 3 ==> produit3=NO 3    conf:(1)
    8. produit1=YES produit2=NO 3 ==> produit5=YES 3    conf:(1)
    9. produit1=YES produit4=YES 3 ==> produit5=YES 3    conf:(1)
    10. produit2=NO produit4=YES 3 ==> produit5=YES 3    conf:(1)
    11. produit4=NO produit5=YES 3 ==> produit3=NO 3    conf:(1)
    12. produit3=NO produit4=NO 3 ==> produit5=YES 3    conf:(1)

4. Le patron devrait faire des promotions sur le produit 5, 4 et 3 par exemple.
