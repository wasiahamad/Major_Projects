// Import the captain model
const captainModel = require('../models/captain.model');

// Create a new captain
module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
    // Check if required fields are provided
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }
    // Create a new captain in the database
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    })

    // Return the created captain
    return captain;
}