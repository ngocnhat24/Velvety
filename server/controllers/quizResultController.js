const QuizResult = require('../models/QuizResult');

exports.createQuizResult = async (req, res) => {
  try {
    const quizResult = await QuizResult.create(req.body);
    res.status(201).json(quizResult);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuizResultsByUser = async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.params.userId });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
