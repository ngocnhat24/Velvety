import React, { useEffect, useState } from "react";
import StaffSidebar from "../../components/StaffSidebar";
import CustomerSidebar from "../../components/CustomerSidebar";

const ViewBooking = ({ role }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [consultantDetails, setConsultantDetails] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/booking-requests");
        if (!response.ok) throw new Error(`Failed to fetch bookings: ${response.status}`);
        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleConsultantClick = async (consultantID) => {
    try {
      const response = await fetch(`/api/users/${consultantID}`);
      if (!response.ok) throw new Error("Failed to fetch consultant details");
      const data = await response.json();
      setConsultantDetails(data);
      setSelectedConsultant(true);
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
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border">
                <td className="border p-2 text-center">{booking.serviceName}</td>
                <td className="border p-2 text-center">{new Date(booking.date).toLocaleDateString()}</td>
                <td className="border p-2 text-center">{booking.time}</td>
                <td
                  className="border p-2 text-center cursor-pointer text-blue-500"
                  onClick={() => handleConsultantClick(booking.consultantID)}
                >
                  {booking.consultantID || "Not Assigned"}
                </td>
                <td className="border p-2 text-center">
                  <span className={`p-1 rounded ${
                    booking.status === "Pending" ? "bg-yellow-200" :
                    booking.status === "Confirmed" ? "bg-blue-200" :
                    booking.status === "Completed" ? "bg-green-200" : "bg-red-200"
                  }`}>{booking.status}</span>
                </td>
                {role === "staff" && (
                  <td className="border p-2 text-center">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                      className="border p-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {selectedConsultant && consultantDetails && (
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

export default ViewBooking;
