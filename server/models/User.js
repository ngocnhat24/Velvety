const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roleName: { type: String, enum: ["Customer", "Staff", "Manager", "Therapist", "Admin"], required: true },
  phoneNumber: { type: String },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  verified: { type: Boolean, default: false }, 
  verificationToken: { type: String },
});

module.exports = mongoose.model('User', UserSchema);
