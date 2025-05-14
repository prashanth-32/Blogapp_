import { useState,useContext, useEffect } from "react";
import Usercontext from "./UserContext";
import axios from "axios";
import Post from "./Post";
import { Link } from "react-router-dom";

export const YourPosts = () => {
    const {userInfo,setUserInfo} = useContext(Usercontext);
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(false);
    useEffect(() => {
        const getPosts = async () =>{
        setLoading(() => true);
        const {data} = await axios.get(`https://blogapp-backend-ys0u.onrender.com/api/userPosts/${userInfo.username}`,null,{withCredentials:true});
        console.log(data);
        setPosts(data.posts);
        }
        getPosts();
        setLoading(() => false);
    }, [])
    
  if(loading)
    return <div className="flex w-full justify-center items-center">Loading....</div>;
  return (
    <div className="flex flex-col gap-2 items-center w-full">
      {posts.length > 0 ? posts.map(ele => {
        return (<Post key={ele._id} data={ele}/>)
      }) : <div>No posts available <Link to={'/create'} className="text-gray-600">Create new posts</Link></div>}
    </div>
  )
}
