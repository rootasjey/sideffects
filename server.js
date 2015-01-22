// -----------------------------
// WEB SITE APP
// -----------------------------
// by Jeremie Corpinot
// jeremiecorpinot@outlook.com
// -----------------------------
// ----------require------------
// -----------------------------
var express = require('express'),	// web dev framework
		stylus 	= require('stylus'),		// css pre-compiler
		morgan 	= require('morgan'),		// loggin middleware
		nib 		= require('nib'),           // Stylus utilities
    routes 	= require('./routes'),
    http 		= require('http'),
    path 		= require('path');

var fs 			= require('fs');				// file stream

var bodyParser 			= require('body-parser');
var methodOverride 	= require('method-override');
//var port = process.env.port || 8080;

var md = require('node-markdown').Markdown;


// ---------------
// APP - CREATION
// ---------------
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


// ---------------
// DATABASE: AZURE
// ---------------
var azure = require('azure');
var nconf = require('nconf');
var uuid 	= require('node-uuid');
// -----------------------------
// -----------------------------
// configuration for local developpement
// -----------------------------
nconf.env()
     .file({ file: './database/config.json'});
var tableName 		= nconf.get("TABLE_NAME")
var partitionKey 	= nconf.get("PARTITION_KEY")
var accountName 	= nconf.get("STORAGE_NAME")
var accountKey 		= nconf.get("STORAGE_KEY");
// -----------------------------
// -----------------------------
// An object (Table) for table access storage
// -----------------------------
var Table 	= require('./database/table');
// var post_table = new Table(azure.createTableService(accountName, accountKey), tableName, partitionKey);
// -----------------------------
// intern security
var sha1 		= require('js-sha1');
var _user 	= 'dc76e9f0c0006e8f919e0c515c66dbba3982f785';
var _pass 	= 'a141005e8413ee86855c36cafbb63eae454178b1';
var _ADMIN 	= 0; // 0 if user, 1 if logged as administrator



// -------------------------------
// ROUTING -----------------------
// -------------------------------
// Home
// ----
app.get('/', function (req, res) {
	res.render('index');
})
.post('/login/admin', function (req, res) {
	// get variables (from form)
	var u = req.param('user');
	var p = req.param('pass');

	// escape special chars
	u = escape(u);
	p = escape(p);

	// check validity
	if(sha1(u) === _user && sha1(p) === _pass) {
		_ADMIN = 1;
		res.send(200);
	}
	else res.send(401);
})

// Blog
// ----
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

// Add a new post
// -----------------
.post('/blog/add_post', function (req, res) {
	if(_ADMIN) {
		// check if we've the privilege

		// get the text body + markdown conversion
		var bodyformated = req.param('body');
		bodyformated = md(bodyformated);

		// create a query
		var task = {
			PartitionKey : post_table.partitionKey
			, RowKey : uuid()
			, Title : req.param('title')
			, Body  : bodyformated
			, Created_at : new Date()
			, Category : 'blogpost'
			, Tags : req.param('tags')
		};

		// check if it's an update
		// > so we've a rowkey
		var rowkey = req.param('rowkey');
		if(rowkey.length > 0) {
			task.RowKey = rowkey;
		}

		// add to table storage
		post_table.storageClient.insertOrReplaceEntity(post_table.tableName, task, function(error){
			if(!error){
				// Success: Entity inserted
				res.send(200);
			}
			else res.send(404); // error
		});
	}
	else res.send(401); // NOT authorized
})

// Delete a post
// -------------
.post('/blog/delete_post', function(req, res) {
	if(_ADMIN) {
		// check if we've the privilege

		// get the uniques identifiers
		var partitionkey = req.param('partitionkey');
		var rowkey = req.param('rowkey');

		// check they're not empty
		if(!(partitionkey && rowkey)) res.send(404);

		// execute the query on the table storage
		post_table.storageClient.deleteEntity(post_table.tableName,
								{
									PartitionKey: partitionkey,
									RowKey		: rowkey
								},

							   function(error) {
								   if(!error) {
									   // Success: Entity deleted
									   res.send(200);
								   }
								   else res.send(404); // error
							   });
	}
	else {
		res.send(401); // NOT authorized
	}
})

// Edit a post
// -----------
.post('/blog/edit_post', function(req, res) {

	if(_ADMIN) {
		// check if we've the privilege

		// check the entity's availability
		// from table storage

		// create a query
		var query = azure.TableQuery
			.select()
			.from('posts')
			.where('RowKey eq ?', req.param('rowkey'));

		post_table.storageClient.queryEntities(query, function(error, entities){
			if(!error){
				//entities contains an array of entities
				res.send(200, entities);
			}
			else res.send(404); // error
		});
	}
	else {
		res.send(401); // NOT authorized
	}
})

// Show personal projects
// ----------------------
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
	var path = __dirname + '/public/docs/cv.html';
	fs.readFile(path, 'utf-8', function(err, data) {
		if (err) res.send(404);

		// convert the .md to .html
		var content = data;

		// return the response
		res.send(200, content);
	});
})

.get('/lessons', function (req, res) {
	var jsonArray = [];
	var path = __dirname + '/public/docs/lessons';

	// open the projects directory
	fs.readdir(path, function (err, files) {
		if(err) {
			// if the directory is not found
			res.send(404);
		}

		var count = 1; // watch when result must be sent
		for (var i = 0; i < files.length; i++) {

			if(files[i].endsWith(".md")){
				// build the file path
				var file = files[i].replace(".md", "");
				var path_file = path + '/' + files[i];

				// Add the file to the array
				jsonArray.push({"title" : file, "path" : path_file});
			}
			else {
				continue;
			}
		}

		res.send(200, jsonArray);
	});
})

.get('/lesson', function (req, res) {
	var p = req.query.path;
	var t = req.query.title;
	var jsonArray = [];
	// console.log("path : " + p);

	// open the file
	fs.readFile(p, 'utf-8', function (err2, data) {
		if (err2) res.send(404);

		// parse the data as markdown
		var content = md(data);
		jsonArray.push({'title' : t, 'content' : content});

		res.send(200, jsonArray);
	});
})

// Handle inexistant routes
// ------------------------
.use(function (req, res, next) {
    res.render('pages/404', {title: '404'});
});

// listen port => server start
// ---------------------------
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port: " + app.get('port'));
});

// reload the browser automatically
livereload = require('livereload');
server = livereload.createServer({exts: ['less']});
server.watch(__dirname + "/public");

// PROTOTYPES
// ----------
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
