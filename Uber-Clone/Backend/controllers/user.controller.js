const userModel = require('../models/user.model'); // Import user model
const userService = require('../services/user.service'); // Import user service
const { validationResult } = require('express-validator'); // Import express-validator
const blackListTokenModel = require('../models/blackListToken.model'); // Import blacklist token model

// Controller to register a new user
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req); // Validate request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    const { fullname, email, password } = req.body; // Get user details from request body

    const isUserAlready = await userModel.findOne({ email }); // Check if user already exists

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' }); // Return error if user exists
    }

    const hashedPassword = await userModel.hashPassword(password); // Hash password

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    }); // Create new user

    const token = user.generateAuthToken(); // Generate auth token

    res.status(201).json({ token, user }); // Return token and user
};

// Controller to login a user
module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req); // Validate request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    const { email, password } = req.body; // Get login details from request body

    const user = await userModel.findOne({ email }).select('+password'); // Find user by email

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' }); // Return error if user not found
    }

    const isMatch = await user.comparePassword(password); // Compare password

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' }); // Return error if password does not match
    }

    const token = user.generateAuthToken(); // Generate auth token

    res.cookie('token', token); // Set token in cookies

    res.status(200).json({ token, user }); // Return token and user
};

// Controller to get user profile
module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user); // Return user profile
};

// Controller to logout a user
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token'); // Clear token cookie
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]; // Get token from cookies or headers

    await blackListTokenModel.create({ token }); // Add token to blacklist

    res.status(200).json({ message: 'Logged out' }); // Return success message
};