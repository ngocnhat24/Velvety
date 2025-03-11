import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerSidebar from "../../components/CustomerSidebar";
import axios from "../../utils/axiosInstance";
import { MdVerified, MdClose } from "react-icons/md";
import {
  Fab,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Tooltip,
  Typography,
  Modal,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewBookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false); // 🔄 Trigger refresh
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [consultantsCache, setConsultantsCache] = useState(new Map());
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const navigate = useNavigate();
  
  const handleReviewClick = (bookingId) => {
    setReviewData({ bookingId, comment: "", rating: 0 });
    setShowReviewModal(true);
  };
  
  const handleSubmitReview = async () => {
    if (!reviewData.comment || !reviewData.rating) {
      alert("Please enter your comment and rating.");
      return;
    }
  
    const reviewPayload = {
      bookingId: booking._id,  // ID của lịch đặt cần đánh giá
      comment: reviewData.comment,
      rating: reviewData.rating,
      createdAt: new Date().toISOString(),
    };
  
    try {
      // Gửi request lưu review vào lịch sử đặt lịch
      const response = await fetch("/api/historyBooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewPayload),
      });
  
      if (!response.ok) throw new Error("Failed to submit review");
  
      alert("Review submitted successfully!");
      setShowReviewModal(false); // Đóng modal sau khi gửi
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review");
    }
  };
  
  
  const fetchBookingsByCustomer = async () => {
    try {
      const response = await axios.get(
        "/api/booking-requests/history-bookings"
      );
      setBookings(response.data.bookings || []);
    } catch (err) {
      console.error(
        "Error fetching bookings:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Re-run fetch when `refresh` changes
  useEffect(() => {
    fetchBookingsByCustomer();
  }, [refresh]); // 👈 Add `refresh` as a dependency

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(`/api/booking-requests/${bookingId}/cancel`);
      // ✅ Success Toast
      toast.success("✅ Booking successfully canceled!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (err) {
      console.error(
        "Error canceling booking:",
        err.response?.data || err.message
      );
      // ❌ Error Toast
      toast.error("❌ Failed to cancel booking", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setShowModal(false);
      setRefresh((prev) => !prev); // 🔄 Toggle `refresh` state
    }
  };

  const handleConsultantClick = async (consultantID) => {
    if (!consultantID) return;
    if (consultantsCache.has(consultantID)) {
      setSelectedConsultant(consultantsCache.get(consultantID));
      return;
    }
    try {
      const response = await axios.get(`/api/consultants/${consultantID}`);
      setConsultantsCache(
        new Map(consultantsCache.set(consultantID, response.data))
      );
      setSelectedConsultant(response.data);
    } catch (error) {
      console.error("Error fetching consultant details:", error);
      setError("Failed to fetch consultant details.");
    }
  };

  const closeConsultantModal = () => {
    setSelectedConsultant(null);
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      (booking.serviceID?.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        booking.consultantID?.firstName
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())) &&
      (statusFilter ? booking.status === statusFilter : true)
  );

  return (
    <div className="flex main-container w-full h-full bg-gray-100 relative mx-auto my-0 p-6">
      <CustomerSidebar />
      <div className="w-full">
        <Typography
          variant="h4"
          className="mb-4 text-[#c86c79] text-center"
        >
          Booking History
        </Typography>
        <div className="flex justify-between mb-4">
          <TextField
            label="Search by Service or Consultant"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/2"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#E27585", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#daacac", // Border color when focused
                },
              },
              "& .MuiInputBase-input": {
                color: "#000000", // Changes the text color inside the field
              },
              "& .MuiInputLabel-root": {
                color: "gray", // Default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#E27585", // Label color when focused
              },
            }}
          />
          <FormControl
            size="small"
            className="w-1/4"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "gray", // Default border color
                },
                "&:hover fieldset": {
                  borderColor: "#E27585", // Border color on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#daacac", // Border color when focused
                },
              },
              "& .MuiInputBase-input": {
                color: "#000000", // Changes the text color inside the field
              },
              "& .MuiInputLabel-root": {
                color: "gray", // Default label color
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#E27585", // Label color when focused
              },
            }}
          >
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending" sx={{ color: "#e0f131" }}>
                Pending
              </MenuItem>
              <MenuItem value="Confirmed" sx={{ color: "#3139f1" }}>
                Confirmed
              </MenuItem>
              <MenuItem value="Completed" sx={{ color: "#31f131" }}>
                Completed
              </MenuItem>
              <MenuItem value="Cancelled" sx={{ color: "#E27585" }}>
                Cancelled
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error" className="text-center">
            {error}
          </Typography>
        ) : filteredBookings.length === 0 ? (
          <Typography className="text-center">
            No booking history found.
          </Typography>
        ) : (
          <TableContainer component={Paper} elevation={3} className="shadow-md">
            <Table>
              <TableHead className="bg-[#E27585] text-white">
                <TableRow>
                  <TableCell align="center">Service</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">Consultant</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow
                    key={booking._id}
                    className="transition duration-300 hover:bg-gray-100"
                  >
                    <TableCell align="center">
                      {booking.serviceID?.name || "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(booking.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">{booking.time}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="View Consultant Details">
                        <span
                          className="cursor-pointer text-[#E27585] hover:underline"
                          onClick={() =>
                            handleConsultantClick(booking.consultantID?._id)
                          }
                        >
                          {booking.consultantID?.firstName
                            ? `${booking.consultantID.firstName} ${
                                booking.consultantID.lastName || ""
                              }`
                            : "Not Assigned"}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="center">
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
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => {
                          setSelectedBookingId(booking._id);
                          setShowModal(true);
                        }}
                      >
                        <FaTrash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Modal open={!!selectedConsultant} onClose={closeConsultantModal}>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl max-w-lg mx-auto mt-24 relative"
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition"
              onClick={closeConsultantModal}
            >
              <MdClose size={24} />
            </button>

            {/* Modal Title */}
            <Typography variant="h5" className="text-gray-800 font-bold mb-4">
              Consultant Details
            </Typography>

            {selectedConsultant && (
              <div className="space-y-3 text-gray-700">
                <Typography>
                  <strong>First Name:</strong> {selectedConsultant.firstName}
                </Typography>
                <Typography>
                  <strong>Last Name:</strong> {selectedConsultant.lastName}
                </Typography>
                <Typography>
                  <strong>Email:</strong> {selectedConsultant.email}
                </Typography>
                <Typography>
                  <strong>Phone:</strong>{" "}
                  {selectedConsultant.phoneNumber || "Not Available"}
                </Typography>
                <Typography className="flex items-center">
                  <strong>Verified:</strong>
                  <span
                    className={`ml-2 flex items-center ${
                      selectedConsultant.verified
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {selectedConsultant.verified ? (
                      <MdVerified size={18} className="ml-1" />
                    ) : (
                      "No"
                    )}
                  </span>
                </Typography>
              </div>
            )}

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <Button
                variant="contained"
                color="primary"
                className="rounded-full px-6 shadow-md"
                onClick={closeConsultantModal}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </Modal>

        <Fab
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#E27585",
            "&:hover": { backgroundColor: "#a92a4e" },
          }}
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a92a4e] opacity-75"></span>
          <HomeIcon />
        </Fab>
      </div>
      {/* Cancel Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Cancel Confirmation
            </h3>
            <p className="text-gray-600">
              Are you sure you want to cancel this booking ? This action cannot
              be undone.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="py-2 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="py-2 px-6 bg-[#f1baba] text-white rounded-lg hover:bg-[#e78999] transition"
                onClick={() => handleCancelBooking(selectedBookingId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ViewBookingHistory;
