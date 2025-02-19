// customerRoutes.js - Routes for customer services and bookings
const express = require('express');
const { getAllServices, createBooking, getCustomerBookings } = require('../controllers/customerController');
const authMiddleware = require('../middlewares/authMiddleware');

const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Route to get all services
router.get('/services', getAllServices);

// Route to create a booking (requires authentication)
router.post('/booking', authenticate, createBooking);

// Route to get all customer bookings (requires authentication)
router.get('/bookings', authenticate, getCustomerBookings);

module.exports = router;