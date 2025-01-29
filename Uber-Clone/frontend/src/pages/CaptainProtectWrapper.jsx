import React, { useContext, useEffect, useState } from 'react' // Import React, useContext, useEffect, and useState hooks
import { CaptainDataContext } from '../context/CaptainContext' // Import CaptainDataContext
import { useNavigate } from 'react-router-dom' // Import useNavigate hook from react-router-dom
import axios from 'axios' // Import axios for making HTTP requests

const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token') // Get token from localStorage
    const navigate = useNavigate() // Initialize navigate function
    const { captain, setCaptain } = useContext(CaptainDataContext) // Use CaptainDataContext
    const [ isLoading, setIsLoading ] = useState(true) // State to manage loading state

    useEffect(() => {
        if (!token) {
            navigate('/captain-login') // Redirect to login if no token
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}` // Set authorization header
            }
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain) // Set captain data in context
                setIsLoading(false) // Set loading state to false
            }
        })
            .catch(err => {
                localStorage.removeItem('token') // Remove token from localStorage on error
                navigate('/captain-login') // Redirect to login on error
            })
    }, [ token ]) // Run effect when token changes

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

export default CaptainProtectWrapper