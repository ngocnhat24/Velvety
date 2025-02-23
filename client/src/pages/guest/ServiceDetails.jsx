import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/services/${id}`)
      .then((response) => setService(response.data))
      .catch((error) => console.error("Error fetching service:", error));

    axios
      .get(`/api/services/${id}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [id]);

  if (!service) return <div>Loading...</div>;

  return (
    <div className="main-container w-full h-auto bg-[#f9faef] relative overflow-hidden mx-auto my-0">
      <Navbar />
      
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <div className="flex flex-col md:flex-row items-center">
          <img src={service.image} alt={service.name} className="w-[400px] h-[400px] object-cover rounded-lg" />
          <div className="ml-10">
            <h1 className="text-4xl font-bold">{service.name}</h1>
            <p className="mt-4 text-gray-700">{service.description}</p>
            <p className="mt-2 text-xl font-semibold">${service.price}</p>
          </div>
        </div>

        {/* Ratings & Comments */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          {comments.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className="border-b py-4">
                <p className="font-bold">{comment.user}</p>
                <p>{comment.text}</p>
                <span className="text-yellow-500">⭐ {comment.rating}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
