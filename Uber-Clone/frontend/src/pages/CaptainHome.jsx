import React, { useRef, useState } from 'react' // Import necessary hooks and libraries
import { Link } from 'react-router-dom' // Import Link component for navigation
import CaptainDetails from '../components/CaptainDetails' // Import CaptainDetails component
import RidePopUp from '../components/RidePopUp' // Import RidePopUp component
import { useGSAP } from '@gsap/react' // Import useGSAP hook
import gsap from 'gsap' // Import gsap library
import ConfirmRidePopUp from '../components/ConfirmRidePopUp' // Import ConfirmRidePopUp component
import { useEffect, useContext } from 'react' // Import useEffect and useContext hooks
import { SocketContext } from '../context/SocketContext' // Import SocketContext
import { CaptainDataContext } from '../context/CaptainContext' // Import CaptainDataContext
import axios from 'axios' // Import axios for making HTTP requests

const CaptainHome = () => { // Define CaptainHome component

    const [ridePopupPanel, setRidePopupPanel] = useState(false) // State for ride popup panel visibility
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false) // State for confirm ride popup panel visibility

    const ridePopupPanelRef = useRef(null) // Ref for ride popup panel
    const confirmRidePopupPanelRef = useRef(null) // Ref for confirm ride popup panel
    const [ride, setRide] = useState(null) // State for ride details

    const { socket } = useContext(SocketContext) // Get socket from SocketContext
    const { captain } = useContext(CaptainDataContext) // Get captain data from CaptainDataContext

    useEffect(() => { // useEffect hook to handle side effects
        socket.emit('join', { // Emit join event to socket
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => { // Function to update location
            if (navigator.geolocation) { // Check if geolocation is available
                navigator.geolocation.getCurrentPosition(position => { // Get current position

                    console.log({ // Log position
                        userId: captain._id,
                        location: {
                            lng: position.coords.longitude,
                            lat: position.coords.latitude
                        }
                    })

                    socket.emit('update-location-captain', { // Emit update-location-captain event to socket
                        userId: captain._id,
                        location: {
                            lng: position.coords.longitude,
                            lat: position.coords.latitude

                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000) // Set interval to update location every 10 seconds
        updateLocation() // Update location immediately

        return () => clearInterval(locationInterval) // Clear interval on component unmount
    }, []) // Empty dependency array to run only once

    socket.on('new-ride', (data) => { // Listen for new-ride event from socket
        // console.log(data)
        setRide(data) // Set ride data
        setRidePopupPanel(true) // Show ride popup panel
    })

    async function confirmRide() { // Function to confirm ride

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, { // Make POST request to confirm ride

            rideId: ride._id,
            captainId: captain._id,

        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Set authorization header
            }
        })

        setRidePopupPanel(false) // Hide ride popup panel
        setConfirmRidePopupPanel(true) // Show confirm ride popup panel
    }


    useGSAP(function () { // useGSAP hook to handle animations
        if (ridePopupPanel) { // If ride popup panel is visible
            gsap.to(ridePopupPanelRef.current, { // Animate ride popup panel
                transform: 'translateY(0)'
            })
        } else { // If ride popup panel is not visible
            gsap.to(ridePopupPanelRef.current, { // Animate ride popup panel
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopupPanel]) // Dependency array to run when ridePopupPanel changes

    useGSAP(function () { // useGSAP hook to handle animations
        if (confirmRidePopupPanel) { // If confirm ride popup panel is visible
            gsap.to(confirmRidePopupPanelRef.current, { // Animate confirm ride popup panel
                transform: 'translateY(0)'
            })
        } else { // If confirm ride popup panel is not visible
            gsap.to(confirmRidePopupPanelRef.current, { // Animate confirm ride popup panel
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopupPanel]) // Dependency array to run when confirmRidePopupPanel changes

    return ( // Return JSX
        <div className='h-screen'> {/* Main container */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'> {/* Header */}
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" /> {/* Uber logo */}
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'> {/* Logout button */}
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'> {/* Image container */}
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> {/* Background image */}

            </div>
            <div className='h-2/5 p-6'> {/* Captain details container */}
                <CaptainDetails /> {/* CaptainDetails component */}
            </div>
            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'> {/* Ride popup panel */}
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'> {/* Confirm ride popup panel */}
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    )
}

export default CaptainHome // Export CaptainHome component