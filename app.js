// -----------------------------
// WEB SITE APP
// -----------------------------
// by Jeremie Corpinot
// jeremiecorpinot@outlook.com
// -----------------------------
// ----------require------------
// -----------------------------
var express = require('express'),	// web dev framework
	stylus = require('stylus'),		// css pre-compiler
	morgan = require('morgan'),		// loggin middleware
	nib = require('nib');			// Stylus utilities

var fs = require('fs');				// file stream
var marked = require('marked');		// markdown module

// ---------------//
// APP - CREATION //
// ---------------//
var app = express()
// ----------------
function compile(str, path){
	return stylus(str)
		.set('filename', path)
		.use(nib())
};


// ---------------------------------------------------
// set the default views folder
// containing templates
// and the static folder
// ---------------------------------------------------
app.set('views', __dirname + '/views');	// folder templates
app.set('view engine', 'jade');			// template engine
app.use(morgan('dev'));					// logging output (will log incoming requests to the console)
app.use(stylus.middleware(
{
	src: __dirname + '/public',
	compile: compile
}));
app.use(express.static(__dirname + '/public'));
// static folder containing css, img & others contents
// ---------------------------------------------------



// -------------------------------
// ROUTING
// -------------------------------
// -------------------------------
app.get('/', function (req, res) {
	res.render('index', {title: 'Accueil'});
})

.get('/about', function (req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('A propos!');
})

.get('/projects', function (req, res) {
	var jsonArray = [];
	var path = __dirname + '/public/projects';

	// open the projects directory
	fs.readdir(path, function (err, files) {
		if(err) {
			// if the directory is not found
			res.send(404)
		}

		var count = 1; // watch when result must be sent
		for (var i = 0; i < files.length; i++) {
			
			if(files[i].endsWith(".json")){
				// do nothing				
			}
			else {
				// remove file (from array) if not .json
				var index = files.indexOf(files[i]);
				if(index > -1) {
					files.splice(index, 1);
					i--;
					continue;
				}
			}

			// security loop
			// (i can be greater than files.length if items are removed)
			if(i >= files.length) break;


			// -------------------
			// build the file path
			var path_file = path + '/' + files[i];
			// open the file
			fs.readFile(path_file, function (err2, data) {
				if (err2) res.send(404);

				// parse the data as json
				var content = JSON.parse(data);
				jsonArray.push(content);

				// return the response if
				// it reached the end of array
				if(count == files.length)
					res.json(200, jsonArray)
				
				count++; // number of files read
			});
		}
	});
})

.get('/cv', function (req, res) {
	var path = __dirname + '/public/docs/cv.md';
	fs.readFile(path, 'utf-8', function(err, data) {
		if (err) res.send(404);

		// convert the .md to .html
		var content = marked(data);

		// return the response
		res.send(200, content);
	});
})
.use(function (req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.send(404, 'Vous vous etes perdu dans l\'espace temps');
});

app.listen(8080);


// PROTOTYPES
// ----------
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};