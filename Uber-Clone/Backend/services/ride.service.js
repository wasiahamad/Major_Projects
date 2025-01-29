// Import the ride model
const rideModel = require('../models/ride.model');
// Import the socket messaging function
const { sendMessageToSocketId } = require('../socket');
// Import the map service
const mapService = require('./maps.service');
// Import the crypto module
const crypto = require('crypto');

// Function to calculate fare based on pickup and destination
const getFare = async (pickup, destination) => {
    // Get distance and time from map service
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    // Base fare for different vehicle types
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    // Per kilometer rate for different vehicle types
    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    // Per minute rate for different vehicle types
    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };
    console.log(distanceTime)

    // Calculate fare for different vehicle types
    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance / 1000) * perKmRate.auto) + ((distanceTime.duration / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance / 1000) * perKmRate.car) + ((distanceTime.duration / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance / 1000) * perKmRate.moto) + ((distanceTime.duration / 60) * perMinuteRate.moto))
    };

    // Return the calculated fare
    return fare;
};

// Export the getFare function
module.exports.getFare = getFare;

// Function to generate OTP
function getOtp(num) {
    // Generate OTP of specified length
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

// Create a new ride
module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    // Check if required fields are provided
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    // Calculate fare for the ride
    const fare = await getFare(pickup, destination);

    // Create a new ride in the database
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    });

    // Return the created ride
    return ride;
};

// Confirm a ride
module.exports.confirmRide = async ({
    rideId, captain
}) => {
    // Check if ride ID is provided
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    // Update ride status to accepted and assign captain
    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    // Find the updated ride and populate user and captain details
    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    // Check if ride is found
    if (!ride) {
        throw new Error('Ride not found');
    }

    // Return the updated ride
    return ride;
}

// Start a ride
module.exports.startRide = async ({ rideId, otp, captain }) => {
    // Check if ride ID and OTP are provided
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    // Find the ride and populate user and captain details
    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    // Check if ride is found
    if (!ride) {
        throw new Error('Ride not found');
    }

    // Check if ride is accepted
    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    // Check if OTP is valid
    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    // Update ride status to ongoing
    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    // Send message to user that ride has started
    sendMessageToSocketId(ride.user.socketIde, {
        event: "ride-started",
        data: ride
    })

    // Return the updated ride
    return ride;
}

// End a ride
module.exports.endRide = async ({ rideId, captain }) => {
    // Check if ride ID is provided
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    // Find the ride and populate user and captain details
    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    // Check if ride is found
    if (!ride) {
        throw new Error('Ride not found');
    }

    // Check if ride is ongoing
    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    // Update ride status to completed
    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    // Return the updated ride
    return ride;
}



