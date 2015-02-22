![img-cover](\images\lessons\keyboard-0.jpg)

### DEFINITIONS

* Mapping : expression de calcul permettant de lier les données
* Global as View met en relation 1 schéma (global) avec n schémas (local)
* Local as View mt en relation 1 schéma (global) avec 1 schéma (local)
* Relation de mapping : relation entre les attriibuts communs
* Relation de mapping étendue : relation entre les attributs communs, la clé et les clés étrangères

* Intégrer : Résoudre les problèmes d'homogénéité

* Datamining : Faire émerger des observations qui n'existaient pas initialement dans les sources de données.

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

ODS : Operational Data Store
CDW : Corporate Data Warehouse
Data Mart = Mini entrepôt de données construit au-dessus de l'entrepôt de données spécifique à un groupe de consommateurs. Il est fabriqué à partir du CDW (au lieu des sources).
