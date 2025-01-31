if(process.env.NODE_ENV !== "production") {
    require('dotenv').config(); // Load the environment variables from the .env file
}

// Require the necessary modules
const express = require("express"); // Import the Express library
const app = express(); // Create an Express application
const mongoose = require('mongoose'); // Import the Mongoose library for MongoDB
const path = require("path"); // Import the Path module for handling file paths
const methodOverride = require("method-override"); // Import the Method-Override library to support PUT and DELETE methods
const ejsMate = require("ejs-mate"); // Import the EJS-Mate library for EJS template engine
const ExpressError = require("./utils/ExpressError.js"); // Import a custom error handling class
const session = require("express-session"); // Import the Express-Session library
const MongoStore = require('connect-mongo');
const flash = require("connect-flash"); // Import the Connect-Flash library
const passport = require("passport"); // Import the Passport library for authentication
const LocalStrategy = require("passport-local"); // Import the LocalStrategy for Passport
const User = require("./models/user.js"); // Import the User model for authentication

// Import the routers for different routes
const ListingRouter = require("./routes/listing.js"); // Import the Listings router
const reviewRouter = require("./routes/review.js"); // Import the Reviews router
const userRouter = require("./routes/user.js"); // Import the User router


// Set up the application
app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", path.join(__dirname, "view")); // Set the directory for the EJS templates
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(methodOverride("_method")); // Override HTTP methods using query parameter
app.engine('ejs', ejsMate); // Use EJS-Mate for all EJS templates
app.use(express.static(path.join(__dirname, "/public"))); // Serve static files from the "public" directory

// Connect to the database and log the result

const dbUrl = process.env.ATLAS_URL; // Get the database URL from the environment variables  

main()
    .then((res) => {
        console.log("database is connected") // Log a message when the database is connected
    })
    .catch(err => console.log(err, "not connect")); // Log any errors that occur during database connection

// Define an async function to connect to MongoDB
async function main() {
    await mongoose.connect(dbUrl); // Connect to the MongoDB database
};

// Set up the session store with MongoStore for session storage in MongoDB 
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 3600, // time period in secondsm for which the session will be updated in the database 
    crypto: {
        secret: process.env.SECRET // Secret key for encrypting the session data
    }
});

store.on("error", () => {
    console.log("Session store error"); // Log an error if the session store has an error
});

// Set up the session middleware
const sessionOptions = {
    store, // Use the store for session storage
    secret: process.env.SECRET, // Secret key for session
    resave: false, // Do not resave the session if it has not changed 
    saveUninitialized: true, // Save uninitialized session
    cookie: {
        httpOnly: true, // Only allow HTTP access to the cookie
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Set the cookie expiration to 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7 // Set the cookie max age to 1 week
    }
}


// Use the session middleware
app.use(session(sessionOptions)); 
app.use(flash()); // Use the flash middleware

// Set up Passport for authentication
app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Use Passport session
passport.use(new LocalStrategy(User.authenticate())); // Use the LocalStrategy for authentication with the User model

passport.serializeUser(User.serializeUser()); // Serialize the user for session storage
passport.deserializeUser(User.deserializeUser()); // Deserialize the user from session storage

// Middleware to set local variables for flash messages and user data
app.use((req, res, next) => { 
    res.locals.success = req.flash("success"); // Set the success flash message
    res.locals.error = req.flash("error"); // Set the error flash message
    res.locals.currentUser = req.user; // Set the current user for use in templates
    next(); // Proceed to the next middleware
});

// Use the routers for specific paths
app.use("/listings", ListingRouter); // Any request to a path starting with "/listings" will be handled by the Listings router
app.use("/listings/:id/reviews", reviewRouter); // Any request to a path starting with "/listings/:id/reviews" will be handled by the reviews router 
app.use("/", userRouter); // Any request to the root path "/" will be handled by the User router

// Handle all other routes with a 404 error
app.all("*", (req, res, next) => {
    next(new ExpressError("Page not found", 404)); // Create a new ExpressError with a 404 status
});

// Error handling middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err; // Set default error status and message
    res.render("error.ejs", { message }); // Render the error page with the error message
    // res.status(statusCode).send(message); // Alternative: send the error message as plain text
});

// Start the server
app.listen(3000, () => {
    console.log("Port is listening on 3000"); // Log a message when the server starts
});




