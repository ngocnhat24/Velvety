const mongoose = require('mongoose');
 const { Schema } = mongoose;
 
 const consultantSchema = new Schema({
     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     note: { type: String },
     image: { type: String }
 }, { timestamps: true });

module.exports = mongoose.model("Consultant", consultantSchema);
