const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Get all customers (Admin only)
router.get('/', authenticate, authorize(['Admin']), customerController.getAllCustomers);

// Get customer by ID
router.get('/:id', authenticate, authorize(['Admin', 'Customer']), customerController.getCustomerById);

// Update customer profile
router.put('/:id', authenticate, authorize(['Customer']), customerController.updateCustomer);

// Delete customer (Admin only)
router.delete('/:id', authenticate, authorize(['Admin']), customerController.deleteCustomer);

// Change password
router.post('/change-password', authenticate, customerController.changePassword);

module.exports = router;
