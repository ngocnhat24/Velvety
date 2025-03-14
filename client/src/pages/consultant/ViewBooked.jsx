import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance"; // Sử dụng axiosInstance đã có interceptor
import Sidebar from "../../components/ConsultantSidebar";

const ViewBooked = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/booking-requests/my-bookings");
        const bookingsData = response.data.bookings || [];
        
        // Lấy feedback cho từng dịch vụ
        const bookingsWithFeedback = await Promise.all(
          bookingsData.map(async (booking) => {
            if (booking.serviceID?._id) {
              try {
                const feedbackRes = await axios.get(`/api/feedbacks/service/${id}`);
                return { ...booking, feedback: feedbackRes.data.feedback || "No feedback yet", rating: feedbackRes.data.rating || "N/A" };
              } catch {
                return { ...booking, feedback: "No feedback yet", rating: "N/A" };
              }
            }
            return { ...booking, feedback: "No feedback yet", rating: "N/A" };
          })
        );

        setBookings(bookingsWithFeedback);
      } catch (error) {
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

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
                  <th className="border px-4 py-2">Feedback</th>
                  <th className="border px-4 py-2">Rating</th>
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
                    <td className="border px-4 py-2">{booking.feedback}</td>
                    <td className="border px-4 py-2">{booking.rating}</td>
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
