import React, { createContext, useEffect } from 'react'; // Import necessary hooks and libraries
import { io } from 'socket.io-client'; // Import socket.io-client

export const SocketContext = createContext(); // Create SocketContext

const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Initialize socket connection

const SocketProvider = ({ children }) => { // Define SocketProvider component
    useEffect(() => { // useEffect hook to handle side effects
        // Basic connection logic
        socket.on('connect', () => { // Listen for connect event
            console.log('Connected to server');
        });

        socket.on('disconnect', () => { // Listen for disconnect event
            console.log('Disconnected from server');
        });

    }, []); // Empty dependency array to run only once

    return ( // Return JSX
        <SocketContext.Provider value={{ socket }}> {/* Provide socket */}
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider; // Export SocketProvider component