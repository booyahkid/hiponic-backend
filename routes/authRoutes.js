//authRoutes.js

const express = require('express');
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticateToken, authController.logout);
router.put('/change-username', authController.changeUsername);
router.put('/change-password', authController.changePassword);


module.exports = router;
