import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/ConsultantSidebar";

const ViewBooked = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token"); // Lấy token từ localStorage
                const response = await axios.get("/api/bookingRequests/my-bookings", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setBookings(response.data.bookings);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <p className="text-center mt-5">Loading...</p>;

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Nội dung chính */}
            <div className="ml-64 p-6 w-full">
                <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
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
                                            {booking.customerID?.firstName} {booking.customerID?.lastName}
                                        </td>
                                        <td className="border px-4 py-2">
                                            {new Date(booking.date).toLocaleDateString()}
                                        </td>
                                        <td className="border px-4 py-2">{booking.time}</td>
                                        <td className="border px-4 py-2">{booking.status}</td>
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
