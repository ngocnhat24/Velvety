import React from "react";

export default function VerifiedPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#f9faef]">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-600">Email Verified!</h2>
        <p className="mt-4">Your email has been successfully verified. You can now log in to your account.</p>
        <a
          href="/login"
          className="mt-6 inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
}
