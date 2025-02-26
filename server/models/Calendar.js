const mongoose = require('mongoose');

const CalendarSchema = new mongoose.Schema({
    title: { type: String, required: true },
    startTime: { type: Date, required: true },  // Start time of the event
    endTime: { type: Date, required: true },    // End time of the event
    serviceID: { type: mongoose.Schema.Types.ObjectId, ref: "Service" }, // Reference to Service
    consultantID: { type: mongoose.Schema.Types.ObjectId, ref: "User" }  // Reference to Consultant (not therapist)
});

module.exports = mongoose.model('Calendar', CalendarSchema);
