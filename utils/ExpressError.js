// Define a custom error class for Express applications
class ExpressError extends Error {
    // Constructor to initialize the error with a message and status code
    constructor(message, statusCode) {
        super(); // Call the parent class (Error) constructor
        this.message = message; // Set the error message
        this.statusCode = statusCode; // Set the HTTP status code
    }
}

// Export the ExpressError class for use in other files
module.exports = ExpressError;

