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
    <div className="main-container w-[1920px] h-[4000px] bg-[#f9faef] relative overflow-hidden mx-auto my-0">
      <Navbar />
      <span className="flex w-[1261.333px] h-[268px] justify-center items-start font-['Lato'] text-[112px] font-bold leading-[134.4px] text-[#fff] tracking-[-2.24px] relative text-center z-[1] mt-[250.67px] mr-0 mb-0 ml-[329.336px]">
        You can choose who ever you want
      </span>
      <span className="flex w-[1504px] h-[268px] justify-center items-start font-['Lato'] text-[112px] font-normal leading-[134.4px] text-[#000] tracking-[-2.24px] relative text-center z-[2] mt-[372.001px] mr-0 mb-0 ml-[209.333px]">
        Don’t leave your skincare routine to chance!
      </span>
      <span className="flex w-[1357.333px] h-[114px] justify-center items-start font-['Lato'] text-[32px] font-normal leading-[38.4px] text-[#000] tracking-[-0.64px] relative text-center z-[3] mt-[42.663px] mr-0 mb-0 ml-[282.671px]">
        We believe beautiful skin comes from a long-term approach with a
        seasonal skincare routine and a healthy lifestyle. Using the right
        products and applications is key to optimal skin health. Our
        consultations offer anyone, anywhere, the best advice from our expert
        team.
      </span>
      <span className="flex w-[1388px] h-[70px] justify-center items-start font-['Lato'] text-[29.333332061767578px] font-normal leading-[35.2px] text-[#000] tracking-[-0.59px] relative text-center z-[4] mt-[39.331px] mr-0 mb-0 ml-[268px]">
        During our virtual consultations, together we’ll evaluate your skin
        conditions, lifestyle, current products, and goals with an expert.
        You’ll then receive a customized product “prescription” as emailed
        guidelines and/or instructions.
      </span>
      <div className="w-[1384px] h-[112px] relative z-[6] mt-[54.004px] mr-0 mb-0 ml-[268px]">
        <div className="w-[1384px] h-[1.333px] bg-[url(@/assets/images/Line.png)] bg-cover bg-no-repeat absolute top-[-1.333px] left-0 z-[5]" />
        <span className="flex w-[1339px] h-[112px] justify-center items-start font-['Lato'] text-[93.33333587646484px] font-normal leading-[112px] text-[#000] tracking-[-1.87px] absolute top-0 left-[21.333px] text-center whitespace-nowrap z-[6]">
          We look forward to meeting you…
        </span>
      </div>
      <span className="flex w-[1621.333px] h-[64px] justify-center items-start font-['Lato'] text-[53.33333206176758px] font-normal leading-[64px] text-[#000] tracking-[-1.07px] relative text-center whitespace-nowrap z-[7] mt-[37.332px] mr-0 mb-0 ml-[122.672px]">
        Reserve your complimentary virtual skincare service today!
      </span>
      <div className="w-[1920px] h-[873.333px] bg-[url(@/assets/images/service_0.png)] bg-cover bg-no-repeat absolute top-[149.335px] left-0" />
      <div className="w-[1801.33px] h-[48px] relative z-10 mt-[37.33px] mr-0 mb-0 ml-[78.671px]">
        <span className="flex w-[1008px] h-[48px] justify-center items-start font-['Lato'] text-[40px] font-normal leading-[48px] text-[#000] tracking-[-0.8px] absolute top-0 left-[393.329px] text-center whitespace-nowrap z-[8]">
          CHOOSE YOUR SERVICE{" "}
        </span>
        <div className="w-[454.667px] h-[1.333px] bg-[url(@/assets/images/Line.png)] bg-cover bg-no-repeat absolute top-[22.673px] left-0 z-[9]" />
        <div className="w-[484px] h-[1.333px] bg-[url(@/assets/images/Line.png)] bg-cover bg-no-repeat absolute top-[22.673px] left-[1317.33px] z-10" />
      </div>
      <div>
      <div className="grid grid-cols-4 gap-4">
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
      <Footer />
    </div>
  );
}
