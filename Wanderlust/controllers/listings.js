const Listing = require("../models/listings.js"); // Import the Listing model
const mapToken = process.env.MAP_TOKEN; // Get the Mapbox token from the environment variables
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); // Import the Mapbox Styles service 
const geocodingClient = mbxGeocoding({ accessToken: mapToken }); // Create a new Mapbox Styles service with the Mapbox token 

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({}); // Find all listings in the database
    res.render("listings/index.ejs", { allListings }); // Render the listings index page with all listings
};

// Show route for a specific listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params; // Get the listing ID from the request parameters
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author" // Populate the author of each review
        },
    }).populate("owner");  // Find the listing by ID and populate its reviews and owner
    // If the listing is not found, flash an error message and redirect to the listings index page
    if (!listing) { // Check if the listing exists
        req.flash("error", "Cannot find that listing! Doesn`t exist"); // Flash an error message if the listing is not found
        res.redirect("/listings"); // Redirect to the listings index page
    }
    res.render("listings/show.ejs", { listing }); // Render the listing's show page with the listing data
}

// Render the form to create a new listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs"); // Render the form to create a new listing
}

// Update route for a specific listing
module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient
    .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    })
    .send(); // Send a request to the Mapbox Geocoding API

    let url = req.file.path; // Get the image URL from the request file 
    let filename = req.file.filename; // Get the image filename from the request file

    let listing = new Listing(req.body.listing); // Create a new listing with the request body data
    listing.owner = req.user._id; // Set the owner of the listing to the current user

    listing.image = { url, filename }; // Set the image of the listing to the image URL and filename

    listing.geometry = response.body.features[0].geometry; // Set the geometry of the listing to the response body features geometry

    let savedListing = await listing.save(); // Save the listing to the database
    console.log(savedListing); // Log the saved listing
    req.flash("success", "Successfully made a new listing!"); // Flash a success message
    res.redirect("/listings"); // Redirect to the listings index page
}

// Render the form to edit a specific listing
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params; // Get the listing ID from the request parameters
    const listing = await Listing.findById(id); // Find the listing by ID
    // If the listing is not found, flash an error message and redirect to the listings index page
    if (!listing) { // Check if the listing exists
        req.flash("error", "Cannot find that listing! Doesn`t exist"); // Flash an error message if the listing is not found
        res.redirect("/listings"); // Redirect to the listings index page
    }

    let originalImageUrl = listing.image.url; // Get the original image URL of the listing 
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250"); // Replace all backslashes with forward slashes
    res.render("listings/edit.ejs", { listing, originalImageUrl }); // Render the form to edit the listing
}

// Update route for a specific listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params; // Get the listing ID from the request parameters
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // Update the listing with the request body data

    // (image update krne ka logic)
    if (typeof req.file !== "undefined") { // Check if the request file is undefined
        let url = req.file.path; // Get the image URL from the request file 
        let filename = req.file.filename; // Get the image filename from the request file
        listing.image = { url, filename }; // Set the image of the listing to the image URL and filename
        await listing.save(); // Save the updated listing to the database
    }

    req.flash("success", "Successfully updated a listing!"); // Flash a success message for the updated listing
    res.redirect(`/listings/${id}`); // Redirect to the listing's show page
};

// Delete route for a specific listing
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params; // Get the listing ID from the request parameters
    await Listing.findByIdAndDelete(id); // Delete the listing from the database
    req.flash("success", "Successfully Deleted a listing!"); // Flash a success message for the deleted listing
    res.redirect("/listings"); // Redirect to the listings index page
}


