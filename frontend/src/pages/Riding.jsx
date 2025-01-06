import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";



const Riding = (props) => {

  const location = useLocation()
  const {ride} = location.state || {}
  const {socket} = useContext(SocketContext);
  const navigate = useNavigate()


  socket.on('ride-ended',()=>{
    navigate('/home')
  })


  return (
    <div className="h-screen">
        <Link to={'/home'} className="fixed left-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="text-lg font-medium ri-home-4-line"></i>
        </Link>
      <div className="h-1/2">
        <LiveTracking/>
      </div>
      <div className="h-1/2 p-4">
      <div className='flex items-center justify-between'>
    <img
        className="h-12"
        src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        alt=""
      />
      <div className='text-right'>
        <h2 className='font-medium text-base capitalize'>{ride?.captain?.fullname.firstname+" "+  props.ride?.captain?.fullname?.lastname}</h2>
        <h4 className='font-semibold text-xl -mt-1 -mb-1'>{ride?.plate}</h4>
        <p className='font-sm text-gray-600'>{ride?.vehicle.plate}</p>
      </div>
    </div>

    <div className="flex gap-2 justify-between items-center flex-col">
      <div className="w-full mt-5">
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
            <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">
            Cash
            </p>
          </div>
        </div>
      </div>
    </div>
            <button className="  w-full mt-5 bg-black text-white font-semibold p-2 rounded-lg">Make payment</button>
      </div>
    </div>
  );
};

export default Riding;
