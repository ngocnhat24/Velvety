import React from "react";

function BlogCard({ image, title, description, onReadMore }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <button
          onClick={onReadMore}
          className="mt-4 text-blue-500 hover:text-blue-700"
        >
          Read More
        </button>
      </div>
    </div>
  );
}

export default BlogCard;
