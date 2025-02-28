const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, authorize } = require("../middlewares/authMiddleware");

// Register a new user
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Verify Email
router.get('/verify', authController.verifyEmail);

// Forgot Password
router.post('/forgot-password', authController.forgotPassword);

// Reset Password
router.post('/reset-password', authController.resetPassword);

// Resend Verification Email
router.post('/resend-verification-email', authController.resendVerificationEmail);

// Logout
router.post('/logout', authController.logout);

// Change Password
router.post('/change-password',authenticate, authorize(['Manager', 'Admin']), authController.changePassword);

module.exports = router;
