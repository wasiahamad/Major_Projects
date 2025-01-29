// Import the express module
const express = require('express');
// Create a new router
const router = express.Router();
// Import the express-validator module
const { body } = require("express-validator")
// Import the user controller
const userController = require('../controllers/user.controller');
// Import the authentication middleware
const authMiddleware = require('../middlewares/auth.middleware');

// Route to register a new user
router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.registerUser
)

// Route to login a user
router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)

// Route to get user profile
router.get('/profile', authMiddleware.authUser, userController.getUserProfile)

// Route to logout a user
router.get('/logout', authMiddleware.authUser, userController.logoutUser)

// Export the router
module.exports = router;