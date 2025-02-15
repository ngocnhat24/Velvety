const mongoose = require('mongoose');
const consultantSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String },
    specialization: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User model
});

const Consultant = mongoose.model('Consultant', consultantSchema);
