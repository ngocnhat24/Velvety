const BookingRequest = require('../models/BookingRequest');

exports.createBookingRequest = async (req, res) => {
  try {
    const bookingRequest = await BookingRequest.create(req.body);
    res.status(201).json(bookingRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBookingRequests = async (req, res) => {
  try {
    const bookingRequests = await BookingRequest.find()
      .populate('serviceId')
      .populate('therapistId');
    res.status(200).json(bookingRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBookingRequestStatus = async (req, res) => {
  try {
    const bookingRequest = await BookingRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!bookingRequest) return res.status(404).json({ message: 'Booking Request not found' });
    res.status(200).json(bookingRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
