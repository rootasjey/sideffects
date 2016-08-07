// ----------------
// COUNTERS MODULE
// ----------------

var express = require('express');
var router = express.Router();

router.get('/', function (req, res)  {
	res.render('../public/modules/counters/counters');
})
// Save the json array to a local file (data.json)
.post('/save', function (req, res) {
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
.get('/load', function (req, res) {
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
});

module.exports = router;
