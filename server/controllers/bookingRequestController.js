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
      .populate('serviceID')
      .populate('consultantID'); // Renamed from therapistID
    res.status(200).json(bookingRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.assignConsultant = async (req, res) => {
  try {
    const { consultantID } = req.body; // Renamed field
    const bookingRequest = await BookingRequest.findByIdAndUpdate(
      req.params.id,
      { consultantID },
      { new: true }
    );

    if (!bookingRequest) return res.status(404).json({ message: 'Booking Request not found' });

    await logUserActivity("Assigned Consultant")(req, res, () => {});
    res.status(200).json(bookingRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.assignService = async (req, res) => {
  try {
    const { serviceId } = req.body;
    const bookingRequest = await BookingRequest.findByIdAndUpdate(
      req.params.id,
      { serviceId },
      { new: true }
    );
    if (!bookingRequest) return res.status(404).json({ message: 'Booking Request not found' });
    await logUserActivity("Assigned Service")(req, res, () => {});
    res.status(200).json(bookingRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBookingRequestStatus = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug

    const bookingRequest = await BookingRequest.findById(req.params.id);
    if (!bookingRequest) return res.status(404).json({ message: 'Booking Request not found' });

    const validTransitions = {
      "Pending": "Confirmed",
      "Confirmed": "Completed",
      "Completed": "Cancelled",
    };

    const currentStatus = bookingRequest.status;
    const newStatus = req.body.status;

    if (!newStatus) return res.status(400).json({ message: "Status is required" });

    if (validTransitions[currentStatus] !== newStatus) {
      return res.status(400).json({ message: `Invalid status transition from '${currentStatus}' to '${newStatus}'` });
    }

    bookingRequest.status = newStatus;
    await bookingRequest.save();

    await logUserActivity("Booking Request Status Updated")(req, res, () => {});
    res.status(200).json(bookingRequest);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: error.message });
  }
};
