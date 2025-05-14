import { useState } from "react"
import {ImCross} from 'react-icons/im'
import { useContext } from 'react'
import Usercontext from "./UserContext"
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'


const Blog = ({props}) => {
    const [title,setTitle]=useState("")
    const [desc,setDesc]=useState("")
    const [file,setFile]=useState(null)
    const {userInfo}=useContext(Usercontext);
    const [cat,setCat]=useState("")
    const [cats,setCats]=useState([])
    const [redirect,setRedirect] = useState(false);

    const deleteCategory=(i)=>{
       let updatedCats=[...cats]
       updatedCats.splice(i,1);
       setCats(updatedCats);
    }

    const addCategory=()=>{
        let updatedCats=[...cats]
        updatedCats.push(cat)
        setCat("")
        setCats(updatedCats)
    }

    const handleCreate=async (e)=>{
        e.preventDefault();
        const tot = {title,description:desc,categories:cats,author:userInfo.username,image_url:""};
        if(file)
        {
          const data = new FormData();
          data.append('file',file);
          const res = await axios.post("https://blogapp-backend-ys0u.onrender.com/api/upload",data,{withCredentials:true});
          tot.image_url = res.data.message;
        }
        const res = await axios.post("https://blogapp-backend-ys0u.onrender.com/api/post",tot,{withCredentials:true});
        setRedirect(true);
    }

    if(redirect) return <Navigate to={'/'}/>
  return (
    <div>
        <div className='px-6 md:px-[200px] mt-8'>
        <h1 className='font-bold md:text-2xl text-xl '>Create a post</h1>
        <form className='w-full flex flex-col space-y-4 md:space-y-8 mt-4'>
          <input onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Enter post title' className='px-4 py-2 outline-none border-black border rounded-md'/>
          <input onChange={(e)=>setFile(e.target.files[0])} type="file"  className='px-4'/>
          <div className='flex flex-col'>
            <div className='flex items-center space-x-4 md:space-x-8'>
                <input value={cat} onChange={(e)=>setCat(e.target.value)} className='px-4 py-2 outline-none border-black border rounded-md' placeholder='Enter post category' type="text"/>
                <div onClick={addCategory} className='bg-black text-white px-4 py-2 font-semibold cursor-pointer rounded-md'>Add</div>
            </div>

            {/* categories */}
            <div className='flex px-4 mt-3'>
            {cats?.map((c,i)=>(
                <div key={i} className='flex justify-center items-center space-x-2 mr-4 bg-gray-200 px-2 py-1 rounded-md'>
                <p>{c}</p>
                <p onClick={()=>deleteCategory(i)} className='text-white bg-black rounded-full cursor-pointer p-1 text-sm'><ImCross/></p>
            </div>
            ))}
            </div>
          </div>
          <textarea onChange={(e)=>setDesc(e.target.value)} rows={15} cols={30} className='px-4 py-2 outline-none border-black border rounded-md' placeholder='Enter post description'/>
          <button onClick={handleCreate} className='bg-black w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg rounded-md'>Create</button>
        </form>
        </div>
    </div>
  )
}

export default Blog