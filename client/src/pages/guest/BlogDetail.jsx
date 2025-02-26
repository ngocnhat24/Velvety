import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // For navigating back
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function BlogDetail() {
  const { id } = useParams(); // Get the blog post ID from the URL
  const [blogPost, setBlogPost] = useState(null);
  const navigate = useNavigate(); // Hook to handle navigation

  useEffect(() => {
    // Fetch the full blog post using the id
    axios
      .get(`/api/blogs/${id}`) // Make sure the endpoint is correct
      .then((response) => {
        setBlogPost(response.data); // Set the fetched blog post data
      })
      .catch((error) => {
        console.error('Error fetching blog post:', error);
      });
  }, [id]); // Re-run the effect when the id changes

  // Function to handle going back to the blog list
  const handleBack = () => {
    navigate('/blog');
  };

  return blogPost ? (
    <div className="main-container w-full h-full bg-[#f9faef] relative overflow-hidden mx-auto my-0 p-0">
      <Navbar />
      <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-6 mt-12 mb-10">
        {/* Back button */}
        <button
          onClick={handleBack}
          className="text-blue-500 font-semibold flex items-center space-x-2 mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Blog</span>
        </button>

        {/* Blog post content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center">
          <div className="flex-1 lg:mr-8">
            <h1 className="text-4xl font-semibold text-[#333] mb-4">{blogPost.title}</h1>
            <p className="text-lg text-[#777] mb-8">{new Date(blogPost.createdDate).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="text-base text-[#555] leading-relaxed" dangerouslySetInnerHTML={{ __html: blogPost.content }} />
      </div>
      <Footer />
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl text-gray-500">Loading...</p>
    </div>
  );
}
