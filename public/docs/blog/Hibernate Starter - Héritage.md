Dans cette partie on observera la gestion de l'héritage dans Hibernate.

### Créer un nouveau projet java hibernate-starter

* > New Java Project
* > Clic droit sur le projet > Build Path > Configure Build Path
* > Add External .JARs
* > Ajouter les librairies (.jar) d'hibernate avec les annotations correspondant
* > Ajouter la UserLibrairie msqlconnector

### 1 Céer une classe mère et deux classes filles

#### La classe mère

On crée une classe mère Paiement contenant trois propriétés :

* un identifiant    (int)
* un montant        (int)
* une description   (string)

```java
// --------------
// Paiement.java
// --------------

// Le package dans lequel on crée la classe (mon-projet/src/persist)
package persist;

// La classe mère
public class Paiement {
    private int id;             // identifiant unique de l'entité dans la base de donnée
    private int montant;        // montant du paiement
    private String description; // description de la transaction


    public Paiement() {
        // Constructeur vide
    }

    // Getter  de id
    public int getId() {
        return id;
    }

    // Setter de id
    public void setId(int id) {
        this.id = id;
    }

    // Getter de description
    public String getDescription() {
        return description;
    }

    // Setter de description
    public void setDescription(String description) {
        this.description = description;
    }

    // Getter de montant
    public int getMontant() {
        return montant;
    }

    // Setter de montant
    public void setMontant(int montant) {
        this.montant = montant;
    }
}
```

#### Les classes filles

```java

// -----------------
// PaiementCash.java
// -----------------

package persist;

public class PaiementCash extends Paiement {
    private String monnaie;

    public PaiementCash() {
        super();
    }

    public PaiementCash(String monnaie) {
        super();
        this.monnaie = monnaie;
    }

    public String getMonnaie() {
        return monnaie;
    }

    public void setMonnaie(String monnaie) {
        this.monnaie = monnaie;
    }
}
```

```java

// ------------------
// PaiementCarte.java
// ------------------

package persist;

public class PaiementCarte extends Paiement{
    private String type;

    public PaiementCarte() {
        super();
    }

    public PaiementCarte(String type) {
        super();
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

```
