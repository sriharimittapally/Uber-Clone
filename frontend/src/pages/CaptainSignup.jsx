import { useContext, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";


const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const navigate =useNavigate()


  
const {captain, setCaptain} = React.useContext(CaptainDataContext)


  const Submithandler = async (e) => {
    e.preventDefault();

    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle:{
        color: vehicleColor,
        plate: vehiclePlate,
        vehicleType: vehicleType,
        capacity: vehicleCapacity
      }
    };
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,newCaptain)

    if(response.status === 201){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-login')
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor('')
    setVehicleCapacity('')
    setVehiclePlate('')
    setVehicleType('')
  };

  return (
    <div className="p-6 h-screen flex flex-col justify-between">
    <div>
      <img
        className="w-20 mb-8"
        src="https://www.svgrepo.com/show/505031/uber-driver.svg"
        alt=""
      />
      <form
        onSubmit={(e) => {
          Submithandler(e);
        }}
      >
        {/* Captain's Name */}
        <h3 className="text-lg font-medium mb-3">What's our Captain's name</h3>
        <div className="flex gap-4 mb-5">
          <input
            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base"
            type="text"
            placeholder="First name"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base"
            type="text"
            placeholder="Last name"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
  
        {/* Captain's Email */}
        <h3 className="text-lg font-medium mb-3">What's our Captain's email</h3>
        <input
          className="bg-[#eeeeee] w-full rounded px-4 py-2 border text-base mb-5"
          type="email"
          placeholder="email@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
  
        {/* Password */}
        <h3 className="text-lg font-medium mb-3">Enter Password</h3>
        <input
          className="bg-[#eeeeee] w-full rounded px-4 py-2 border text-base mb-5"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
  
        {/* Vehicle Information */}
        <h3 className="text-lg font-medium mb-3">Vehicle Information</h3>
        <div className="flex gap-4 mb-5">
          <input
            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base"
            type="text"
            placeholder="Vehicle Color"
            required
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
          />
          <input
            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base"
            type="text"
            placeholder="Vehicle Plate"
            required
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
          />
        </div>
        <div className="flex gap-4 mb-5">
          <select
            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base"
            required
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
          >
            <option value="" disabled>
              Select Vehicle Type
            </option>
            <option value="motorcycle">Moto</option>
            <option value="car">Car</option>
            <option value="auto">Auto</option>
          </select>
          <input
            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base"
            type="number"
            placeholder="Vehicle Capacity"
            required
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
          />
        </div>
  
        {/* Submit Button */}
        <button className="bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg mt-3">
          Create Captain Account
        </button>
      </form>
      <p className="text-center mt-5">
        Already a Captain?{" "}
        <Link to="/captain-login" className="text-blue-400">
          Login here
        </Link>
      </p>
    </div>
    <div className="mt-8  text-[10px] leading-tight text-center">
      <p>
        This site is protected by reCAPTCHA and the{" "}
        <span className="underline">Google Privacy Policy</span> and{" "}
        <span className="underline">Terms of Service apply</span>.
      </p>
    </div>
  </div>
  );
};

export default CaptainSignup;
