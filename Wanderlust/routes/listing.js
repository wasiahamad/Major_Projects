const express = require('express'); // Import the Express library
const router = express.Router(); // Create a new router object
const wrapAsync = require("../utils/wrapAsync.js"); // Import a utility function to handle async errors
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js"); // Import a middleware function to check if the user is logged in
const multer  = require('multer'); // Import the Multer library for handling file uploads 
const { storage } = require('../cloudConfig.js'); // Import the Cloudinary and storage configuration
const upload = multer({ storage }) // Create a new Multer object with a destination folder for file uploads
// Import the Listings controller
const listingController = require("../controllers/listings.js"); // Import the Listings controller

// Route for listings (GET and POST) and create route for listings (POST) and index route for listings (GET)
router.route("/") 
.get(wrapAsync(listingController.index)) // Index route for listings (GET)
.post(isLoggedIn, validateListing, upload.single('listing[image]'), wrapAsync(listingController.createListing)); // Create route for listings (POST)

// New route for listings (GET)
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Edit route for listings (GET) and delete route for listings (DELETE) and update route for listings (PUT)
router.route("/:id")
.get(wrapAsync(listingController.showListing)) // Show route for listings (GET)
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing)) // Update route for listings (PUT)
.delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); // Delete route for listings (DELETE)

// Edit route
router.get("/:id/edit", isLoggedIn, isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router; // Export the router