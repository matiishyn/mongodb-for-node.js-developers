var express = require('express'),
	app = express();

app
	.get('/:name', function(req, resp) {
	var name = req.params.name,
        search = req.query.search;
    resp.send('Hello, '+name+'. Search: '+ search);
	})
	
	.listen(8080);
// http://localhost:8080/ivan?search=test =>
// Hello, ivan. Search: test