const express = require('express');
const router = express.Router();
const consultantController = require('../controllers/consultantController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Get all consultants
router.get('/', authenticate, consultantController.getAllConsultants);

// Get consultant by ID
router.get('/:id', authenticate, consultantController.getConsultantById);

// Update consultant profile
router.put('/:id', authenticate, authorize(['Consultant']), consultantController.updateConsultant);

// Delete consultant (Admin only)
router.delete('/:id', authenticate, authorize(['Admin']), consultantController.deleteConsultant);

// Add rating to consultant
router.post('/:id/rate', authenticate, authorize(['Customer']), consultantController.addRating);

module.exports = router;
