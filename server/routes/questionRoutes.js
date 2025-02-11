const express = require("express");
const { getAllQuestions, addQuestion, updateQuestion, deleteQuestion } = require("../controllers/questionController");

const router = express.Router();

router.get("/", getAllQuestions); // Get all questions
router.post("/", addQuestion); // Add a new question
router.put("/:id", updateQuestion); // Update a question
router.delete("/:id", deleteQuestion); // Delete a question

module.exports = router;
