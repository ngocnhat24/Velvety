import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import Sidebar from "../../components/ConsultantSidebar";

const ViewBooked = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const token = sessionStorage.getItem("authToken"); // Lấy token từ sessionStorage

      if (!token) {
        setError("Unauthorized. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/booking-requests/my-bookings", {
          headers: { Authorization: `Bearer ${token}` }, // Gửi token
        });

        setBookings(response.data.bookings || []);
      } catch (error) {
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings(); // Gọi API khi component mount
  }, []); // useEffect chỉ chạy 1 lần khi component mount

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

        {error && <p className="text-red-500">{error}</p>}

        {bookings.length === 0 ? (
          <p>No bookings assigned to you yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Service</th>
                  <th className="border px-4 py-2">Customer</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Time</th>
                  <th className="border px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="text-center">
                    <td className="border px-4 py-2">{booking.serviceID?.name || "N/A"}</td>
                    <td className="border px-4 py-2">
                      {`${booking.customerID?.firstName || ""} ${booking.customerID?.lastName || ""}`.trim() || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {booking.date ? new Date(booking.date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="border px-4 py-2">{booking.time || "N/A"}</td>
                    <td className="border px-4 py-2">{booking.status || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBooked;
