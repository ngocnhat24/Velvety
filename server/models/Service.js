const mongoose = require('mongoose');
const { Schema } = mongoose;
const serviceSchema = new Schema({
  price: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Service", serviceSchema);
