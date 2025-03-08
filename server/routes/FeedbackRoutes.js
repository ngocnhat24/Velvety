const express = require('express');
const { createFeedback, getFeedbackByBooking } = require('../controllers/FeedbackController');
const { authenticate } = require('../middlewares/AuthMiddleware'); // Require authentication

const router = express.Router();

router.post('/', authenticate, createFeedback); // Require authentication to create feedback
router.get('/:bookingRequestId', authenticate, getFeedbackByBooking); // Secure route

module.exports = router;
