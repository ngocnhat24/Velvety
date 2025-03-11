const Comment = require("../models/Comment");

exports.getCommentsByService = async (req, res) => {
  try {
    const comments = await Comment.find({ service: req.params.id }).populate("user", "name email"); // Populate user details
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { rating, text } = req.body;
    const userId = req.user.id; // Lấy user từ middleware xác thực
    const serviceId = req.params.id;

    if (!rating || !text) {
      return res.status(400).json({ error: "Rating and text are required" });
    }

    // Kiểm tra dịch vụ có tồn tại không
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    // Kiểm tra trạng thái dịch vụ
    if (service.status !== "complete") {
      return res.status(400).json({ error: "You can only comment on completed services" });
    }

    // Tạo comment mới
    const newComment = new Comment({ service: serviceId, user: userId, rating, text });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Ensure the logged-in user is the author of the comment or an admin
    if (comment.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: "Not authorized to delete this comment" });
    }

    await comment.deleteOne();
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

