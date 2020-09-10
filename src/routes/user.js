const router = require('express').Router();
const Controllers = require('../controllers/user');

router.get('/isloggedin', Controllers.isLoggedIn);
router.patch('/login', Controllers.login);
router.post('/register', Controllers.register);

module.exports = router;
