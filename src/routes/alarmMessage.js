import express from 'express';
import Controllers from '../controllers/alarmMessage/index.js'
const router = express.Router();

router.post('/create', Controllers.createAlarmMessage);
router.patch('/get', Controllers.getAlarmMessage);

export default router;
