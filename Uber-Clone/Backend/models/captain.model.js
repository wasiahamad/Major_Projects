const mongoose = require('mongoose'); // Import mongoose
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation

// Define captain schema
const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Firstname must be at least 3 characters long'], // Validate first name
        },
        lastname: {
            type: String,
            minlength: [3, 'Lastname must be at least 3 characters long'], // Validate last name
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'] // Validate email
    },
    password: {
        type: String,
        required: true,
        select: false, // Do not select password by default
    },
    socketId: {
        type: String, // Socket ID for real-time communication
    },
    status: {
        type: String,
        enum: ['active', 'inactive'], // Captain status
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'], // Validate vehicle color
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long'], // Validate vehicle plate
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be at least 1'], // Validate vehicle capacity
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'], // Validate vehicle type
        }
    },
    location: {
        type: { type: String, default: 'Point' }, // GeoJSON point type
        coordinates: [Number] // Coordinates array
    }
});

// Add a geospatial index to the location field
captainSchema.index({ location: '2dsphere' });

// Method to generate auth token
captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' }); // Generate token
    return token;
};

// Method to compare password
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password); // Compare password
};

// Static method to hash password
captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10); // Hash password
};

const captainModel = mongoose.model('Captain', captainSchema); // Create captain model

module.exports = captainModel; // Export captain model