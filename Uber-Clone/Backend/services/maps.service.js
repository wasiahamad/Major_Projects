// Import the axios module
const axios = require('axios');
// Import the captain model
const captainModel = require('../models/captain.model');
// Import the Mapbox geocoding service
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');

// Function to get coordinates of a place
const getCoordinates = async (place) => {
    // Get the Mapbox API key from environment variables
    const apiKey = process.env.MAPBOX_API;
    // Construct the URL for the geocoding request
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${apiKey}`;

    try {
        // Send the geocoding request
        const response = await axios.get(url);
        // Check if the response contains features
        if (response.data.features && response.data.features.length > 0) {
            // Get the coordinates of the first feature
            const location = response.data.features[0].center;
            return {
                lng: location[0],
                lat: location[1]
            };
        } else {
            throw new Error(`Unable to fetch coordinates for ${place}`);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Export the getCoordinates function
module.exports.getCoordinates = getCoordinates;

// Function to get distance and time between two locations
module.exports.getDistanceTime = async (origin, destination) => {
    // Check if origin and destination are provided
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    // Get coordinates of origin and destination
    const originCoordinates = await getCoordinates(origin);
    const destinationCoordinates = await getCoordinates(destination);

    // Construct the origin and destination strings
    const originString = `${originCoordinates.lng},${originCoordinates.lat}`;
    const destinationString = `${destinationCoordinates.lng},${destinationCoordinates.lat}`;

    // Get the Mapbox API key from environment variables
    const apiKey = process.env.MAPBOX_API;
    // Construct the URL for the directions request
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${encodeURIComponent(originString)};${encodeURIComponent(destinationString)}.json?access_token=${apiKey}`;

    try {
        // Send the directions request
        const response = await axios.get(url);
        // Check if the response is successful
        if (response.data.code === 'Ok') {
            // Get the route from the response
            const route = response.data.routes[0];
            return {
                distance: route.distance,
                duration: route.duration,
                distanceText: `${(route.distance / 1000).toFixed(2)} km`,
                durationText: `${Math.floor(route.duration / 60)} mins`
            };
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {
        console.error(err, "error from services");
        throw err;
    }
};

// Function to get autocomplete suggestions for a place
module.exports.getAutoCompleteSuggestions = async (input) => {
    // Check if input is provided
    if (!input) {
        throw new Error('Query is required');
    }

    // Get the Mapbox API key from environment variables
    const apiKey = process.env.MAPBOX_API;
    // Construct the URL for the autocomplete request
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json?autocomplete=true&access_token=${apiKey}`;

    try {
        // Send the autocomplete request
        const response = await axios.get(url);
        // Check if the response contains features
        if (response.data.features && response.data.features.length > 0) {
            // Return the place names of the features
            return response.data.features.map(feature => feature.place_name);
        } else {
            throw new Error('No suggestions found');
        }
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        throw error;
    }
};

// Function to get captains within a radius of a location
module.exports.getCaptainsInTheRadius = async (lng, lat, radius) => {
    // Check if coordinates are provided
    if (!lng || !lat) {
        throw new Error('Invalid coordinates');
    }

    console.log(`Searching for captains within ${radius} km of (${lng}, ${lat})`);

    // Find captains within the radius
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lng, lat], radius / 6371] // radius in radians
            }
        }
    });

    // Return the found captains
    return captains;
};
