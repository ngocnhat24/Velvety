const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingRequestSchema = new Schema({
    serviceID: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Added customer reference
    date: { type: Date, required: true },
    time: { type: String, required: true },
    consultantID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Renamed from therapistID
    status: { type: String, enum: ["Paid", "Checkin", "Completed", "Rated", "Cancelled"], required: true },
    isConsultantAssignedByCustomer: { type: Boolean, default: false },
    
});

bookingRequestSchema.index({ date: 1, time: 1, consultantID: 1 }, { unique: true });

module.exports = mongoose.model("BookingRequest", bookingRequestSchema);
