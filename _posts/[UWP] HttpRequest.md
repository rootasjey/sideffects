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
* [DISSECTION](#dissection)
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

## USE THE HTTPREQUEST CLASS

In the first part, we'll beggin by sending the request and receiving the data.

```c#
// A class for sending HTTP requests and receiving HTTP responses
string url = "";
HttpClient http = new HttpClient();

HttpResponseMessage message = await http.GetAsync(url);             // get the response asynchronously
var RedirectedURL = message.RequestMessage.RequestUri.ToString();   // get the redirected url
var responseBodyAsText = await message.Content.ReadAsStringAsync(); // get the content's response
```

In theses first lines of code, we've created an HttpClient, 

# DISSECTION

# END

# REFERENCES
