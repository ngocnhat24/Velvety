const mongoose = require('mongoose');
const { Schema } = mongoose;
const quizResultSchema = new Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // Nullable for guests
    quizID: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    skinType: { type: String, enum: ["Oily", "Dry", "Combination", "Normal"], required: true },
    createdDate: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model("QuizResult", quizResultSchema);
  