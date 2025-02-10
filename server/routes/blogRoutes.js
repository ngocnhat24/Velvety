const express = require("express");
const {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} = require("../controllers/blogController");

const router = express.Router();

// Route to create a new blog post
router.post("/", createBlogPost);

// Route to get all blog posts
router.get("/", getAllBlogPosts);

// Route to get a single blog post by ID
router.get("/:postId", getBlogPostById);

// Route to update a blog post
router.put("/:postId", updateBlogPost);

// Route to delete a blog post
router.delete("/:postId", deleteBlogPost);

module.exports = router;
