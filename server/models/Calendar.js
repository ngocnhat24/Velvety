const mongoose = require('mongoose');
const CalendarSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }
});
module.exports = mongoose.model('Calendar', CalendarSchema);