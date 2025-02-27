const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingRequestSchema = new Schema({
    serviceID: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Added customer reference
    date: { type: Date, required: true },
    time: { type: String, required: true },
    consultantID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Renamed from therapistID
    status: { type: String, enum: ["Pending", "Confirmed", "Completed", "Cancelled"], required: true },
    isConsultantAssignedByCustomer: { type: Boolean, default: false },
});

module.exports = mongoose.model("BookingRequest", bookingRequestSchema);
