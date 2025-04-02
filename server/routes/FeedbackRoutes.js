const express = require('express');
const { 
    createFeedback,
    getFeedbackByBooking,
    getAverageServiceRating, 
    getAverageConsultantRating,
    getFeedbackByService,
    getAverageConsultantRatingById,
    getFeedbackByServiceByBookingId
} = require('../controllers/FeedbackController');
const { authenticate, authorize } = require('../middlewares/AuthMiddleware'); // Require authentication

const router = express.Router();

router.get('/service-rating/:serviceId', authenticate, authorize(['Customer', 'Staff', 'Consultant']), getAverageServiceRating);
 // Lấy rating trung bình của dịch vụ
router.get('/consultant-rating/:id', authenticate, authorize(['Customer', 'Staff', 'Consultant']), getAverageConsultantRatingById); // Lấy rating trung bình của tư vấn viên id
router.get('/consultant-rating', authenticate, authorize(['Customer', 'Staff', 'Consultant']), getAverageConsultantRating); // Lấy rating trung bình của tư vấn viên
router.post('/', authenticate, authorize(['Customer', 'Staff', 'Consultant']), createFeedback); // Require authentication to create feedback
router.get('/:bookingRequestId', authenticate, authorize(['Customer', 'Staff', 'Consultant']),  getFeedbackByBooking); // Secure route
router.get('/service/:serviceId', authenticate, authorize(['Customer', 'Staff', 'Consultant']), getFeedbackByService);
router.get('/bookingRequest/:bookingRequestId', authenticate, authorize(['Customer', 'Staff', 'Consultant']), getFeedbackByServiceByBookingId);



module.exports = router;



