// Require the necessary modules
const express = require('express'); // Import the Express library
const router = express.Router({ mergeParams: true }); // Create a new router object with merged parameters
const wrapAsync = require("../utils/wrapAsync.js"); // Import a utility function to handle async errors
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js"); // Import a middleware function to validate the review
const reviewController = require("../controllers/reviews.js"); // Import the review controller functions from the controllers directory 

// create review route (post)
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview)); // Handle the creation of a new review for a listing

// delete review route
router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview)); // Handle the deletion of a review for a listing

module.exports = router; // Export the router

