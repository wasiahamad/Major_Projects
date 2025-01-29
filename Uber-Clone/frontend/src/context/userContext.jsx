import React, { createContext, useState } from 'react' // Import necessary hooks and libraries

export const UserDataContext = createContext() // Create UserDataContext

const UserContext = ({ children }) => { // Define UserContext component

    const [ user, setUser ] = useState({ // State for user data
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })

    return ( // Return JSX
        <div>
            <UserDataContext.Provider value={{ user, setUser }}> {/* Provide user data and setUser function */}
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext // Export UserContext component