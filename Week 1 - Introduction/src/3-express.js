const express = require('express'),
  app = express();

app.get('/', function (req, resp) {
  resp.send('Hello');
});

app.use((req, res) => {
  res.sendStatus(404);
});

const server = app.listen(8080, () => {
  const port = server.address().port;
  console.log('Listening on port %s', port);
});
