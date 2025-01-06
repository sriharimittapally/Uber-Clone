import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainLogin =  () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const {captain, setCaptain} = React.useContext(CaptainDataContext)
  const navigate= useNavigate()

  const Submithandler = async (e)=>{
    e.preventDefault();
    const captainData ={
      email:email,
      password:password
    }

    const response  = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

    if(response.status === 200){
      const data = response.data
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
 
    setemail('')
    setpassword('')
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
    <div>
      <img
        className="w-20 mb-3.1"
        src="https://www.svgrepo.com/show/505031/uber-driver.svg"
        alt=""
      />
      <form onSubmit={(e)=>{Submithandler(e)}}>
        <h3 className="text-lg font-medium mb-2">What's your email</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          type="email"
          placeholder="email@example.com"
          required
          value={email}
          onChange={(e)=>{setemail(e.target.value)}}
        />
        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
        <input
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={(e)=>{setpassword(e.target.value)}}
        />
        <button className="bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg">
          Login
        </button>
      </form>
      <p className="text-center">
        Join a fleet?{" "}
        <Link to="/captain-signup" className="text-blue-400">
          {" "}
          Register as a captain
        </Link>
      </p>
    </div>
    <div>
      <Link to="/login" className="bg-[#e9c649] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg">
        Sign in as User
      </Link>
    </div>
  </div>
  )
}

export default CaptainLogin