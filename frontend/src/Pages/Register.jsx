import React ,{useState,useContext} from 'react'
import { Link ,Navigate} from 'react-router-dom'
import Usercontext from './UserContext';
import axios from "axios";

const Register = () => {
  const [user,setUser] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const {userInfo,setUserInfo} = useContext(Usercontext);
  const handleClick = async (e) =>{
      e.preventDefault();
      const res = await axios.post("https://blogapp-backend-ys0u.onrender.com/users/register",{username:user,password,email});
      console.log(res.data);
      if(res.status !== 200)
      {
        alert("Invalid details or User already exists");
      }
      else
      {
        setUserInfo(res.data);
      }
  }
  if(userInfo)
      return (<Navigate to={'/'}></Navigate>)
  return (
    <>
        <div className='bg-black text-white w-screen h-screen flex flex-col justify-center gap-10'>
            <h1 className='text-center text-2xl'>Register</h1>
            <form action="" className= 'flex flex-col gap-10 items-center justify-center'>
                <input type="text" placeholder='Enter your username' className='w-[20%] p-2 rounded-md text-black border-none outline-none' onChange={(e)=>setUser(e.target.value)}/>
                <input type="text" placeholder='Enter your email' className='w-[20%] p-2 rounded-md text-black border-none outline-none' onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder='Enter your password' className='w-[20%] p-2 rounded-md text-black border-none outline-none' onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit" className='bg-white text-black p-2 rounded-md font-bold' onClick={(e)=>handleClick(e)}>Register</button>
                <p>Already have an account? <Link to={'/login'} className='text-gray-500'>Click here</Link></p>
            </form>
        </div>
    </>
  )
}

export default Register