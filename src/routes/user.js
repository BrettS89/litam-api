import express from 'express';
import Controllers from '../controllers/user/index.js';
const router = express.Router();

router.get('/isloggedin', Controllers.isLoggedIn);
router.patch('/login', Controllers.login);
router.post('/register', Controllers.register);

export default router;
