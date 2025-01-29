const mongoose = require('mongoose'); // Import mongoose

// Define blacklist token schema
const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true // Unique token
    },
    createdAt: {
        type: Date,
        default: Date.now, // Set default value to current date
        expires: 86400 // Token expires after 24 hours (86400 seconds)
    }
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema); // Export blacklist token model