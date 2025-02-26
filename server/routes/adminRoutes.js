const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Get all users
router.get('/users', authenticate, authorize(['Admin']), adminController.getAllUsers);

// Get user by ID
router.get('/users/:id', authenticate, authorize(['Admin']), adminController.getUserById);

// Update user role
router.put('/users/:id/role', authenticate, authorize(['Admin']), adminController.updateUserRole);

// Delete user
router.delete('/users/:id', authenticate, authorize(['Admin']), adminController.deleteUser);

// Approve consultant
router.put('/consultants/:id/approve', authenticate, authorize(['Admin']), adminController.approveConsultant);

module.exports = router;
