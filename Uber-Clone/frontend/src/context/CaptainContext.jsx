import { createContext, useState, useContext } from 'react'; // Import necessary hooks and libraries

export const CaptainDataContext = createContext(); // Create CaptainDataContext

const CaptainContext = ({ children }) => { // Define CaptainContext component
    const [ captain, setCaptain ] = useState(null); // State for captain data
    const [ isLoading, setIsLoading ] = useState(false); // State for loading status
    const [ error, setError ] = useState(null); // State for error

    const updateCaptain = (captainData) => { // Function to update captain data
        setCaptain(captainData);
    };

    const value = { // Context value
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    };

    return ( // Return JSX
        <CaptainDataContext.Provider value={value}> {/* Provide context value */}
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext; // Export CaptainContext component