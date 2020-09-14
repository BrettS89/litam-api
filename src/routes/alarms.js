const router = require('express').Router();
const Controllers = require('../controllers/alarms');

router.get('/', Controllers.getAlarms);
router.get('/myalarms', Controllers.getMyAlarms);

module.exports = router;
