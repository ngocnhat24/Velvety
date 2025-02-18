import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Sidebar from "../../components/ManagerSidebar";
import ReactQuill from 'react-quill'; // Import react-quill
import 'react-quill/dist/quill.snow.css'; // Import CSS cho quill
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'; // Import MUI Dialog components

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Trạng thái mở dialog
  const [blogToDelete, setBlogToDelete] = useState(null); // Blog cần xóa

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingBlog) {
        await axios.put(`/api/blogs/${editingBlog._id}`, data);
      } else {
        await axios.post("/api/blogs", data);
      }
      reset();
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog", error);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    reset(blog);
    setValue("image", blog.image || ""); // Cập nhật input ảnh khi edit

    window.scrollTo(0, 0);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/blogs/${blogToDelete._id}`);
      fetchBlogs();
      setOpenDeleteDialog(false); 
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  const openDeleteConfirmation = (blog) => {
    setBlogToDelete(blog); // Lưu blog cần xóa
    setOpenDeleteDialog(true); // Mở dialog
  };

  const closeDeleteConfirmation = () => {
    setOpenDeleteDialog(false); // Đóng dialog
    setBlogToDelete(null); // Xóa blog cần xóa
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Blog Management</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-gray-100 p-4 rounded">
          <input
            {...register("title", { required: true })}
            placeholder="Title"
            className="w-full p-2 border"
          />
          <input
            {...register("image")}
            placeholder="Image URL"
            className="w-full p-2 border"
          />
          {editingBlog?.image && (
            <img
              src={editingBlog.image}
              alt="Blog Preview"
              className="w-32 h-32 object-cover mt-2"
            />
          )}
          <input
            {...register("description")}
            placeholder="Description"
            className="w-full p-2 border"
          />
          {/* Sử dụng ReactQuill để tạo trình soạn thảo */}
          <ReactQuill
            {...register("content", { required: true })}
            value={editingBlog?.content || ""}
            onChange={(value) => setValue("content", value)}
            placeholder="Content"
            className="w-full p-2 border"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingBlog ? "Update" : "Create"} Blog
          </button>
        </form>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Blog List</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((blog) => (
              <div key={blog._id} className="border p-4">
                {blog.image && (
                  <img
                    src={blog.image}
                    alt="Blog Image"
                    className="w-full object-cover mb-2"
                  />
                )}
                <h4 className="text-lg font-bold">{blog.title}</h4>
                <p>{blog.description}</p>
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-yellow-500 text-white px-3 py-1 mr-2 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteConfirmation(blog)} // Mở dialog khi click delete
                  className="bg-red-500 text-white px-3 py-1 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog Confirm Deletion */}
      <Dialog
        open={openDeleteDialog}
        onClose={closeDeleteConfirmation}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this blog?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BlogManagement;
