var express = require('express'),
  app = express(),
  engines = require('consolidate'),
  MongoClient = require('mongodb').MongoClient;
// assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


MongoClient.connect('mongodb://localhost:27017/video', (err, db) => {
  app.get('/', function (req, res) {

    // Find one document in our collection
    db.collection('hello').findOne({}, function (err, doc) {
      if (err) throw err;
      res.render('hello', doc);
    });
  });

  const server = app.listen(8080, () => {
    const port = server.address().port;
    console.log('Listening on port %s', port);
  });

});
