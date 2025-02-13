const express = require('express');
const router = express.Router();
const consultantController = require('../controllers/consultantController');

// choose a consultant
router.post('/select', consultantController.selectConsultant);

module.exports = router;