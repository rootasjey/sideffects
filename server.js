//WWW.SIDEFFECT.FR
//--------------------
//by Jeremie Corpinot
//http://github.com/rootasjey

//-----------------------------
//----------requires-----------
//-----------------------------
var express			= require('express'), // web dev framework
	stylus			= require('stylus'), // css pre-compiler
	morgan			= require('morgan'),		// loggin middleware
	nib				= require('nib'),           // Stylus utilities
    http			= require('http'),
    path			= require('path'),
	fs				= require('fs'),				// file stream
	bodyParser		= require('body-parser'),
	methodOverride	= require('method-override'),
	jf				= require('jsonfile'),
	// jsdom			= require('jsdom'),
	Poet			= require('poet'),
	marked 			= require('marked'),
	pug				= require('pug');

//var port = process.env.port || 8080;

// ---------------
// ----- APP -----
// ---------------
var app = express();
// ----------------
function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib());
}

// ---------------------------------------
// Set the default views folder
// containing templates
// and the static folder
// ---------------------------------------
app.set('port', process.env.PORT || 3003);
app.set('views', getDirname() + '/views');	// folder templates
app.set('view engine', 'pug');			// template engine
app.use(morgan('dev'));					// logging output (will log incoming requests to the console)
app.use(bodyParser());
app.use(bodyParser.json());				// to suport JSON-encoded bodies
app.use(bodyParser.urlencoded({			// to suport URL-encoded bodies
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


// -------------------------------
// -----------ROUTING ------------
// -------------------------------
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
			res.send(404);
		}

		for (var i = 0; i < files.length; i++) {
			if(files[i].endsWith(".json")){
				// build the file path
				var pathFile = path + '/' + files[i];
				var fileContent = jf.readFileSync(pathFile);
				jsonArray.push(fileContent);
			}
			else continue;
		}

		res.send(200, jsonArray);
	});
})

// Show all lessons
.get('/lessons', function (req, res) {
	var jsonArray = [];
	var path = getDirname() + '/public/docs/lessons';

	// open the projects directory
	fs.readdir(path, function (err, files) {
		if(err) {
			// if the directory is not found
			res.send(404);
		}

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

.get('/posts', function (req, res) {
	 var posts = poet.helpers.getPosts(0, 2);

	 res.send(200, posts);
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
	var file = getDirname() + '/public/modules/counters/data.json';

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
	var file = getDirname() + '/public/modules/counters/data.json';

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
	var file = getDirname() + '/public/modules/counters/data.json';

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
	var file = getDirname() + '/public/modules/counters/data.json';

	var obj = jf.readFileSync(file);
	obj[req.query.name] = {"total": 0};


	// Open and write in the file
	jf.writeFileSync(file, obj);

	res.send(200);
})

// END COUNTERS MODULE
// -------------------

// -----------------
// DATAMINING MODULE
// -----------------
.get('/datamining', function (req, res) {
	res.render('../public/modules/datamining/index');
})

.get('/datamining/rapport', function (req, res) {
	var path = getDirname() + '/public/modules/datamining/rapport.md';
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
.use(function (req, res) {
	// res.header("Access-Control-Allow-Origin", "*");
	// res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// next(); // func param

    res.render('includes/404', {title: '404'});
});


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
