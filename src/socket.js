const Speaker = require('./models/Speaker');

module.exports = listenForConnection = io => {
  io.on('connection', async (socket) => {
    console.log('made socket connection');
    const givenId = socket.handshake.query.givenId;

    const speaker = Speaker.findOne({ givenId }).then(speaker => {
      speaker.socketId = socket.id;
      speaker.save();
    });


    // io.to(socket.id).emit('test', 'Just for you bud');


    socket.on('disconnect', () => {
      socket.disconnect();
      console.log('a socket was disconnected');
    });
  });
};
