import express from 'express';
const app = express();

import alarmMessageRoutes from './routes/alarmMessage.js';
import alarmRoutes from './routes/alarmMessage.js';
import alarmsRoutes from './routes/alarms.js';
import userRoutes from './routes/user.js';

app.use(express.json());

app.use('/api/alarm', alarmRoutes);
app.use('/api/alarmmessage', alarmMessageRoutes);
app.use('/api/alarms', alarmsRoutes);
app.use('/api/user', userRoutes);

export default app;
