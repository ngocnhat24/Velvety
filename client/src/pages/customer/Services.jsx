import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceCard from "../../components/ServiceCard";

export default function ServiceCustomer() {
  const [services, setServices] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate(); // Hook điều hướng

  // Kiểm tra token khi trang load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      navigate("/login"); // Chuyển hướng đến trang đăng nhập nếu không có token
    } else {
      setToken(storedToken);
    }
  }, [navigate]);

  // Fetch danh sách dịch vụ
  useEffect(() => {
    axios
      .get("/api/services/") // API lấy danh sách dịch vụ
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  // Khi chọn dịch vụ
  const handleChoose = (serviceName) => {
    console.log(`Service chosen: ${serviceName}`);
    console.log(`Token: ${token}`);
    alert(`Token: ${token || "No token found"}`);
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

      <div className="w-full max-w-[1490px] h-auto font-['Libre_Franklin'] text-[20px] font-bold leading-[43px] tracking-[1px] relative text-center mx-auto mt-[40px]">
        <span className="block w-full max-w-[1200px] h-auto justify-center items-start font-['Lato'] text-[60px] font-normal leading-[100px] text-[#000] tracking-[-2.24px] relative z-[2] mx-auto">
          Don’t leave your skincare routine to chance!
        </span>

        <span className="block w-full max-w-[1200px] h-auto justify-center items-start font-['Lato'] text-[20px] font-normal leading-[38.4px] text-[#000] tracking-[-0.64px] relative z-[3] mt-[42.663px] mx-auto">
          <span className="text-[30px]">W</span>e believe beautiful skin comes from a long-term approach with a seasonal skincare routine and a healthy lifestyle.
        </span>
      </div>

      <div className="text-center mt-6">
        <p className="text-lg font-semibold text-gray-700">
          Token: {token ? token : "No token found"}
        </p>
      </div>

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

      <Footer />
    </div>
  );
}
