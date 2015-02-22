![img-cover](http://www.dsystems.ro/wp-content/uploads/2014/07/java_ee.png)
Quelques questions de J2EE ;)

1.
```xml
<id name="paymentId" column="PAYMENT_ID">
    <generator class="increment"/>
</id>
```
Clé primaire dont le nom de la classe Java est paymentId, le nom de la colonne est PAYMENT_ID, autoincrement

2.
```xml
<property name="nom" column="nom" type="string"/>
```
* "Nom" -> attr de la classe,
* "nom" -> colonne de la table,
* String -> type de l'attribut

3.
```xml
<set name="personnes" .../>
```
Mappe un attribut de type Set (Collection) s'appelant **personnes**

4.
```xml
<discriminator column="sous-classe" type="character"/>
```
Identifier une table de type **character**

5.
```xml
<class name="Role" table="ROLES"/>
```
Mappe une clase Java Role avec une table ROLES

6. cascade="all" Répercute les créations et destructions

7.
```xml
<joined-subclass name="ext1.CashPayment" table="cash"/>
```
Mappe une classe fille qui s'appelle CashPayment sur une table cash

8.
```xml
<subclass name="ext1.CreditCardPayment" discriminator-value="CC">
```
Valeur dans la colonne type définissant si on est dans la classe mère ou une classe fille.

9.

Toute classe persistante doit avoir un id

Non!

10.

De quelle façon l'héritage est-il géré par Hibernate? Citer et expliquer les différentes méthodes possibles.

Exemple avec une mère et deux filles:

* Soit une table pour la classe mère et les classes filles comportant un discriminator.

* Soit trois tables, une table pour chaque classe et ous-classes

* Soit que les tables filles

### HIBERNATE AVEC ANNOTATIONS

* La représentation d'une factory est une *HashMap*
* Il faut déclarer la classe dans le fichier de configuration d'Hibernate .confhb
* Dans la classe correspondante, il faut annoter les attributes de la classe et la classe elle-même pour indiquer que l'objet doit être insérer dans la bdd.

* un attribut qui ne persiste pas, est appelé **transcient**.
  * il y a la notation **@transcient**
  * le mot clé **transcient** existe en java

Erreurs fréquentes :

* Oublié les getters et setters
* Oublié de mettre la correspondance dans le fichier de configuration d'Hibernate "hibernate.cfg.xml"
* Oublié les annotations dans une classe

On peut avoir un serveur d'application ou rien du tout.

Combos :

* Struts/ Hibernate
* Struts/ Hibernate - Spring/Jboss

Jboss est un serveur d'application lourd (on l'installe et le run) sert à gérer la monter en charge.
Il fait des new à notre place et gérer la taille.

Spring est un serveur d'application léger (on l'installe pas, ni ne le run).

IOC = Inversion Of Control = un objet au lieu d'attendre pour résoudre ses dépedances, va les chercher au moment où il en a besoin.

EX : on a un panier et une classe commande
* Programmation normale : le constructeur de la classe commande a besoin d'un objet panier
* Programmation IOC : le constructeur est vierge et la classe possède une méthode "Aller chercher panier"

PAO = programmation par aspect = programmation horzontale
On fait un fichier xml qui ajoute des méthodes aux classes.

Spring a un IOC et est en PAO


Pourquoi serveur d'app lourds et léger?

Car il fait des news à notre place.
