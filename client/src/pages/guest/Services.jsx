import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceCard from "../../components/ServiceCard";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Services() {
  const [services, setServices] = useState([]);

  // Fetch data from the server
  useEffect(() => {
    axios
      .get("/api/services") // Update with your actual backend API
      .then((response) => {
        setServices(response.data); // Assuming response.data is an array of service objects
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);
  return (
    <div className="main-container w-full h-auto bg-[#f9faef] relative overflow-hidden mx-auto my-0">
      <Navbar />

      {/* Section with background image */}
      <div className="w-full h-[70vh] bg-[url(@/assets/images/service_0.png)] bg-cover bg-center bg-no-repeat relative">
        <span className="flex w-full max-w-[1200px] h-auto justify-center items-start font-['Lato'] text-[90px] font-bold leading-[134.4px] text-[#fff] tracking-[-2.24px] relative text-center z-[1] mx-auto">
          You can choose who ever you want
        </span>
      </div>

      {/* Main content section */}
      <div className="w-full max-w-[1490px] h-auto font-['Libre_Franklin'] text-[20px] font-bold leading-[43px] tracking-[1px] relative text-center mx-auto mt-[40px]">
        <span className="block w-full max-w-[1200px] h-auto justify-center items-start font-['Lato'] text-[50px] font-normal leading-[300px] text-[#000] tracking-[-2.24px] relative z-[2] mx-auto">
          Don’t leave your skincare routine to chance!
        </span>

        <span className="block w-full max-w-[1200px] h-auto justify-center items-start font-['Lato'] text-[30px] font-normal leading-[38.4px] text-[#000] tracking-[-0.64px] relative z-[3] mt-[42.663px] mx-auto">
          We believe beautiful skin comes from a long-term approach with a seasonal skincare routine and a healthy lifestyle. Using the right products and applications is key to optimal skin health. Our consultations offer anyone, anywhere, the best advice from our expert team.
        </span>

        <span className="block w-full max-w-[1200px] h-auto justify-center items-start font-['Lato'] text-[20px] font-normal leading-[35.2px] text-[#000] tracking-[-0.59px] relative z-[4] mt-[39.331px] mx-auto">
          During our virtual consultations, together we’ll evaluate your skin conditions, lifestyle, current products, and goals with an expert. You’ll then receive a customized product “prescription” as emailed guidelines and/or instructions.
        </span>

        <div className="w-full max-w-[1384px] h-auto relative z-[6] mt-[54.004px] mx-auto">
          <span className="w-full max-w-[1339px] h-auto justify-center items-start font-['Lato'] text-[45px] font-normal  text-[#000] tracking-[-1.87px] absolute top-0 left-[21.333px] text-center whitespace-nowrap z-[6]">
            We look forward to meeting you…
          </span>
        </div>

        <span className="block w-full max-w-[1200px] h-auto justify-center items-start font-['Lato'] text-[20px] font-normal leading-[64px] text-[#000] tracking-[-1.07px] relative text-center z-[7] mt-[37.332px] mx-auto">
          Reserve your complimentary virtual skincare service today!
        </span>
      </div>

      {/* Section with service title */}
      <div className="w-full max-w-[1800px] h-[48px] relative z-10 mt-[37.33px] mx-auto">
        <span className="flex w-full justify-center items-center font-['Lato'] text-[40px] font-normal leading-[48px] text-[#000] tracking-[-0.8px] text-center">
          CHOOSE YOUR SERVICE
        </span>
        <div className="w-[454.667px] h-[1.333px] bg-[url(@/assets/images/Line.png)] bg-cover bg-no-repeat absolute top-[22.673px] left-0 z-[9]" />
        <div className="w-[484px] h-[1.333px] bg-[url(@/assets/images/Line.png)] bg-cover bg-no-repeat absolute top-[22.673px] left-[1317.33px] z-[10]" />
      </div>

      {/* Service cards section */}
      <div className="w-full px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              image={service.image}
              name={service.name}
              description={service.description}
              price={service.price}
              onChoose={() => handleChoose(service.name)}
            />
          ))}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>

  );
}
