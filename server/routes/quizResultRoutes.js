const express = require('express');
const { createQuizResult, getQuizResultsByUser } = require('../controllers/QuizResultController');
const router = express.Router();

router.post('/', createQuizResult); // Create a new quiz result
router.get('/user/:userId', getQuizResultsByUser); // Get quiz results by user ID

module.exports = router;
