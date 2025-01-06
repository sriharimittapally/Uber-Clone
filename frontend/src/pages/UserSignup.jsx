import React from 'react'
import { useState ,useContext} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios'
import {UserDataContext} from '../context/UserContext';

const UserSignup = () => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const navigate = useNavigate()

  const {user, setUser} = useContext(UserDataContext);

  const Submithandler = async (e)=>{
    e.preventDefault();

    const newUser={
      fullname:{
        firstname: firstName,
        lastname: lastName
      },
      email:email,
      password:password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)

    if(response.status === 201){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')

    }
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={(e)=>{Submithandler(e)}}>

        <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className='flex gap-4 mb-2'>
          <input
            className=" bg-[#eeeeee] w-1/2  mb-6 rounded px-4 py-2 border text-base placeholder:text-base"
            type="text"
            placeholder="First name"
            required
            value={firstName}
            onChange={(e)=>{setFirstName(e.target.value)}}
          />
          <input
            className="bg-[#eeeeee] w-1/2  mb-6 rounded px-4 py-2 border text-base placeholder:text-base"
            type="text"
            placeholder="Last name"
            required
            value={lastName}
            onChange={(e)=>{setLastName(e.target.value)}}
          />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
        
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-base"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg">
            Create account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            {" "}
            Login here
          </Link>
        </p>
      </div>
      <div>
       <p className='text-[8px] leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS
messages, including by automated means, from Uber and
its affiliates to the number provided.
This site is protected by reCAPTCHA and the Google
Privacy
Policy and Terms of Service apply.</p>
      </div>
    </div>
  )
}

export default UserSignup