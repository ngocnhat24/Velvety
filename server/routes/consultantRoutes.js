const express = require('express');
const router = express.Router();
const consultantController = require('../controllers/consultantController');

// choose a consultant
router.post('/select', consultantController.selectConsultant);
router.get('/', consultantController.getConsultants);
router.get('/:id', consultantController.getConsultantById);
router.post('/', consultantController.createConsultant);
router.put('/:id', consultantController.updateConsultant);
router.delete('/:id', consultantController.deleteConsultant);

module.exports = router;