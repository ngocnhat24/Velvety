const mongoose = require('mongoose');
const { Schema } = mongoose;
const feedbackSchema = new Schema({
  rate: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, maxlength: 500 }, // Added limit to prevent long comments
  createdDate: { type: Date, default: Date.now },
  bookingRequestId: { type: mongoose.Schema.Types.ObjectId, ref: "BookingRequest", required: true } // Fixed naming
});
  
  module.exports = mongoose.model("Feedback", feedbackSchema);
  