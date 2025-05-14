import React, { useContext } from 'react'
import Usercontext from './UserContext'
import { Link } from 'react-router-dom';

const Post = ({ data }) => {
    const { userInfo } = useContext(Usercontext);
    const src = import.meta.env.VITE_SRC;
    return (
        <div className="flex mt-10 gap-6 w-[60%] border  bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition border-1 border-black">
            {/* Image Section */}
            <div className="w-1/3 h-52 overflow-hidden rounded-md flex items-center justify-center bg-gray-100">
                <img
                    src={`${src}/${data.image_url}`}
                    alt="img"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="w-2/3 flex flex-col justify-between gap-4">
                <h1 className="text-2xl font-semibold text-gray-800">{data.title}</h1>

                <div className="text-sm text-gray-600 space-y-1">
                    <p>
                        Created by @
                        <span className="ml-1 font-medium text-gray-700">
                            {data.author === userInfo.username ? "You" : data.author}
                        </span>
                    </p>
                    <p>Updated on: <span className="text-gray-800">{data.createdAt.slice(0, 10)}</span></p>
                </div>

                <p className="text-gray-700 text-base">{data.description.slice(0, 50)}...</p>

                <div>
                    <Link
                        to={`/post/${data._id}`}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                    >
                        Read more
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Post