// Import socket.io and models
const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

// Declare io variable
let io;

// Initialize socket.io with the server
function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    // Handle connection event
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        // Handle join event
        socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log(`user ${userId} joined as ${userType}`);

            // Update user or captain socketId in the database
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        // Handle update-location-captain event
        socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;

            // Validate location data
            if (!location || !location.lng || !location.lat) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            // Update captain location in the database
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    type: 'Point',
                    coordinates: [location.lng, location.lat]
                }
            });
        });

        // Handle disconnect event
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

// Send message to a specific socketId
const sendMessageToSocketId = (socketId, messageObject) => {
    // console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

// Export initializeSocket and sendMessageToSocketId functions
module.exports = { initializeSocket, sendMessageToSocketId };