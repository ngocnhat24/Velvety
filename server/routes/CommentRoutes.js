const express = require("express");
const { getCommentsByService, addComment, deleteComment } = require("../controllers/CommentController");
const { authenticate } = require("../middlewares/AuthMiddleware"); // Middleware for authentication

const router = express.Router();

router.get("/services/:id/comments", getCommentsByService);
router.post("/services/:id/comments", authenticate, addComment);
router.delete("/comments/:commentId", authenticate, deleteComment);

module.exports = router;
