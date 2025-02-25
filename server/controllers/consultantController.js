const Consultant = require('../models/Consultant');
const User = require('../models/User');

// Get all consultants
exports.getAllConsultants = async (req, res) => {
    try {
        const consultants = await Consultant.find().populate('user', '-password');
        res.json(consultants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching consultants", error });
    }
};

// Get consultant by ID
exports.getConsultantById = async (req, res) => {
    try {
        const consultant = await Consultant.findOne({ _id: req.params.id }).populate('user', '-password');
        if (!consultant) return res.status(404).json({ message: "Consultant not found" });

        res.json(consultant);
    } catch (error) {
        res.status(500).json({ message: "Error fetching consultant", error });
    }
};

// Update consultant profile
exports.updateConsultant = async (req, res) => {
    try {
        const { note, image } = req.body;
        const updatedConsultant = await Consultant.findOneAndUpdate(
            { _id: req.params.id },
            { note, image },
            { new: true }
        ).populate('user', '-password');

        if (!updatedConsultant) return res.status(404).json({ message: "Consultant not found" });

        res.json({ message: "Consultant profile updated successfully", consultant: updatedConsultant });
    } catch (error) {
        res.status(500).json({ message: "Error updating consultant profile", error });
    }
};

// Delete consultant (Admin only)
exports.deleteConsultant = async (req, res) => {
    try {
        const consultant = await Consultant.findOneAndDelete({ _id: req.params.id });
        if (!consultant) return res.status(404).json({ message: "Consultant not found" });

        await User.findByIdAndDelete(consultant.user); // Delete associated user account
        res.json({ message: "Consultant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting consultant", error });
    }
};

// Add rating to consultant
exports.addRating = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const consultant = await Consultant.findById(req.params.id);

        if (!consultant) return res.status(404).json({ message: "Consultant not found" });

        consultant.ratings.push({
            user: req.user.id,
            rating,
            comment,
            createdAt: new Date()
        });

        await consultant.save();
        res.json({ message: "Rating added successfully", consultant });
    } catch (error) {
        res.status(500).json({ message: "Error adding rating", error });
    }
};
