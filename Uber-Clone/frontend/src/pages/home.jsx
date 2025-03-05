import React, { useEffect, useRef, useState, useContext } from 'react' // Import necessary hooks and libraries
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';
import { Link } from 'react-router-dom';

const Home = () => {
    const [pickup, setPickup] = useState('') // State for pickup location
    const [destination, setDestination] = useState('') // State for destination location
    const [panelOpen, setPanelOpen] = useState(false) // State for panel open/close
    const vehiclePanelRef = useRef(null) // Ref for vehicle panel
    const confirmRidePanelRef = useRef(null) // Ref for confirm ride panel
    const vehicleFoundRef = useRef(null) // Ref for vehicle found panel
    const waitingForDriverRef = useRef(null) // Ref for waiting for driver panel
    const panelRef = useRef(null) // Ref for panel
    const panelCloseRef = useRef(null) // Ref for panel close button
    const [vehiclePanel, setVehiclePanel] = useState(false) // State for vehicle panel open/close
    const [confirmRidePanel, setConfirmRidePanel] = useState(false) // State for confirm ride panel open/close
    const [vehicleFound, setVehicleFound] = useState(false) // State for vehicle found panel open/close
    const [waitingForDriver, setWaitingForDriver] = useState(false) // State for waiting for driver panel open/close
    const [pickupSuggestions, setPickupSuggestions] = useState([]) // State for pickup suggestions
    const [destinationSuggestions, setDestinationSuggestions] = useState([]) // State for destination suggestions
    const [activeField, setActiveField] = useState(null) // State for active field
    const [fare, setFare] = useState({}) // State for fare
    const [vehicleType, setVehicleType] = useState(null) // State for vehicle type
    const [ride, setRide] = useState(null) // State for ride


    const navigate = useNavigate() // Hook for navigation

    const { socket } = useContext(SocketContext) // Socket context
    const { user } = useContext(UserDataContext) // User context

    useEffect(() => {
        if (user && user._id) {
            socket.emit("join", { userType: "user", userId: user._id }); // Emit join event to socket
        }
    }, [user])

    socket.on('ride-confirmed', ride => {
        console.log(ride)
        setVehicleFound(false) // Set vehicle found to false
        setWaitingForDriver(true) // Set waiting for driver to true
        setRide(ride) // Set ride
    })

    socket.on('ride-started', ride => {
        console.log(ride)
        setWaitingForDriver(false) // Set waiting for driver to false
        navigate('/riding', { state: { ride } }) // Navigate to riding page with ride data
    })


    const handlePickupChange = async (e) => {
        setPickup(e.target.value) // Set pickup location
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Set authorization header
                }
            })
            setPickupSuggestions(response.data) // Set pickup suggestions
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value) // Set destination location
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Set authorization header
                }
            })
            setDestinationSuggestions(response.data) // Set destination suggestions
        } catch {
            // handle error
        }
    }

    const submitHandler = (e) => {
        e.preventDefault() // Prevent default form submission
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
                // opacity:1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                // opacity:0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])


    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [waitingForDriver])


    async function findTrip() {
        setVehiclePanel(true) // Set vehicle panel to true
        setPanelOpen(false) // Set panel open to false

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Set authorization header
            }
        })


        setFare(response.data) // Set fare

    }

    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Set authorization header
            }
        })
        console.log(response)
    }


    return (
        <div className='h-screen relative overflow-hidden'>
            {/* Uber Logo - Conditionally Rendered */}
            {!panelOpen && (
                <img className='w-16 absolute left-5 top-5 z-50' src="https://cdn3.rallybound.com/content/images/img/28988/logo-header.png" alt="Uber Logo" />
            )}

            {/* Logout Link - Conditionally Rendered */}
            {!panelOpen && (
                <Link to='/' className='h-10 w-10 bg-black flex items-center justify-center rounded-full absolute right-5 top-5 z-50'>
                    <i className="text-lg text-white font-medium ri-logout-box-r-line"></i>
                </Link>
            )}

            {/* LiveTracking Component */}
            <div className='h-screen w-screen relative z-10'>
                <LiveTracking />
            </div>

            {/* Bottom Panel */}
            <div className='flex flex-col justify-end h-screen absolute top-0 w-full z-20'>
                <div className='h-[30%] p-6 bg-white relative'>
                    <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <form className='relative py-3' onSubmit={submitHandler}>
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true);
                                setActiveField('pickup');
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true);
                                setActiveField('destination');
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
                            type="text"
                            placeholder='Enter your destination'
                        />
                    </form>
                    <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>

            {/* Vehicle Panel */}
            <div ref={vehiclePanelRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <VehiclePanel
                    selectVehicle={setVehicleType}
                    fare={fare}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehiclePanel={setVehiclePanel}
                />
            </div>

            {/* Confirm Ride Panel */}
            <div ref={confirmRidePanelRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            {/* Vehicle Found Panel */}
            <div ref={vehicleFoundRef} className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <LookingForDriver
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                    setVehicleFound={setVehicleFound}
                />
            </div>

            {/* Waiting for Driver Panel */}
            <div ref={waitingForDriverRef} className='fixed w-full z-30 bottom-0 bg-white px-3 py-6 pt-12'>
                <WaitingForDriver
                    ride={ride}
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver}
                />
            </div>
        </div>
    );
}

export default Home;