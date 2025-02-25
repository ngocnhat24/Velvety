const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Get all staff members (Admin only)
router.get('/', authenticate, authorize(['Admin']), staffController.getAllStaff);

// Get staff member by ID
router.get('/:id', authenticate, authorize(['Admin', 'Staff']), staffController.getStaffById);

// Update staff profile
router.put('/:id', authenticate, authorize(['Staff']), staffController.updateStaff);

// Delete staff member (Admin only)
router.delete('/:id', authenticate, authorize(['Admin']), staffController.deleteStaff);

module.exports = router;
