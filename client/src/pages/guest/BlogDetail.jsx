import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setRelatedBlogs(res.data.slice(0, 2)); // Get 2 related blogs
      } catch (err) {
        console.error("Error fetching related blogs:", err);
      }
    };

    fetchRelatedBlogs();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (!blog) return <p className="text-center text-red-500 mt-10">Blog not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* ✅ Back Button */}
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded mb-4"
        onClick={() => navigate('/blog')}
      >
        ← Back
      </button>
      <h1 className="text-4xl font-bold text-gray-900">{blog.title}</h1>
      <p className="text-gray-500 text-sm mt-2">{new Date(blog.createdDate).toLocaleDateString()}</p>
      
      <img src={blog.image} alt={blog.title} className="w-full mt-6 rounded-lg shadow-lg" />
      
      {/* Fix: Ensure HTML content renders properly */}
      <div
        className="mt-6 text-gray-700 text-lg leading-relaxed tracking-wide sigmar-regular" 
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Related Blogs */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-12">Related Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {relatedBlogs.map((item) => (
          <Link key={item._id} to={`/blog/${item._id}`} className="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
            <img src={item.image} alt={item.title} className="w-full h-40 object-cover rounded-lg" />
            <h3 className="text-lg font-semibold text-gray-800 mt-3">{item.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
