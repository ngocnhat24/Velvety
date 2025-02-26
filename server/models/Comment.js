const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User model
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true, maxlength: 500 }, // Limit text length
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);
