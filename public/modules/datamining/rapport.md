DATA MINING RAPPORT
=====================

<div class="authors">
    <button type="button" class="btn btn-raised ripple-effect btn-primary toggle">auteurs</button>
    <div class='toggled toggled-hidded'>
        <ul>
            <li>[Jérémie CORPINOT](https://github.com/rootasjey)</li>
            <li>[Souleymane BELEM](https://github.com/cameleon3)</li>
            <li>[Youness CHAFIA](https://github.com/ychafia)</li>
            <li>[Mohammed HAMEG](https://github.com/hamegmohamed)</li>
        </ul>
    </div>
</div>


## [INTRODUCTION](#introduction)

Dans le cadre de la formation de Master 2 Informatique ACSIS à l'UVSQ, nous devions réaliser un projet en Data Mining capable d'extraire des information sur un nombre conséquent de données.

## [PARTIE 1 : PRISE EN MAIN DE LA BD](#partie1)

### [PRELIMINAIRES](#preliminaires)

Dans cette première partie, nous avons extrait les données de l'archive fournie, et chargé les données dans le *SGBD (Système de gestion de base de données) __Mysql__.*

Ici, nous avions rencontré une première difficulté car __Mysql__ ne supporte pas le chargement d'un fichier de 300 Mo *(taille des données des tweets)*.
Nous avons donc dû passer par la console ou en faisant un copier-coller.

### [ETUDE DES DONNEES](#etude)

Du temps a été consacré a l'étude et l'observation des tweets afin de connaître au mieux le schéma des données que nous avions à traiter.

La base de données est composée d'une unique table de tweets.

Chaque tweet est composé de plusieurs colonnes (attributs) :

* son titre
* son contenu
* son lien
* son auteur
* sa géolocalisation
* etc.

Faire de la recherche dans les tweets et appliquer les différent algorithmes ne necessitaient que le champ *contenu*.

## [PARTIE 2 : PRETRAITEMENT DE DONNEES - ELAGAGE DE MOTS INUTILES](#partie2)

Afin qu'on puisse travailler sur des données propres, on a décidé de créer une nouvelle table <i>tweet_clean</i> dans notre base de données, puis y insérer les nouveaux tweets traité à l'aide de la classe Tagger.

###La class TAGGER : 

1) Dans la classe Tagger, on sélectionne tous les tweets de la table <i>tweets</i>, puis pour chaque ligne de la table, on élimine tout caractère spécial présent dans l'attribut <i>tweet_text</i>, en le remplaçant par un espace. Grâce à la classe DocumentPreprocessor de l'API STANFORD, permettra de <i>tokenizer</i>, c'est à dire, créer une liste de type HashWord de tous les mots propre, qui existe dans le tweet en question.

2) Puis pour chaque mot de cette liste, on va le tagger grâce à la methode tagSentence de la classe MaxentTagger de l'API STANFORD, c'est à dire, déterminer  son type (Adjectif, Adverbe, Nom commun, Point de ponctuation ...etc).

3) Pour chaque mot taggé, on élimine ceux qui ne nous intéresse plus (commenceant par http, ou a une taille inférieur à 3, puis on les <i>Limatize</i>, c'est à dire extraire le racine d'un mot.

4) Après avoir épuré le tweet, on l'insère dans la nouvelle table <i>tweet_clean</i>.

Ainsi, à l'aide de cette nouvelle table, nous pourrons tous les mots distinct, et les insérer dans un fichier CSV, qui va nous permettre plus tard, a calculer le nombre d'accurence de chacun de ces mots présent dans  notre base de données.



## [PARTIE 3 : PRETRAITEMENT DE DONNEES - REPRESENTATION DES DONNEES A TRAVERS DIFFERENTS MODELES DE POIDS](#partie3)

Dans cette partie nous devions utiliser un script afin de construire une représentation des données afin d'obtenir la répartition de la totalité des mots qui apparaissent dans la base de données dans les différents tweets.


## [PARTIE 4 : PRETRATEMENT DES DONNEES AVEC WEKA](#partie4)

On a dû utiliser l'API Weka en console car en utilisant l'interface graphique, nous avions des plantages du programme pour traiter un groupe de 20 000 tweets.

## [PARTIE 5 : FOUILLE DE DONNEES](#partie5)

## [CONCLUSION](#conclusion)

Ce projet nous a permis d'avoir une première approche en Data Mining et nous a appris a traiter avec un gros volume de données, chose que nous n'avions pas expérimenté auparavant dû temps limité des projets universitaires.


## [REFERENCES](#references)

* [Cours UVSQ par Mme Claudia Marinica](http://www.sideffects.fr)
* [Definition Data Minning wikipédia](https://www.wikiwand.com/fr/Exploration_de_données)
* [API Stanford](http://nlp.stanford.edu)
* [API aNatural Language Toolkit](http://www.nltk.org/index.html)
* [Apriori algorithme](http://www.wikiwand.com/en/Apriori_algorithm)
* [Vidéo de démo Apriori](https://www.youtube.com/watch?v=0lCvvF0Wdio)
* [Document PDF sur Apriori](http://software.ucv.ro/~cmihaescu/ro/teaching/AIR/docs/Lab8-Apriori.pdf)
