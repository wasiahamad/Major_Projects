const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema; // Create a shorthand for mongoose.Schema

const reviewSchema = new Schema({
    comment: {
        type: String, // Comment text of the review
        required: true // Comment is required
    },
    rating: {
        type: Number, // Rating value of the review
        required: true, // Rating is required
        min: 1, // Minimum rating value
        max: 5 // Maximum rating value
    },
    createdAt: {
        type: Date, // Date when the review was created
        default: Date.now() // Default value is the current date and time
    },
    author: {
        type: Schema.Types.ObjectId, // ObjectId type for the author reference
        ref: "User" // Reference to the User model
    }
});

module.exports = mongoose.model("Review", reviewSchema); // Export the Review model