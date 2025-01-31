const mongoose = require("mongoose"); // Import mongoose library
const Schema = mongoose.Schema; // Create a shorthand for mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose"); // Import passport-local-mongoose library

// Define a new schema for the user model
const UserSchema = new Schema({
    email: {
        type: String,
        required: true, // Make the email field required
    }
});

// Add passport-local-mongoose functionality to the user schema
UserSchema.plugin(passportLocalMongoose); // Add passport-local-mongoose functionality to the user schema

// Create a new model for the user schema
const User = mongoose.model("User", UserSchema);

// Export the user model
module.exports = User; // Export the user model for use in other files