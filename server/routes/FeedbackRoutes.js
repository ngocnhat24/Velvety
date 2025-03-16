const express = require('express');
const { 
    createFeedback,
    getFeedbackByBooking,
    getAverageServiceRating, 
    getAverageConsultantRating,
    getFeedbackByService,
    getAverageConsultantRatingById, 
} = require('../controllers/FeedbackController');
const { authenticate } = require('../middlewares/AuthMiddleware'); // Require authentication

const router = express.Router();

router.get('/service-rating/:serviceId', getAverageServiceRating);
 // Lấy rating trung bình của dịch vụ
router.get('/consultant-rating/:id', getAverageConsultantRatingById); // Lấy rating trung bình của tư vấn viên id
router.get('/consultant-rating', getAverageConsultantRating); // Lấy rating trung bình của tư vấn viên
router.post('/',createFeedback); // Require authentication to create feedback
router.get('/:bookingRequestId',  getFeedbackByBooking); // Secure route
router.get('/service/:serviceId', getFeedbackByService);



module.exports = router;



