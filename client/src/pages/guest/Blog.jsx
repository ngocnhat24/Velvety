import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BlogCard from '../../components/BlogCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for navigation
import { motion } from "framer-motion";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Fetch blog posts data from server
  useEffect(() => {
    axios
      .get('/api/blogs') // Update with your backend API
      .then((response) => {
        setBlogPosts(response.data); // Set blog posts data
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
      });
  }, []);

  // Handle "Read More" button click (Navigate to the full blog post)
  const handleReadMore = (postId) => {
    navigate(`/blog/${postId}`); // This would navigate to a detailed blog page (e.g., `/blog/123`)
  };

  return (
    <div className="main-container w-full h-auto bg-[#f9faef] relative overflow-hidden mx-auto my-0">
      <Navbar />

      <div className="w-full h-[70vh] bg-[url(/images/i_blog_0.png)] bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundAttachment: "fixed",
          backgroundSize: "cover"
        }}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-[1]">
          <span className="block font-['Lato'] text-[70px] font-bold leading-[100px] pacifico-regular font-outline-2 -smooth text-[#fff] whitespace-nowrap">
            Expert Skincare Tips, Trends, & Insights
          </span>
          <span className="block font-['Lato'] text-[23px] font-normal leading-[30px] text-[#fff] mt-4 px-4 mx-auto">
            Explore our Blog for the latest in skincare science and beauty trends.
            Discover expert tips, in-depth reviews, and exclusive insights on our
            natural skincare products. Elevate your skin health and beauty regimen
            with us today!
          </span>
        </div>
      </div>

      <div className="w-full max-w-[1800px] h-[48px] relative z-10 mt-[37.33px] mx-auto flex items-center justify-between">
        <div className="w-[300px] h-[1px] bg-[url(/images/line.png)] bg-cover bg-no-repeat flex-1" />
        <span className="flex-shrink-0 font-['Lato'] text-[40px] text-[#C54759] pacifico-regular leading-[48px] tracking-[-0.8px] text-center px-[80px]">
          <span className="text-[50px]">L</span>
          earn More
        </span>
        <div className="w-[300px] h-[1px] bg-[url(/images/line.png)] bg-cover bg-no-repeat flex-1" />
      </div>
      {/* Render blog posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-[30px] mb-[30px] mx-auto px-4 max-w-screen-xl">
        {blogPosts.map((post) => (
          <BlogCard
            key={post._id}
            image={post.image}
            title={post.title}
            description={post.description}
            createdDate={post.createdDate}
            onReadMore={() => handleReadMore(post._id)}
          />
        ))}
        {/* Booking Now Button */}
        <div className="fixed bottom-4 right-4">
      {/* Ping effect */}
      <span className="absolute -inset-1 inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>

      {/* Animated Button */}
      <motion.button
        onClick={() => navigate("/services")}
        className="relative px-6 py-3 text-white rounded-full shadow-lg pacifico-regular focus:outline-none focus:ring-4 focus:ring-green-300"
        style={{
          background: "linear-gradient(135deg, #6B8E23, #32CD32)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        }}
        animate={{
          y: [0, -5, 5, -5, 0], // Floating animation
          transition: {
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)" }}
        whileTap={{ scale: 0.95 }}
      >
        Book Now
      </motion.button>
      </div>
      </div>
      <Footer />
    </div>
  );
}