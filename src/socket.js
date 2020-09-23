const Speaker = require('./models/Speaker');
const getMyAlarms = require('./controllers/speaker/getAlarms');

module.exports = listenForConnection = io => {
  io.on('connection', async (socket) => {
    console.log('made socket connection');
    const givenId = socket.handshake.query.givenId;
    const userId = socket.handshake.query.userId;

    Speaker.findOne({ givenId }).then(async speaker => {
      speaker.socketId = socket.id;
      speaker.save();
      const myAlarms = await getMyAlarms(givenId, userId);
      io.to(socket.id).emit('SET_ALARMS', { myAlarms });
    });

    socket.on('disconnect', () => {
      socket.disconnect();
      console.log('a socket was disconnected');
    });
  });
};
