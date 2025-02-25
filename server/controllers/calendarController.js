const Calendar = require('../models/Calendar');

exports.createEvent = async (req, res) => {
    try {
        const { startTime, endTime } = req.body;

        // Convert startTime and endTime to Date objects
        const start = new Date(startTime);
        const end = new Date(endTime);

        // Check if there is an existing event that overlaps with the requested time slot
        const overlappingEvent = await Calendar.findOne({
            $or: [
                { startTime: { $lt: end, $gt: start } },
                { endTime: { $lt: end, $gt: start } },
                { startTime: { $lte: start }, endTime: { $gte: end } }
            ]
        });

        if (overlappingEvent) {
            return res.status(400).json({ message: "Schedule is already booked" });
        }

        // Create new event
        const newEvent = new Calendar({
            ...req.body,
            startTime: start,
            endTime: end
        });
        await newEvent.save();

        // Include payment page URL in the response
        const paymentUrl = `http://localhost:5173/payment?eventId=${newEvent._id}`;
        res.status(201).json({ message: "Booking successful", paymentUrl });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const { service, consultant } = req.query;
        const query = {};

        if (service) {
            query.service = service;
        }

        if (consultant) {
            query.consultant = consultant;
        }

        const events = await Calendar.find(query);
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

