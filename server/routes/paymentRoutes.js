const express = require('express');
const { createPayment, getPaymentByBookingRequest } = require('../controllers/paymentController');
const router = express.Router();

router.post('/', createPayment); // Create a new payment
router.get('/:bookingRequestId', getPaymentByBookingRequest); // Get payment by booking request ID

module.exports = router;
