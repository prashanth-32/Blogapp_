import { useContext,useEffect,useState } from 'react'
import Usercontext from './UserContext';
import { Navigate } from 'react-router-dom';
import Post from "./Post.jsx"
import axios from "axios";

const Home = () => {
  const {userInfo,setUserInfo} = useContext(Usercontext);
  if(!userInfo)
    return (<Navigate to={'/login'}/>)
  const [posts,setPosts] = useState([]);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    const getPosts = async () =>{
      setLoading(true);
      const res = await axios.get("https://blogapp-backend-ys0u.onrender.com/api/posts",null,{withCredentials:true});
      setPosts(res.data.posts);
    }
    getPosts();
    setLoading(false);
  }, [])
  
  if(loading)
    return <div className="flex w-full justify-center items-center">Loading....</div>;

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      {posts.map(ele => {
        return (<Post key={ele._id} data={ele}/>)
      })}
    </div>
  )
}

export default Home