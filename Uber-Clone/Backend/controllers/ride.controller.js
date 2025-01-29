const rideService = require('../services/ride.service'); // Import ride service
const { validationResult } = require('express-validator'); // Import express-validator
const mapService = require('../services/maps.service'); // Import map service
const { sendMessageToSocketId } = require('../socket'); // Import socket utility
const rideModel = require('../models/ride.model'); // Import ride model

// Controller to create a new ride
module.exports.createRide = async (req, res) => {
    const errors = validationResult(req); // Validate request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    const { pickup, destination, vehicleType } = req.body; // Get ride details from request body

    try {
        const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType }); // Create new ride
        res.status(201).json(ride); // Return created ride

        const pickupCoordinates = await mapService.getCoordinates(pickup); // Get pickup coordinates

        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.lng, pickupCoordinates.lat, 100); // Get captains in radius
        console.log('Found captains:', captainsInRadius);

        if (captainsInRadius.length === 0) {
            console.log('No captains found within the radius.'); // Log if no captains found
        }

        ride.otp = ""; // Assuming you have more code here to handle the ride creation process
        
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user'); // Populate user in ride

        captainsInRadius.map(captain => {
            console.log("captain.......", captain, ride)

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })
        })

    } catch (err) {
        console.error('Error creating ride:', err);
        res.status(500).json({ message: err.message });
    }
};

// Controller to get fare
module.exports.getFare = async (req, res) => {
    const errors = validationResult(req); // Validate request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    const { pickup, destination } = req.query; // Get pickup and destination from query

    try {
        const fare = await rideService.getFare(pickup, destination); // Get fare
        return res.status(200).json(fare); // Return fare
    } catch (err) {
        return res.status(500).json({ message: err.message }); // Return error
    }
}

// Controller to confirm ride
module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req); // Validate request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    const { rideId } = req.body; // Get ride ID from request body

    try {
        const ride = await rideService.confirmRide({ rideId, captain: req.captain }); // Confirm ride

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride); // Return confirmed ride
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message }); // Return error
    }
}

// Controller to start ride
module.exports.startRide = async (req, res) => {
    const errors = validationResult(req); // Validate request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    const { rideId, otp } = req.query; // Get ride ID and OTP from query

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain }); // Start ride

        console.log(ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride); // Return started ride
    } catch (err) {
        return res.status(500).json({ message: err.message }); // Return error
    }
}

// Controller to end ride
module.exports.endRide = async (req, res) => {
    const errors = validationResult(req); // Validate request
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    const { rideId } = req.body; // Get ride ID from request body

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain }); // End ride

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })

        return res.status(200).json(ride); // Return ended ride
    } catch (err) {
        return res.status(500).json({ message: err.message }); // Return error
    }
}
