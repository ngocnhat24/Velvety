const User = require('../models/User');

// Get all staff members (Admin only)
exports.getAllStaff = async (req, res) => {
    try {
        const staffMembers = await User.find({ roleName: "Staff" }).select('-password');
        res.json(staffMembers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching staff members", error });
    }
};

// Get staff member by ID
exports.getStaffById = async (req, res) => {
    try {
        const staff = await User.findOne({ _id: req.params.id, roleName: "Staff" }).select('-password');
        if (!staff) return res.status(404).json({ message: "Staff member not found" });

        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: "Error fetching staff member", error });
    }
};

// Update staff profile
exports.updateStaff = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber } = req.body;
        const updatedStaff = await User.findOneAndUpdate(
            { _id: req.params.id, roleName: "Staff" },
            { firstName, lastName, phoneNumber, updatedDate: Date.now() },
            { new: true }
        ).select('-password');

        if (!updatedStaff) return res.status(404).json({ message: "Staff member not found" });

        res.json({ message: "Staff profile updated successfully", staff: updatedStaff });
    } catch (error) {
        res.status(500).json({ message: "Error updating staff profile", error });
    }
};

// Delete staff member (Admin only)
exports.deleteStaff = async (req, res) => {
    try {
        const staff = await User.findOneAndDelete({ _id: req.params.id, roleName: "Staff" });
        if (!staff) return res.status(404).json({ message: "Staff member not found" });

        res.json({ message: "Staff member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting staff member", error });
    }
};
