const express = require('express');
const app = express();

const alarmMessageRoutes = require('./routes/alarmMessage');
const alarmRoutes = require('./routes/alarm');
const alarmsRoutes = require('./routes/alarms');
const messagesRoutes = require('./routes/messages');
const songsRoutes = require('./routes/songs');
const speakerRoutes = require('./routes/speaker');
const userRoutes = require('./routes/user');

app.use(express.json());

app.use('/api/alarm', alarmRoutes);
app.use('/api/alarmmessage', alarmMessageRoutes);
app.use('/api/alarms', alarmsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/speaker', speakerRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
