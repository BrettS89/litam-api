const mongoose = require('mongoose');
const socket = require('socket.io');
const keys = require('./src/config');
const app = require('./src');
const socketConnection = require('./src/socket');

mongoose.connect(keys.mongoURI, () => {
  console.log('Connected to mongodb');
});

const server = app.listen(keys.port, () => {
  console.log('Server listening on port', keys.port);
});

const io = socket(server);

socketConnection(io);

global.io = io;
