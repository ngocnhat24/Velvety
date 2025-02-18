import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";

const BlogCard = ({ blog, onDelete }) => {
  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {blog.description}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button size="small" variant="outlined" color="primary">
            Edit
          </Button>
          <Button size="small" variant="outlined" color="error" onClick={() => onDelete(blog._id)}>
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, blogId: null });

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    setDeleteDialog({ open: true, blogId: id });
  };

  const confirmDelete = () => {
    const { blogId } = deleteDialog;
    setBlogs(blogs.filter((blog) => blog._id !== blogId));
    setDeleteDialog({ open: false, blogId: null });
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f6f8" }}>
      <Sidebar />
      <Container sx={{ ml: 3, p: "24px", maxWidth: "900px" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Blog Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: "20px", borderRadius: "8px", textTransform: "none" }}
        >
          Add New Blog
        </Button>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3}>
            {blogs.map((blog) => (
              <Grid item xs={12} sm={6} key={blog._id}>
                <BlogCard blog={blog} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Dialog Xác Nhận Xóa */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, blogId: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this blog?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, blogId: null })} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BlogManagement;
