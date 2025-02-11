const express = require('express');
const userRoutes = require('./userRoutes');
const bookingRequestRoutes = require('./bookingRequestRoutes');
const feedbackRoutes = require('./feedbackRoutes');
const serviceRoutes = require('./serviceRoutes');
const quizRoutes = require('./quizRoutes');
const quizResultRoutes = require('./quizResultRoutes');
const paymentRoutes = require('./paymentRoutes');
const blogRoutes = require('./blogRoutes')

const router = express.Router();

router.use('/users', userRoutes);
router.use('/booking-requests', bookingRequestRoutes);
router.use('/feedbacks', feedbackRoutes);
router.use('/services', serviceRoutes);
router.use('/quizzes', quizRoutes);
router.use('/quiz-results', quizResultRoutes);
router.use('/payments', paymentRoutes);
router.use('/blogs',blogRoutes);

module.exports = router;
