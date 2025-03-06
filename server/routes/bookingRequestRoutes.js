const express = require('express');
const {
  createBookingRequest,
  getAllBookingRequests,
  assignConsultant,
  updateBookingRequestStatus,
  getBookingsByConsultantAndDate,
  getConsultantBookings,
  getCustomerBookings
} = require('../controllers/bookingRequestController');
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/', createBookingRequest);
router.get('/', getAllBookingRequests);
router.put('/:id/assign-consultant', assignConsultant); 
router.put('/:id/status', updateBookingRequestStatus);
router.get('/booked-times', getBookingsByConsultantAndDate);
router.get("/my-bookings",authenticate, authorize(["Consultant"]),getConsultantBookings);
router.get("/history-bookings",authenticate, authorize(["Customer"]),getCustomerBookings);



module.exports = router;
