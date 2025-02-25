import React, { useEffect, useState } from "react";
import StaffSidebar from "../../components/StaffSidebar"; // Đảm bảo đường dẫn đúng

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings") 
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <StaffSidebar /> {/* Sidebar hiển thị bên trái */}
      <div style={{ flex: 1, padding: "20px" }}>
        <h2>Booking List</h2>
        <table border="1">
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Therapist</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.serviceID?.name || "N/A"}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.time}</td>
                <td>{booking.therapistID?.name || "Not Assigned"}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBooking;
