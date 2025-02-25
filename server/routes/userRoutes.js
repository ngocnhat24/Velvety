const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Get all users (Admin only)
router.get('/', authenticate, authorize(['Admin']), userController.getAllUsers);

// Get user by ID
router.get('/:id', authenticate, userController.getUserById);

// Update user profile
router.put('/:id', authenticate, userController.updateUser);

// Change password
router.put('/:id/change-password', authenticate, userController.changePassword);

// Delete user (Admin only)
router.delete('/:id', authenticate, authorize(['Admin']), userController.deleteUser);

module.exports = router;
