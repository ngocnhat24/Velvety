import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ConsultantCustomer() {
  const navigate = useNavigate();
  const { serviceId } = useParams(); // Extract service ID from URL
  const [visibleNoteIndex, setVisibleNoteIndex] = useState(null);

  const consultants = [
    {
      name: "Josh",
      age: 45,
      experience: "20 years",
      image: "/images/josh.png",
      note: "Reviva’s director of education, Josh, offers decades of experience and a vast array of skincare knowledge & experience. He has been instrumental in developing innovative skincare solutions and educating both professionals and consumers on the best practices for maintaining healthy skin. Josh's expertise spans across various aspects of skincare, including anti-aging treatments, acne management, and overall skin health.",
    },
    {
      name: "Mike",
      age: 50,
      experience: "25 years",
      image: "/images/mike.png",
      note: "Mike, Reviva’s director of education, brings decades of experience and a wealth of skincare knowledge & experience. His passion for skincare began early in his career, and he has since dedicated himself to helping others achieve their best skin. Mike is known for his comprehensive understanding of skincare ingredients and their effects, as well as his ability to tailor skincare routines to individual needs. He is a sought-after speaker and educator in the skincare industry.",
    },
    {
      name: "Ali",
      age: 40,
      experience: "18 years",
      image: "/images/ali.png",
      note: "Ali, Reviva’s director of education, offers decades of experience and an extensive array of skincare knowledge & experience. With a background in dermatology and cosmetic science, Ali has a deep understanding of skin biology and the latest advancements in skincare technology. She has worked with numerous clients to address a wide range of skin concerns, from hyperpigmentation to sensitive skin. Ali is committed to providing evidence-based skincare advice and empowering individuals to take control of their skin health.",
    },
  ];

  const handleViewMore = (index) => {
    setVisibleNoteIndex(visibleNoteIndex === index ? null : index);
  };

  return (
    <div className="main-container w-full h-auto bg-[#f9faef] relative overflow-hidden mx-auto my-0 font-['Lato']">
      <Navbar />
      {/* You can use the serviceId here if needed */}
      <div className="w-full h-[97.333px] bg-[#ffc0cb] relative z-[2] flex items-center justify-center">
        <div className="flex items-center">
          <span className="text-[32px] font-bold leading-[32.01px] text-[#C54759] text-center whitespace-nowrap z-[2]">
            Choose your consultant
          </span>
        </div>
      </div>
      <div className="w-full max-w-[1800px] h-auto relative z-[27] mt-[40px] mx-auto flex flex-col gap-5 px-4">
        {consultants.map((consultant, index) => (
          <div key={index} className="flex flex-row items-start bg-white p-6 rounded-lg shadow-lg gap-5 mb-5">
            <div className="w-[150px] h-[150px] bg-cover bg-center bg-no-repeat rounded-t-lg" style={{ backgroundImage: `url(${consultant.image})` }} />
            <div className="flex flex-col items-start flex-1">
              <span className="text-[18px] font-semibold leading-[24px] text-[#000] tracking-[-0.8px]">
                {consultant.name}
              </span>
              <span className="text-[14px] font-normal leading-[20px] text-[#555] tracking-[-0.4px]">
                Age: {consultant.age}
              </span>
              <span className="text-[14px] font-normal leading-[20px] text-[#555] tracking-[-0.4px]">
                Experience: {consultant.experience}
              </span>
              {visibleNoteIndex === index && (
                <span className="mt-2 text-[14px] font-normal leading-[20px] text-[#555] tracking-[-0.4px]">
                  {consultant.note}
                </span>
              )}
              <div className="flex gap-2 mt-4">
                <button
                  className="w-[120px] h-[36px] bg-[#ffc0cb] rounded-full border-solid border-[1px] flex items-center justify-center hover:bg-[#ff8a8a] transition duration-300"
                  onClick={() => handleViewMore(index)}
                >
                  <span className="text-[16px] font-bold leading-[20px] text-[#C54759]">
                    {visibleNoteIndex === index ? "Hide" : "View More"}
                  </span>
                </button>
                <button
                  className="w-[120px] h-[36px] bg-[#ffc0cb] rounded-full border-solid border-[1px] flex items-center justify-center hover:bg-[#ff8a8a] transition duration-300"
                  onClick={() => navigate("/service")}
                >
                  <span className="text-[16px] font-bold leading-[20px] text-[#C54759]">
                    Booking Now
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 mb-8">
        <button
          className="w-[169px] h-[44px] bg-[#ffc0cb] rounded-full border-solid border-[1.333px] flex items-center justify-center hover:bg-[#ff8a8a] transition duration-300"
          onClick={() => navigate("/service")}
        >
          <span className="text-[20px] font-bold leading-[24px] text-[#C54759]">
            Close
          </span>
        </button>
      </div>
      <Footer />
    </div>
  );
}
