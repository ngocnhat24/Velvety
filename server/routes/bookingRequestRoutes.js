const express = require('express');
const {
  createBookingRequest,
  getAllBookingRequests,
  assignConsultant,
  updateBookingRequestStatus,
  getBookingsByConsultantAndDate,
  getConsultantBookings
} = require('../controllers/bookingRequestController');
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/', createBookingRequest);
router.get('/', getAllBookingRequests);
router.put('/:id/assign-consultant', assignConsultant); 
router.put('/:id/status', updateBookingRequestStatus);
router.get('/booked-times', getBookingsByConsultantAndDate);
router.get("/my-bookings",authenticate, getConsultantBookings);


module.exports = router;
