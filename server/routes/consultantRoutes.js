const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const consultantController = require('../controllers/consultantController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Get all consultants
router.get('/', consultantController.getAllConsultants);

// Get consultant by ID
router.get('/:id', authenticate, consultantController.getConsultantById);

// Get available consultants
router.get('/consultants/available', authenticate, consultantController.getAvailableConsultants);

// Create a new consultant (Admin only)
router.post('/', authenticate, authorize(['Admin']), consultantController.createConsultant);

// Update consultant (Admin only)
router.put('/:id', authenticate, authorize(['Admin']), consultantController.updateConsultant);

// Delete consultant (Admin only)
router.delete('/:id', authenticate, authorize(['Admin']), consultantController.deleteConsultant);

// Add rating to consultant (Validation added)
router.post(
    '/:id/rate',
    authenticate,
    authorize(['Customer']),
    [
        body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
        body('comment').optional().isString().withMessage('Comment must be a string')
    ],
    consultantController.addRating
);

// Reset password for consultant (Admin only)
router.post('/:id/reset-password', authenticate, authorize(['Admin']), consultantController.resetPassword);

module.exports = router;
