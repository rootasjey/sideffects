## 1

CREATE USER Alice IDENTIFIED BY alice DEFAULT TABLESPACE USERS QUOTE 10M;

SELECT username, account_status, ...
FROM DBA_USERS;

Par défaut c'est le tablespace SYSTEM qui est attribuée aux utilisateurs.

Les quotas établis à la création des comptes sont corrects.

La connexion est refusée car ces utilisateurs n'ont pas le privilège CREATE SESSION.

Non il n'est pas nécessaire de donner explicitement les droits de modifocation et de suppression, car en lui donnant le droit de création on insinue qu'il a ces droits.


## DROIT SUR LES OBJETS

### DROITS IMPLICITES

CREATE TABLE Alice_public(
    NAME CHAR(50)
);

CREATE TABLE bob_table(
    NAME CHAR(50)
);

ALTER TABLE ALICE.ALICE_PUBLIC ADD DESCR CHAR(50);
ALTER TABLE ALICE.ALICE_PUBLIC DROP DESCR;

Alice a le doit de créer, modifier et supprimer des objets dans son espace, idem pour Bob.

### DROITS EXPLICITES

Alice doit donner les privilèges à Bob afin qu'il visualise la table d'Alice.
Oui, le DBA peut afficher le contenu de la table d'Alice du moins qu'il préfixe le nom de la table avec le nom de l'utilisateur Alice.


## DROITS SUR LES PROCEDURES ET PACKAGES

Bob doit vérifier qu'il a les privilèges nécessaires pour pouvoir exécuter la procédure modifiant la table d'Alice;

Exécuter une procédure:

EXECUTE BOB.BOB_PROC;
COMMIT;


## RÔLES

Pour révoquer l'accès aux utilisateurs

REVOKE CREATE CREATE VIEW FROM BOB;
REVOKE CREATE CREATE VIEW FROM ALICE;
REVOKE ...;
