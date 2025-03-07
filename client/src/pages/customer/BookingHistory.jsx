import React, { useEffect, useState } from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import axios from "../../utils/axiosInstance";

const ViewBookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedConsultant, setSelectedConsultant] = useState(null); // Đổi tên state

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
      setSelectedConsultant(response.data); // Sửa thành setSelectedConsultant
    } catch (error) {
      console.error("Error fetching consultant details:", error);
      setError("Failed to fetch consultant details.");
    }
  };

  const closeConsultantModal = () => {
    setSelectedConsultant(null);
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

        {selectedConsultant && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-xl font-semibold text-gray-800">Consultant Details</h3>
                <button className="text-gray-500 hover:text-gray-700" onClick={closeConsultantModal}>
                  ✕
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">First Name:</span>
                  <span className="text-gray-800">{selectedConsultant.firstName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Last Name:</span>
                  <span className="text-gray-800">{selectedConsultant.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Email:</span>
                  <span className="text-gray-800">{selectedConsultant.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Phone:</span>
                  <span className="text-gray-800">{selectedConsultant.phoneNumber || "Not Available"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Role:</span>
                  <span className="text-gray-800">{selectedConsultant.roleName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Verified:</span>
                  <span
                    className={`font-semibold ${
                      selectedConsultant.verified ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {selectedConsultant.verified ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={closeConsultantModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBookingHistory;
