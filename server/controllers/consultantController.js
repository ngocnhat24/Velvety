const Consultant = require('../models/Consultant');

// Function to choose a consultant
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