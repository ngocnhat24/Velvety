import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/services/${id}`)
      .then((response) => {
        setService(response.data);
        setGalleryImages([
          response.data.image,
          response.data.effectimage,
          response.data.resultimage,
          response.data.sensationimage,
        ].filter(img => img)); // Loại bỏ ảnh null hoặc undefined
      })
      .catch((error) => {
        console.error("Error fetching service:", error);
        setError("Failed to load service details.");
        setService(null);
      });

      axios
      .get(`/api/feedbacks/service/${id}`)
      .then((response) => setComments(response.data))
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setComments([]);
      });
    
  }, [id]);

  const handleBookingNow = async () => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    localStorage.setItem("serviceId", id);
    sessionStorage.setItem("serviceId", id);
    localStorage.setItem("serviceUrl", `/services/${id}/consultant-customer`);
    sessionStorage.setItem("serviceUrl", `/services/${id}/consultant-customer`);
    navigate(`/services/${id}/consultant-customer`);
    console.log("Navigating to:", `/services/${id}/consultant-customer`);
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-lg shadow-lg">
          {service.image && (
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-96 object-cover rounded-xl border-4 border-gray-200 shadow-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer"
              onClick={() => setShowImagePopup(true)}
            />
          )}
          <div>
            <h1 className="text-5xl font-extrabold text-[#9d3847] leading-tight">{service.name}</h1>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">{service.description}</p>
            <div
              className="text-gray-600 mt-6 leading-relaxed border-t-2 border-gray-200 pt-6"
              dangerouslySetInnerHTML={{ __html: service.detaildescription }}
            />
          </div>
        </div>

        {/* Additional Images */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[service.effectimage, service.resultimage, service.sensationimage].filter(img => img).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Service Image ${index}`}
              className="w-full h-40 object-cover rounded-xl shadow-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer"
              onClick={() => setShowImagePopup(true)}
            />
          ))}
        </div>

        {comments.map((comment, index) => (
  <div key={index} className="border-b border-gray-200 pb-6">
    <p className="font-semibold text-gray-800 text-lg">
      {comment.bookingRequestId?.customerID?.firstName}{" "}
      {comment.bookingRequestId?.customerID?.lastName || "Anonymous"}
    </p>
    <p className="text-gray-700 mt-2 leading-relaxed">
      {comment.serviceComment || comment.consultantComment}
    </p>
  </div>
))}


        {/* Booking Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleBookingNow}
            className="w-[169px] h-[44px] rounded-full border-solid border-[1px] text-[20px] font-bold leading-[24px] text-[#C54759] pacifico-regular flex items-center justify-center hover:bg-[#ff8a8a] bg-[#ffc0cb] transition duration-300"
            style={{
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) rotate(3deg)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            }}
          >
            Booking Now
          </button>
        </div>
      </div>

      {/* Custom Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Log in to booking
            </h3>
            <p className="text-gray-600">You need to be logged in to book now. Do you want to log in now?</p>
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



      {/* Image Popup */}
      {showImagePopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setShowImagePopup(false)}
        >
          {/* Nút đóng */}
          <button
            className="absolute top-5 right-5 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 transition z-50"
            onClick={() => setShowImagePopup(false)}
          >
            ✖
          </button>

          <div
            className="w-[80%] max-w-[500px] max-h-[80vh] relative flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nội dung ảnh */}
            <div className="w-full max-h-[60vh] flex justify-center items-center">
              <ImageGallery
                items={galleryImages.map((img) => ({ original: img, thumbnail: img }))}
                showThumbnails={true}
                showFullscreenButton={false}
                showPlayButton={false}
                slideDuration={400}
                showBullets={true}
                additionalClass="w-full max-h-[60vh] object-contain flex justify-center items-center"
                showNav={true}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}