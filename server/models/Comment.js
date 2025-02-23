const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  user: { type: String, required: true }, // You may link it to a User model
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);
