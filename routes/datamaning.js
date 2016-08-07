var express = require('express');
var router = express.Router();

/**
  * Return the current folder path
  * @return {string} the current folder path
  */
function getDirname() {
	return __dirname || '';
}

// -----------------
// DATAMINING MODULE
// -----------------
router.get('/', function (req, res) {
	res.render('../public/modules/datamining/index');
})

.get('/rapport', function (req, res) {
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


module.exports = router;
