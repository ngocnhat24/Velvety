const mongoose = require('mongoose');
const { Schema } = mongoose;
const answerOptionSchema = new Schema({
    questionID: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    answerText: { type: String, required: true },
    weight: { type: Number, required: true }, // Used to calculate skin type
  });
  
  module.exports = mongoose.model("AnswerOption", answerOptionSchema);
  