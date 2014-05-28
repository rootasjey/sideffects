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
	nib = require('nib'),          // Stylus utilities
    routes = require('./routes'),
    http = require('http'),
    path = require('path');			

var fs = require('fs');				// file stream
var marked = require('marked');		// markdown module

var ArticleProvider = require('./articleprovider-memory').ArticleProvider;
var articleProvider = new ArticleProvider();

var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//var port = process.env.port || 8080;

// ---------------//
// APP - CREATION //
// ---------------//
var app = express();
// ----------------
function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
};


// ---------------------------------------------------
// set the default views folder
// containing templates
// and the static folder
// ---------------------------------------------------
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');	// folder templates
app.set('view engine', 'jade');			// template engine
app.use(morgan('dev'));					// logging output (will log incoming requests to the console)
app.use(bodyParser());
app.use(methodOverride());
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));
app.use(express.static(__dirname + '/public'));
// static folder containing css, img & others contents
// ---------------------------------------------------

// DATABASE
// Azure
// -------
var azure = require('azure');
var nconf = require('nconf');
var uuid = require('node-uuid');

nconf.env()
     .file({ file: './database/config.json'});
var tableName = nconf.get("TABLE_NAME")
var partitionKey = nconf.get("PARTITION_KEY")
var accountName = nconf.get("STORAGE_NAME")
var accountKey = nconf.get("STORAGE_KEY");

var Table = require('./database/table');
var post_table = new Table(azure.createTableService(accountName, accountKey), tableName, partitionKey);



// -------------------------------
// ROUTING
// -------------------------------
// -------------------------------
app.get('/', function (req, res) {
	res.render('index', {title: 'Accueil'});
})

.get('/blog', function(req, res) {
	var query = azure.TableQuery
		.select()
		.from('posts');
	
	post_table.storageClient.queryEntities(query, function(error, entities){
		if(!error){
			//entities contains an array of entities
			res.send(200, entities);
		}
	});
})
.post('/blog/add_post', function (req, res) {
	// create a query
	var task = {
		PartitionKey : post_table.partitionKey
		, RowKey : uuid()
		, Title : req.param('title')
		, Body  : req.param('body')
		, Created_at: new Date()
	};
	
	// add to table storage
	post_table.storageClient.insertEntity(post_table.tableName, task, function(error){
		if(!error){
			// Entity inserted
			res.send(200);
		}
	});
})
.get('/projects', function (req, res) {
	var jsonArray = [];
	var path = __dirname + '/public/projects';

	// open the projects directory
	fs.readdir(path, function (err, files) {
		if(err) {
			// if the directory is not found
			res.send(404);
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
    res.render('pages/404', {title: '404'});
});

//app.listen(port);
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


// PROTOTYPES
// ----------
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};