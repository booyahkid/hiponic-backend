const express = require('express');
const router = express.Router();
const landController = require('../controllers/landController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/', authenticateToken, landController.addLand);
router.put('/:id', authenticateToken, landController.changeLandName);
router.delete('/:id', authenticateToken, landController.deleteLand);
router.get('/:id', authenticateToken, landController.getLand);
router.get('/', authenticateToken, landController.getAllLands);

module.exports = router;
