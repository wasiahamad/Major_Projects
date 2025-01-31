const joi = require('joi'); // Import the Joi library for schema validation

module.exports.listingSchema = joi.object({ // Export the listing schema
    listing: joi.object({ // Define the listing object schema
        title: joi.string().required(), // Title must be a string and is required
        description: joi.string().required(), // Description must be a string and is required
        image: joi.string().allow("", null), // Image must be a string and can be empty or null
        price: joi.number().required().min(0), // Price must be a number, is required, and must be at least 0
        country: joi.string().required(), // Country must be a string and is required
        location: joi.string().required(), // Location must be a string and is required
    }) // .required() // The listing object itself is required
});

module.exports.reviewSchema = joi.object({ // Export the review schema
    review: joi.object({ // Define the review object schema
        comment: joi.string().required(), // Comment must be a string and is required
        rating: joi.number().required().min(1).max(5) // Rating must be a number, is required, and must be between 1 and 5
    }).required() // The review object itself is required
});


