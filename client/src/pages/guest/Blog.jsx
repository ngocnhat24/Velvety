import React, { useEffect, useState } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BlogCard from '../../components/BlogCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for navigation

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
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
    <div className="main-container w-[1920px] h-[3548px] bg-[#f9faef] relative overflow-hidden mx-auto my-0">
      <Navbar />
      <span className="flex w-[2002.667px] h-[96px] justify-center items-start font-['Lato'] text-[80px] font-normal leading-[96px] text-[#fff] relative text-center whitespace-nowrap z-[15] mt-[292.002px] mr-0 mb-0 ml-[-41.331px]">
        Expert Skincare Tips, Trends, & Insights
      </span>
      <span className="flex w-[1280px] h-[135px] justify-center items-start font-['Lato'] text-[37.33333206176758px] font-normal leading-[44.8px] text-[#fff] relative text-center z-[16] mt-[21.326px] mr-0 mb-0 ml-[319.998px]">
        Explore our Blog for the latest in skincare science and beauty trends.
        Discover expert tips, in-depth reviews, and exclusive insights on our
        natural skincare products. Elevate your skin health and beauty regimen
        with us today!
      </span>
      <div className="w-[1920px] h-[873.333px] bg-[url(@/assets/images/blog_0.png)] bg-cover bg-no-repeat absolute top-[149.339px] left-0 z-[7]" />

      {/* Render blog posts */}
      <div className="grid grid-cols-4 gap-4 mt-[400px] mx-auto">
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
      </div>
      <Footer />
    </div>
  );
}
