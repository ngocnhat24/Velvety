import React, { useEffect, useState } from "react";
import CustomerSidebar from "../../components/CustomerSidebar";
import axios from "axios";

const ViewBookingHistory = ({ role }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [consultantDetails, setConsultantDetails] = useState(null);

  // Giả sử bạn lưu thông tin khách hàng trong localStorage sau khi đăng nhập
  const customerID = localStorage.getItem('customerID'); // Lấy ID của khách hàng hiện tại

  useEffect(() => {
    const fetchBookingsByCustomer = async () => {
      try {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        const response = await axios.get("/api/booking-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        console.log("Customer Bookings Response:", response);
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err.response ? err.response.data : err.message);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingsByCustomer();    
  }, []);

  const handleConsultantClick = async (consultantID) => {
    try {
      const response = await fetch(`/api/users/${consultantID}`);
      if (!response.ok) throw new Error("Failed to fetch consultant details");
      const data = await response.json();
      setConsultantDetails(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await fetch(`/api/booking-requests/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      setBookings((prev) => prev.map((booking) => (booking._id === id ? { ...booking, status: newStatus } : booking)));
    } catch (err) {
      alert(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="flex">
      {role === "staff" ? <StaffSidebar /> : <CustomerSidebar />}
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">{role === "staff" ? "All Bookings" : "My Bookings"}</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-center">Service</th>
              <th className="border p-2 text-center">Date</th>
              <th className="border p-2 text-center">Time</th>
              <th className="border p-2 text-center">Consultant</th>
              <th className="border p-2 text-center">Status</th>
              {role === "staff" && <th className="border p-2 text-center">Actions</th>}
            </tr>
          </thead>
          {bookings.map((booking) => (
              <tr key={booking._id} className="border">
                <td className="border p-2 text-center">{booking.serviceID?.name || "Not Available"}</td>
                <td className="border p-2 text-center">{new Date(booking.date).toLocaleDateString()}</td>
                <td className="border p-2 text-center">{booking.time}</td>
                <td
                  className="border p-2 text-center cursor-pointer text-blue-500"
                  onClick={() => handleConsultantClick(booking.consultantID?._id, booking._id)}
                >
                  {booking.consultantID?.firstName || "Not Assigned"}
                </td>
                <td className="border p-2 text-center">
                  <span className={`p-1 rounded ${booking.status === "Pending" ? "bg-yellow-200" :
                    booking.status === "Confirmed" ? "bg-blue-200" :
                      booking.status === "Completed" ? "bg-green-200" : "bg-red-200"
                    }`}>{booking.status}</span>
                </td>
              </tr>
            ))}
        </table>

        {consultantDetails && (
          <div className="mt-4 p-4 border border-gray-300">
            <h3 className="text-xl font-semibold">Consultant Details</h3>
            <p><strong>First Name:</strong> {consultantDetails.firstName}</p>
            <p><strong>Last Name:</strong> {consultantDetails.lastName}</p>
            <p><strong>Email:</strong> {consultantDetails.email}</p>
            <p><strong>Phone:</strong> {consultantDetails.phoneNumber || "Not Available"}</p>
            <p><strong>Role:</strong> {consultantDetails.roleName}</p>
            <p><strong>Verified:</strong> {consultantDetails.verified ? "Yes" : "No"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBookingHistory;
