import React, { createContext, useState } from 'react'

const Usercontext = createContext()

export default Usercontext;

export const UserContextProvider = ({children}) => {
    const [userInfo,setUserInfo] = useState(null);
  return (
    <Usercontext.Provider value={{userInfo,setUserInfo}}>
        {children}
    </Usercontext.Provider>
  )
}
