import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
        <div className='h-screen pt-8 flex justify-between flex-col w-full bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1587307293162-2fb7a3ebfc75?q=80&w=692&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)]'>
        <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to="/login" className=' flex items-center justify-center w-full bg-black text-white mt-5 py-3 rounded'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start