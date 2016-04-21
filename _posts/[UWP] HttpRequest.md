---
published: false
---
{{{ 
    "title"     : "[UWP] HttpRequest", 
    "tags"      : [ "dev", "C#", "http", "request", "htmlAgilityPack", "parse", "parsing"], 
    "category"  : "dev", 
    "date"      : "20-04-2016", 
    "background": "/modules/blog/headers/prismjs.jpg" 
}}}

> Dev Level: begginer

TABLE OF CONTENT

* [INTRODUCTION](#introduction)
* [REQUIREMENTS](#requirements)
* [CODING](#coding)
* [END](#end)
* [REFERENCES](#references)


# INTRODUCTION

Hi,

When I build a new app, chances are it use an external online service (like music, news, weather), so I need to send HTTP Requests to get online data. Today we'll see how to send an HTTP request and parse the result in few steps in C# for an UWP app.

# REQUIREMENTS

For this lesson, you need:
* Windows 10
* [Visual Studio 2015](https://www.microsoft.com/france/visual-studio/)
* [Create an UWP project in C#](https://msdn.microsoft.com/en-us/windows/uwp/get-started/universal-application-platform-guide)

# CODING

## USE THE HTTPCLIENT CLASS

In the first part, we'll beggin by sending the request and receiving the data.

```c#
// A class for sending HTTP requests and receiving HTTP responses
string url = "http://bisouslescopains.tumblr.com/";
HttpClient http = new HttpClient();

HttpResponseMessage message = await http.GetAsync(url);             // get the response asynchronously
var RedirectedURL = message.RequestMessage.RequestUri.ToString();   // get the redirected url
var responseBodyAsText = await message.Content.ReadAsStringAsync(); // get the content's response
```

> [MSDN page about the HttpClient class](https://msdn.microsoft.com/en-us/library/system.net.http.httpclient(v=vs.118).aspx)

> You need these following using to use the code above, but Visual Studio should recommand to import them automatically
```c#
using System.Net.Http;
using System.Net.NetworkInformation;
```

In theses first lines of code, we did these steps:
* __create an [HttpClient](https://msdn.microsoft.com/en-us/library/system.net.http.httpclient(v=vs.118).aspx) instance__
* __send an HTTP GET request to the url (http://bisouslescopains.tumblr.com/) and get the data result from the server (asynchronously)<br/>__
This request is executed _asynchronously_ but we wait for its result with the _await_ keyword.
* __get the redirected url__<br/>
Useful if the server re-write the url request
* __read the content's response__<br/>
The _ReadAsStringAsync()_ method can run asynchronously but is awaited before the next line of code.

A faster way if you don't need others server informations (as _redirected url_, _server status code_, _headers_) is :
```c#
HttpResponseMessage message = await http.GetAsync(url);
responseBodyAsText = await message.Content.ReadAsStringAsync();
```

## SECURE THE CODE

Fetching online content has not 100% of success rate as the connection can become instable and fail the process.
So to prevent unexpected behavior, we can encapsulate the code in a try-catch statement.

```c#
try {
    // put the previous code here
    HttpResponseMessage message = await http.GetAsync(url);
    responseBodyAsText = await message.Content.ReadAsStringAsync();
} catch (HttpRequestException hre) {
    // The request failed
}
```

We can also check the user's connection availability before sending the request

```c#
// If there's no internet connection
if (!NetworkInterface.GetIsNetworkAvailable()) {
    // handle failed fetch 
    // A possibility is to load data from isolated storage
}
```

## PARSE THE RESULT

Here is the fun part :D

### INSTALL HTMLAGILITYPACK PACKAGE

First we need to install the [HtmlAgilityPack package](https://htmlagilitypack.codeplex.com/).
Follow these step from Visual Studio (VS):

[1st image]
In Visual Studio (VS), 

* click on the 'Tools' menu 
* then go to 'NuGet packages manager'
* click on 'Manage NuGet packages for the solution'

[2nd image]
VS will open a new tab with all available packages online and installed in your solution.
Now we have to:

1. search for 'HtmlAgilityPack' in the 'Browse' tab (see 1)
2. select the right 'HtmlAgilityPack' package
3. select in which project you want to install it (select the project you want to parse HTML requests)
4. click on 'Install'

Now you should see 'HtmlAgilityPack' in your _References_ and be able to add the following using statement:

```c#
using HtmlAgilityPack;
using System.Linq;
```

> The _System.Linq_ using extends HtmlAgilityPack available methods


### USE HTMLAGILITYPACK

Now the setup is done, we can begin to load the HTML result and parse the data.

```c#
// HTML Document building
HtmlDocument doc = new HtmlDocument();
doc.LoadHtml(responseBodyAsText); // the responseBodyAsText variable was created before when sending the http request
```

To start, we
* Create an HTML document to simulate a web page
* Load the HTML content from our previous response from the request

Then we get a nodes array
```c#
var quotes = doc.DocumentNode.Descendants("article");
```
The _'Descendants'_ method gets all 'article' nodes in the document

If you would want all span of the HTML document, you woul write
```c#
var quotes = doc.DocumentNode.Descendants("span");
```


Now we loop into each article node

```c#
foreach (HtmlNode q in quotes) {
var content = q.Descendants("div").Where(x => x.GetAttributeValue("class", "") == "batman").FirstOrDefault();
var authorAndReference = q.Descendants("div").Where(x => x.GetAttributeValue("class", "") == "robin").FirstOrDefault();

// Do other stuff with the content
}
```
For each node:
* Get the div node which has the _'batman'_ class
* Get the div node which has the _'robin'_ class

In case these div nodes are not found, it will return null.

If you want to get multiple nodes, you can write

```c#
var content = q.Descendants("div").Where(x => x.GetAttributeValue("class", "") == "batman").ToArray();
```

Now that you got the content, you can make further process.

# END

So we've seen how to send HTTP requests to a server and parse the data response.
In the next article, we'll see how to parse content using [regular expressions](http://www.wikiwand.com/en/Regular_expression).

Thank you for the reading, don't hesitate to share if you learn something in this article :)

> See the short memo on HtmlAgilityPack samples

# REFERENCES
* [HttpClient Class](https://msdn.microsoft.com/en-us/library/system.net.http.httpclient(v=vs.118).aspx)
* [Calling a Web API From a .NET Client in ASP.NET](http://www.asp.net/web-api/overview/advanced/calling-a-web-api-from-a-net-client)
* [HtmlAgilityPack Codeplex Page](https://htmlagilitypack.codeplex.com/)
* [HtmlAgilityPack Samples](http://htmlagilitypack.codeplex.com/wikipage?title=Examples)
* [HtmlAgilityPack Tutorial](http://articles.runtings.co.uk/2009/09/htmlagilitypack-article-series.html)
