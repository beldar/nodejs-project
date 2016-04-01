'use strict';

const config      = require('./config'),
      express     = require('express'),
      app         = express(),
      bodyParser  = require('body-parser'),
      mongoose    = require('mongoose'),
      db          = mongoose.connection,
      webserver   = require('./routes/webserver'),
      api         = require('./routes/api'),
      server      = app.listen(config.PORT, () => {console.log(`Server listening on localhost:${config.PORT}`)}),
      io          = require('socket.io')(server);


mongoose.connect('mongodb://localhost/nws');

db.on('error', (err) => console.error('Connection error: ', err));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/', webserver());
app.use('/api', api());

let connected = 0;
let clicks = 0;

const sendUpdate = () => {
  io.emit('online', {data: connected});
};

io.on('connection', function(socket){
  connected++;
  sendUpdate();
  socket.emit('clicks', {clicks: clicks});

  socket.on('disconnect', () => {
    connected--;
    sendUpdate();
  });

  socket.on('click', () => {
    clicks++;
    io.emit('clicks', {clicks: clicks});
  });
});
