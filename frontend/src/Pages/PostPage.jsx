import { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Usercontext from './UserContext';
import { Link } from 'react-router-dom';

const PostPage = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);
  const [loading, setLoading ] = useState(false);
  const [redirect, setRedirect ] = useState(false);
  const {userInfo} = useContext(Usercontext);
  const src = import.meta.env.VITE_SRC;
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
        const {data} = await axios.get(`http://localhost:4000/api/post/${id}`, {
          withCredentials: true,
        });
        setPostData(data.data[0]);
        setLoading(false);
    };
    getData();
  }, []);
  const deletePost = async () =>{
    await axios.delete(`http://localhost:4000/api/${id}`,{
      withCredentials:true,
    });
    setRedirect(true);
  }

  if(redirect) return <Navigate to={'/'}/>

  if (loading) return <div>Loading....</div>;

  if (!postData) return <div>No post found</div>;

  return (
    <div className='flex justify-center'>
      <div className="flex flex-col gap-2 w-[60%]">
        <p className='text-3xl font-bold text-center'>{postData.title}</p>
        <div className='flex justify-center'>
          <img src={`${src}/${postData.image_url}`} alt="" className='object-cover h-[300px]'/>
        </div>
        <div className='text-[0.5xl] leading-7 '>
          {postData.description}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {postData.categories.map((ele, ind) => (
            <span
              key={ind}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full shadow-sm"
            >
              #{ele}
            </span>
          ))}
        </div>
        <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow-sm w-fit">
          <p className="text-gray-800 font-semibold">
            👤 Creator:{" "}
            <span className="text-blue-600">
              @{postData.author === userInfo.username ? "You" : postData.author}
            </span>
          </p>
          <p className="text-gray-700 mt-1">
            🕒 Last updated:{" "}
            <span className="text-green-700 font-medium">
              {postData.createdAt.slice(0, 10)}
            </span>
          </p>
        </div>
        <div className="flex gap-3 mt-4">
          {postData.author === userInfo.username && (
            <Link
              to={`/edit/${id}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
            >
              Edit
            </Link>
          )}
          {postData.author === userInfo.username && (
            <button onClick={() => deletePost()} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition">
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
