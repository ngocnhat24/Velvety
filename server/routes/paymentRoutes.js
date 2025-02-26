const express = require('express');
const { createPayment, getPaymentByBookingRequest } = require('../controllers/paymentController');
const { authenticate } = require("../middlewares/authMiddleware"); // Authentication middleware

const router = express.Router();

router.post('/', authenticate, createPayment); // Secure the endpoint
router.get('/:bookingRequestId', authenticate, getPaymentByBookingRequest); 

module.exports = router;
