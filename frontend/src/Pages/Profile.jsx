import React, { useContext, useEffect } from 'react'
import Usercontext from './UserContext'

const Profile = () => {
    const { userInfo } = useContext(Usercontext);
    return (
        <>
            <div className="w-full flex flex-col items-start gap-6 bg-gray-900 text-gray-200 py-8 px-10 rounded-lg border border-gray-700">
                <h2 className="text-xl uppercase tracking-wider text-yellow-400 font-semibold">Your Profile</h2>

                <div className="self-stretch border-l-4 border-yellow-500 bg-gray-800 px-4 py-3">
                    <p className="text-base">👤 <strong className="text-white">Username:</strong> {userInfo.username}</p>
                </div>

                <div className="self-stretch border-l-4 border-teal-400 bg-gray-800 px-4 py-3">
                    <p className="text-base">📧 <strong className="text-white">Email:</strong> {userInfo.email}</p>
                </div>
            </div>
            
        </>
    )
}

export default Profile