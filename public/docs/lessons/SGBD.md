![img-cover](/images/lessons/hard-drive-0.jpg)

MECANISMES INTERNES DES SGBD
----------------------------
<br>
<br>
<br>

#LANGAGE DE DEFINITION DES DONNEES (LDD)

char(n) : réserve toujours un nombre défini d'espace dans la base de données
varchar(n) : réserve un n blocks mais économise la place si tout l'espace n'est pas utilisé

Opération sur les objets

````
CREATE | ALTER | DROP + 'OBJET' + 'NOM D'ATTRIBUT'
````

<br>
<br>

#LANGAGE DE MANIPULATION DES DONNEES (MDD)

Expression de valeur = attribut ou une fonction (MAX, CONCAT, ...)

<br>
<br>

#Produit cartésien

Il correspond à toutes les combinaisons possibles

````
SELECT *
FROM table1, table2
````

<br>
<br>

#Jointure

Elle permet de reconstruire des objets complexes
ce qui explique le fait qu'elle est souvent faite sur une clé primaire avec une clé étrangère

````
SELECT CRU,
FROM VINS, RECOLTES
WHERE VINS.NB = RECOLTE.NV;
````

Si j'ai n tables, on doit y avoir au minimum (n-1) jointures

Méthode des îlots = on vérifie qu'on a un graphe connexe en schématisant les jointures

````
GROUPBY, HAVING = aggrégats (= intervient sur un ensemble de tuples)
WHERE = intervient sur un tuple unique
````

<br>
<br>

#Auto-jointure

On peut faire une jointure sur la même table si on veut que les attributs de deux colonnes soient égales.
On peut rompre la symétrie avec l'opérateur > (supérieur) ou < (inférieur)

Jointure = Quantificateur existanciel = traduit le moins

Règle du GROUP BY : l'ensemble des attributs dans le GROUP BY doit apparaître dans le SELECT dans le même ordre.

<br>
<br>

#SQL3 et le modèle relationnel

L'identité d'un objet a été instauré pour pouvoir le séparer sur plusieurs système
(la clé primaire + le row id ne sont pas suffisnant).

<br>
<br>

* Index plaçant : ordre de la clé primaire - 1 par table - nécessite 1 E/S
* Index non plaçant : est un pointeur vers le tuple demandé - Autant qu'on veut - nécessite nb  + 1 E/S

Améliorer les performances : créer des tablespaces -> permet de réserver un nombre de blocks contigues pour améliorer la lecture

Un Rid trié permet de récupérer un groupe de tuples en 1 E/S.

Questions diapo 17 :

* 1000I/O
* 100I/O (avec optimisation)
* 10 000I/O

Tri -> projection : ordre de tri conservé
Tri -> jointure : ordre de tri non conservé

Fonction de hachage place les mêmes tuples dans le même bloc.
Si on veut obtenir l'ensemble des tuples sans doublons, on ne lit que les blocs.

Coût du hashage = Coût du Tri fusion

Pour chaque opération de jointure : une partie *build* et une partie *prob*

* build : réorganise les données
* prob  : applique les opérations de jointure

Pipeline : plusieurs processus qui tournent en même temps qui peuvent s'échanger des données grâce à une mémoire tampon.

Diapo 46 : les opérations Scan, Restriction la chaîne d'exécution à gauche (en orange)

Le tri, l'aggrégat (et les opérateurs ensemblistes) ne permettent pas de faire du pipeline. Le *build* est bloquant.

L'élimination des doublons ne permet pas de pipeline car il faut exécuter un hash ou un tri.

Opérateurs bloquant : *build* et *probe*

05/03/15

ACID

* Atomicité
* Cohérence
* Isolation
* Durabilité
