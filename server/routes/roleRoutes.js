const express = require('express');
const { createRole, getAllRoles } = require('../controllers/roleController');
const router = express.Router();

router.post('/', createRole); // Create a new role
router.get('/', getAllRoles); // Get all roles

module.exports = router;
