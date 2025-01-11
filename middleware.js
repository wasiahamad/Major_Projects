const Listing = require("./models/listings.js"); // Import the Listings model
const ExpressError = require("./utils/ExpressError.js"); // Import a custom error handling class
const { listingSchema, reviewSchema } = require("./schema.js"); // Import the listing validation schema
const Review = require("./models/reviews.js"); // Import the Review model for review validation


module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user); // Log the user object for debugging purpose
    // Check if the user is authenticated
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // Store the original URL in the session for later use
        req.flash("error", "You must be signed in to do that!"); // Flash an error message if the user is not authenticated
        return res.redirect("/login"); // Redirect to the login page
    }
    next(); // Proceed to the next middleware if the user is authenticated
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl; // Save the redirect URL in the response locals
    }
    next(); // Proceed to the next middleware
};

module.exports.isOwner = async(req, res, next) => {
    const { id } = req.params; // Get the listing ID from the request parameters
    let listing = await Listing.findById(id); // Find the listing by ID
    // Check if the listing exists and if the current user is the owner of the listing
    if (!listing.owner.equals(res.locals.currentUser._id)) {
        req.flash("error", "You do not have permission to do that!"); // Flash an error message if the user is not the owner
        return res.redirect(`/listings/${id}`); // Redirect to the listing's show page
    }
    next(); // Proceed to the next middleware if the user is the owner
}

// middleware for validating the listing
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body); // Validate the request body against the listing schema
    if (error) {
        let message = error.details.map(el => el.message).join(","); // Create an error message from validation errors
        throw new ExpressError(message, 400); // Throw a custom error with the message and status code 400
    } else {
        next(); // If no error, proceed to the next middleware
    }
}

// middleware for validating the review
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body); // Validate the request body against the review schema
    if (error) {
        let message = error.details.map(el => el.message).join(","); // Create an error message from validation errors
        throw new ExpressError(message, 400); // Throw a custom error with the message and status code 400
    } else {
        next(); // If no error, proceed to the next middleware
    }
}


// middleware for validating the review
module.exports.isReviewAuthor = async(req, res, next) => {
    let {id, reviewId} = req.params; // Get the review ID from the request parameters
    let review = await Review.findById(reviewId); // Find the review by ID
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You do not have permission to do that!"); // Flash an error message if the user is not the owner
        return res.redirect(`/listings/${id}`); // Redirect to the listing's show page
    }
    next(); // Proceed to the next middleware if the user is the owner
}

