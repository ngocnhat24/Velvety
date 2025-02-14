const express = require("express");
const { saveQuizResult, getAllResults, getUserResults, determineSkinType } = require("../controllers/quizResultController");

const router = express.Router();

router.post("/", saveQuizResult); // Save quiz result
router.get("/", getAllResults); // Admin: Get all quiz results
router.get("/:userId", getUserResults); // Get quiz results for a specific user
router.get("/determine-skin-type", determineSkinType);

module.exports = router;
