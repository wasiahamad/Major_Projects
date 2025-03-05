// import React, { useRef, useState } from 'react' // Import React, useRef, and useState hooks
// import { Link, useLocation } from 'react-router-dom' // Import Link and useLocation from react-router-dom
// import FinishRide from '../components/FinishRide' // Import FinishRide component
// import { useGSAP } from '@gsap/react' // Import useGSAP hook from gsap
// import gsap from 'gsap' // Import gsap for animations
// import LiveTracking from '../components/LiveTracking' // Import LiveTracking component

// const CaptainRiding = () => {

//     const [ finishRidePanel, setFinishRidePanel ] = useState(false) // State to manage finish ride panel visibility
//     const finishRidePanelRef = useRef(null) // Ref for finish ride panel
//     const location = useLocation() // Get current location
//     const rideData = location.state?.ride // Get ride data from location state
//     console.log(rideData) // Log ride data

//     useGSAP(function () {
//         if (finishRidePanel) {
//             gsap.to(finishRidePanelRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(finishRidePanelRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [ finishRidePanel ]) // Animate finish ride panel based on its state

//     return (
//         <div className='h-screen relative flex flex-col justify-end'>
//             <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
//                 <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" /> {/* Logo */}
//                 <Link to='/' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
//                     <i className="text-lg font-medium ri-logout-box-r-line"></i> {/* Logout icon */}
//                 </Link>
//             </div>

//             <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'
//                 onClick={() => {
//                     setFinishRidePanel(true) // Show finish ride panel on click
//                 }}
//             >
//                 <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {}}>
//                     <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i> {/* Arrow icon */}
//                 </h5>
//                 <h4 className='text-xl font-semibold'>{'4 KM away'}</h4> {/* Distance */}
//                 <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button> {/* Complete ride button */}
//             </div>
//             <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
//                 <FinishRide
//                     ride={rideData}
//                     setFinishRidePanel={setFinishRidePanel} /> {/* FinishRide component */}
//             </div>

//             <div className='h-screen fixed w-screen top-0 z-[-1]'>
//                 <LiveTracking /> {/* LiveTracking component */}
//             </div>
//         </div>
//     )
// }

// export default CaptainRiding



import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';
import axios from 'axios';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    const location = useLocation();
    const rideData = location.state?.ride;
    console.log(rideData);

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            });
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            });
        }
    }, [finishRidePanel]);

    const handleCompleteRide = async () => {
        try {
            // Call backend API to complete the ride
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/complete-ride`, {
                rideId: rideData._id, // Send ride ID to backend
            });

            if (response.status === 200) {
                console.log('Ride completed successfully:', response.data);
                setFinishRidePanel(true); // Show finish ride panel
            }
        } catch (error) {
            console.error('Error completing ride:', error);
        }
    };

    return (
        <div className='h-screen relative flex flex-col justify-end'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://cdn3.rallybound.com/content/images/img/28988/logo-header.png" alt="" /> {/* Logo */}
                <Link to='/' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i> {/* Logout icon */}
                </Link>
            </div>

            <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'
                onClick={() => {
                    setFinishRidePanel(true); // Show finish ride panel on click
                }}
            >
                <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {}}>
                    <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i> {/* Arrow icon */}
                </h5>
                <h4 className='text-xl font-semibold'>{'4 KM away'}</h4> {/* Distance */}
                <button
                    className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'
                    onClick={handleCompleteRide} // Call handleCompleteRide on button click
                >
                    Complete Ride
                </button> {/* Complete ride button */}
            </div>
            <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <FinishRide
                    ride={rideData}
                    setFinishRidePanel={setFinishRidePanel} /> {/* FinishRide component */}
            </div>

            <div className='h-screen fixed w-screen top-0 z-[-1]'>
                <LiveTracking /> {/* LiveTracking component */}
            </div>
        </div>
    );
};

export default CaptainRiding;
