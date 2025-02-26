const express = require('express');
const { body, query } = require('express-validator');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

// Middleware for validation
const validateEventCreation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('startTime').isISO8601().withMessage('Invalid startTime format'),
    body('endTime').isISO8601().withMessage('Invalid endTime format'),
    body('serviceID').isMongoId().withMessage('Invalid serviceID'),
    body('consultantID').isMongoId().withMessage('Invalid consultantID')
];

// Define routes and map them to controller functions
router.post('/create', validateEventCreation, calendarController.createEvent);

router.get('/events', [
    query('serviceID').optional().isMongoId().withMessage('Invalid serviceID'),
    query('consultantID').optional().isMongoId().withMessage('Invalid consultantID'),
    query('startDate').optional().isISO8601().withMessage('Invalid startDate format'),
    query('endDate').optional().isISO8601().withMessage('Invalid endDate format')
], calendarController.getEvents);

module.exports = router;
