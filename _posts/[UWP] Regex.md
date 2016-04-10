{{{ 
    "title"     : "[UWP] Using RegularExpressions", 
    "tags"      : [ "dev", "C#", "regex", "expressions", "reguliere", "regular"], 
    "category"  : "dev", 
    "date"      : "09-04-2016", 
    "background": "/modules/blog/headers/prismjs.jpg" 
}}}

> Dev Level: middle

<br>
TABLE OF CONTENT

* [INTRODUCTION](#introduction)
* [REQUIREMENTS](#requirements)
* [CODING](#coding)
* [DISSECTION](#dissection)
* [REGEX DEFINITIONS](#regex-definitions)
* [REGEX MATCHES](#regex-matches)
* [END](#end)
* [REFERENCES](#references)

# INTRODUCTION

Hello,

I recently needed to use regular expression to parse a web page in my UWP (Universal Windows Platform) app,
(this happens when the service I want to use doesn't have any APIs) and as the code can be tricky or difficult to understand, 
I decided to write about it to briefly explain how this works and as a memo for me :)


>**What is parsing?** <br>
>Parsing is the process of analysing a string of symbols and extract parts of it.<br>
>See the [wiki page for more information](http://www.wikiwand.com/en/Parsing)


>**What is regular expression (regex)?**<br>
>A regular expression is a sequence of characters that defines a search pattern.<br>
>See the [wiki page for more information](http://www.wikiwand.com/en/Regular_expression)

# REQUIREMENTS
* An UWP Project
* An URL to parse
* Visual Studio 2015 (any version)

# CODING

The following namespaces are requiered but Visual Studio (VS) should import them automatically
```c#
// Needed to create an HTML document
using HtmlAgilityPack;
// Needed to create and use regular expressions
using System.Text.RegularExpressions;
```

So let's create a method to fetch our web source.
This method fetch a URL and parse the HTTP message response with regex.

```c#
/// <summary>
/// Fetch data from the url parameter
/// </summary>
/// <param name="url">URL string to request</param>
/// <returns>Number of results added to the collection</returns>
public async Task<int> Fetch(string url) {
  // A class for sending HTTP requests and receive HTTP response
  HttpClient http = new HttpClient();

  try { // Encapsulate the code to safely exit if the connection is lost
    HttpResponseMessage message = await http.GetAsync(url);
    responseBodyAsText = await message.Content.ReadAsStringAsync();
    
    HtmlDocument doc = new HtmlDocument();
    doc.LoadHtml(responseBodyAsText); // load the new HTML document with the previous HTTP message response
    
    // Regex Definitions
    Regex sample_regex  = new Regex("beggining" + "((.|\n)*?)" + "ending");
    Regex quantum_regex = new Regex("<div class=\"quantum-break-is-out\">" + "((.|\n)*?)" + "</div>");
    Regex php_regex     = new Regex("((.|\n)*?)" + ".php");
    Regex span_regex    = new Regex("<span class=\"title\">" + "((.|\n)*?)");
    
    // Loop
    string[] quotesArray = doc.DocumentNode.Descendants("article").Select(y => y.InnerHtml).ToArray();
    foreach (string element in quotes) {
      MatchCollection sample_match  = sample_regex.Matches(element);
      MatchCollection quantum_match = quantum_regex.Matches(element);
      MatchCollection php_match     = php_regex.Matches(element);
      MatchCollection span_match    = span_regex.Matches(element);
      
      var sample  = content_match.Count > 0 ? content_match[0].ToString() : null;
      var quantum = quantum_match.Count > 0 ? quantum_match[0].ToString() : null;
      var php     = php_match.Count     > 0 ? php_match[0].ToString()     : null;
      var span    = span_match.Count    > 0 ? span_match[0].ToString()    : null;
    }
    
  } catch (HttpRequestException hre) {
    // Handle errors here
  }
}
```

## DISSECTION

Okay, now we've seen the whole method I'll give some explanations :)

_I assume you know how to send HTTP requests with an HTTPClient and how to basically use HtmlAgilityPack.
If not, you can [read this other post I wrote about HTTP requests](www.sideffects.fr/blog/)_

### REGEX DEFINITIONS
We begin with regex definitions:

```c#
Regex sample_regex = new Regex("beggining" + "((.|\n)*?)" + "ending");
```
This line creates a new Regex object, and we have to initalize it with a pattern.
This pattern is a string which will be used to look up for pieces of text corresponding to this string.

Here the regex will look for text beggining with the word 'beggining' and ending with the word 'ending'.

>Ok, wo what's this horrible thing "((.|\n)*?)" ? o_o

It is a sub-pattern telling the regex that anything can be found between the words 'beggining' and 'beggining'.
Thus, if the regex encounter the following phrase:

>'Beggining is a little bit like ending'

It will match it and save it as a result.


These others examples are similar and if you've understand the principles you can skip this part.

```c#
Regex quantum_regex = new Regex("<div class=\"quantum-break-is-out\">" + "((.|\n)*?)" + "</div>");
```
This regex look for a HTML node `div` who has the class `quantum-break-is-out`.

```c#
Regex php_regex = new Regex("((.|\n)*?)" + ".php");
```

The regex look for a link ending with `.php`

```c#
Regex span_regex = new Regex("<span class=\"title\">" + "((.|\n)*?)");
```
This on look for a node starting as a `span` having the class `title` and can ends by anything.
    

### REGEX MATCHES

```c#
string[] quotesArray = doc.DocumentNode.Descendants("article").Select(y => y.InnerHtml).ToArray();
```
I won't explain this line as this is not the subject and we dealt with it in the [HTTP requests post](www.sideffects.fr/blog/).

```c#
MatchCollection sample_match  = sample_regex.Matches(element);
```
For each element in the array we apply the `Match()` method to find result. This result is saved in a `MatchCollection` sample_match.

```c#
var sample  = content_match.Count > 0 ? content_match[0].ToString() : null;
```
We check is the results array contains at least one element by checking the `Count` attribute.
If it does, we convert the value to string with the `ToString()` method, if not we set the `null` value to the `sample`variable.

# END

I basically showed you how to build and use regex, now you can try on your own 
or look for more information in the following links in the reference section.

# REFERENCES

Here are a bunch of useful links you want to know further that we learned in this article

* [.NET Framework Regular Expressions](https://msdn.microsoft.com/en-us/library/hs600312(v=vs.110).aspx)
* [Regex, classe](https://msdn.microsoft.com/fr-fr/library/system.text.regularexpressions.regex(v=vs.110).aspx)
* [Regular Expression Language - Quick Reference](https://msdn.microsoft.com/en-us/library/az24scfc(v=vs.110).aspx)

If you want to quickly test your regex online
* http://www.regexr.com/
* https://regex101.com/#pcre
