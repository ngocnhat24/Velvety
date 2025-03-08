const express = require('express');
const { createPayment, getPaymentByBookingRequest } = require('../controllers/PaymentController');
const { authenticate } = require("../middlewares/AuthMiddleware"); // Authentication middleware

const router = express.Router();

router.post('/', authenticate, createPayment); // Secure the endpoint
router.get('/:bookingRequestId', authenticate, getPaymentByBookingRequest); 

module.exports = router;
