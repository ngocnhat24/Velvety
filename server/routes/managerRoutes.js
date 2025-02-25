const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Get all managers (Admin only)
router.get('/', authenticate, authorize(['Admin']), managerController.getAllManagers);

// Get manager by ID
router.get('/:id', authenticate, authorize(['Admin', 'Manager']), managerController.getManagerById);

// Update manager profile
router.put('/:id', authenticate, authorize(['Manager']), managerController.updateManager);

// Delete manager (Admin only)
router.delete('/:id', authenticate, authorize(['Admin']), managerController.deleteManager);

module.exports = router;
