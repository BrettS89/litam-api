const router = require('express').Router();
const Controllers = require('../controllers/alarm');

router.post('/create', Controllers.createAlarm);

module.exports = router;
