const express = require('express');
const {
  createBookingRequest,
  getAllBookingRequests,
  assignConsultant,
  updateBookingRequestStatus
} = require('../controllers/bookingRequestController');

const router = express.Router();

router.post('/', createBookingRequest);
router.get('/', getAllBookingRequests);
router.put('/:id/assign-consultant', assignConsultant); // Updated therapist → consultant
router.put('/:id/status', updateBookingRequestStatus);

module.exports = router;
