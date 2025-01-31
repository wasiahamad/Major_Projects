const mongoose = require("mongoose"); // Import mongoose library
const reviews = require("./reviews.js"); // Import the reviews model
const Schema = mongoose.Schema; // Create a shorthand for mongoose.Schema


// Create a new schema for listings
const listingSchema = new Schema({
    title: {
        type: String,
        requied: true // Title is required
    },
    description: {
        type: String, // Description of the listing
    },
    image: {
        url: String, // URL of the image 
        filename: String // Filename of the image 
    },
    price: {
        type: Number, // Price of the listing
    },
    location: {
        type: String, // Location of the listing
    },
    country: {
        type: String, // Country of the listing
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review" // Reference to the Review model
        }
    ],
    owner: {
        type: Schema.Types.ObjectId, // Owner of the listing (should be a user) 
        ref: "User" // Reference to the User model
    },
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

// Middleware for deleting the reviews associated with a listing when the listing is deleted 
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing.reviews.length) {
        await reviews.deleteMany({ _id: { $in: listing.reviews } }); // Delete all reviews associated with the listing
    }
});

const Listing = mongoose.model("Listing", listingSchema); // Create a model for listings
module.exports = Listing; // Export the Listing model


