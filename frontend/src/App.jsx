import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import Usercontext from './Pages/UserContext'
import PageNotFound from './Pages/PageNotFound'
import Blog from './Pages/Blog'
import PostPage from './Pages/PostPage'
import EditPost from './Pages/EditPost'
import { YourPosts } from './Pages/YourPosts'

function App() {

  const {userInfo,setUserInfo} = useContext(Usercontext);
  
  useEffect(()=>{
    const getData = async () =>{
      const res = await axios.get("https://blogapp-backend-ys0u.onrender.com/users/info",{withCredentials:true});
      setUserInfo(res.data);
    }
    getData();
  },[]);
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/create' element={<Blog/>}/>
          <Route path='/post/:id' element={<PostPage/>}/>
          <Route path='/edit/:id' element={<EditPost/>}/>
          <Route path='/yourPosts/' element={<YourPosts/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </>
  )
}

export default App
