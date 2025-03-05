// // Import the captain model
// const captainModel = require('../models/captain.model');

// // Create a new captain
// module.exports.createCaptain = async ({
//     firstname, lastname, email, password, color, plate, capacity, vehicleType
// }) => {
//     // Check if required fields are provided
//     if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
//         throw new Error('All fields are required');
//     }
//     // Create a new captain in the database
//     const captain = captainModel.create({
//         fullname: {
//             firstname,
//             lastname
//         },
//         email,
//         password,
//         vehicle: {
//             color,
//             plate,
//             capacity,
//             vehicleType
//         }

//     })

//     // Return the created captain
//     return captain;
// }


// Import the captain model
const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// Create a new captain
module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType, location
}) => {
    // Check if required fields are provided
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType || !location) {
        throw new Error('All fields are required');
    }

    // Validate the location field
    if (!location.type || !location.coordinates || !Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
        throw new Error('Invalid location format. Expected { type: "Point", coordinates: [longitude, latitude] }');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10

    try {
        // Create a new captain in the database
        const captain = await captainModel.create({
            fullname: {
                firstname,
                lastname
            },
            email,
            password: hashedPassword, // Save the hashed password
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            },
            location: {
                type: location.type, // Include the location type
                coordinates: location.coordinates // Include the coordinates
            }
        });

        // Return the created captain
        return captain;
    } catch (error) {
        console.error('Error creating captain:', error);
        throw new Error('Failed to create captain');
    }
};