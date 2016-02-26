'use strict';

const config  = require('./config'),
      express = require('express'),
      app     = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {message: 'Hello World'});
});

app.listen(config.PORT, () => {
  console.log(`Server listening on localhost:${config.PORT}`);
});
