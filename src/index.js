const express = require('express');
const app = express();

const alarmMessageRoutes = require('./routes/alarmMessage');
const alarmRoutes = require('./routes/alarm');
const alarmsRoutes = require('./routes/alarms');
const userRoutes = require('./routes/user');

app.use(express.json());

app.use('/api/alarm', alarmRoutes);
app.use('/api/alarmmessage', alarmMessageRoutes);
app.use('/api/alarms', alarmsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
