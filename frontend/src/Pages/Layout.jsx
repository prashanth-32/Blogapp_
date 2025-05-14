import React, { useContext } from 'react'
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { Navigate, Outlet } from 'react-router-dom';
import Usercontext from './UserContext.jsx';

const Layout = () => {
  const {userInfo} = useContext(Usercontext);
  if(!userInfo)
    return <Navigate to={'/login'}/>
  return (
    <div className='flex gap-5 h-screen flex-col'>
        <div className='h-[10%]'><Navbar/></div>
        <div className=''><Outlet/></div>
        <div className=''><Footer/></div>
    </div>
  )
}

export default Layout