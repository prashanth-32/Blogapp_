import React, { useContext } from 'react'
import Usercontext from './UserContext';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {

  const {userInfo,setUserInfo} = useContext(Usercontext);
  const handleLogOut = async (e) =>{
    e.preventDefault();
    const res = await axios.post("https://blogapp-backend-ys0u.onrender.com/users/logout",null,{withCredentials:true});
    console.log(res);
    setUserInfo(null);
    <Navigate to={'/login'}/>
  }
  return (
    <div className='flex justify-around w-full mt-5 items-center shadow-md pb-3'>
      <div className='text-3xl font-bold w-[45%] text-center'><Link to={'/'}>BlogApp</Link> </div>
      <div className='flex justify-around w-[40%] items-center'>
        <p><Link to={'/yourPosts'}>Your posts</Link></p>
        <p><Link to={'/create'}>Create</Link></p>
        <button className='bg-emerald-500 text-white p-2 rounded-md'><Link to={'/profile'}>Profile</Link></button>
        <button className='bg-blue-600 text-white p-2 rounded-md' onClick={(e)=>handleLogOut(e)}>Logout</button>
      </div>
    </div>


  )
}

export default Navbar