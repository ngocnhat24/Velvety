const Comment = require("../models/Comment");

exports.getCommentsByService = async (req, res) => {
  try {
    const comments = await Comment.find({ service: req.params.id });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { user, rating, text } = req.body;
    const newComment = new Comment({
      service: req.params.id,
      user,
      rating,
      text,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
