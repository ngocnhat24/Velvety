const Calendar = require('../models/Calendar');

exports.createEvent = async (req, res) => {
    try {
        const { title, startTime, endTime, serviceID, consultantID } = req.body;

        // Convert times to Date objects
        const start = new Date(startTime);
        const end = new Date(endTime);

        if (start >= end) {
            return res.status(400).json({ message: "End time must be after start time" });
        }

        // Check for overlapping events
        const overlappingEvent = await Calendar.findOne({
            consultantID, // Ensure the consultant is not double-booked
            $or: [
                { startTime: { $lt: end }, endTime: { $gt: start } }
            ]
        });

        if (overlappingEvent) {
            return res.status(400).json({ message: "Schedule is already booked for this consultant" });
        }

        // Create new event
        const newEvent = new Calendar({
            title,
            startTime,
            endTime,
            serviceID,
            consultantID
        });

        await newEvent.save();

        // Include payment page URL in the response
        const paymentUrl = `http://localhost:5173/payment?eventId=${newEvent._id}`;
        res.status(201).json({ message: "Booking successful", event: newEvent, paymentUrl });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        let { page = 1, limit = 10, sortBy = "startTime", order = "asc", serviceID, consultantID, startDate, endDate } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        order = order === "asc" ? 1 : -1;

        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            return res.status(400).json({ message: "Invalid pagination parameters." });
        }

        const query = {};
        if (serviceID) query.serviceID = serviceID;
        if (consultantID) query.consultantID = consultantID;
        if (startDate) query.startTime = { $gte: new Date(startDate) };
        if (endDate) query.endTime = { $lte: new Date(endDate) };

        const totalEvents = await Calendar.countDocuments(query);
        const totalPages = Math.ceil(totalEvents / limit);

        const events = await Calendar.find(query)
            .populate('serviceID') // Populate service details
            .populate('consultantID', 'name email') // Populate consultant details
            .sort({ [sortBy]: order })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            totalEvents,
            totalPages,
            currentPage: page,
            events
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
