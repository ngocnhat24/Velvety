import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SkincareBooking = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [events, setEvents] = useState([]);
    const [consultants, setConsultants] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [selectedConsultant, setSelectedConsultant] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const id = localStorage.getItem("consultantId");
    const serviceId = localStorage.getItem("serviceId");
    const [bookedSlots, setBookedSlots] = useState([]);
    const [serviceName, setServiceName] = useState("");
    const navigate = useNavigate();  // Get the navigation function
    
    useEffect(() => {
        if (id && id !== "null") {
            setSelectedConsultant(id);
        }
    }, [id]);

    const times = [
        "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
    ];

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await axios.get(`/api/services/${serviceId}`);
                setServiceName(res.data.name);
            } catch (err) {
                console.error("Failed to fetch service name");
            }
        };

        if (serviceId) {
            fetchService();
        }
    }, [serviceId]);



    useEffect(() => {
        const fetchConsultantById = async () => {
            try {
                if (id && id !== "null") { // Kiểm tra cả null dạng string
                    const res = await axios.get(`/api/consultants/${id}`);
                    setConsultants(res.data);
                }
            } catch (err) {
                toast.error("Failed to fetch consultant");
            }
        };

        fetchConsultantById();
    }, [id]); // Chỉ chạy khi id thay đổi



    useEffect(() => {
        if (selectedConsultant && selectedDate) {
            axios.get(`/api/booking-requests/${selectedConsultant}/pending-bookings`)
                .then(response => {
                    const pendingBookings = response.data;
    
                    // Extract booked time slots for the selected date
                    const bookedTimes = pendingBookings
                        .filter(booking => new Date(booking.date).toDateString() === new Date(selectedDate).toDateString())
                        .map(booking => booking.time.trim()); // Ensure time format consistency
    
                    setBookedSlots(bookedTimes);
                })
                .catch(error => console.error("Error fetching booked slots:", error));
        }
    }, [selectedConsultant, selectedDate]); 


    useEffect(() => {
        const updateAvailableTimes = () => {
            const now = new Date();
            const selectedDay = new Date(selectedDate);
            const currentTime = now.getHours() * 60 + now.getMinutes();

            let filteredTimes;
            if (selectedDay.toDateString() === now.toDateString()) {
                filteredTimes = times.filter(time => {
                    const [hour, minute] = time.split(/[: ]/);
                    const timeInMinutes = (parseInt(hour) % 12 + (time.includes("PM") ? 12 : 0)) * 60 + parseInt(minute);
                    return timeInMinutes > currentTime;
                });
            } else {
                filteredTimes = times;
            }

            setAvailableTimes(filteredTimes);
            if (filteredTimes.length > 0) {
                setSelectedTime(filteredTimes[0]);
            } else {
                setSelectedTime(null);
            }
        };

        updateAvailableTimes();
    }, [selectedDate]);


    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };


    const handleConfirmBooking = () => {
        setShowConfirmModal(true); // Chỉ hiển thị popup, không gửi API
    };

    const handleConfirm = async () => {
        try {
            console.log("🔄 Sending booking request...");
            const response = await createBookingRequest();
            
            if (response && response.status === 201) {
                console.log("✅ Booking successful! Preparing redirection...");
                setShowConfirmModal(false);
    
                // Display success message
                const successMessage = document.createElement("div");
                successMessage.innerText = `Successfully booked for ${selectedDate.toDateString()} at ${selectedTime}`;
                successMessage.style.position = "fixed";
                successMessage.style.top = "10%";
                successMessage.style.left = "50%";
                successMessage.style.transform = "translate(-50%, -10%)";
                successMessage.style.backgroundColor = "#4CAF50";
                successMessage.style.color = "white";
                successMessage.style.padding = "10px";
                successMessage.style.borderRadius = "5px";
                successMessage.style.zIndex = "1000";
                successMessage.style.fontSize = "14px";
                document.body.appendChild(successMessage);
    
                console.log("⏳ Redirecting in 2 seconds...");
    
                setTimeout(() => {
                    console.log("🚀 Redirecting to /about now!");
                    window.location.href = "/about"; // Direct page reload
                }, 2000);
            } else {
                console.log("❌ Booking request did not return expected status:", response);
            }
        } catch (error) {
            console.error("❌ Error creating booking request:", error);
            if (error.response) {
                console.error("⚠️ Backend response error:", error.response.data);
                toast.error(`Failed to create booking: ${error.response.data.message || "Unknown error"}`);
            } else {
                toast.error("Failed to create booking request. Please try again.");
            }
        }
    };
    
    


    const handleCancel = () => {
        localStorage.setItem("serviceId", serviceId); // Lưu dịch vụ đã chọn
        window.location.href = "/consultant-customer"; // Chuyển về trang consultant khi bấm Cancel
    };

   const isTimeDisabled = (time) => {
    const now = new Date();
    const selectedDay = new Date(selectedDate);
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [hour, minute] = time.split(/[: ]/);
    const timeInMinutes = (parseInt(hour) % 12 + (time.includes("PM") ? 12 : 0)) * 60 + parseInt(minute);

    // Disable past slots for today
    if (selectedDay.toDateString() === now.toDateString() && timeInMinutes <= currentTime) {
        return true;
    }

    // Disable already booked slots
    return bookedSlots.includes(time.trim()); // Ensure consistency in time format
};

const tileDisabled = ({ date, view }) => {
    if (view === 'month') {
        const today = new Date().setHours(0, 0, 0, 0);
        const formattedDate = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD

        // Disable past dates
        if (date < today) {
            return true;
        }

        // Disable fully booked dates
        return bookedSlots.includes(formattedDate); 
    }
    return false;
};

    // Gui api request tao booking 

    const createBookingRequest = async () => {
        if (!serviceId || !selectedTime || !selectedDate) {
            toast.error("Please select a service, date, and time.");
            return null; // Return null explicitly to avoid undefined issues
        }
    
        const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
    
        try {
            const payload = {
                serviceID: serviceId,
                customerID: localStorage.getItem("userId") || sessionStorage.getItem("userId"),
                date: localDate.toISOString().split("T")[0],
                time: selectedTime,
                consultantID: id && id !== "null" ? id : null,
                status: "Pending",
                isConsultantAssignedByCustomer: !!id,
            };
    
            console.log("📤 Sending request with payload:", payload);
            const response = await axios.post("/api/booking-requests/", payload);
    
            console.log("📥 API Response:", response);
    
            if (response.status === 201) {
                toast.success("Booking request created successfully!");
                return response; // ✅ Ensure response is returned
            } else {
                console.error("❌ Unexpected response status:", response.status);
                return null;
            }
        } catch (error) {
            console.error("❌ Error creating booking request:", error);
    
            toast.error("This consultant is already booked at the selected date and time.");
            return null; // Return null in case of error
        }
    };





    return (
        <div className="bg-[#F8F4F2] min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto p-4">
                {consultants && id !== "null" && id && (
                    <h1 className="text-center text-2xl font-semibold my-4">
                        Skincare Consultation with <span className="text-[#C54759]">{consultants.firstName} {consultants.lastName}</span>
                    </h1>
                )}

                <div className="bg-white p-6 rounded-xl shadow-lg flex gap-6">
                    <div>
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            className="border rounded-lg p-4 text-lg shadow-md"
                            tileDisabled={tileDisabled}
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                            Available Times for <span className="text-[#C54759]">{selectedDate.toDateString()}</span>
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {times.map((time, index) => (
                                <button
                                    key={index}
                                    className={`border p-2 rounded-lg text-xs font-medium transition 
                                        ${selectedTime === time
                                            ? 'bg-pink-400 text-white'
                                            : isTimeDisabled(time)
                                                ? 'bg-gray-300 text-gray-400 cursor-not-allowed opacity-50'
                                                : 'bg-gray-100 hover:bg-pink-100 hover:text-pink-600'
                                        }`}
                                    onClick={() => handleTimeSelect(time)}
                                    aria-label={`Select time ${time}`}
                                    disabled={isTimeDisabled(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center gap-4 mt-10">
                            <button
                                className="bg-pink-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-pink-600 transition duration-300"
                                onClick={handleConfirmBooking}
                                aria-label="Confirm booking"
                            >
                                Choose
                            </button>
                            <button
                                className="bg-gray-300 px-6 py-3 rounded-xl hover:bg-gray-400 transition duration-300"
                                onClick={handleCancel}
                                aria-label="Cancel booking"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                {showConfirmModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-10 z-50 flex justify-center items-center transition-opacity duration-300 backdrop-blur-md">
                        <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                            <h2 className="text-xl font-bold text-center text-[#C54759] mb-6 ">Booking Confirmation</h2>
                            <p className="text-gray-700 mb-2 "><strong className="text-[#C54759]">Service:</strong> {serviceName}</p>
                            <p className="text-gray-700 mb-2 "><strong className="text-[#C54759]">Date:</strong> {selectedDate.toDateString()}</p>
                            <p className="text-gray-700 mb-2 "><strong className="text-[#C54759]">Time:</strong> {selectedTime}</p>
                            {consultants && id !== "null" && (
                                <p className="text-gray-700 mb-4"><strong className="text-[#C54759]">Consultant:</strong> {consultants.firstName} {consultants.lastName}</p>
                            )}
                            <div className="flex justify-end gap-4 mt-6">
                                <button className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-pink-600 transition duration-300" onClick={handleConfirm}>Confirm</button>
                                <button className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300" onClick={() => setShowConfirmModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

SkincareBooking.propTypes = {
    selectedDate: PropTypes.instanceOf(Date),
    selectedTime: PropTypes.string,
    times: PropTypes.arrayOf(PropTypes.string),
    handleTimeSelect: PropTypes.func,
    handleConfirm: PropTypes.func,
    handleCancel: PropTypes.func,
};

export default SkincareBooking;
