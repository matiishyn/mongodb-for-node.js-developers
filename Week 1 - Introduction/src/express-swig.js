var express = require('express'),
  app = express(),
  cons = require('consolidate'); // set of libraries with template engines for express

app

  .engine('html', cons.swig) // use Swig template engine
  .set('view engine', 'html')
  .set('views', __dirname + '/views') // where to look for views

  .get('/', function (req, resp) {
    resp.render('express-swig', {name: 'Ivan'});
  })
  .get('*', function (req, resp) {
    resp.status(404).send('Not found');
  })
  .listen(8080);

console.log('Express on 8080');
