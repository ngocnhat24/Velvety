const express = require("express");
const { getCommentsByService, addComment, deleteComment } = require("../controllers/CommentController");
const router = express.Router();

router.get("/:id/comments", getCommentsByService);
router.post("/:id/comments", addComment);
router.delete("/comments/:commentId", deleteComment);

module.exports = router;
