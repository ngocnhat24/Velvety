const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

// Define routes and map them to controller functions
router.post('/create', calendarController.createEvent);
router.get('/events', calendarController.getEvents);

module.exports = router;