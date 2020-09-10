import express from 'express';
import Controllers from '../controllers/alarm/index.js';
const router = express.Router();

router.post('/create', Controllers.createAlarm);

export default router;
