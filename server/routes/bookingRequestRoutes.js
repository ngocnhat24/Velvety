const express = require('express');
const { createBookingRequest, getAllBookingRequests, updateBookingRequestStatus } = require('../controllers/bookingRequestController');
const router = express.Router();

router.post('/', createBookingRequest); // Create a new booking request
router.get('/', getAllBookingRequests); // Get all booking requests
router.put('/:id/status', updateBookingRequestStatus); // Update booking request status

module.exports = router;
