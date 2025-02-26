const express = require('express');
const { createFeedback, getFeedbackByBooking } = require('../controllers/feedbackController');
const { authenticate } = require('../middlewares/authMiddleware'); // Require authentication

const router = express.Router();

router.post('/', authenticate, createFeedback); // Require authentication to create feedback
router.get('/:bookingRequestId', authenticate, getFeedbackByBooking); // Secure route

module.exports = router;
