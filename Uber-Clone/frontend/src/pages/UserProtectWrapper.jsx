import React, { useContext, useEffect, useState } from 'react' // Import necessary hooks and libraries
import { UserDataContext } from '../context/UserContext' // Import UserDataContext for managing user data
import { useNavigate } from 'react-router-dom' // Import useNavigate from react-router-dom
import axios from 'axios' // Import axios for making HTTP requests

const UserProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token') // Get token from local storage
    const navigate = useNavigate() // Hook for navigation
    const { user, setUser } = useContext(UserDataContext) // Use context to get and set user data
    const [ isLoading, setIsLoading ] = useState(true) // State for loading status

    useEffect(() => {
        if (!token) {
            navigate('/login') // Navigate to login if no token
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}` // Set authorization header
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data) // Set user data in context
                setIsLoading(false) // Set loading status to false
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token') // Remove token from local storage
                navigate('/login') // Navigate to login on error
            })
    }, [ token ])

    if (isLoading) {
        return (
            <div>Loading...</div> // Show loading message
        )
    }

    return (
        <>
            {children} {/* Render children components */}
        </>
    )
}

export default UserProtectWrapper