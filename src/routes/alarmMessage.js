const router = require('express').Router();
const Controllers = require('../controllers/alarmMessage');

router.post('/create', Controllers.createAlarmMessage);
router.get('/:alarmId', Controllers.getAlarmMessage);
router.patch('/stop', Controllers.stopAlarm);

module.exports = router;
