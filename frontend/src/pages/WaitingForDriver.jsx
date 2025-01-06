import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
    <h5 onClick={()=>{props.setWaitingForDriver(false)}} className="absolute top-0 p-3 text-center w-[95%] text-2xl">
      <i className=" text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
    </h5>
    <div className='flex items-center justify-between'>
    <img
        className="h-12"
        src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        alt=""
      />
      <div className='text-right'>
        <h2 className='font-medium text-base capitalize'>{props.ride?.captain?.fullname?.firstname + " " + props.ride?.captain?.fullname?.lastname}</h2>
        <h4 className='font-semibold text-xl -mt-1 -mb-1'>{props.ride?.captain?.plate}</h4>
        <p className='font-sm text-gray-600'>{props.ride?.captain?.vehicleType}</p>
        <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
      </div>
    </div>

    <div className="flex gap-2 justify-between items-center flex-col">
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-lg ri-map-pin-range-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
            {props.ride?.pickup}
            </p>
          </div>
        </div>
        <div className="flex items-center border-b-2 gap-5 p-3">
          <i className="ri-square-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {props.ride?.destination}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3">
          <i className="ri-bank-card-fill"></i>
          <div>
            <h3 className="text-lg font-medium">{props.ride?.fare}</h3>
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

export default WaitingForDriver