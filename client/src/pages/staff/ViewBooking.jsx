import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance"; 
import StaffSidebar from "../../components/StaffSidebar";

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [availableConsultants, setAvailableConsultants] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null); // booking hiện tại khi chưa có consultant

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/booking-requests");
        console.log("Booking Response:", response);
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err.response ? err.response.data : err.message);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleConsultantClick = async (consultantID, bookingID) => {
    if (consultantID) {
        // Nếu đã có consultant, hiển thị chi tiết
        try {
            const response = await axios.get(`/api/users/${consultantID}`);
            setSelectedConsultant(response.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch consultant details");
        }
    } else {
        // Nếu chưa có consultant, lấy danh sách nhân viên không bận
        try {
            const response = await axios.get(`/api/consultants/available/${bookingID}`);
            setAvailableConsultants(response.data);
            setCurrentBooking(bookingID);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch available consultants");
        }
    }
};


  const assignConsultant = async (bookingId, consultantID) => {
    try {
      await axios.put(`/api/bookings/assign-consultant`, { bookingID: bookingId, consultantID });
      // Cập nhật lại danh sách bookings với consultant mới được gán
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId 
            ? { ...booking, consultantID: { _id: consultantID, firstName: "Updated" } } // Cần trả về dữ liệu đầy đủ của consultant nếu có
            : booking
        )
      );
      setAvailableConsultants([]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign consultant");
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await axios.put(`/api/booking-requests/${id}/status`, { status: newStatus });
      // Cập nhật trạng thái ngay lập tức
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      setError(err.message);
    }
  };

  return (
    <div className="flex">
      <StaffSidebar />
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">View Bookings</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-center">Service Name</th>
              <th className="border p-2 text-center">Date</th>
              <th className="border p-2 text-center">Time</th>
              <th className="border p-2 text-center">Consultant</th>
              <th className="border p-2 text-center">Status</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
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
                  <span className={`p-1 rounded ${
                    booking.status === "Pending" ? "bg-yellow-200" :
                    booking.status === "Confirmed" ? "bg-blue-200" :
                    booking.status === "Completed" ? "bg-green-200" : "bg-red-200"
                  }`}>{booking.status}</span>
                </td>
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
              </tr>
            ))}
          </tbody>
        </table>

        {/* Hiển thị chi tiết Consultant nếu đã có */}
        {selectedConsultant && (
          <div className="mt-4 p-4 border border-gray-300">
            <h3 className="text-xl font-semibold">Consultant Details</h3>
            <p><strong>First Name:</strong> {selectedConsultant.firstName}</p>
            <p><strong>Last Name:</strong> {selectedConsultant.lastName}</p>
            <p><strong>Email:</strong> {selectedConsultant.email}</p>
            <p><strong>Phone:</strong> {selectedConsultant.phoneNumber || "Not Available"}</p>
            <p><strong>Role:</strong> {selectedConsultant.roleName}</p>
            <p><strong>Verified:</strong> {selectedConsultant.verified ? "Yes" : "No"}</p>
            <button 
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded" 
              onClick={() => setSelectedConsultant(null)}
            >
              Close
            </button>
          </div>
        )}

        {/* Hiển thị danh sách chọn consultant nếu chưa được gán */}
        {availableConsultants.length > 0 && (
    <div className="mt-4 p-4 border border-gray-300 bg-white rounded shadow-md">
        <h3 className="text-xl font-semibold mb-2">Select an Available Consultant</h3>
        <table className="min-w-full border border-gray-200">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border p-2 text-center">Name</th>
                    <th className="border p-2 text-center">Email</th>
                    <th className="border p-2 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                {availableConsultants.map((consultant) => (
                    <tr key={consultant._id} className="border">
                        <td className="border p-2 text-center">
                            {consultant.firstName} {consultant.lastName}
                        </td>
                        <td className="border p-2 text-center">{consultant.email}</td>
                        <td className="border p-2 text-center">
                            <button 
                                className="px-3 py-1 bg-blue-500 text-white rounded"
                                onClick={() => assignConsultant(currentBooking, consultant._id)}
                            >
                                Assign
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button 
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded" 
            onClick={() => setAvailableConsultants([])}
>
            Cancel
        </button>
    </div>
)}
      </div>
    </div>
  );
};

export default ViewBooking;
