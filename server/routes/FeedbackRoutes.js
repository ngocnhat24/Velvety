const express = require('express');
const { 
    createFeedback,
    getFeedbackByBooking,
    getAverageServiceRating, 
    getAverageConsultantRating,
    getFeedbackByService  
} = require('../controllers/FeedbackController');
const { authenticate } = require('../middlewares/AuthMiddleware'); // Require authentication

const router = express.Router();

router.get('/service-rating', authenticate, getAverageServiceRating); // Lấy rating trung bình của dịch vụ
router.get('/consultant-rating', authenticate, getAverageConsultantRating); // Lấy rating trung bình của tư vấn viên
router.post('/', authenticate, createFeedback); // Require authentication to create feedback
router.get('/:bookingRequestId', authenticate, getFeedbackByBooking); // Secure route
router.get('/service/:serviceId', getFeedbackByService);



module.exports = router;



