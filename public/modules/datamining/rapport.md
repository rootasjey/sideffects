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

<br><br>
## PARTIE 3 : PRETRAITEMENT DE DONNEES - REPRESENTATION DES DONNEES A TRAVERS DIFFERENTS MODELES DE POIDS

<br><br>
## PARTIE 4 : PRETRATEMENT DES DONNEES AVEC WEKA

On a dû utiliser l'API Weka en console car en utilisant l'interface graphique, nous avions des plantages du programme pour traiter un groupe de 20 000 tweets.

<br><br>
## PARTIE 5 : FOUILLE DE DONNEES

<br><br>
## CONCLUSION
