const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const ConsultantController = require('../controllers/ConsultantController');
const { authenticate, authorize } = require('../middlewares/AuthMiddleware');

// Get all consultants
router.get('/', ConsultantController.getAllConsultants);

// Get consultant by ID
router.get('/:id', authenticate, ConsultantController.getConsultantById);

// Get available consultants
router.get('/consultants/available', authenticate, ConsultantController.updateBookingRequestConsultant);

// Create a new consultant (Admin only)
router.post('/', authenticate, authorize(['Admin']), ConsultantController.createConsultant);

// Update consultant (Admin only)
router.put('/:id', authenticate, authorize(['Admin']), ConsultantController.updateConsultant);

// Delete consultant (Admin only)
router.delete('/:id', authenticate, authorize(['Admin']), ConsultantController.deleteConsultant);

// Add rating to consultant (Validation added)
router.post(
    '/:id/rate',
    authenticate,
    authorize(['Customer']),
    [
        body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
        body('comment').optional().isString().withMessage('Comment must be a string')
    ],
    ConsultantController.addRating
);

// Reset password for consultant (Admin only)
router.post('/:id/reset-password', authenticate, authorize(['Admin']), ConsultantController.resetPassword);

module.exports = router;
