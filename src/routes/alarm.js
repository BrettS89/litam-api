const router = require('express').Router();
const Controllers = require('../controllers/alarm');

router.post('/create', Controllers.createAlarm);
router.patch('/toggleactive/:id', Controllers.toggleActive);
router.delete('/:alarmId', Controllers.deleteAlarm);

module.exports = router;
