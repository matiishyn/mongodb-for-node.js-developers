var express = require('express'),
	app = express(),
	cons = require('consolidate');

app

	.engine('html', cons.swig)
	.set('view engine', 'html')
	.set('views', __dirname)

	.get('/', function(req, resp) {
		resp.render('4-tmpl', {name: 'Ivan'});
	})
	.get('*', function(req, resp) {
		resp.status(404).send('Not found');
	})
	.listen(8080);

console.log('Express on 8080');