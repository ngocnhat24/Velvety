import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });

      // Handle successful login
      console.log("Login successful:", response.data);
      setSuccess("Login successful!");

      // Store email if Remember Me is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

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

      setTimeout(() => {
        navigate(redirectUrl);
      }, 2000);
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="main-container w-full h-screen bg-[#f9faef] relative mx-auto">
      <Navbar />

      <div className="flex items-center justify-center h-[calc(100%-121px)] relative">
        <div className="absolute h-screen inset-0 bg-[url(./src/assets/images/login.png)] bg-cover bg-center bg-no-repeat opacity-50 z-0" />

        <div className="relative z-10 w-full max-w-[400px] bg-white bg-opacity-90 rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-center text-2xl font-bold text-[#c86c79] uppercase mb-6 md:mb-8">
            Login
          </h2>

          {error && <div className="text-center text-red-500 mb-4">{error}</div>}
          {success && <div className="text-center text-green-500 mb-4">{success}</div>}

          <form className="flex flex-col gap-4 md:gap-6" onSubmit={handleSubmit}>
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

            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                Remember Me
              </label>
              <a href="/forgot-password" className="text-[#c86c79] hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full h-[50px] bg-[#c86c79] text-white font-bold rounded-lg shadow hover:bg-[#b25668] transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-8 text-gray-700">
            <span>Don’t have an account?</span>{" "}
            <a href="/register" className="font-bold text-[#c86c79] hover:underline">
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
