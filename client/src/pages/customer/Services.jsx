import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceCard from "../../components/ServiceCard";

export default function ServiceCustomer() {
  const [services, setServices] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      navigate("/login");
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${API_URL}/api/services/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, [token]);

  const handleChoose = (serviceName) => {
    if (!token) {
      alert("You need to log in first!");
      navigate("/login");
      return;
    }
    console.log(`Service chosen: ${serviceName}`);
  };

  return (
    <div className="main-container w-full h-auto bg-[#f9faef] relative overflow-hidden mx-auto my-0">
      <Navbar />
      <div
        className="w-full h-[70vh] bg-[url(/images/service_0.png)] bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundAttachment: "fixed" }}
      >
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-['Lato'] text-[90px] font-bold leading-[134.4px] text-[#fff] tracking-[-2.24px] text-center z-[1]">
          You can choose whoever you want
        </span>
      </div>

      <div className="w-full max-w-[1490px] h-auto text-center mx-auto mt-[40px]">
        <span className="block max-w-[1200px] text-[60px] font-normal leading-[100px] text-[#000] mx-auto">
          Don’t leave your skincare routine to chance!
        </span>
        <span className="block max-w-[1200px] text-[20px] leading-[38.4px] text-[#000] mt-[42.663px] mx-auto">
          <span className="text-[30px]">W</span>e believe beautiful skin comes from a long-term approach with a seasonal skincare routine and a healthy lifestyle.
        </span>
      </div>

      <div className="w-full px-4 flex justify-center">
        <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[60px] gap-y-[20px] mt-4 mb-[40px] mx-auto place-items-center">
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
