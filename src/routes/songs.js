const router = require('express').Router();
const Controllers = require('../controllers/songs');

router.get('/:term', Controllers.getSongs);

module.exports = router;
