const router = require('express').Router();
const Controllers = require('../controllers/speaker');

router.get('/myalarms/:userId/', Controllers.getMyAlarms);
router.get('/alarmmessage/:alarmId', Controllers.getAlarmMessage);
router.patch('/stopalarm', Controllers.stopAlarm);

module.exports = router;
