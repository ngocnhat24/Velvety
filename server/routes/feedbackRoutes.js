const express = require('express');
const { createFeedback, getFeedbackByBooking } = require('../controllers/feedbackController');
const router = express.Router();

router.post('/', createFeedback); // Create a new feedback
router.get('/:bookingRequestId', getFeedbackByBooking); // Get feedback by booking request ID

module.exports = router;
