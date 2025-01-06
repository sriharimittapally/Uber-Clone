import React, { createContext, useContext, useState } from 'react'


export const CaptainDataContext = createContext()


const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState({})
    const [isloding, setIsLoding] = useState(false)
    const [error, setError] = useState('')

    const updateCaptain = (captainData) =>{
        setCaptain(captainData)
    }

    const value = {
        captain,
        setCaptain,
        isloding,
        setIsLoding,
        error,
        setError,
        updateCaptain
    }

  return (
  <CaptainDataContext.Provider value={value}>
    {children}
  </CaptainDataContext.Provider>
  )
}

export default CaptainContext