import React from 'react'
import ConfirmRide from '../pages/ConfirmRide'

const RidePopUp = (props) => {
  return (
    <div>
        <h5  onClick={()=>{props.setRidePopupPanel(false)}} className="absolute top-0 p-3 text-center w-[95%] text-2xl">
        <i className=" text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>
      <h4 className="text-2xl font-semibold mb-5">New Ride Available!</h4>
     <div className='flex items-center justify-between mt-4 p-4 bg-gray-700 text-white rounded-xl'>
     <div className='flex items-center gap-3 justify-center'>
        <img className='h-12 w-12 object-cover rounded-full'src="https://petapixel.com/assets/uploads/2019/02/download-4.jpeg" alt="" />
        <h2 className='text-lg font-medium '>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
      </div>
      <h5 className='text-lg font-semibold'>2.2 KM</h5>
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
              <h3 className="text-lg font-medium">1-25/1-008</h3>
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
       <div className='w-full flex items-center justify-center gap-4 mt-2 p-3'>
       <button onClick={()=>{props.setRidePopupPanel(false)}} className=" w-1/2  bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg">
          Ignore
        </button>
        <button onClick={()=>{props.setConfirmRidePopupPanel(true), props.confirmRide()}} className=" w-1/2  bg-green-500 text-white  font-semibold p-2 rounded-lg">
          Accept
        </button>
       </div>
      </div>
    </div>
  )
}

export default RidePopUp