![img-cover](/images/lessons/board-0.jpg)

### INTRODUCTION

### DEFINITIONS

* Cryptographie : étude des algorithmes de chiffrement E et D
* Cryptanalyse : étude des moyens de casser un chiffrage (retrouver M sans connaître K)
* Stéganographie : cacher un message dans le support d'un autre message (encre invisible par ex)
* Code ou Chiffre : un code remplace des groupes de caract_res ayant une sémantique (mot) par symbole.

### PROTOCOLES ASYMETRIQUES

2 problèmes :

* Distribution de fausses clés
* Authentification


### PROTOCOLE À DIVULGATION NULLE

 Graphes isomorphes

 G1 ---(sigma)---> G2

 (alpha) aléatoire = permutation aléatoire
 (sigma) = secret

 H --(alpha)^(-1)--> G1 --(sigma)-->G2

 G1 --(alpha)--> H
 H --(alpha)^(-1) . (sigma)--> G2
 G2 (sigma)^(-1) . (alpha)--> H

 Victor demande le lien entre G1 et H ou entre H et G2

 G1 <--> H <--> G2


Circuit Hamiltonien

soit [G, C] avec G un graphe et C un circuit hamiltonien

Grâce à la permutation (sigma), on construit un graphe isomorphe H et une permutation C'.

Victoire voit H et connaît G.

Pour vérifier que Patricia connaît le secret, il faut lui demander G et C'

Patricia peut tricher :

* si on lui demande que C', en construisant C' (un circuit halmiltonien) à partir de H
* si on ne lui demande que H car calculer H est facile (par permutation de sigma).


### SUJETS DE PROJET

* **Code C** : Faire un buffer overflow - démo
* **Bitcoin et Cryptographie** : Comment ça marche?
* **Auth par carte à puce** : YES_CACD (pas SPA_DPA)
* **Pot de Miel** : Description technique -> Faire de fausses machines pour que les pirates les attaques
* **Transmission quantique** :
* **PKI réel** : Description (ex. https) - démo
* **Signature numérique en EU** : 3 exemples
* **Protocole de Monaie Digitale** : 3 solutions proposées (pas virement)
* **Mode de Propagation détaillé de Sasser et Code Red 2** : à partir d'un code commenté
* **Le ver de Morris** : Description d'taillée de l'attaque et la propagation
* **SPA - DPA**
* **SQL : Fault & Injection** : démo
* **Les grands nombres premiers** : génération aléatoire
* **Description de la défense contre le DDOS**
* **MONEO** : Description technologique
* **Scada / Stuxnet**
