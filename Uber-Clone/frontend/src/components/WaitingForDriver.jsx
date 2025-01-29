import React from 'react' // Import React

const WaitingForDriver = (props) => { // Define WaitingForDriver component
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => { // Close button
        props.waitingForDriver(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      <div className='flex items-center justify-between'> {/* Driver details */}
        <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" /> {/* Driver image */}
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname}</h2> {/* Driver name */}
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4> {/* Vehicle plate */}
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p> {/* Vehicle model */}
          <h1 className='text-lg font-semibold'>{props.ride?.otp} </h1> {/* Ride OTP */}
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'> {/* Ride details */}
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'> {/* Pickup location */}
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'> {/* Destination */}
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'> {/* Fare */}
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver // Export WaitingForDriver component