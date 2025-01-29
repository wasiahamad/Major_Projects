const captainController = require('../controllers/captain.controller'); // Import captain controller
const express = require('express'); // Import express
const router = express.Router(); // Create a new router object
const { body } = require("express-validator"); // Import express-validator
const authMiddleware = require('../middlewares/auth.middleware'); // Import authentication middleware

// Route to register a new captain
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'), // Validate email
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'), // Validate first name
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'), // Validate password
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'), // Validate vehicle color
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'), // Validate vehicle plate
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'), // Validate vehicle capacity
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type') // Validate vehicle type
], captainController.registerCaptain); // Call registerCaptain controller

// Route to login a captain
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'), // Validate email
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long') // Validate password
], captainController.loginCaptain); // Call loginCaptain controller

// Route to get captain profile
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile); // Call getCaptainProfile controller with authentication

// Route to logout a captain
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain); // Call logoutCaptain controller with authentication

module.exports = router; // Export the router