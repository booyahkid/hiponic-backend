
const express = require('express');

const controllers = require('../controllers/edgeController');

const router = express.Router();

router.get('/device/data/ph', controllers.getPh);
router.get('/device/data/humidity', controllers.getHumidity);
router.get('/device/data/tds', controllers.getTDS);

module.exports = router;