// Define a function to wrap async route handlers
const wrapAsync = (fn) => {
    // Return a new function that handles errors
    return (req, res, next) => {
        // Call the async function and pass any errors to next()
        fn(req, res, next).catch(next);
    };
};

// Export the wrapAsync function for use in other files
module.exports = wrapAsync;

