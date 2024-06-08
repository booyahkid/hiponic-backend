const express = require('express');

const iotController = require('../controllers/iotController');

const router = express.Router();

router.get('/device/ph', iotController.getPh);
router.get('/device/humidity', iotController.getHumidity);
router.get('/device/tds', iotController.getTDS);
router.get('/device/temp', iotController.getTemp);
router.get('/device/allSensor', iotController.getAllSensor);
module.exports = router;