{{{
    "title"     : "[UWP] HttpRequest",
    "tags"      : [ "dev", "C#", "http", "request", "htmlAgilityPack", "parse", "parsing"],
    "category"  : "dev",
    "date"      : "04-24-2016",
    "background": "/blog/headers/http.png"
}}}

Hi,

When I build a new app, there're a lot of chances
 it uses an external online service
(like music, news, weather api),
so I need to send HTTP Requests to get online data.
Today we'll see how to send an HTTP request and parse
the result in an UWP_(Universal Windows Platform)_ app with C#.

<br/>

> Dev Level: begginer

<br/>

**TABLE OF CONTENT**

*   [REQUIREMENTS](#requirements)
*   [CODING](#coding)
    * [USE THE HTTPCLIENT CLASS](#httpclient)
    * [SECURE THE CODE](#secure)
    * [PARSE THE RESULT](#parse)
    * [INSTALL HTMLAGILITYPACK](#install)
    * [USE HTMLAGILITYPACK](#use)
*   [END](#end)
*   [REFERENCES](#references)

<br/><br/><br/>

# REQUIREMENTS<a name="requirements"></a>

For this lesson, you will need:

*   Windows 10
*   [Visual Studio 2015](https://www.microsoft.com/france/visual-studio/)
*   [Create an UWP project in C#](https://msdn.microsoft.com/en-us/windows/uwp/get-started/universal-application-platform-guide)

<img type='doodle' alt='windows vs uwp' src='/blog/attachements/common/win_vs_uwp.png'/>

# CODING<a name="coding"></a>

## USE THE HTTPCLIENT CLASS<a name="httpclient"></a>


In this first part, we'll beggin by sending the request and receiving the data.

```csharp
// A class for sending HTTP requests and receiving HTTP responses
string url = "http://bisouslescopains.tumblr.com/";
HttpClient http = new HttpClient();

HttpResponseMessage message = await http.GetAsync(url);             // wait for the result
var RedirectedURL = message.RequestMessage.RequestUri.ToString();   // get the redirected url if it has been re-written
var responseBodyAsText = await message.Content.ReadAsStringAsync(); // get the content's response
```

> <a href="https://msdn.microsoft.com/en-us/library/system.net.http.httpclient(v=vs.118).aspx">MSDN page about the HttpClient class</a>

> You need these following using to run the code above,
> but Visual Studio should recommand you to import them automatically

```csharp
using System.Net.Http;
using System.Net.NetworkInformation;
```

<br/>
In theses first lines of code, we did four steps:

*   Create an <a href="https://msdn.microsoft.com/en-us/library/system.net.http.httpclient(v=vs.118).aspx">HttpClient</a> instance
*   Send an HTTP GET request to the [url](http://bisouslescopains.tumblr.com/) and get the data result from the server (asynchronously)
*   Get the redirected url
*   Read the content's response

A faster way if you don't need others server informations
_(as redirected url, server status code, headers, etc.)_ is :

```csharp
HttpResponseMessage message = await http.GetAsync(url);
responseBodyAsText = await message.Content.ReadAsStringAsync();
```

<br/><br/>

## SECURE THE CODE<a name="secure"></a>

Fetching online content has not 100% of success rate
as the connection can become instable and fail the process.
So to prevent unexpected behavior,
we encapsulate the code in a try-catch statement.

```csharp
try {
    // A class for sending HTTP requests and receiving HTTP responses
    string url = "http://bisouslescopains.tumblr.com/";
    HttpClient http = new HttpClient();

    HttpResponseMessage message = await http.GetAsync(url);
    responseBodyAsText = await message.Content.ReadAsStringAsync();
} catch (HttpRequestException hre) {
    // The request failed
}
```

We can also check the user's connection availability before sending the request

```csharp
// If there's no internet connection
if (!NetworkInterface.GetIsNetworkAvailable()) {
    // handle failed fetch
    // A possibility is to load data from isolated storage
}
```

<br/><br/>

## PARSE THE RESULT<a name="parse"></a>

Here is the fun part :D

<img type='doodle' alt='happy' src='/blog/attachements/common/happy.png'/>

### INSTALL HTMLAGILITYPACK PACKAGE<a name="install"></a>

First we need to install the [HtmlAgilityPack package](https://htmlagilitypack.codeplex.com/).
Follow these step from Visual Studio (VS):

<br/>
<img type='screenshot' alt='nuget' src='/blog/attachements/uwp_http/access_nuget.png'/>

<br/>
In Visual Studio (VS),

1.  Click on the **Tools** (Outils) menu
2.  Go to **NuGet packages manager** (Gestionnaire de package NuGet)
3.  Click on **Manage NuGet packages for the solution** (Gérer les packages NuGet pour la solution)

<br/>
-------------------

<br/>
<img type='screenshot' alt='nuget_install' src='/blog/attachements/uwp_http/nuget_install_package.png'/>

<br/>
VS will open a new tab with all available packages online
and installed in your solution.

Now we have to:

1.  Search for **HtmlAgilityPack** in the 'Browse' tab
2.  Select the right **HtmlAgilityPack** package
3.  Select in which project you want to install it
(select the project where you want to parse HTML data)
4.  Click on **Install**

Now you should see **HtmlAgilityPack** in your **References**
and be able to add the following using statements at the top of your class:

<br/>
<img type='small-screenshot' style="height: 50%; width:50%;" alt='htmlagilitypack' src='/blog/attachements/uwp_http/htmlagilitypack_ref.png'/>
<br/>

```csharp
using HtmlAgilityPack;
using System.Linq;
```

> The _System.Linq_ using extends HtmlAgilityPack available methods

<br/>

### USE HTMLAGILITYPACK<a name="use"></a>

<img type='doodle' alt='htmlagilitypack' src='/blog/attachements/common/htmlagilitypack.png'>

Now the setup is done, we can begin to load the HTML result and parse the data.

```csharp
// HTML Document building
HtmlDocument doc = new HtmlDocument(); // create an html document
doc.LoadHtml(responseBodyAsText);     //  load the html from the previous request in the document
```

<br/>

To start, we:

*   Create an HTML document to simulate a web page
*   Load the HTML content from our previous response from the request

Now we can get HTML nodes:

```csharp
var quotes = doc.DocumentNode.Descendants("article");
```

The **Descendants** method gets all _'article'_ nodes in the document

If you would want all _'span'_ of the HTML document, you would write:

```csharp
var quotes = doc.DocumentNode.Descendants("span");
```

<br/>
Now we loop into each article node

```csharp
foreach (HtmlNode q in quotes) {
    var content = q.Descendants("div").Where(x => x.GetAttributeValue("class", "") == "batman").FirstOrDefault();
    var authorAndReference = q.Descendants("div").Where(x => x.GetAttributeValue("class", "") == "robin").FirstOrDefault();

    // Do other stuff with the content
}
```

For each node we:

*   Search for the (descendant) div node which has the _'batman'_ class
*   Search for the (descendant) div node which has the _'robin'_ class

If these div nodes are not found, it will return null.

If you want to get multiple nodes, you can write

```csharp
var content = q.Descendants("div").Where(x => x.GetAttributeValue("class", "") == "batman").ToArray();
```

Now that you got the content, you can make further process like creating
objects with the content.

<br/><br/>

# END<a name="end"></a>

So we've seen how to send HTTP requests to a server and parse
the data response.
In the next article, we'll see how to parse content using [regular expressions](http://www.wikiwand.com/en/Regular_expression).

Thank you for the reading, don't hesitate
to tell me if you have a better solution or remarks in the comments.  

You can also share this article if you learned something
or if it could help someone :)


> HtmlAgilityPack Parsing Memo

<br/><br/>

# REFERENCES<a name="references"></a>

*   <a href="https://msdn.microsoft.com/en-us/library/system.net.http.httpclient(v=vs.118).aspx">HttpClient Class</a>
*   [Calling a Web API From a .NET Client in ASP.NET](http://www.asp.net/web-api/overview/advanced/calling-a-web-api-from-a-net-client)
*   [HtmlAgilityPack Codeplex Page](https://htmlagilitypack.codeplex.com/)
*   [HtmlAgilityPack Samples](http://htmlagilitypack.codeplex.com/wikipage?title=Examples)
*   [HtmlAgilityPack Tutorial](http://articles.runtings.co.uk/2009/09/htmlagilitypack-article-series.html)
