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
