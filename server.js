"use strict";

// www.sideffects.fr
// http://github.com/rootasjey

var express				= require('express'),
	stylus					= require('stylus'),
	morgan					= require('morgan'),		// loggin middleware
	nib							= require('nib'),       // Stylus utilities
  http						= require('http'),
  path						= require('path'),
	fs							= require('fs'),				// file stream
	bodyParser			= require('body-parser'),
	methodOverride	= require('method-override'),
	jf							= require('jsonfile'),
	Poet						= require('poet'),
	marked 					= require('marked'),
	pug							= require('pug'),
	url 						= require('url');

var app = express();
function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}

app.set('port', process.env.PORT || 3003);
app.set('views', getDirname() + '/views');	// templates folder
app.set('view engine', 'pug');							// template engine
app.use(morgan('dev'));											// logging output (will log incoming requests to the console)
app.use(bodyParser());
app.use(bodyParser.json());									// suport JSON-encoded bodies
app.use(bodyParser.urlencoded({							// suport URL-encoded bodies
	extended: true
}));

app.use(methodOverride());
app.use(stylus.middleware({
	src: getDirname() + '/public',
	compile: compile
}));
app.use(express.static(getDirname() + '/public'));


// Poet Blog engine configuration
// ------------------------------
var poet = Poet(app, {
	posts: './_posts/',
	postsPerPage: 5,
	metaFormat: 'json'
});

poet.addRoute('/post/:post', function (req, res) {
	var post = poet.helpers.getPost(req.params.post);
	var homeURL = req.protocol + '://' + req.get('host') + req.originalUrl;

	if (post) {
		res.render('blog/post', { post: post, homeURL: homeURL });
	} else {
		res.render('includes/404', {title: '404'});
	}
})
.addRoute('/tag/:tag', function (req, res) {
  var posts = poet.helpers.postsWithTag(req.params.tag);
  if (posts) {
    res.render('blog/tag', { posts: posts });
  } else {
	res.render('includes/404', {title: '404'});
  }
}).addTemplate({
  ext: 'pug',
  fn : function (options) { return pug.renderFile(options.source); }
})
.watch(function () {
	// watcher reloaded
}).init();

// /////////////////////
// :::::: ROUTING ::::::
// /////////////////////
var countersRoutes = require('./routes/counters');
var dataminingRoutes = require('./routes/datamaning');
var citations365Routes = require('./routes/citations365');

// Home
app.get('/', function (req, res) {
	res.render('index');
})

.get('/blog', function (req, res) {
	var posts = poet.helpers.getPosts();
	var homeURL = req.protocol + '://' + req.get('host') + req.originalUrl;
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
// Show personal projects
.get('/getprojects', function (req, res) {
	var jsonArray = [];
	var path = getDirname() + '/public/docs/projects';

	// open the projects directory
	fs.readdir(path, function (err, files) {
		if(err) { // if the directory is not found
			res.status(404).end();
		}

		for (var i = 0; i < files.length; i++) {
			if(files[i].endsWith('.json')){
				// build the file path
				var pathFile = path + '/' + files[i];
				var fileContent = jf.readFileSync(pathFile);
				jsonArray.push(fileContent);
			}
			else continue;
		}

		res.status(200).send(jsonArray);
	});
})

// Show all lessons
.get('/lessons', function (req, res) {
	var jsonArray = [];
	var path = getDirname() + '/public/docs/lessons';

	// open the projects directory
	fs.readdir(path, function (err, files) {
		if(err) { // if the directory is not found
			res.stats(404).end();
		}

		for (var i = 0; i < files.length; i++) {
			if(files[i].endsWith(".md")) {
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

		res.status(200).send(jsonArray);
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
		if (err2) res.status(404).end();
		var content = marked(data); // parse the data as markdown
		// console.log(marked('I am using __markdown__.'));
		jsonArray.push({'title' : t, 'content' : content});
		res.status(200).send(jsonArray);
	});
})

.get('/posts', function (req, res) {
	var posts = poet.helpers.getPosts(0, 2);
	res.status(200).send(posts);
})


.use('/counters', countersRoutes)
.use('/datamining', dataminingRoutes)
.use('/api/365', citations365Routes);
// Handle inexistant routes
// .use(function (req, res) {
// 	// res.header("Access-Control-Allow-Origin", "*");
// 	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	// next(); // func param
//
//     res.render('includes/404', {title: '404'});
// });


// listen port => server start
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port: " + app.get('port'));
});

// PROTOTYPES
// ----------
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

/**
  * Return the current folder path
  * @return {string} the current folder path
  */
function getDirname() {
	return __dirname || '';
}
