import React from 'react'

const LocationSearchPanel = (props) => {

    const Locations = [
        "24B, Near Kapoor's cafe, Suresh gyan vihar, jaipur",
        "25A, Near mahal's cafe, Suresh gyan vihar, jaipur",
        "24C, Near sharma's cafe, Suresh gyan vihar, jaipur",
        "24D, Near Kumar's cafe, Suresh gyan vihar, jaipur"
    ]

    return (

        <div>
            {/* this is just a simple data  */}
             {
                Locations.map(function(elem, idx) {
                    return <div key={idx} onClick={() => {
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }}
                    className='flex gap-4 items-center justify-start border-2 border-gray-100 active:border-black p-3 rounded-xl items-center my-2'>
                    <h2 className='bg-[#eee] my-4 flex items-center justify-center w-12 h-8 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                    <h4 className='font-medium'>{elem}</h4>
                </div>
                })
             }
            
        </div>
    )
}

export default LocationSearchPanel