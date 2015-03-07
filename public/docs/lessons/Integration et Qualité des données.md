![img-cover](\images\lessons\keyboard-0.jpg)

### DEFINITIONS

* Mapping : expression de calcul permettant de lier les données
* Global as View met en relation 1 schéma (global) avec n schémas (local)
* Local as View mt en relation 1 schéma (global) avec 1 schéma (local)
* Relation de mapping : relation entre les attriibuts communs
* Relation de mapping étendue : relation entre les attributs communs, la clé et les clés étrangères

* Intégrer : Résoudre les problèmes d'homogénéité

* Datamining : Faire émerger des observations qui n'existaient pas
 initialement dans les sources de données.

<br>
<br>

| Evolution fréquente       | Meilleure         | Pire          |
|---------------------------|-------------------|---------------|
| Des sources de données    |Local as View      | Global as View|
| Des besoins               |Global as View     | Local as View |
| Les deux                  |Aucune             | LAS & GAV     |


<br>
<br>

Faire attention aux changements de clés étrangères et de référenciels.

search computation =

La fraîcheur des données dépend de
* l'architecture
  * utilise-ton un cache -> plus de chances de dégrader la fraîcheur des sources
  * entrepôt de données -> fraîcheur maximale


* du type
  * une adresse ou un numéro de tél ne change pas souvent
  * un ensemble de tweets correspondant à une recherche change très souvent

### EXCTITUDE DES DONNEES

DAG (Directional Acyclic Graph)


### INFOCENTRE

Outils de productivité pour le domaine informatique d'une entreprise.

* Pas de process de rafraîchissement.
* On donne des outils qui facilitent le requêtage des données.

### ENTREPÔT DE DONNEES

* But spécifique d'analyse de données
* Rafraîchissements fréquents.
* Coûteux et beaucoup de données


Big Data est un context!

**Data Warehouse** = préparer les données, fabriquer un entrepôt de données servant à la décision

**Data Mining** = Analyse par-dessus un entrepôt de données

* **ODS** : Operational Data Store
* **CDW** : Corporate Data Warehouse
* **Data Mart** = Mini entrepôt de données construit au-dessus de l'entrepôt
de données spécifique à un groupe de consommateurs.
Il est fabriqué à partir du CDW (au lieu des * sources).
Orienté vers un sujet part. et fortement agrégé (vues de vues).
* **OLAP** : Online Analysing Processing, transaction à la seconde, extrêment courtes, travaillant sur de petites base de données et sur des données fraîches
* **OLTP** : Orienté fonctions, travaille sur des téra-octets de données, lentes, fait intervenir beaucoup d'agréggats (group by, having)

Data Warehouse - OLAP : Orienté sujet

Intérrogation sur des indicateurs (problème de mapping) :

On a plusieurs options :

* Matérialiser les indicateurs
    * maximise le coût de rafraîchissement des données
    * minimise le coût de consultation des données
* Matérialiser une copie des sources et on calcule à nouveau les indicateurs
 à chaque accès des utilisateurs
    * minimise le coût de rafraîchissement des données
    * maximise le coût de consultation des données

IRL on fait un compromis entre les deux.


Méthode naïve pour trouver le meilleur compromis :

* Enumérer toutes les combinaisons
* Eliminer les combinaison qui ne permettent pas de retrouver les indicateurs
* Calculer les coûts de chaque combinaisons
* Trouver celui qui minimise la somme du coût de consultation et de rafraîchissement


### MODELES DE DATAWHAREHOUSE

Exemple : locattion de voitures

#### Modèle en étoile

Une table centrale contenant les mesures
D'autres tables autour correspondant aux dimensions

* Une dimension = axe d'analyse = catégories liguistique selon laquelle les données sont organisées
* Une mesure = valeur obtenue selon un agrégat (nombre, prix)

Exemple :

Distance moyenne parcourue par un véhicule loué
distance = mesure
véhicule = dimension

#### Schéma en flocon

Une seule table de faits
Si une table n'est pas normalisé, on décompose

#### Schéma en constellation

Plusieurs tables de faits (au lieu d'une normalement) qui partage une ou plusieurs dimensions

Exemple :

Espace touristique de location de chambres d'hôtel et de voitures.
Il n'est pas forcément pertinent de tout regrouper dans une même table.

**Un fait** = une instance de la table centrale.
Par ex. contient des valeurs pour une location.


### Notion de dimension

Un cube représente une table de faits (dans un cas)
Une mesure est représentée par un point


### Operations sur les cubes

Opère des modifications sur le structure du cube.
Peut améliorer les performances.

* Rotation (pivot) : on permutte deux axes.
* Switch : permutte les valeurs de dimensions.
* Split (décompoition/recomposition) :
* Nest/Unest : imbrique les val d'une dimension à l'intérieur d'une autre dimension.
* Push/Pull : pousse les valeurs d'une des dim à l'intérieur d'une dim du cuboïde à la manière de tags.

### Operations sur le contenu des cubes

* Roll-up (changement de granule) : supprime une dimension en agrégeant les valeurs du cubes ou réduit les valeurs d'une dimension = on applatit une dimension (on a moins de valeurs). On obtient de nouvelles valeurs à l'aide d'une fonction d'agréggat.
Dans le treillis, fait passer d'un niveau supérieur. Supprime un niveau de détails.

* Drill-down : opération inverse de *Roll-up*.
Dans le treillis, fait passer d'un niveau inférieur. Ajoute un niveau de détails.

* Projection (slice) : restriction à une valeur d'une dimension (d'un axe).

* Sélection (dice) : garde un sous-ensemble des valeurs du cube. Un sous-cube avec le même nombre de dimension


### Exercice 1

1.
* Table date, médecin, patient -> tables de dimensions
* Table de faits :
    * montant de la consultation

Tableau à 3 dimensions

2. Etapes :
* Roll-Up pour passer la date des jours à l'année
* Slice sur la date pour garder que l'année 2009

### Exercice 2

1.
* Table étudiant, cours, période/date, ensignant-> tables de dimensions
* Table de faits :
    * une note pour un étudiant, un cours à une date donnée par un ensignant

Tableau à 4 dimensions

2. Etapes :
* Slice sur le *cours*
* Roll-up sur date et enseignant


### Exercice 3

1.
* Table date, spectateur, lieu, match -> tables de dimensions
* Table de faits :
    * match qui joué dans un lieu donnée pour une date et vu par une personne (spectateur)

Tableau à 4 dimensions

2. Etapes :
* Roll-up sur date pour passer du jour à l'année
* Roll-up sur spectateur pour passer à la catégorie étudiants (ranger par catégorie de spec.)
* Dice année (2009) et lieu (Stade de France)
* Roll-up sur match
