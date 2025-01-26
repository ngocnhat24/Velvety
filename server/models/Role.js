const mongoose = require('mongoose');
const { Schema } = mongoose;
const roleSchema = new Schema({
    roleName: { type: String, enum: ["Customer", "Staff", "Manager", "Therapist", "Admin"], required: true },
  });
  
  module.exports = mongoose.model("Role", roleSchema);
  