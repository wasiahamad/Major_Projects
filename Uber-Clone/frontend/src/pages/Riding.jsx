import React from 'react' // Import React
import { Link, useLocation } from 'react-router-dom' // Import Link and useLocation from react-router-dom
import { useEffect, useContext } from 'react' // Import necessary hooks
import { SocketContext } from '../context/SocketContext' // Import SocketContext for managing socket connections
import { useNavigate } from 'react-router-dom' // Import useNavigate from react-router-dom
import LiveTracking from '../components/LiveTracking' // Import LiveTracking component

const Riding = () => {
    const location = useLocation() // Hook for accessing location state
    const { ride } = location.state || {} // Retrieve ride data from location state
    const { socket } = useContext(SocketContext) // Use context to get socket instance
    const navigate = useNavigate() // Hook for navigation

    socket.on("ride-ended", () => {
        navigate('/home') // Navigate to home on ride end
    })

    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
                <LiveTracking /> {/* Render LiveTracking component */}
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img className='h-12' src="https://cdn3.rallybound.com/content/images/img/28988/logo-header.png" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>
                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className='text-lg font-medium'>562/11-A</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare} </h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding