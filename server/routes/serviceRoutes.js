const express = require('express');
const { createService, getAllServices, updateService, deleteService } = require('../controllers/serviceController');
const router = express.Router();

router.post('/', createService); // Create a new service
router.get('/', getAllServices); // Get all services
router.put('/:id', updateService); 
router.delete('/:id', deleteService);
module.exports = router;
