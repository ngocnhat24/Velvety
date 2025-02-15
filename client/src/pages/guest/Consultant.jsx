import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Consultant() {
  const navigate = useNavigate();

  const consultants = [
    {
      name: "Josh",
      image: "../assets/images/07ff4aebfa5130c987eaa466c5493d182f7b52cb.png",
      note: "Reviva’s director of education offers decades of experience and vast array of skincare knowledge & experience",
    },
    {
      name: "Mike",
      image: "../assets/images/a15c83e15f73f9264c1f39566adb62de7681b1cf.png",
      note: "Reviva’s director of education offers decades of experience and vast array of skincare knowledge & experience",
    },
    {
      name: "Ali",
      image: "../assets/images/f7870737069e215bcf7eec9a1280ce87196eb1e4.png",
      note: "Reviva’s director of education offers decades of experience and vast array of skincare knowledge & experience",
    },
  ];

  return (
    <div className="main-container w-full h-auto bg-[#f9faef] relative overflow-hidden mx-auto my-0 font-['Lato']">
      <Navbar />
      <div className="w-full h-[97.333px] bg-[#ffc0cb] relative z-[2] flex items-center justify-center">
        <div className="flex items-center">
          <div className="w-[50px] h-[50px] bg-[url(../assets/images/e2f4cb23d15d0b89c721b683e5988c0c85b40335.png)] bg-cover bg-no-repeat rounded-full mr-4"></div>
          <span className="text-[32px] font-bold leading-[32.01px] text-[#C54759] text-center whitespace-nowrap z-[2]">
            Choose your consultant
          </span>
        </div>
      </div>
      <div className="w-full max-w-[1800px] h-auto relative z-[27] mt-[40px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {consultants.map((consultant, index) => (
          <div key={index} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            <div className="w-full h-[350px] bg-cover bg-center bg-no-repeat rounded-t-lg" style={{ backgroundImage: `url(${consultant.image})` }} />
            <span className="mt-4 text-[24px] font-semibold leading-[32px] text-[#000] tracking-[-0.8px] text-center">
              {consultant.name}
            </span>
            <span className="mt-2 text-[16px] font-normal leading-[24px] text-[#555] tracking-[-0.4px] text-center">
              {consultant.note}
            </span>
            <button className="mt-4 w-[169.333px] h-[44px] bg-[#ffc0cb] rounded-full border-solid border-[1.333px] flex items-center justify-center hover:bg-[#ff8a8a] transition duration-300">
              <span className="text-[20px] font-bold leading-[24px] text-[#C54759]">
                Choose
              </span>
            </button>
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
