const Payment = require('../models/Payment');
const BookingRequest = require('../models/BookingRequest');

exports.createPayment = async (req, res) => {
  try {
    const { bookingRequestID, method, paymentStatus } = req.body;

    // Validate required fields
    if (!bookingRequestID || !method || !paymentStatus) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if BookingRequest exists
    const bookingRequest = await BookingRequest.findById(bookingRequestID);
    if (!bookingRequest) {
      return res.status(404).json({ error: "Booking request not found" });
    }

    // Create and save the payment
    const payment = await Payment.create({ bookingRequestID, method, paymentStatus });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentByBookingRequest = async (req, res) => {
  try {
    const payment = await Payment.findOne({ bookingRequestID: req.params.bookingRequestId });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
