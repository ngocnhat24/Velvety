import React, { useEffect, useState } from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import axios from "../../utils/axiosInstance";

const ViewBookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [consultantDetails, setConsultantDetails] = useState(null);

  useEffect(() => {
    const fetchBookingsByCustomer = async () => {
      try {
        const response = await axios.get("/api/booking-requests/history-bookings");
        setBookings(response.data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err.response?.data || err.message);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingsByCustomer();
  }, []);

  const handleConsultantClick = async (consultantID) => {
    if (!consultantID) return;

    try {
      const response = await axios.get(`/api/consultants/${consultantID}`);
      setConsultantDetails(response.data);
    } catch (error) {
      console.error("Error fetching consultant details:", error);
      setError("Failed to fetch consultant details.");
    }
  };

  return (
    <div className="flex">
      <CustomerSidebar />
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">My Booking History</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {bookings.length === 0 ? (
          <p>No booking history found.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-center">Service</th>
                <th className="border p-2 text-center">Date</th>
                <th className="border p-2 text-center">Time</th>
                <th className="border p-2 text-center">Consultant</th>
                <th className="border p-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border">
                  <td className="border p-2 text-center">{booking.serviceID?.name || "N/A"}</td>
                  <td className="border p-2 text-center">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="border p-2 text-center">{booking.time}</td>
                  <td
                    className="border p-2 text-center cursor-pointer text-blue-500"
                    onClick={() => handleConsultantClick(booking.consultantID?._id)}
                  >
                    {booking.consultantID?.firstName
                      ? `${booking.consultantID.firstName} ${booking.consultantID.lastName || ""}`
                      : "Not Assigned"}
                  </td>
                  <td className="border p-2 text-center">
                    <span
                      className={`p-1 rounded ${
                        booking.status === "Pending"
                          ? "bg-yellow-200"
                          : booking.status === "Confirmed"
                          ? "bg-blue-200"
                          : booking.status === "Completed"
                          ? "bg-green-200"
                          : "bg-red-200"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {consultantDetails && (
          <div className="mt-4 p-4 border border-gray-300">
            <h3 className="text-xl font-semibold">Consultant Details</h3>
            <p>
              <strong>Name:</strong> {consultantDetails.firstName} {consultantDetails.lastName}
            </p>
            <p>
              <strong>Email:</strong> {consultantDetails.email}
            </p>
            <p>
              <strong>Phone:</strong> {consultantDetails.phoneNumber || "Not Available"}
            </p>
            <p>
              <strong>Verified:</strong> {consultantDetails.verified ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBookingHistory;
