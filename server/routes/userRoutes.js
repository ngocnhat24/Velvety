const express = require('express');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser, verifyEmail, loginUser, forgotPassword, resetPassword,logoutUser } = require('../controllers/userController');
const router = express.Router();

router.post('/', createUser); // Create a new user
router.get("/verify", verifyEmail); // Email verification
router.get('/', getAllUsers); // Get all users
router.get('/:id', getUserById); // Get user by ID
router.put('/:id', updateUser); // Update user by ID
router.delete('/:id', deleteUser); // Delete user by ID
router.post('/login', loginUser); // Login user
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", logoutUser);


module.exports = router;
