const mongoose = require('mongoose'); // Import mongoose
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation

// Define user schema
const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'], // Validate first name
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'], // Validate last name
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'], // Validate email
    },
    password: {
        type: String,
        required: true,
        select: false, // Do not select password by default
    },
    socketId: {
        type: String, // Socket ID for real-time communication
    },
});

// Method to generate auth token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' }); // Generate token
    return token;
};

// Method to compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password); // Compare password
};

// Static method to hash password
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10); // Hash password
};

const userModel = mongoose.model('User', userSchema); // Create user model

module.exports = userModel; // Export user model