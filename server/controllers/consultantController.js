const Consultant = require('../models/Consultant');

exports.getConsultants = async (req, res) => {
    try {
        const consultants = await Consultant.find();
        res.status(200).json(consultants);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving therapist", error });
    }
};

exports.getConsultantById = async (req, res) => {
    const { id } = req.params;
    try {
        const consultant = await Consultant.findById(id);
        if (!consultant) {
            return res.status(404).json({ message: "Therapist not found" });
        }
        res.status(200).json(consultant);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving", error });
    }
};

exports.createConsultant = async (req, res) => {
    const { userId, ...consultantData } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newConsultant = new Consultant({
            ...consultantData,
            user: user._id
        });

        const savedConsultant = await newConsultant.save();
        res.status(201).json(savedConsultant);
    } catch (error) {
        res.status(400).json({ message: "Error creating", error });
    }
};

exports.updateConsultant = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedConsultant = await Consultant.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedConsultant) {
            return res.status(404).json({ message: "Therapist not found" });
        }
        res.status(200).json(updatedConsultant);
    } catch (error) {
        res.status(400).json({ message: "Error updating", error });
    }
};

exports.deleteConsultant = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedConsultant = await Consultant.findByIdAndDelete(id);
        if (!deletedConsultant) {
            return res.status(404).json({ message: "Therapist not found" });
        }
        res.status(200).json({ message: "Therapist deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting", error });
    }
};

exports.selectConsultant = async (req, res) => {
    const { consultantId } = req.body;
    try {
        // Check if the consultant exists
        const consultant = await Consultant.findById(consultantId);

        if (consultant) {
            res.redirect('/calendar');
        } else {
            res.status(404).json({ message: 'Therapist not found' });
        }
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ message: 'Server error', error });
    }
};