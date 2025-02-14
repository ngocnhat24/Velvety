const mongoose = require('mongoose');
const consultantSchema = new mongoose.Schema({
    consultantId: {type: String,required: true},
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    phone: {type: String,required: true},
    specialization: {type: String,required: true,}
});
const Consultant = mongoose.model('Consultant', consultantSchema);
