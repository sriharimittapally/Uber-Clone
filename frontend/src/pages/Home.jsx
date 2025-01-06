import React, { useContext, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "./ConfirmRide";
import LookingForDriver from "./LookingForDriver";
import WaitingForDriver from "./WaitingForDriver";
import {SocketContext} from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";


const Home = () => {

  const navigate = useNavigate()
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);

  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);

  const [vehicleFoundPanel, setVehicleFoundPanel] = useState(false);
  const vehicleFoundPanelRef = useState(null);

  const waitingForDriverRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [ activeField, setActiveField ] = useState(null)

  const [fare, setFare] = useState({});

  const [vehicleType, setVehicleType] = useState(null);

  const {socket} = useContext(SocketContext);
  const {user} = useContext(UserDataContext);

  const [ride, setRide] = useState(null)

  useEffect(()=>{
    socket.emit("join",{userType: "user", userId :user._id})
  },[user])

  //socket ride-confimed
  socket.on('ride-confirmed', ride=>{
    setVehicleFoundPanel(false)
    setWaitingForDriver(true)

    setRide(ride)
  })

  //socket ride-started
 socket.on('ride-started', ride=>{
      setWaitingForDriver(false);
      navigate('/riding', {state: {ride}})
 })



  //handlePickUpChange
  const handlePickUpChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorizaton: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch (err) {
      //handle error
    }
  };

  //handleDestinationChange
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorizaton: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch (err) {
      //handle error
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  //Booking panel
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          // opacity:1
        });

        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          // opacity:0
        });

        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen]
  );

  //Vehicle Panel
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );

  //Vechicle ConfimRide Panel
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  // //vechicel found
  useGSAP(
    function () {
      if (vehicleFoundPanel) {
        gsap.to(vehicleFoundPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFoundPanel]
  );

  //Waiting for driver
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });

        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  //findtrip button funtion
  const findTrip = async () => {
    setVehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: {
          pickup,
          destination,
        },
        headers: {
          Authorizaton: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFare(response.data);
  };

  //create Ride
  const createRide = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create-ride`,
      {
        pickup,
        destination,
        vehicleType,
      },
      {
        headers: {
          Authorizaton: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute ml-6 left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt=""
      />
      <div className="h-screen w-screen">
        {/* Image for tempoaray use */}
        <LiveTracking/>
      </div>
      <div className="absolute  flex flex-col justify-end w-full top-0 h-screen">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 top-6 right-5 text-2xl"
          >
            {" "}
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute height h-16 left-10 w-1 top-[45%] bg-gray-950 rounded-full"></div>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={handlePickUpChange}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white px-4 py-2 w-full mt-3 rounded-lg"
          >
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className=" bg-white h-0">
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}/>
        </div>
      </div>

      {/* Vehicle panel */}
      <div
        ref={vehiclePanelRef}
        className=" bg-white px-1 py-10 pt-12 fixed z-10 bottom-0 translate-y-full w-full"
      >
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          fare={fare}
          selectVehicle={setVehicleType}
        />
      </div>

      {/* Confirm ride panel */}
      <div
        ref={confirmRidePanelRef}
        className=" bg-white px-3 py-6 pt-12 fixed z-10 bottom-0 translate-y-full w-full"
      >
        <ConfirmRide
        fare={fare}  
        pickup={pickup}
        destination={destination}
        vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFoundPanel={setVehicleFoundPanel}
      
        />
      </div>

      {/* Vechicle found Panel */}
      <div
        ref={vehicleFoundPanelRef}
        className=" bg-white px-3 py-6 pt-12 fixed z-10 bottom-0 translate-y-full w-full"
      >
        <LookingForDriver 
        fare={fare}  
        pickup={pickup}
        destination={destination}
        vehicleType={vehicleType}
        setVehicleFoundPanel={setVehicleFoundPanel} />
      </div>

      {/* Waiting for driver panel */}
      <div
        ref={waitingForDriverRef}
        className=" bg-white px-3 py-6 pt-12 fixed z-10 bottom-0 translate-y-full w-full"
      >
        <WaitingForDriver 
        ride={ride}
        setVehicleFoundPanel={setVehicleFoundPanel}
        waitingForDriver={waitingForDriver}
        setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
