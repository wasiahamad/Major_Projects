// Import required modules
const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');

// Set the port from environment variable or default to 4000
const port = process.env.PORT || 4000;

// Create HTTP server
const server = http.createServer(app);

// Initialize socket.io with the server
initializeSocket(server);

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

