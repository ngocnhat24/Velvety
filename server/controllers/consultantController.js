const Consultant = require('../models/Consultant');
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// Get all consultants
exports.getAllConsultants = async (req, res) => {
    try {
        const consultants = await User.aggregate([
            { $match: { roleName: "Consultant" } }, // Filter consultants
            {
                $lookup: {
                    from: "consultants", // Collection name of Consultant
                    localField: "_id", // User's ID
                    foreignField: "user", // Consultant's userId field
                    as: "consultantData"
                }
            },
            { $unwind: { path: "$consultantData", preserveNullAndEmptyArrays: true } }, // Flatten consultantData
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    phoneNumber: 1,
                    verified: 1,
                    note: "$consultantData.note",
                    image: "$consultantData.image"
                }
            }
        ]);

        res.json(consultants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching consultants", error: error.message });
    }
};

// Get consultant by ID
exports.getConsultantById = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem id có hợp lệ không
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid consultant ID format" });
        }

        const consultant = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(id), roleName: "Consultant" } }, // Tìm user theo id và roleName
            {
                $lookup: {
                    from: "consultants", // Collection name
                    localField: "_id", // ID của User
                    foreignField: "user", // Trường liên kết bên Consultant
                    as: "consultantData"
                }
            },
            { $unwind: { path: "$consultantData", preserveNullAndEmptyArrays: true } }, // Gỡ mảng consultantData
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    phoneNumber: 1,
                    verified: 1,
                    note: "$consultantData.note",
                    image: "$consultantData.image"
                }
            }
        ]);

        if (consultant.length === 0) {
            return res.status(404).json({ message: "Consultant not found" });
        }

        res.json(consultant[0]);
    } catch (error) {
        console.error("Error fetching consultant:", error);
        res.status(500).json({ message: "Error fetching consultant", error: error.message });
    }
};


// Create Consultant
exports.createConsultant = async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { firstName, lastName, email, password, phoneNumber, note, image } = req.body;

        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            roleName: "Consultant",
            phoneNumber,
        });

        // Save the User and check for errors
        await newUser.save();
        console.log("User saved:", newUser);

        // Initialize ratings to an empty array if not provided
        const ratings = [];

        // Step 2: Create Consultant using the User's ID
        const newConsultant = new Consultant({
            user: newUser._id, // Link Consultant to User
            note: note || "",  // Default empty if not provided
            image: image || "", // Default empty if not provided
            ratings: ratings, // Ensure ratings is an empty array
        });

        // Save the Consultant and check for errors
        await newConsultant.save();
        console.log("Consultant saved:", newConsultant);

        res.status(201).json({
            message: "Consultant created successfully",
            consultant: { ...newUser.toObject(), note: newConsultant.note, image: newConsultant.image }
        });

    } catch (error) {
        console.error("Error saving consultant:", error.message);
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: "Validation error", error: error.message });
        } else {
            res.status(500).json({ message: "Error saving consultant", error: error.message });
        }
    }
}; ``

// Update Consultant Profile
exports.updateConsultant = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, note, image, verified } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, email, phoneNumber, verified },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: "User not found" });

        const consultant = await Consultant.findOneAndUpdate(
            { user: req.params.id },
            { note, image },
            { new: true }
        );

        if (!consultant) return res.status(404).json({ message: "Consultant not found" });

        res.json({
            message: "Consultant updated successfully",
            consultant: { ...user.toObject(), note: consultant.note, image: consultant.image }
        });

    } catch (error) {
        res.status(500).json({ message: "Error updating consultant profile", error: error.message });
    }
};


// Delete consultant (Admin only)
exports.deleteConsultant = async (req, res) => {
    try {
        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        console.log("Request ID:", req.params.id);
        console.log("Is valid ObjectId:", mongoose.Types.ObjectId.isValid(req.params.id));

        const consultant = await Consultant.findOne({ user: req.params.id });

        console.log("Consultant found:", consultant);

        if (!consultant) {
            return res.status(404).json({ message: "Consultant not found" });
        }

        // Delete Consultant profile
        await Consultant.findOneAndDelete({ user: req.params.id });

        // Delete the associated User
        await User.findByIdAndDelete(req.params.id);

        res.json({ message: "Consultant and associated user deleted successfully" });

    } catch (error) {
        console.error("Error deleting consultant:", error);
        res.status(500).json({ message: "Error deleting consultant", error: error.message });
    }
};



exports.addRating = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const consultant = await Consultant.findById(req.params.id);

        if (!consultant) return res.status(404).json({ message: "Consultant not found" });

        await consultant.addRating(req.user.id, rating, comment);
        res.json({ message: "Rating added/updated successfully", consultant });
    } catch (error) {
        res.status(500).json({ message: "Error adding rating", error: error.message });
    }
}; 


exports.getAvailableConsultants = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const bookedConsultants = await Booking.find({
            date: booking.date,
            time: booking.time,
            consultantID: { $ne: null } // Chỉ lấy những booking đã có consultant
        }).distinct("consultantID"); // Lấy danh sách consultant đã bị bận

        const availableConsultants = await User.find({
            roleName: "Consultant",
            _id: { $nin: bookedConsultants } // Loại bỏ những consultant đã có lịch trùng
        });

        res.json(availableConsultants);
    } catch (error) {
        console.error("Error fetching available consultants:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

  
exports.getConsultantDetails = async (req, res) => {
    try {
        const consultant = await Consultant.findById(req.params.id);
        if (!consultant) {
            return res.status(404).json({ message: "Consultant not exist" });
        }
        res.status(200).json(consultant);
    } catch (error) {
        res.status(500).json({ message: "can't find consultant information ", error });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const consultant = await User.findOne({ _id: req.params.id, roleName: "Consultant" }).select('-password');
        if (!consultant) return res.status(404).json({ message: "Consultant not found" });

        const defaultPassword = "default123";
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        consultant.password = hashedPassword;
        await consultant.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
