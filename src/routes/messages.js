const router = require('express').Router();
const Controllers = require('../controllers/messages');

router.get('/', Controllers.getMessages);

module.exports = router;
