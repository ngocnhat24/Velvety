const express = require('express');
const { createService, getAllServices } = require('../controllers/serviceController');
const router = express.Router();

router.post('/', createService); // Create a new service
router.get('/', getAllServices); // Get all services

module.exports = router;
