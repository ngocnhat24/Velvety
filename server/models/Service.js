const mongoose = require('mongoose');
const { Schema } = mongoose;
const serviceSchema = new Schema({
  price: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String },
  detaildescription: { type: String },
  image: { type: String },
  effectimage: { type: String },
  treatmentsteps: [{ type: String }],
  resultimage: { type: String },
  sensationimage: { type: String },
  posttreatmentcare: [{ type: String }]
});

module.exports = mongoose.model("Service", serviceSchema);
