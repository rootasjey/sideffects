DATA MINING PRESENTATION
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

### LE CONTEXT
Dans le cadre de la formation de Master 2 Informatique ACSIS à l'UVSQ, nous devions réaliser un projet en Data Mining capable d'extraire des informations sur un nombre conséquent de données.

### LE PROBLEME

Le but du projet est d’étudier et extraire les informations pertinentes revenant fréquemment dans les tweets et de définir des règles d’association à partir d’une grande quantité de tweets.

### LE SYSTEME

L'architecture du système

![Utilisation de GitHub](/modules/datamining/screens/screen-activity.png)

Le système devra proposer à l’utilisateur un ensemble de sujets pertinents liés aux tweets sur une durée donnée, et lui permettre de faire évoluer ces sujets grâce aux règles d’associations qui seront obtenues avec l’algorithme Apriori.

## [PARTIE 1 : PRISE EN MAIN DE LA BD](#partie1)

### [PRELIMINAIRES](#preliminaires)

#### CREATION D'UN REPO GIT

Afin de faciliter le développement collectif et le partage du code source, nous avons utilisé la plateforme GitHub qui est gratuite.

![Utilisation de GitHub](/modules/datamining/screens/screen-github.jpg)


### [ETUDE DES DONNEES](#etude)

Du temps a été consacré a l'étude et l'observation des tweets afin de connaître au mieux le schéma des données que nous avions à traiter.

La base de données est composée d'une unique table de tweets.

![Echantillon de donnees](/modules/datamining/screens/screen-donnees.jpg)

Chaque tweet est composé de plusieurs colonnes (attributs) :

* son titre
* son contenu
* son lien
* son auteur
* sa géolocalisation
* etc.

![Structure d'un tweet](/modules/datamining/screens/screen-schema.jpg)

Faire de la recherche dans les tweets et appliquer les différent algorithmes ne necessitaient que le champ *contenu*.

## [PARTIE 2 : PRETRAITEMENT DE DONNEES - ELAGAGE DE MOTS INUTILES](#partie2)

Afin qu'on puisse travailler sur des données propres, on a décidé de créer une nouvelle table <i>tweet_clean</i> dans notre base de données, puis y insérer les nouveaux tweets traité à l'aide de la classe Tagger.

###La class TAGGER :

1. Dans la classe Tagger, on sélectionne tous les tweets de la table <i>tweets</i>, puis pour chaque ligne de la table, on élimine tout caractère spécial présent dans l'attribut <i>tweet_text</i>, en le remplaçant par un espace. Grâce à la classe DocumentPreprocessor de l'API STANFORD, permettra de <i>tokenizer</i>, c'est à dire, créer une liste de type HashWord de tous les mots propre, qui existe dans le tweet en question.

2. Puis pour chaque mot de cette liste, on va le tagger grâce à la methode tagSentence de la classe MaxentTagger de l'API STANFORD, c'est à dire, déterminer  son type (Adjectif, Adverbe, Nom commun, Point de ponctuation ...etc).

3. Pour chaque mot taggé, on élimine ceux qui ne nous intéresse plus (commenceant par http, ou a une taille inférieur à 3, puis on les <i>Limatize</i>, c'est à dire extraire le racine d'un mot.

4. Après avoir épuré le tweet, on l'insère dans la nouvelle table <i>tweet_clean</i>.

Ainsi, à l'aide de cette nouvelle table, nous pourrons tous les mots distinct, et les insérer dans un fichier CSV, qui va nous permettre plus tard, a calculer le nombre d'accurence de chacun de ces mots présent dans  notre base de données.

<button type="button" class="btn btn-raised ripple-effect btn-primary toggle-code">class tagger</button>

```java
class Tagger {

  private Tagger() {}
	 public static  List<String> retenu=new ArrayList<String>();
	 public static  List<String> listTag=new ArrayList<String>();

  public static void main(String[] args) throws Exception {

	  retenu.add("NPP");
	  retenu.add("NC");
	  retenu.add("ADJ");
	  retenu.add("ADJWH");
	  retenu.add("ET");//foreign language
	  retenu.add("N");
	  retenu.add("V");
	  retenu.add("VS");
	  retenu.add("VPR");
	  retenu.add("VPP");
	  retenu.add("VINF");
	  retenu.add("VIMP");


	  args=new String[2];
	  args[0]="models/french.tagger";
	  args[1]="input/sample-input.txt";

    if (args.length != 2) {
          System.err.println("usage: java TaggerDemo2 modelFile fileToTag");
          return;
    }

    MaxentTagger tagger = new MaxentTagger(args[0]);
    TokenizerFactory<CoreLabel> ptbTokenizerFactory = PTBTokenizer.factory(new CoreLabelTokenFactory(),
									   "untokenizable=noneKeep");
    BufferedReader r = new BufferedReader(new InputStreamReader(new FileInputStream(args[1]), "utf-8"));
    PrintWriter pw = new PrintWriter(new OutputStreamWriter(System.out, "utf-8"));
    DocumentPreprocessor documentPreprocessor = new DocumentPreprocessor(r);
    documentPreprocessor.setTokenizerFactory(ptbTokenizerFactory);
    for (List<HasWord> sentence : documentPreprocessor) {
      List<TaggedWord> tSentence = tagger.tagSentence(sentence);
    }

    PreparedStatement statmentListe=null;
	ResultSet resultat=null;

	 String text = "";

	try {
		statmentListe =(PreparedStatement) GetConnexion.getconnexion().prepareStatement("select tweet_text,tweet_id,created_at from tweets");

		resultat =  statmentListe.executeQuery();
		Tweet tweet=new Tweet();
		while(resultat.next()){
			text=resultat.getString("tweet_text");

			/**
			 * effacer les guillemÃ© et quote pour eviter les incompatibilitÃ©s en csv
			 */
			text=text.replaceAll("\"", " ");
			text=text.replaceAll("'", " ");
			text=text.replaceAll("â€™", " ");
			text=text.replaceAll("%", " ");
			text=text.replaceAll(",", " ");




			String result="";

			   DocumentPreprocessor tokenizer = new DocumentPreprocessor(new StringReader(text));
			    for (List<HasWord> sentence : tokenizer) {

			      List<TaggedWord> tagged = tagger.tagSentence(sentence);
			      for (TaggedWord tw : tagged) {

						  if(existTag(tw.tag()))
						      {

					    	  if(tw.word().toLowerCase().startsWith("http")||
                              (tw.word().length()<3 && (!tw.word().toLowerCase().equals("fn")&&!tw.word().toLowerCase().equals("ps")&&!tw.word().toLowerCase().equals("an"))))
								  continue;

						    	result+=" "+Lemmatizer.getRacine(tw.word(), tw.tag());


						      }
						      else if(tw.tag().equals("DET") && isFalsePositive_det(tw.word()))
						      {

						    	 result+=" "+tw.word();
						      }
						      else if(tw.tag().equals("ADV") && tw.word().toLowerCase().endsWith("ment")&&!tw.word().toLowerCase().startsWith("http"))
						      {
						    	  result+=" "+tw.word();  

						      }
						        result=result.toLowerCase();
			      }
			    }

			 DateTime dt = new DateTime();
				dt= new DateTime(resultat.getString("created_at").replace(' ', 'T'));

			    tweet.setId(resultat.getString("tweet_id"));


			    DateTimeFormatter formatter = DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss" );

			    tweet.setCreate_at(dt.toString( formatter ));
			    tweet.setText(result);
			    if(!result.equals(""))
			    DataManager.insertCleanTweet(tweet);
		}
	}
	catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

    pw.close();
  }

  public  static boolean existTag(String tag){
	  for(String current:retenu){
		  if(current.equals(tag)){
			  return true;
		  }
	  }
	 return false;
  }

  public static boolean isFalsePositive_det(String text)
  {
	  if((text.startsWith("#")||text.startsWith("@")) && text.length()>=3)
		  return true;
	  else if(text.startsWith("http"))
		  return false;
	  else if(text.equals("Assemblee")||text.equals("Snowden")||text.equals("Barbusse"))
		  return true;

	  return false;
  }



  public static String getDate(Date date){


		return  new DateTime(date).toString( DateTimeFormat.forPattern("yyyy-MM-dd" ) );

  }
}
```

<button type="button" class="btn btn-raised ripple-effect btn-primary toggle-code">class lemmatizer</button>

```java
public static String getRacine(String mot,String tag)
{
	String racine=null;
	if(tag.equals("VPP")||tag.equals("V")||tag.equals("VPR")||tag.equals("VS")||tag.equals("VIMP"))
	{
		try {
			racine= Lemmatizer.getLemma("/home/souley/Documents/AllFiveLanguages", mot, "fr", "VERB");
		} catch (IOException | NoTokenizationException e) {

			e.printStackTrace();
		}
	}else if(tag.equals("VINF"))
	{
		return mot;
	}
	else if(tag.equals("NC")||tag.equals("N"))
	{

		try {
			racine= Lemmatizer.getLemma("/home/souley/Documents/AllFiveLanguages", mot, "fr", "NOUN");
		} catch (IOException | NoTokenizationException e) {

			e.printStackTrace();
		}

	}
	else if(tag.equals("NPP"))
	{
		return mot;
	}
	else if(tag.equals("ADJ")||tag.equals("ADJWH"))
	{
		try {
			racine= Lemmatizer.getLemma("/home/souley/Documents/AllFiveLanguages", mot, "fr", "ADJ");
		} catch (IOException | NoTokenizationException e) {
			e.printStackTrace();
		}
	}

	if(racine==null)
		return mot;

	return racine;
}
```


## [PARTIE 3 : PRETRAITEMENT DE DONNEES - REPRESENTATION DES DONNEES A TRAVERS DIFFERENTS MODELES DE POIDS](#partie3)

Dans cette partie nous devions utiliser un script afin de construire une représentation des données afin d'obtenir la répartition de la totalité des mots qui apparaissent dans la base de données dans les différents tweets.

A partir de 23520 mots, avec un seuil de 10% d'occurences minimum, si un mot apparaît moins de 10 fois, il est supprimé. Il nous reste 2543 mots.

Avec le même nombre de mots, avec un seuil de 50% d'occurences minimum, on obtient 503 mots.

Avec le même nombre de mots, avec un seuil de 150% d'occurences minimum, on obtient 114 mots.

## [PARTIE 4 : PRETRATEMENT DES DONNEES AVEC WEKA](#partie4)

On a dû utiliser l'API Weka car en utilisant l'interface graphique, nous avions des plantages récurrent du programme.

![Structure d'un tweet](/modules/datamining/screens/screen-distribution_tweets_rogner.png)

## [PARTIE 5 : FOUILLE DE DONNEES](#partie5)

### MINSUP

Choix du minsup = 3% (seuil de 0.03)

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
