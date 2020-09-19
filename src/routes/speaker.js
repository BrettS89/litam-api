const router = require('express').Router();
const Controllers = require('../controllers/speaker');

router.get('/myalarms/:userId/', Controllers.getMyAlarms);

module.exports = router;
