import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Handle successful login
      console.log("Login successful:", response.data);

      // Determine redirect URL based on roleName
      let redirectUrl;
      switch (response.data.roleName) {
        case "Customer":
          redirectUrl = "/customer";
          break;
        case "Staff":
          redirectUrl = "/staff";
          break;
        case "Manager":
          redirectUrl = "/manager";
          break;
        case "Admin":
          redirectUrl = "/admin";
          break;
        case "Therapist":
          redirectUrl = "/therapist";
          break;
        default:
          redirectUrl = "/";
      }

      // Redirect the user
      navigate(redirectUrl);
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="main-container w-full h-screen bg-[#f9faef] relative mx-auto">
      <Navbar />

      {/* Main Content */}
      <div className="flex items-center justify-center h-[calc(100%-121px)] relative">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url(@/assets/images/login.png)] bg-cover bg-center bg-no-repeat opacity-50 z-0" />

        {/* Login Card */}
        <div className="relative z-10 w-[400px] bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
          <h2 className="text-center text-2xl font-bold text-[#c86c79] uppercase mb-8">
            Login
          </h2>

          {/* Error Message */}
          {error && (
            <div className="text-center text-red-500 mb-4">{error}</div>
          )}

          {/* Input Fields */}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c86c79]"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#c86c79]"
            />

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-[50px] bg-[#c86c79] text-white font-bold rounded-lg shadow hover:bg-[#b25668] transition duration-300"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-gray-700">
            <span>Don’t have an account?</span>{" "}
            <a
              href="/register"
              className="font-bold text-[#c86c79] hover:underline"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}