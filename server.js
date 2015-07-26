// -----------------------------
// WWW.SIDEFFECT.FR
// -----------------------------
// by Jeremie Corpinot
// http://github.com/rootasjey

// -----------------------------
// ----------requires-----------
// -----------------------------
var express 		= require('express'),	// web dev framework
	stylus 			= require('stylus'),		// css pre-compiler
	morgan 			= require('morgan'),		// loggin middleware
	nib 			= require('nib'),           // Stylus utilities
    http 			= require('http'),
    path 			= require('path'),
	fs 				= require('fs'),				// file stream
	bodyParser 		= require('body-parser'),
	methodOverride 	= require('method-override'),
	sha1 			= require('js-sha1'),
	jf				= require('jsonfile'),
	util			= require('util'),
	jsdom			= require('jsdom'),
	Poet 			= require('poet');

//var port = process.env.port || 8080;

// Markdown module
var marked = require('marked');

// ---------------
// APP - CREATION
// ---------------
var app = express();
// ----------------
function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}


// ---------------------------------------------------
// Set the default views folder
// containing templates
// and the static folder
// ---------------------------------------------------
app.set('port', process.env.PORT || 3003);
app.set('views', __dirname + '/views');	// folder templates
app.set('view engine', 'jade');			// template engine
app.use(morgan('dev'));					// logging output (will log incoming requests to the console)
app.use(bodyParser());
app.use(bodyParser.json());				// to suport JSON-encoded bodies
app.use(bodyParser.urlencoded({			// to suport URL-encoded bodies
	extended: true
}));

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
// var azure = require('azure');
// var nconf = require('nconf');
// var uuid  = require('node-uuid');

// -------------------------------------
// configuration for local developpement
// -------------------------------------
// nconf.env()
//      .file({ file: './database/config.json'});
// var tableName 		= nconf.get("TABLE_NAME"),
// 	partitionKey 	= nconf.get("PARTITION_KEY"),
// 	accountName 	= nconf.get("STORAGE_NAME"),
// 	accountKey 		= nconf.get("STORAGE_KEY");

// -----------------------------
// An object (Table) for table access storage
// -----------------------------
// var Table 	= require('./database/table');
// var post_table = new Table(azure.createTableService(accountName, accountKey), tableName, partitionKey);
// -----------------------------
// intern security
// var _user 	= 'dc76e9f0c0006e8f919e0c515c66dbba3982f785';
// var _pass 	= 'a141005e8413ee86855c36cafbb63eae454178b1';
// var _ADMIN 	= 0; // 0 if user, 1 if logged as administrator

var homeURL = null;

// Poet Blog engine configuration
// ------------------------------
var poet = Poet(app, {
  posts: './_posts/',
  postsPerPage: 5,
  metaFormat: 'json'
});

poet.addRoute('/post/:post', function (req, res, next) {
	var post = poet.helpers.getPost(req.params.post);

	if (post) {
		res.render('blog/post', { post: post, homeURL: homeURL });
	} else {
		res.render('includes/404', {title: '404'});
	}
})
.addRoute('/tag/:tag', function (req, res, next) {
  var posts = poet.helpers.postsWithTag(req.params.tag);
  if (posts) {
    res.render('blog/tag', { posts: posts });
  } else {
	res.render('includes/404', {title: '404'});
  }
}).init();


// -------------------------------
// -----------ROUTING ------------
// -------------------------------

// Home
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
// .get('/blog', function(req, res) {
// 	var query = azure.TableQuery
// 		.select()
// 		.from('posts');
//
// 	post_table.storageClient.queryEntities(query, function(error, entities){
// 		if(!error){
// 			//entities contains an array of entities
// 			res.send(200, entities);
// 		}
// 	});
// })

.get('/blog', function (req, res) {
	var posts = poet.helpers.getPosts(0,5);
	homeURL = req.protocol + '://' + req.get('host') + req.originalUrl;

	if (posts) {
		res.render('blog/posts', { posts: posts, homeURL: homeURL });
	} else {
		res.render('includes/404', { title: '404' });
	}
})

.get('/rss', function (req, res) {
  // Only get the latest posts
  var posts = poet.helpers.getPosts(0, 5);
  res.setHeader('Content-Type', 'application/rss+xml');
  res.render('blog/rss', { posts: posts });
})

.get('/sitemap.xml', function (req, res) {
  // Only get the latest posts
  var postCount = poet.helpers.getPostCount();
  var posts = poet.helpers.getPosts(0, postCount);
  res.setHeader('Content-Type', 'application/xml');
  res.render('blog/sitemap', { posts: posts });
})

// Add a new post
.post('/blog/add_post', function (req, res) {
	if(_ADMIN) {
		// check if we've the privilege

		// get the text body + markdown conversion
		var bodyformated = req.param('body');
		bodyformated = md(bodyformated);

		// create a query
		var task = {
			PartitionKey : post_table.partitionKey,
			RowKey : uuid(),
			Title : req.param('title'),
			Body  : bodyformated,
			Created_at : new Date(),
			Category : 'blogpost',
			Tags : req.param('tags')
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
.get('/getprojects', function (req, res) {
	var jsonArray = [];
	var path = __dirname + '/public/docs/projects';

	// open the projects directory
	fs.readdir(path, function (err, files) {
		if(err) {
			// if the directory is not found
			res.send(404);
		}

		var count = 1; // watch when result must be sent
		for (var i = 0; i < files.length; i++) {

			if(files[i].endsWith(".json")){
				// build the file path
				var file = files[i];
				var pathFile = path + '/' + files[i];


				// Open the file
				// Get the files content
				// and push the content to the json array
				var fileContent = jf.readFileSync(pathFile);
				jsonArray.push(fileContent);
			}
			else {
				continue;
			}
		}

		res.send(200, jsonArray);
	});
})

// Show all lessons
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

// Get a single lesson
.get('/lesson', function (req, res) {
	var p = req.query.path;
	var t = req.query.title;
	var jsonArray = [];
	// console.log("path : " + p);

	// open the file
	fs.readFile(p, 'utf-8', function (err2, data) {
		if (err2) res.send(404);

		// parse the data as markdown
		var content = marked(data);
		// console.log(marked('I am using __markdown__.'));
		jsonArray.push({'title' : t, 'content' : content});

		res.send(200, jsonArray);
	});
})

// Get the last articles from the blog
.get('/getblog', function (req, res) {
	var jqueryPath = __dirname + "/public/js/jquery-2.1.1.min.js";
	jsdom.env(
	  "http://rootasjey.github.io/",
	  [jqueryPath],
	  function (errors, window) {
		// Jquery object
		var $ = window.$;

		// Posts titles array
		var postTitles = $(".post .post-title a");

		// Posts summaries array
		var postSummaries = $(".post .post-excerpt p");

		// Post links array
		var postLinks = $(".post .post-excerpt p .read-more");

		// json array to return
		var jsonArray = [];

		for (var i = 0; i < postTitles.length; i++) {
			var title, summary, link;

			title = $(postTitles[i]).text();
			summary = $(postSummaries[i]).text();
			link = $(postLinks[i]).attr("href");

			jsonArray.push({"title" : title, "summary" : summary, "link" : link});
		}

		res.send(200, jsonArray);
	  }
	);
})


// ----------------
// COUNTERS MODULE
// ----------------

.get('/counters', function (req, res)  {
	res.render('../public/modules/counters/counters');
})

// Save the json array to a local file (data.json)
.post('/counters/save', function (req, res) {
	// Allow Cross Domain Policy
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	// Path to the json file (to save)
	var file = __dirname + '/public/modules/counters/data.json';

	// Get the object from the queryString
	// and normalize it to a json object
	var obj = req.query.json;
	obj = JSON.parse(obj);

	// Open and write in the file
	jf.writeFile(file, obj, function (err) {
		if (err === null) {
			res.send(201);
		} else {
			res.send(409); // if there's an error
		}
	});
})

// Load the data.json file into the app
.get('/counters/load', function (req, res) {
	// Allow Cross Domain Policy
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");


	// Path to the json file (to read)
	var file = __dirname + '/public/modules/counters/data.json';

	// Open and read the file
	jf.readFile(file, function (err, obj) {
		if (err === null) {
			res.status(200).json(obj);
		} else res.send(409); // if there's an error
	});
})

.get('/counters/delete', function (req, res) {
	// Allow Cross Domain Policy
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	// Path to the json file (to save)
	var file = __dirname + '/public/modules/counters/data.json';

	var obj = jf.readFileSync(file);
	obj[req.query.name] = null;
	delete obj[req.query.name];

	// Open and write in the file
	jf.writeFileSync(file, obj);

	res.send(200);
})

.get('/counters/add', function (req, res) {
	// Allow Cross Domain Policy
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	// Path to the json file (to save)
	var file = __dirname + '/public/modules/counters/data.json';

	var obj = jf.readFileSync(file);
	obj[req.query.name] = {"total": 0};


	// Open and write in the file
	jf.writeFileSync(file, obj);

	res.send(200);
})

// END COUNTERS MODULE
// -------------------

.get('/datamining', function (req, res) {
	res.render('../public/modules/datamining/index');
})

.get('/datamining/rapport', function (req, res) {
	var path = __dirname + '/public/modules/datamining/rapport.md';
	var jsonArray = [];

	// open the file
	fs.readFile(path, 'utf-8', function (err2, data) {
		if (err2) res.send(404);

		// parse the data as markdown
		var content = marked(data);
		jsonArray.push({'content' : content});

		res.send(200, jsonArray);
	});
})

// Handle inexistant routes
.use(function (req, res, next) {
	// res.header("Access-Control-Allow-Origin", "*");
	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// next();

    res.render('includes/404', {title: '404'});
});


// listen port => server start
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port: " + app.get('port'));
});

// reload the browser automatically
// livereload = require('livereload');
// server = livereload.createServer({exts: ['less']});
// server.watch(__dirname + "/public");

// PROTOTYPES
// ----------
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
