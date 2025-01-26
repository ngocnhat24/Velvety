import React from "react";
import Navbar from "../../components/Navbar";

export default function RegisterPage() {
  return (
    <div className="main-container w-full h-screen bg-[#f9faef] relative mx-auto">
    <Navbar />
      {/* Main Content */}
      <div className="flex items-center justify-center h-[calc(100%-121px)] relative">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url(@/assets/images/login.png)] bg-cover bg-center bg-no-repeat opacity-50 z-0" />

        {/* Register Card */}
        <div className="relative z-10 w-[475px] bg-white bg-opacity-90 rounded-xl shadow-lg p-8">
          <h2 className="text-center text-[32px] font-bold text-[#c86c79] uppercase mb-8">
            Register
          </h2>

          {/* Input Fields */}
          <form className="flex flex-col gap-6">
            <div>
              <label className="block text-[20px] font-semibold text-gray-800 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c86c79]"
              />
            </div>
            <div>
              <label className="block text-[20px] font-semibold text-gray-800 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#c86c79]"
              />
            </div>
            <div>
              <label className="block text-[20px] font-semibold text-gray-800 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
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
          <div className="text-center mt-6 text-gray-700">
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
