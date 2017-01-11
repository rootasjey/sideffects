const bodyParser  = require('body-parser');
const express     = require('express');
const fetch       = require('node-fetch');
const http        = require('http');
const jsonfile    = require('jsonfile');
const jsdom	      = require('jsdom');
const app         = express();

app.use(require('morgan')('short'));
app.use(bodyParser.json());
app.use(express.static('public')); // un-comment for production

// require('./routes/hmr')(app); // HMR module - comment for production
require('./routes/deamons')({fetch:fetch, jsonfile:jsonfile, jsdom:jsdom});

app
.get('/', function(req, res) {
  let directory = __dirname || '';
  res.sendFile(directory + '/index.html');
})
.use('/quotes', require('./routes/quotes'))
.use('/unsplash', require('./routes/unsplash'));

var server = http.createServer(app);
server.listen(process.env.PORT || 3000, function() {
  console.log('Listening on %j', server.address());
  console.log('PORT:' + process.env.PORT);
});
// if (require.main === module) {
//   var server = http.createServer(app);
//   server.listen(process.env.PORT || 3000, function() {
//     console.log('Listening on %j', server.address());
//     console.log('PORT:' + process.env.PORT);
//   });
// }
// http.createServer(app).listen(app.get('port') || 3000, function(){
//   console.log("Express server listening on port: " + app.get('port'));
// });