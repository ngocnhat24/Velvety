const mongoose = require('mongoose');
const { Schema } = mongoose;
const questionSchema = new Schema({
    quizID: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    questionText: { type: String, required: true },
  });
  
  module.exports = mongoose.model("Question", questionSchema);
  