import React from 'react' // Import React
import axios from 'axios' // Import axios for making HTTP requests
import { useNavigate } from 'react-router-dom' // Import useNavigate hook from react-router-dom

export const CaptainLogout = () => {
    const token = localStorage.getItem('captain-token') // Get token from localStorage
    const navigate = useNavigate() // Initialize navigate function

    axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${token}` // Set authorization header
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('captain-token') // Remove token from localStorage on success
            navigate('/captain-login') // Redirect to login on success
        }
    })

    return (
        <div>CaptainLogout</div> // Render logout message
    )
}

export default CaptainLogout