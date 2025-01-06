import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
    <h5 onClick={()=>{props.setVehicleFoundPanel(false)}} className="absolute top-0 p-3 text-center w-[95%] text-2xl">
      <i className=" text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
    </h5>
    <h4 className=" text-center text-2xl font-semibold mb-5">Looking for nearby drivers</h4>
    <div className="flex gap-2 justify-between items-center flex-col">
      <img
        className="h-20"
        src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        alt=""
      />
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-lg ri-map-pin-range-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {props.pickup}
            </p>
          </div>
        </div>
        <div className="flex items-center border-b-2 gap-5 p-3">
          <i className="ri-square-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {props.destination}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3">
          <i className="ri-bank-card-fill"></i>
          <div>
            <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
            <p className="text-sm -mt-1 text-gray-600">
            Cash
            </p>
          </div>
        </div>
      </div>
    
    </div>
  </div>
  )
}

export default LookingForDriver