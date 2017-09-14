var http = require('http');

var server = http.createServer(function (req, resp) {
  resp.writeHead(200, {'Content-Type': 'text/plain'});
  resp.end("Hello World\n");
});

server.listen(8000);
console.log('Server is running on port 8000');
