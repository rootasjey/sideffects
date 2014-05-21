// 	THIS IS A MINIMAL NODE.JS APP
// ------------------------------
// ------------------------------
var http = require('http');
var url = require('url');
var querystring = require('querystring');
var EventEmitter = require('events').EventEmitter;
// --------------------------------------
// installed modules
// -----------------
var markdown = require('markdown').markdown;
// -----------------


var server = http.createServer(function(req, res) {
	var page = url.parse(req.url).pathname;
	var params = querystring.parse(url.parse(req.url).query);
	// console.log(page);
	

	res.writeHead(200, {"Content-Type": "text/html"});
	if (page == '/') {
		
		console.log(markdown.toHTML('Ceci est un **example**.'))
		res.write('Vous etes a l\'accueil');

		if ('config' in params) {
			res.write(params['config']);
		};
	}
	else if (page == '/admin') {
		res.write('Vous etes dans la partie admin. :D');
	}
	else {
		res.write('<p> <strong> 404 Error </strong> </p>');
	}
	res.end();
});
server.listen(8080);