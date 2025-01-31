
const User = require("../models/user.js"); // Import the User model


// Render the registration view
module.exports.register = (req, res) => {  
    res.render("users/signup.ejs"); // Render the registration view
} 

// Handle user registration and log the user in after successful registration 
module.exports.registerUser = async (req, res) => { 

    try {
        const { username, email, password } = req.body; // Destructure the request body to get the username, email, and password
        const newUser = new User({ username, email }); // Create a new user object with the provided username and email
        const ragisteredUser = await User.register(newUser, password); // Register the user with the provided password
        console.log(ragisteredUser); // Log the registered user object to the console
        // Log the user in after registration
        req.login(ragisteredUser, (err) => {
            if (err) {
                return next(err); // Pass the error to the next middleware
            }
            // Log the user in after registration
            req.flash("success", "Welcome to Wanderlust!"); // Set a success flash message
            res.redirect("/listings"); // Redirect the user to the listings page
        })
    } catch (error) {
        req.flash("error", error.message); // Set an error flash message with the error message
        res.redirect("/signup"); // Redirect the user back to the registration page
    }
}



// Render the login view 
module.exports.login =  (req, res) => {
    res.render("users/login.ejs"); // Render the login view
}

// Handle user login and redirect to the previous page or the listings page
module.exports.loginUser = async (req, res) => {
    req.flash("success", "Welcome back!"); // Set a success flash message
    const redirectUrl = res.locals.redirectUrl || "/listings"; // Get the redirect URL from the session or default to the listings page    
    res.redirect(redirectUrl); // Redirect the user to the redirect URL or the listings page if no redirect URL is set
}; 

// Handle user logout and redirect to the listings page 
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out now!"); // Set a success flash message
        res.redirect("/listings"); // Redirect the user to the listings page
    });
}; 


