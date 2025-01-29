const mongoose = require('mongoose'); // Import mongoose

// Define ride schema
const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true
    },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain', // Reference to Captain model
    },
    pickup: {
        type: String,
        required: true, // Pickup location
    },
    destination: {
        type: String,
        required: true, // Destination location
    },
    fare: {
        type: Number,
        required: true, // Fare amount
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', "ongoing", 'completed', 'cancelled'], // Ride status
        default: 'pending',
    },
    duration: {
        type: Number, // Duration in minutes
    },
    distance: {
        type: Number, // Distance in meters
    },
    paymentID: {
        type: String, // Payment ID
    },
    orderId: {
        type: String, // Order ID
    },
    signature: {
        type: String, // Signature
    },
    otp: {
        type: String,
        select: false, // Do not select OTP by default
        required: true, // OTP for ride verification
    },
});

module.exports = mongoose.model('Ride', rideSchema); // Export ride model