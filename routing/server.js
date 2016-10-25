// More routing examples: https://expressjs.com/en/guide/routing.html
var express = require('express');
var app = express();

// Define virtual path '/' that links to ./public
app.use('/',express.static('public'));

// '/index.html' -> './public/index.html'
app.get('/index.html', function(req,res) {
  res.sendFile(__dirname + '/public/welcome.html');
});

app.get('/', function(req,res) {
  res.redirect('/index.html');
});

app.get('/index.htm?', function(req,res) {
  res.redirect('/index.html')
});

app.get(/.*fly$/, function (req, res) {
  res.status(404).send(req.url + ': Coming Soon!');
});

app.get(/.*/, function (req, res) {
  res.status(404).send(req.url + ': Not Supported!');
});

var server = app.listen(8099, function () {
  var port = server.address().port;
  console.log('Server listening at ', port);
});
