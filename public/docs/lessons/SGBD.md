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
