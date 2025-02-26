const express = require("express");
const {
  saveQuizResult,
  getAllResults,
  getUserResults,
} = require("../controllers/quizResultController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticate, saveQuizResult); // Users must be authenticated to save results
router.get("/", authenticate, authorize(["Admin"]), getAllResults); // Only admins can fetch all results
router.get("/:userId", authenticate, getUserResults); // Users can fetch their own results

module.exports = router;
