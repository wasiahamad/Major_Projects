// Import the express module
const express = require('express');
// Create a new router
const router = express.Router();
// Import the authentication middleware
const authMiddleware = require('../middlewares/auth.middleware');
// Import the map controller
const mapController = require('../controllers/map.controller');
// Import the express-validator module
const { query } = require('express-validator');

// Route to get coordinates of an address
router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getCoordinates
);

// Route to get distance and time between two locations
router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistanceTime
);

// Route to get autocomplete suggestions for a place
router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }).withMessage('Input must be at least 3 characters long'),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
);

// Export the router
module.exports = router;
