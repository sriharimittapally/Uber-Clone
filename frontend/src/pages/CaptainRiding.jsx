import React, { useRef, useState } from "react";
import { Link ,useLocation} from "react-router-dom";
import { useGSAP} from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {

const[finishRidePanel, setFinishRidePanel] = useState(false);
const finishRidePanelRef =  useRef(null);
const location = useLocation()
const rideData = location.state?.ride


  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen">
      <div className="w-full fixed p-6 top-0 flex items-center justify-between">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to={"/captain-home"}
          className="h-10 w-10 bg-gray-50 flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
      <LiveTracking/>
      </div>
      <div className="h-1/5 px-3 py-2 rounded-t-sm bg-gray-800">
        <h5 onClick={()=>{
          setFinishRidePanel(true)
        }} className="text-center -mt-2">
          <i className=" text-3xl text-white ri-arrow-up-wide-line"></i>
        </h5>
        <div className=" items-center flex justify-between font-semibold text-white mt-6">
          <h4 className="text-xl font-bold">{'4 KM away'}</h4>
          <button className="text-center w-1/2  bg-green-500 text-white font-semibold p-2 rounded-lg">
            Complete Ride
          </button>
        </div>
      </div>
      <div
        ref={finishRidePanelRef}
        className=" bg-gray-800 text-white px-3 py-6 pt-12 translate-y-full fixed z-10 bottom-0 w-full"
      >
        <FinishRide 
        ride={rideData}
        setFinishRidePanel={setFinishRidePanel}/>
        </div>
        

    </div>
  );
};

export default CaptainRiding;
