import React from 'react' // Import React
import axios from 'axios' // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom' // Import useNavigate from react-router-dom

export const UserLogout = () => {

    const token = localStorage.getItem('token') // Get token from local storage
    const navigate = useNavigate() // Hook for navigation

    axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}` // Set authorization header
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token') // Remove token from local storage
            navigate('/login') // Navigate to login
        }
    })

    return (
        <div>UserLogout</div> // Render logout message
    )
}

export default UserLogout
