import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function ResetPassword() {
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");

      setMessage("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 3000); // Redirect after success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#f9faef] relative">
      {/* Navbar */}
      <Navbar />

      {/* Background */}
      <div className="absolute inset-0 bg-[url(@/assets/images/forgotpassword_resetpassword.png)] bg-cover bg-center opacity-40" />

      {/* Reset Password Section */}
      <div className="flex flex-grow items-center justify-center relative z-10 px-4">
        <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-lg shadow-lg rounded-2xl p-8">
          <h2 className="text-center text-2xl font-bold text-[#c86c79] uppercase mb-6">
            Reset Password
          </h2>

          {/* Success & Error Messages */}
          {message && <p className="text-green-600 text-center mb-4">{message}</p>}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}

          {/* Reset Password Form */}
          <form onSubmit={handleResetPassword}>
            {/* New Password Input */}
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2 text-gray-700">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c86c79]"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className="mb-6">
              <label className="block text-lg font-semibold mb-2 text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c86c79]"
                required
              />
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full h-12 bg-[#c86c79] text-white text-lg font-semibold rounded-full shadow-md hover:bg-[#b25668] transition duration-300 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-4 text-gray-700">
            <span>Remember your password? </span>
            <a href="/login" className="font-semibold text-[#c86c79] hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
