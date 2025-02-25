const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate users
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'Access Denied' });

        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if (!req.user) return res.status(401).json({ message: 'Invalid Token' });

        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid Token' });
    }
};

// Middleware to authorize roles
const authorize = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden: You do not have permission' });
    }
    next();
};

module.exports = { authenticate, authorize };
