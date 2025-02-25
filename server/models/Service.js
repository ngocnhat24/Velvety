const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  price: { type: Number, required: true, min: 0 }, // Ensure price is positive
  name: { type: String, required: true },
  description: { type: String, default: "" },
  detaildescription: { type: String, default: "" },
  image: { type: String, default: "" },
  effectimage: { type: String, default: "" },
  resultimage: { type: String, default: "" },
  sensationimage: { type: String, default: "" },
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

module.exports = mongoose.model("Service", serviceSchema);
