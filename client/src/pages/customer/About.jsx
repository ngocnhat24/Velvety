import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutCustomer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  // Lấy token từ state hoặc localStorage
  useEffect(() => {
    const tokenFromState = location.state?.token;
    const tokenFromStorage = localStorage.getItem("authToken");

    if (tokenFromState) {
      setToken(tokenFromState);
    } else if (tokenFromStorage) {
      setToken(tokenFromStorage);
    } else {
      // Không có token, điều hướng về trang login
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="main-container w-full h-auto bg-[#f9faef] relative mx-auto my-0">
      <Navbar />
      <div
        className="w-full h-[50vh] bg-[url(/images/about_1.png)] bg-cover bg-no-repeat relative z-[1]"
        style={{
          backgroundAttachment: "fixed",
        }}
      >
        <span className="flex w-full h-auto justify-center items-start font-['Lato'] text-[10vw] font-bold leading-[180px] text-[#fff] tracking-[-2.23px] absolute top-[20%] left-[50%] transform -translate-x-1/2 text-center whitespace-nowrap z-[1]">
          Our Story
        </span>
      </div>

      <div className="w-[1490.387px] h-[562.21px] font-['Libre_Franklin'] text-[20px] font-bold leading-[43px] tracking-[1px] relative text-center z-[8] mt-[40px] text-center mx-auto">
        <span className="font-['Lato'] text-[30px] font-normal leading-[57.282px] text-[#000] tracking-[1px] relative text-center mx-auto">
          <span className="text-[50px]">S</span>ince our founding in 1973, Velvety has had one goal – To create
          safe, effective skin treatments that produce visible results… at a
          reasonable price.
          <br />
          <br />
          <span className="text-[50px]">G</span>
          reat
        </span>
        <span className="font-['Lato'] text-[30px] font-normal leading-[57.282px] text-[#c86c79] tracking-[1px] relative text-center">
          natural skin care{" "}
        </span>
        <span className="font-['Lato'] text-[30px] font-normal leading-[57.282px] text-[#000] tracking-[1px] relative text-center">
          that’s affordable and works! that’s why generations of{" "}
        </span>
        <span className="font-['Lato'] text-[30px] font-normal leading-[57.282px] text-[#c86c79] tracking-[1px] relative text-center">
          skin care enthusiasts{" "}
        </span>
        <span className="font-['Lato'] text-[30px] font-normal leading-[57.282px] text-[#000] tracking-[1px] relative text-center">
          have fallen in love with our skin care over the last five decades.
        </span>
      </div>

      {/* Hiển thị token */}
      <div className="w-full mt-10 text-center">
        <h2 className="text-xl font-bold text-[#c86c79]">User Token:</h2>
        {token ? (
          <p className="mt-4 break-all text-gray-700">{token}</p>
        ) : (
          <p className="text-red-500">No token available</p>
        )}
      </div>

      <span className="flex w-[10%] h-[30px] justify-center items-center font-['Lato'] text-[2vw] font-normal leading-[30px] text-[#000] tracking-[1.43px] relative text-center whitespace-nowrap z-[9] mx-auto">
        -------------
      </span>

      <Footer />
    </div>
  );
}
