// More routing examples: https://expressjs.com/en/guide/routing.html
var express = require('express');
var app = express();

// Define virtual path '/' that links to ./public
app.use('/',express.static('public'));
//Task 3
app.use('/',express.static('2016'));
app.use('/',express.static('2017'));

// '/index.html' -> './public/welcome.html'
app.get('/index.html', function(req,res) {
  //Task 2
  console.log("User-agent : " + req.headers['user-agent']);
  if (req.headers['user-agent'].match(/.*Mobi?/)) {
    res.redirect('/mobifly');
  } else {
    res.sendFile(__dirname + '/public/welcome.html');
  }
});

app.post('/index.html', function(req,res) {
  //Task 2
  console.log("User-agent : " + req.headers['user-agent']);
  if (req.headers['user-agent'].match(/.*Mobi?/)) {
    res.redirect('/mobifly');
  } else {
    res.sendFile(__dirname + '/public/welcome.html');
  }
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

//Task 3
app.get(/201.*$/, function (req, res) {
  res.sendFile(__dirname + req.url);
});

//Task 4
app.get('/simpleinterest', function (req, res) {

  function SimpleInterest(P,i,t) {
    this.principal = P;
    this.rate = i;
    this.time = t;
    this.interest = P * i * t;
  }

  var obj = new SimpleInterest(req.query.p,
		               req.query.r,
		               req.query.t);

  if(req.query.format == 'html'){
    res.render('simpleinterest.ejs', obj);
  } else {
    res.type('json');
    res.send(JSON.stringify(obj));
  }
});

app.get(/.*/, function (req, res) {
  res.status(404).send(req.url + ': Not Supported!');
});

var server = app.listen(8099, function () {
  var port = server.address().port;
  console.log('Server listening at ', port);
});
