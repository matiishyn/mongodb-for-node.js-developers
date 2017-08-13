const express = require('express');
const engines = require('consolidate');
const app = express();

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function (req, resp) {
  resp.render('hello', {name: 'Templates'});
});

app.use((req, res) => {
  res.sendStatus(404);
});

const server = app.listen(8080, () => {
  const port = server.address().port;
  console.log('Listening on port %s', port);
});
