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
  const [showLoginModal, setShowLoginModal] = useState(false);


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

  // phan quyen dang nhap 
  const handleBookingNow = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setShowLoginModal(true); // Show the modal if not logged in
      return;
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  if (error) return <div className="text-red-600 text-center mt-10">{error}</div>;
  if (!service) return <div className="text-center text-gray-600 mt-10">Loading...</div>;


  return (
    <div className="main-container w-full h-auto bg-[#f9faef] relative overflow-hidden mx-auto my-0">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-10 mb-10">
        <button
          onClick={() => navigate("/services")}
          className="mb-2 text-lg text-[#C86C79] hover:text-[#ffc0cb] self-end"
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
        {/* Booking Button */}
        <div className="flex justify-center mt-4">
          <div className="w-[169px] h-[44px] bg-[#ffc0cb] rounded-full border-solid border-[1px] flex items-center justify-center hover:bg-[#ff8a8a] transition duration-300">
            <button
              onClick={handleBookingNow}
              className="text-[20px] font-bold leading-[24px] text-[#C54759] pacifico-regular"
            >
              Booking Now
            </button>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Log in to book now
            </h3>
            <p className="text-gray-600">You need to be logged in to booking. Do you want to log in now?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="py-2 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
              <button
                className="py-2 px-6 bg-[#f1baba] text-white rounded-lg hover:bg-[#e78999] transition"
                onClick={handleLoginRedirect}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
