import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceCard from "../../components/ServiceCard";

export default function Services() {
  const [services, setServices] = useState([]);

  // Fetch data from the server
  useEffect(() => {
    axios
      .get("/api/services/") // Update with your actual backend API
      .then((response) => {
        setServices(response.data); // Assuming response.data is an array of service objects
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const handleChoose = (serviceName) => {
    console.log(`Service chosen: ${serviceName}`);
    // Add your logic for handling the service choice here
  };

  return (
    <div className="main-container w-full h-auto bg-[#f9faef] relative overflow-hidden mx-auto my-0">
      <Navbar />

      {/* Section with background image */}
      <div className="w-full h-[70vh] bg-[url(@/assets/images/service_0.png)] bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundAttachment: "fixed"
        }}>
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-['Lato'] text-[90px] font-bold leading-[134.4px] text-[#fff] tracking-[-2.24px] text-center z-[1]">
          You can choose who ever you want
        </span>
      </div>

      {/* Main content section */}
      <div className="w-full max-w-[1490px] h-auto font-['Libre_Franklin'] text-[20px] font-bold leading-[43px] tracking-[1px] relative text-center mx-auto mt-[40px]">
        <span className="block w-full max-w-[1200px] h-auto justify-center items-start font-['Lato'] text-[60px] font-normal leading-[100px] text-[#000] tracking-[-2.24px] relative z-[2] mx-auto">
          Don’t leave your skincare routine to chance!
        </span>

        <span className="block w-full max-w-[1200px] h-auto justify-center items-start font-['Lato'] text-[20px] font-normal leading-[38.4px] text-[#000] tracking-[-0.64px] relative z-[3] mt-[42.663px] mx-auto">
          We believe beautiful skin comes from a long-term approach with a seasonal skincare routine and a healthy lifestyle. Using the right products and applications is key to optimal skin health. Our consultations offer anyone, anywhere, the best advice from our expert team.
        </span>

        <span className="block w-full max-w-[1200px] h-auto justify-center items-start font-['Lato'] text-[20px] font-normal leading-[35.2px] text-[#000] tracking-[-0.59px] relative z-[4] mt-[39.331px] mx-auto">
          During our virtual consultations, together we’ll evaluate your skin conditions, lifestyle, current products, and goals with an expert. You’ll then receive a customized product “prescription” as emailed guidelines and/or instructions.
        </span>


        <div className="w-full max-w-[1384px] h-auto relative z-[6] mt-[54px] mx-auto text-center">
          <div className="w-[1000px] h-[1px] bg-[url(@/assets/images/Line.png)] bg-cover bg-no-repeat absolute top-0 left-1/2 transform -translate-x-1/2 z-[10]" />
          <span className="w-full max-w-[1339px] h-auto font-['Lato'] text-[50px] font-normal text-[#000] tracking-[-1.87px] block pt-[30px] z-[6]">
            We look forward to meeting you…
          </span>
        </div>


        <span className="block w-full max-w-[1200px] h-auto justify-center items-start font-['Lato'] text-[30px] font-normal leading-[64px] text-[#000] relative text-center z-[7] mt-[37.332px] mx-auto">
          Reserve your complimentary virtual skincare service today!
        </span>
      </div>


      <div className="w-full max-w-[1800px] h-[48px] relative z-10 mt-[37.33px] mx-auto flex items-center justify-between">

        <div className="w-[300px] h-[1px] bg-[url(@/assets/images/Line.png)] bg-cover bg-no-repeat flex-1" />


        <span className="flex-shrink-0 font-['Lato'] text-[40px] font-normal leading-[48px] text-[#000] tracking-[-0.8px] text-center px-[80px]">
          CHOOSE YOUR SERVICE
        </span>


        <div className="w-[300px] h-[1px] bg-[url(@/assets/images/Line.png)] bg-cover bg-no-repeat flex-1" />
      </div>


      {/* Service cards section */}
      <div className="w-full px-4 flex justify-center ">
        <div className="w-full max-w-[1200px] px-4 md:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[60px] gap-y-[20px] mt-4 mb-[40px] mx-auto place-items-center">
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
