const express = require("express");
const { saveQuizResult, getAllResults, getUserResults } = require("../controllers/quizResultController");

const router = express.Router();

router.post("/", saveQuizResult); // Save quiz result
router.get("/", getAllResults); // Admin: Get all quiz results
router.get("/:userId", getUserResults); // Get quiz results for a specific user

module.exports = router;
