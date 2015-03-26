DATA MINING RAPPORT
=====================

<div class="authors">
    <button type="button" class="btn btn-raised ripple-effect btn-primary toggle">auteurs</button>
    <div class='toggled toggled-visible'>
        <ul>
            <li>Jérémie CORPINOT</li>
            <li>Souleymane BELEM</li>
            <li>Youness CHAFIA</li>
            <li>Mohammed HAMEG</li>
        </ul>
    </div>
</div>


<br><br>
## INTRODUCTION

Dans le cadre de la formation de Master 2 Informatique ACSIS à l'UVSQ, nous devions réaliser un projet en Data Mining capable d'extraire des information sur un nombre conséquent de données.

<br><br>
## PARTIE 1 : PRISE EN MAIN DE LA BD

### PRELIMINAIRES

Dans cette première partie, nous avons extrait les données de l'archive fournie, et chargé les données dans le *SGBD (Système de gestion de base de données) __Mysql__.*

Ici, nous avions rencontré une première difficulté car __Mysql__ ne supporte pas le chargement d'un fichier de 300 Mo *(taille des données des tweets)*.
Nous avons donc dû passer par la console ou en faisant un copier-coller.

### ETUDE DES DONNEES

Du temps a été consacré a l'étude et l'observation des tweets afin de connaître au mieux le schéma des données que nous avions à traiter.

La base de données est composé d'une unique table de tweets.

Chaque tweet est composé de plusieurs colonnes (attributs) :

* son titre
* son contenu
* son lien
* son auteur

<br><br>
## PARTIE 2 : PRETRAITEMENT DE DONNEES - ELAGAGE DE MOTS INUTILES

Afin qu'on puisse travailler sur des données propres, on a décidé de créer une nouvelle table <i>tweet_clean</i> dans notre base de données, puis y insérer les nouveaux tweets traité à l'aide de la classe Tagger.
<br>
###La class TAGGER : 

1) Dans la classe Tagger, on sélectionne tous les tweets de la table <i>tweets</i>, puis pour chaque ligne de la table, on élimine tout caractère spécial présent dans l'attribut <i>tweet_text</i>, en le remplaçant par un espace. Grâce à la classe DocumentPreprocessor de l'API STANFORD, permettra de <i>tokenizer</i>, c'est à dire, créer une liste de type HashWord de tous les mots propre, qui existe dans le tweet en question.

2) Puis pour chaque mot de cette liste, on va le tagger grâce à la methode tagSentence de la classe MaxentTagger de l'API STANFORD, c'est à dire, déterminer  son type (Adjectif, Adverbe, Nom commun, Point de ponctuation ...etc).

3) Pour chaque mot taggé, on élimine ceux qui ne nous intéresse plus (commenceant par http, ou a une taille inférieur à 3, puis on les <i>Limatize</i>, c'est à dire extraire le racine d'un mot.

4) Après avoir épuré le tweet, on l'insère dans la nouvelle table <i>tweet_clean</i>.

Ainsi, à l'aide de cette nouvelle table, nous pourrons tous les mots distinct, et les insérer dans un fichier CSV, qui va nous permettre plus tard, a calculer le nombre d'accurence de chacun de ces mots présent dans  notre base de données.


<br><br>
## PARTIE 3 : PRETRAITEMENT DE DONNEES - REPRESENTATION DES DONNEES A TRAVERS DIFFERENTS MODELES DE POIDS

<br><br>
## PARTIE 4 : PRETRATEMENT DES DONNEES AVEC WEKA

On a dû utiliser l'API Weka en console car en utilisant l'interface graphique, nous avions des plantages du programme pour traiter un groupe de 20 000 tweets.

<br><br>
## PARTIE 5 : FOUILLE DE DONNEES

<br><br>
## CONCLUSION
