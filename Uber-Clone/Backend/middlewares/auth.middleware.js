const userModel = require('../models/user.model'); // Import user model
const bcrypt = require('bcrypt'); // Import bcrypt
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const blackListTokenModel = require('../models/blackListToken.model'); // Import blacklist token model
const captainModel = require('../models/captain.model'); // Import captain model

// Middleware to authenticate user
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Get token from cookies or headers

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' }); // Return unauthorized if no token
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token }); // Check if token is blacklisted

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' }); // Return unauthorized if token is blacklisted
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        const user = await userModel.findById(decoded._id); // Find user by ID

        req.user = user; // Set user in request object

        return next(); // Call next middleware
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' }); // Return unauthorized if error occurs
    }
};

// Middleware to authenticate captain
module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Get token from cookies or headers

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' }); // Return unauthorized if no token
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token }); // Check if token is blacklisted

    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized' }); // Return unauthorized if token is blacklisted
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        const captain = await captainModel.findById(decoded._id); // Find captain by ID
        req.captain = captain; // Set captain in request object

        return next(); // Call next middleware
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: 'Unauthorized' }); // Return unauthorized if error occurs
    }
};