const express = require('express');

const predictController = require('../controllers/predictController');

const router = express.Router();

router.post('/plant/condition', predictController.postPredictHandler);

module.exports = router;