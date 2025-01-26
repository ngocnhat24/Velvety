const mongoose = require('mongoose');
const { Schema } = mongoose;
const feedbackSchema = new Schema({
    rate: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdDate: { type: Date, default: Date.now },
    bookingRequestID: { type: mongoose.Schema.Types.ObjectId, ref: "BookingRequest", required: true },
  });
  
  module.exports = mongoose.model("Feedback", feedbackSchema);
  