const Reviews = require("../models/reviews"); // Import the Reviews model
const Listing = require("../models/listings"); // Import the Listings model

// create review route (post)
module.exports.createReview = async (req, res, next) => {
    let { id } = req.params; // Get the listing ID from the request parameters
    let listing = await Listing.findById(id); // Find the listing by ID
    let review = new Reviews(req.body.review); // Create a new review with the request body data
    review.author = req.user._id; // Set the author of the review to the current user ID
    listing.reviews.push(review); // Add the review to the listing's reviews array
    await review.save(); // Save the review to the database
    await listing.save(); // Save the updated listing to the database
    req.flash("success", "Successfully add a new review!"); // Flash a success message 
    res.redirect(`/listings/${id}`); // Redirect to the listing's page
}

// delete review route
module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params; // Get the listing ID and review ID from the request parameters
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); // Remove the review ID from the listing's reviews array
    await Reviews.findByIdAndDelete(reviewId); // Delete the review from the database
    req.flash("success", "Successfully delete a review!"); // Flash a success message 
    res.redirect(`/listings/${id}`); // Redirect to the listing's page
}

