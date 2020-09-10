const router = require('express').Router();
const Controllers = require('../controllers/alarms');

router.get('/', Controllers.getAlarms);

module.exports = router;
