import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";

export default function ConsultantGuest() {
    const navigate = useNavigate();
    const [visibleNoteIndex, setVisibleNoteIndex] = useState(null);
    const [consultants, setConsultants] = useState([]);

    useEffect(() => {
        fetchConsultants();
    }, []);

    const fetchConsultants = async () => {
        try {
            const res = await axios.get("/api/consultants");
            setConsultants(res.data.map(c => ({
                ...c,
                note: c.note,
                image: c.image
            })));
        } catch (err) {
            toast.error("Failed to fetch consultants");
        }
    };

    const handleViewMore = (index) => {
        setVisibleNoteIndex(visibleNoteIndex === index ? null : index);
    };

    const handleBookingNow = () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            navigate("/login");
        } else {
            navigate("/service");
        }
    };

    return (
        <div>
            <div className="main-container w-full h-auto bg-[#f9faef] relative overflow-hidden mx-auto my-0 font-['Lato']">
                <Navbar />
                <div className="w-full h-[97.333px] bg-[#ffc0cb] relative z-[2] flex items-center justify-center">
                    <div className="flex items-center">
                        <span className="text-[32px] font-bold leading-[32.01px] text-[#C54759] pacifico-regular -smooth text-center whitespace-nowrap z-[2]">
                            Choose your consultant
                        </span>
                    </div>
                </div>
                <div className="w-full max-w-[1800px] h-auto relative z-[27] mt-[40px] mx-auto flex flex-col gap-5 px-4">
                    {consultants.map((consultant, index) => (
                        <div key={index} className="flex flex-row items-start bg-white p-6 rounded-lg shadow-lg gap-5 mb-5">
                            <div>
                                {consultant.image ? <img src={consultant.image} alt="Consultant" className="w-[150px] h-[150px] bg-cover bg-center bg-no-repeat rounded-t-lg" /> : "No Image"}
                            </div>
                            <div className="flex flex-col items-start flex-1">
                                <span className="text-[18px] font-semibold leading-[24px] text-[#000] tracking-[-0.8px]">
                                    {consultant.firstName} {consultant.lastName}
                                </span>
                                <span className="text-[14px] font-normal leading-[20px] text-[#555] tracking-[-0.4px]">
                                    {consultant.note}
                                </span>

                                {visibleNoteIndex === index && (
                                    <span className="mt-2 text-[14px] font-normal leading-[20px] text-[#555] tracking-[-0.4px]">
                                        No additional notes available.
                                    </span>
                                )}
                                <div className="flex gap-2 mt-4">
                                    <button
                                        className="w-[120px] h-[36px] bg-[#ffc0cb] rounded-full border-solid border-[1px] flex items-center justify-center hover:bg-[#ff8a8a] transition duration-300"
                                        onClick={() => handleViewMore(index)}
                                    >
                                        <span className="text-[16px] font-bold leading-[20px] text-[#C54759]">
                                            {visibleNoteIndex === index ? "Hide" : "View More"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => navigate('/services')}
                    className="fixed bottom-4 right-4 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg transition transform focus:outline-none focus:ring-4 focus:ring-green-300 pacifico-regular"
                    style={{
                        background: 'linear-gradient(135deg, #6B8E23, #32CD32)',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease-in-out',
                        zIndex: 1000,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #32CD32, #6B8E23)';
                        e.currentTarget.style.transform = 'scale(1.1) rotate(3deg)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #6B8E23, #32CD32)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                    }}
                >
                    Book Now
                </button>
            </div>
            <Footer />
        </div>
    );
}
