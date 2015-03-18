var express = require('express'),
	app = express();

app
	.get('/', function(req, resp) {
		resp.send('Hello');
	})
	.get('*', function(req, resp) {
		resp.status(404).send('Not found');
	})
	.listen(8080);

console.log('Express on 8080');