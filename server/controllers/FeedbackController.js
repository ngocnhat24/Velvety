const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  try {
    const { consultantRate, consultantComment, serviceRate, serviceComment, bookingRequestId } = req.body;

    // Kiểm tra xem booking request có tồn tại và hoàn thành chưa
    const bookingRequest = await BookingRequest.findById(bookingRequestId);
    if (!bookingRequest) {
      return res.status(404).json({ message: "Booking request not found" });
    }

    if (bookingRequest.status !== "complete") {
      return res.status(400).json({ message: "Only completed bookings can receive feedback" });
    }

    const { serviceId, consultantId } = bookingRequest;

    let feedbacks = [];

    // Tạo feedback cho Consultant nếu có rating
    if (consultantRate && consultantRate >= 1 && consultantRate <= 5) {
      const consultantFeedback = await Feedback.create({
        rate: consultantRate,
        comment: consultantComment || "",
        bookingRequestId,
        consultantId,
        type: "consultant"
      });
      feedbacks.push(consultantFeedback);
    }

    // Tạo feedback cho Service nếu có rating
    if (serviceRate && serviceRate >= 1 && serviceRate <= 5) {
      const serviceFeedback = await Feedback.create({
        rate: serviceRate,
        comment: serviceComment || "",
        bookingRequestId,
        serviceId,
        type: "service"
      });
      feedbacks.push(serviceFeedback);
    }

    res.status(201).json({ message: "Feedback submitted successfully", feedbacks });
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

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("bookingRequestId", "customerId serviceId consultantId");
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAverageServiceRating = async (req, res) => {
  try {
    const result = await Feedback.aggregate([
      {
        $match: { serviceId: { $exists: true, $ne: null } } // Chỉ lấy feedback có serviceId
      },
      {
        $group: {
          _id: "$serviceId",
          averageRating: { $avg: "$rate" },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAverageConsultantRating = async (req, res) => {
  try {
    const result = await Feedback.aggregate([
      {
        $match: { consultantId: { $exists: true, $ne: null } } // Chỉ lấy feedback có consultantId
      },
      {
        $group: {
          _id: "$consultantId",
          averageRating: { $avg: "$rate" },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
