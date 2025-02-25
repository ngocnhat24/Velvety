const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const customerRoutes = require('./customerRoutes');
const staffRoutes = require('./staffRoutes');
const managerRoutes = require('./managerRoutes');
const consultantRoutes = require('./consultantRoutes');
const bookingRequestRoutes = require('./bookingRequestRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const serviceRoutes = require('./serviceRoutes');
const quizResultRoutes = require('./quizResultRoutes');
const paymentRoutes = require('./paymentRoutes');
const blogRoutes = require('./blogRoutes');
const questionRoutes = require('./questionRoutes');
const calendarRoutes = require('./calendarRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/customers', customerRoutes);
router.use('/staff', staffRoutes);
router.use('/managers', managerRoutes);
router.use('/consultants', consultantRoutes);
router.use('/booking-requests', bookingRequestRoutes);
router.use('/feedbacks', feedbackRoutes);
router.use('/services', serviceRoutes);
router.use('/quiz-results', quizResultRoutes);
router.use('/payments', paymentRoutes);
router.use('/blogs', blogRoutes);
router.use('/questions', questionRoutes);
router.use('/calendars', calendarRoutes);

module.exports = router;
