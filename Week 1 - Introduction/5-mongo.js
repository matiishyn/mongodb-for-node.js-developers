var express = require('express'),
	app = express(),
	cons = require('consolidate'),
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server;

var mongoclient = new MongoClient(new Server('localhost', 27017, {'native_parser': true}));

var db = mongoclient.db('course'); // use 'course' db

app
	.engine('html', cons.swig)
	.set('view engine', 'html')
	.set('views', __dirname)

	.get('/', function(req, resp) {
		db.collection('hello').findOne({}, function(err, doc) {
			resp.render('4-tmpl', doc);
		});
		// check in mongo shell
		// db.hello.find()
	});


mongoclient.open(function(err, mongoclient) {
	app.listen(8080);
	console.log('Express on 8080');
});
