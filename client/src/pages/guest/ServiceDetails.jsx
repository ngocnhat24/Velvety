import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/services/${id}`)
      .then((response) => setService(response.data))
      .catch((error) => {
        console.error("Error fetching service:", error);
        setError("Failed to load service details.");
        setService(null);
      });

    axios
      .get(`/api/services/${id}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setComments([]);
      });
  }, [id]);

  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!service) return <div className="text-center text-gray-600 mt-10">Loading...</div>;

  return (
    <div className="main-container w-full h-auto bg-[#f9faef] relative overflow-hidden mx-auto my-0">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          ← Back to Services
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {service.image && (
            <img src={service.image} alt={service.name} className="w-full h-96 object-cover rounded-lg border" />
          )}
          <div>
            <h1 className="text-5xl font-bold text-gray-900">{service.name}</h1>
            <p className="mt-4 text-lg text-gray-700">{service.description}</p>
            <div 
              className="text-gray-600 mt-4 leading-relaxed border-t pt-4"
              dangerouslySetInnerHTML={{ __html: service.detaildescription }} 
            />
          </div>
        </div>

        {/* Additional Images */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {service.effectimage && <img src={service.effectimage} alt="Effect" className="w-full h-40 object-cover rounded-lg shadow" />}
          {service.resultimage && <img src={service.resultimage} alt="Result" className="w-full h-40 object-cover rounded-lg shadow" />}
          {service.sensationimage && <img src={service.sensationimage} alt="Sensation" className="w-full h-40 object-cover rounded-lg shadow" />}
        </div>

        {/* Ratings & Comments */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
          {comments.length === 0 ? (
            <p className="text-gray-500 mt-4">No reviews yet.</p>
          ) : (
            <div className="mt-4 space-y-6">
              {comments.map((comment, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="font-semibold text-gray-800">{comment.user}</p>
                  <p className="text-gray-700 mt-1">{comment.text}</p>
                  <span className="text-yellow-500 text-lg">⭐ {comment.rating}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
