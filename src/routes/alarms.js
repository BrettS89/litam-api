import express from 'express';
import Controllers from '../controllers/alarms/index.js';
const router = express.Router();

router.get('/', Controllers.getAlarms);

export default router;
