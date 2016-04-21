{{{ 
    "title"     : "[UWP] HttpRequest", 
    "tags"      : [ "dev", "C#", "http", "request", "htmlAgilityPack", "parse", "parsing"], 
    "category"  : "dev", 
    "date"      : "20-04-2016", 
    "background": "/modules/blog/headers/prismjs.jpg" 
}}}

> Dev Level: begginer

<br>
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

In theses first lines of code, we did these steps:
* create an [HttpClient](https://msdn.microsoft.com/en-us/library/system.net.http.httpclient(v=vs.118).aspx) instance
* send an HTTP GET request to the url (http://bisouslescopains.tumblr.com/)
* get the data result from the server (asynchronously)
* get the redirected url
* read the content's response

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

# END

So we've seen how to send HTTP requests to a server and parse the data response.
In the next article, we'll see how to parse content using [regular expressions](http://www.wikiwand.com/en/Regular_expression).

Thank you for the reading, don't hesitate to share if you learn something in this article :)

# REFERENCES
* [HttpClient Class](https://msdn.microsoft.com/en-us/library/system.net.http.httpclient(v=vs.118).aspx)
* [Calling a Web API From a .NET Client in ASP.NET](http://www.asp.net/web-api/overview/advanced/calling-a-web-api-from-a-net-client)
* [HtmlAgilityPack Codeplex Page](https://htmlagilitypack.codeplex.com/)
* [HtmlAgilityPack Samples](http://htmlagilitypack.codeplex.com/wikipage?title=Examples)
* [HtmlAgilityPack Tutorial](http://articles.runtings.co.uk/2009/09/htmlagilitypack-article-series.html)
