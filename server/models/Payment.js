const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
  bookingRequestID: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "BookingRequest", 
    required: true 
  },
  method: { 
    type: String, 
    enum: ["Credit Card", "Cash", "Online"], 
    required: true 
  },
  paymentStatus: { 
    type: String, 
    enum: ["Pending", "Paid", "Failed"], 
    required: true 
  },
  transactionDate: { 
    type: Date, 
    default: Date.now,
    validate: {
      validator: function(value) {
        return value <= Date.now(); // Ensures the date isn't in the future
      },
      message: "Transaction date cannot be in the future"
    }
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
