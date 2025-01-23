import React from 'react'

const ConfirmRide = (props) => {
    return (
        <div>
            <h5 className='p-2 text-center absolute top-0 w-[93%]'  onClick={() => {
                props.setConfirmRidePanel(false)
                }} >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className='text-2xl font-semibold mb-5'>Confirm your ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium '>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
                        </div>
                    </div>
                    
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium '>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bhopal</p>
                        </div>
                    </div>

                    <div className='flex items-center gap-5 p-3 '>
                        <i className="text-lg ri-currency-line"></i> 
                        <div>
                            <h3 className='text-lg font-medium '>₹193.26</h3>
                            <p className='text-sm -mt-1 text-gray-600'>cash: Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    props.setVehicleFound(true)
                    props.setConfirmRidePanel(false)
                }}
                className='w-full mt-5 bg-green-500 text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>

        </div>
    )
}

export default ConfirmRide