const mongoose = require('mongoose');
const { Schema } = mongoose;
const paymentSchema = new Schema({
    bookingRequestID: { type: mongoose.Schema.Types.ObjectId, ref: "BookingRequest", required: true },
    method: { type: String, enum: ["Credit Card", "Cash", "Online"], required: true },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], required: true },
    transactionDate: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("Payment", paymentSchema);
  