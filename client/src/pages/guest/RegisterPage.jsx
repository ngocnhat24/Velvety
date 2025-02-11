import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        ...formData,
        roleName: "Customer", // Assuming "Customer" role for registration
      });

      if (response.status === 201) {
        alert("Registration successful! Please check your email to verify your account.");
        // On successful registration, redirect to login page
        navigate("/login");
      }
    } catch (err) {
      // Handle backend error message or network issues
      const errorMessage =
        err.response?.data?.error || "An error occurred while registering.";
      setError(errorMessage);
    }
  };

  return (
    <div className="main-container w-full h-screen bg-[#f9faef] relative mx-auto">
      <Navbar />
      {/* Main Content */}
      <div className="flex items-center justify-center h-auto max-h-screen overflow-auto relative flex-grow">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url(@/assets/images/login.png)] bg-cover bg-center bg-no-repeat opacity-50 z-0" />

        {/* Register Card */}
        <div className="relative z-10 w-[475px] bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
          <h2 className="text-center text-[32px] font-bold text-[#c86c79] uppercase mb-8">
            Register
          </h2>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}

          {/* Input Fields */}
          <form className="flex flex-col gap-auto" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[20px] font-semibold text-gray-800 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c86c79]"
                required
              />
            </div>
            <div>
              <label className="block text-[20px] font-semibold text-gray-800 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c86c79]"
                required
              />
            </div>
            <div>
              <label className="block text-[20px] font-semibold text-gray-800 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c86c79]"
                required
              />
            </div>
            <div>
              <label className="block text-[20px] font-semibold text-gray-800 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c86c79]"
                required
              />
            </div>
            <div>
              <label className="block text-[20px] font-semibold text-gray-800 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c86c79]"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full h-[50px] bg-[#c86c79] text-white text-[20px] font-bold rounded-lg shadow hover:bg-[#b25668] transition duration-300"
            >
              Register
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-700">
            <span>Already have an account? </span>
            <a
              href="/login"
              className="font-bold text-[#c86c79] hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
