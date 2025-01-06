import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const FinishRide = (props) => {


const navigate = useNavigate()

  //end ride route
  const endRide =  async()=>{
    const response = await axios.post(`${import.meta.env.VIT_BASE_URL}/rides/endride`,{
      rideId: props.ride._id
    },{
     headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if(response.status  === 200){
      navigate('/captain-home')
    }
    
  }

  return (
    <div>
      <h5
        onClick={() => props.setFinishRidePanel(false)}
        className="absolute top-0 p-3 text-center w-[95%] text-2xl"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>
      <h4 className="text-2xl font-semibold mb-5">Finish this Ride!</h4>
      <div className="flex items-center justify-between mt-4 p-3 bg-white text-black rounded-xl">
        <div className="flex items-center gap-3 justify-center">
          <img
            className="h-12 w-12 object-cover rounded-full"
            src="https://petapixel.com/assets/uploads/2019/02/download-4.jpeg"
            alt="Rider's profile"
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user?.fullname.firstname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.3 KM</h5>
      </div>
      <div className="flex gap-2 justify-between items-center flex-col">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-range-fill"></i>
            <div>
              <h3 className="text-lg font-medium">5473-/3</h3>
              <p className="text-sm text-gray-300">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-square-fill"></i>
            <div>
              <h3 className="text-lg font-medium">564/3-4</h3>
              <p className="text-sm text-gray-300">{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-bank-card-fill"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-300">Cash</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center mt-3 p-3">
          <button onClick={endRide}
            className="text-center w-full bg-green-500 text-white font-bold p-3 rounded-lg"
          >
            Finish Ride
          </button>
          <p className="text-xs text-left mt-4 text-gray-300">
            Click on finish ride button if you have completed the payment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
