import React, { useContext } from "react";
import {CaptainDataContext} from '../context/CaptainContext'



const CaptainDetails = () => {

  const {captain} = useContext(CaptainDataContext);

  return (
    <div>
     
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-3">
            <img
              className="w-10 h-10 object-cover rounded-full"
              src="https://th.bing.com/th/id/OIP.rmH5ToV2hLkm5stTBwZmqwHaHa?rs=1&pid=ImgDetMain"
              alt=""
            />
            <h4 className="text-lg font-medium capitalize">{captain?.fullname.firstname + " " + captain?.fullname.lastname}</h4>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-semibold">₹ 295.60</h4>
            <p className="text-sm  text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex p-3 mt-8 bg-gray-100 rounded-lg items-center justify-between gap-5">
          <div className="text-center">
            <i className=" text-3xl mb-2  font-thin  ri-time-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-gray-600 text-sm">Hours Online</p>
          </div>
          <div className="text-center">
            <i className=" text-3xl mb-2  font-thin  ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-gray-600 text-sm">Distance Covered</p>
          </div>
          <div className="text-center">
            <i className=" text-3xl mb-2  font-thin  ri-booklet-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-gray-600 text-sm">Total Rides</p>
          </div>
        </div>
    </div>
  );
};

export default CaptainDetails;
