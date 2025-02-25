import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../../components/Navbar";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const SkincareBooking = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [events, setEvents] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [selectedConsultant, setSelectedConsultant] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const times = [
        "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("/api/calendars/events", {
                    params: {
                        service: selectedService,
                        consultant: selectedConsultant
                    }
                });
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        if (selectedService && selectedConsultant) {
            fetchEvents();
        }
    }, [selectedService, selectedConsultant]);

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

    const handleConfirm = () => {
        setShowConfirmModal(true);
    };

    const handleConfirmBooking = () => {
        setShowConfirmModal(false);
        const successMessage = document.createElement('div');
        successMessage.innerText = `Successfully booked for ${selectedDate.toDateString()} at ${selectedTime}`;
        successMessage.style.position = 'fixed';
        successMessage.style.top = '10%';
        successMessage.style.left = '50%';
        successMessage.style.transform = 'translate(-50%, -10%)';
        successMessage.style.backgroundColor = '#4CAF50';
        successMessage.style.color = 'white';
        successMessage.style.padding = '10px';
        successMessage.style.borderRadius = '5px';
        successMessage.style.zIndex = '1000';
        successMessage.style.fontSize = '14px';
        document.body.appendChild(successMessage);

        setTimeout(() => {
            document.body.removeChild(successMessage);
            window.location.href = "/payment"; // Replace with your payment page URL
        }, 2000);
    };

    const handleCancel = () => {
        setSelectedTime(null);
    };

    const isTimeDisabled = (time) => {
        const now = new Date();
        const selectedDay = new Date(selectedDate);
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const [hour, minute] = time.split(/[: ]/);
        const timeInMinutes = (parseInt(hour) % 12 + (time.includes("PM") ? 12 : 0)) * 60 + parseInt(minute);

        return selectedDay.toDateString() === now.toDateString() && timeInMinutes <= currentTime;
    };

    const tileDisabled = ({ date, view }) => {
        // Disable past dates
        if (view === 'month') {
            return date < new Date().setHours(0, 0, 0, 0);
        }
        return false;
    };

    return (
        <div className="bg-[#F8F4F2] min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto p-4">
                <h2 className="text-center text-xl font-semibold my-4">Skincare Consultation with </h2>
                <div className="bg-white p-4 rounded-lg shadow-md flex gap-6">
                    <div>
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            className="border rounded-lg p-2"
                            tileDisabled={tileDisabled}
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">Available Times for {selectedDate.toDateString()}</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {times.map((time, index) => (
                                <button
                                    key={index}
                                    className={`border p-2 rounded-lg text-xs font-medium ${selectedTime === time ? 'bg-pink-400 text-white' : 'bg-gray-100 hover:bg-gray-200'} ${isTimeDisabled(time) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => handleTimeSelect(time)}
                                    aria-label={`Select time ${time}`}
                                    disabled={isTimeDisabled(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="bg-pink-500 text-white px-4 py-2 rounded-lg"
                                onClick={handleConfirm}
                                aria-label="Confirm booking"
                            >
                                Confirm
                            </button>
                            <button
                                className="text-gray-500"
                                onClick={handleCancel}
                                aria-label="Cancel booking"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <h1></h1>
                    <ul>
                        {events.map((event) => (
                            <li key={event._id}>{event.name}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-semibold mb-4">Confirm Booking</h2>
                        <p className="mb-4">Are you sure you want to book for {selectedDate.toDateString()} at {selectedTime}?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-pink-500 text-white px-4 py-2 rounded-lg"
                                onClick={handleConfirmBooking}
                                aria-label="Confirm booking"
                            >
                                Yes
                            </button>
                            <button
                                className="text-gray-500 px-4 py-2 rounded-lg"
                                onClick={() => setShowConfirmModal(false)}
                                aria-label="Cancel booking"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
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
