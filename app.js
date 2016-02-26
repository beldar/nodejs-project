'use strict';

const config      = require('./config'),
      express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      db          = mongoose.connection,
      webserver   = require('./routes/webserver'),
      api         = require('./routes/api');


mongoose.connect('mongodb://localhost/nws');

db.on('error', (err) => console.error('Connection error: ', err));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/', webserver());
app.use('/api', api());

app.listen(config.PORT, () => {
  console.log(`Server listening on localhost:${config.PORT}`);
});
