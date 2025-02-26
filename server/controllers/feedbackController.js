const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  try {
    const { rate, comment, bookingRequestId } = req.body;

    if (!rate || !bookingRequestId) {
      return res.status(400).json({ message: "Rate and Booking Request ID are required" });
    }

    const feedback = await Feedback.create({ rate, comment, bookingRequestId });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: "Error creating feedback", error });
  }
};

exports.getFeedbackByBooking = async (req, res) => {
  try {
    const feedback = await Feedback.find({ bookingRequestId: req.params.bookingRequestId });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
