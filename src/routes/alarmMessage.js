const router = require('express').Router();
const Controllers = require('../controllers/alarmMessage');

router.post('/create', Controllers.createAlarmMessage);
router.patch('/get', Controllers.getAlarmMessage);

module.exports = router;
