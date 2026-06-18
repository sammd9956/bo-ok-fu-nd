import Logout from '@/pages/Logout'
import { UserPen, UserRoundCog } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const [showEditProfile, setShowEditProfile] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const location = useLocation()
  

    const moreStyle = location?.pathname == "/dashboard" ? 'bg-page-background pb-2 z-50 px-2 lg:px-4' : null;

    return (
        <div className={`relative flex justify-end pt-[27px] sticky top-[46.5px] container mx-auto px-2 lg:px-4 ${moreStyle}`}>
            <div className='flex items-center gap-2.5'>
                <div className='flex flex-col items-end'>
                    <p className='text-[15px] text-black font-poppins font-bold'>
                        {user?.full_name.toUpperCase()}
                    </p>

                    <p className='text-[12px] text-black font-poppins'>
                        Teacher
                    </p>
                </div>

                <div
                    onClick={() => setShowEditProfile(!showEditProfile)}
                    className="cursor-pointer active:scale-95 transition-transform duration-150"
                >
                    <span className="bg-primary-color hover:bg-primary-color-dark rounded-full p-2 flex items-center justify-center transition-colors duration-300">
                        <UserRoundCog color="#FFF" size={30} />
                    </span>
                </div>
                {/* <Logout /> */}
            </div>

            {/* Smooth Animated Dropdown */}
            <div
                onClick={() => navigate("/edit-profile")}
                className={`
                    absolute top-20
                    bg-cloud-gray
                    pt-[9px] pb-1.5 pl-2 pr-10
                    flex items-center gap-[9px]
                    rounded-[8px]
                    shadow-lg
                    backdrop-blur-sm
                    group
                    cursor-pointer

                    transform-gpu
                    will-change-transform

                    transition-all
                    duration-300
                    ease-[cubic-bezier(0.22,1,0.36,1)]

                    ${showEditProfile
                        ? 'opacity-100 translate-y-0 scale-100 blur-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-3 scale-95 blur-[2px] pointer-events-none'
                    }
                `}
            >
                <span className="bg-charcoal-gray group-hover:bg-gray-800 rounded-full p-2 flex items-center justify-center transition-all duration-300">
                    <UserPen color="#FFF" size={16} />
                </span>

                <p className='text-charcoal-gray group-hover:text-gray-800 text-[11px] font-poppins font-medium transition-colors duration-300 whitespace-nowrap'>
                    Edit Profile
                </p>
            </div>
        </div>
    )
}

export default Profile