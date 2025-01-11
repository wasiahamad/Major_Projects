// Import necessary modules
const express = require('express'); // Import the Express library
const router = express.Router({ mergeParams: true }); // Create a new router object with merged parameters
const User = require("../models/user.js"); // Import the User model for authentication
const wrapAsync = require('../utils/wrapAsync.js'); // Import a custom error handling function
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js'); // Adjust path as needed
const userController = require('../controllers/users.js'); // Adjust path as needed

// Define a route for the signup page 
router.route("/signup") 
.get(userController.register) // Define a route for the signup page (get request)
.post( wrapAsync(userController.registerUser));  // Define a route for handling user registration (post request)

// Define a route for the login page 
router.route("/login") 
.get(userController.login) // Define a route for the login page (get request)
.post(                     // Define a route for handling user login (post request)
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userController.loginUser
); 

// Define a route for handling user logout
router.get("/logout", userController.logout);

// Export the router
module.exports = router;

