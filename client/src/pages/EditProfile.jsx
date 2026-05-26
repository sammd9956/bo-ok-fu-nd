import MyButton from '@/components/common/MyButton'
import MyInput from '@/components/common/MyInput'
import Profile from '@/components/common/Profile'
import { server } from '@/constatnts/config'
import useWhoFundValue from '@/store/useWhoFundValue'
import axios from 'axios'
import { ArrowBigLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
    const navigate = useNavigate();
      const {radioBtnValue,setRadioBtnValue} = useWhoFundValue()
      const user = useSelector((state) => state.auth.user);
      

    const nameLabel = radioBtnValue == "My Class" ? 'Teacher Name' : 'Organizer Name';
    const nameForId = radioBtnValue == "My Class" ? 'TeacherName' : 'OrganizerName';

     const emailLabel = radioBtnValue == "My Class" ? 'Teacher Email' : 'Organizer Email';
    const emailForId = radioBtnValue == "My Class" ? 'TeacherEmail' : 'OrganizerEmail';
    const initialState = {
        teachername: "",
        teacherEmail: "",
        password: ""
    }
    const [formdata, setFormData] = useState();
    const [password, setPassword] = useState("");
    useEffect(() => {
      setFormData({
        teacherName: user?.teacher_name || "",
        teacherEmail: user?.teacher_email || "",
        password: user?.teacher_name || "",
      })
    }, [user])
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUpdate = async() => {
        try {
        const payload = {
            teacherName: formdata.teacherName,
            teacherEmail: formdata.teacherEmail,
            password: password,
        }
        console.log(payload);
        const res = await axios.patch(`${server}/api/v1/fund/update-profile`, payload, {withCredentials: true});
        console.log(res.data);
        toast.success(res.data.message);
        navigate("/dashboard")
        window.location.reload();
        
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            
        }
        
    }
    return (
        <div className=' mb-8 w-full'>
            <Profile />
            <div className='flex flex-col gap-[76px] container mx-auto px-2 lg:px-4'>
                <p
                    onClick={() => navigate("/dashboard")}
                    className="group flex items-center gap-2 cursor-pointer w-fit font-poppins font-semibold text-[13px] transition-all duration-300 ease-in-out active:translate-y-0.5 relative z-50"
                >
                    <span className="bg-primary-color group-hover:bg-primary-color-dark rounded-full p-2 flex items-center justify-center transition-all duration-300 ease-in-out">
                        <ArrowBigLeft color="#FFF" fill="#FFF" size={20} />
                    </span>

                    <span className="text-purple-purple-500 group-hover:text-primary-color-dark transition-all duration-300 ease-in-out">
                        Back
                    </span>
                </p>
                <div className='border-[0.5px] border-solid border-black px-[24px] lg:px-[71px] pt-[19px] pb-10 rounded-[20px] lg:max-w-[600px] lg:mx-auto bg-card-border relative z-50 w-full'>
                    <p className='text-center font-poppins font-bold text-[32px] text-gray-800 mb-[35px]'>Edit Your Profile</p>
                    <div className='mb-[24px]'>
                        <MyInput forId={nameForId} type="text" placeholder={nameLabel} name="teacherName" value={formdata?.teacherName} onChange={handleChange} label={nameLabel} labelStyle="font-semibold lg:min-w-[450px] gap-0" />
                    </div>
                    <div className='mb-[24px]'>
                        <MyInput forId={emailForId} type="email" placeholder={emailLabel} name="teacherEmail" value={formdata?.teacherEmail} label={emailLabel} labelStyle="font-semibold lg:min-w-[450px] gap-0" inputStyle="bg-gray-100 cursor-not-allowed" />
                    </div>
                    <div className='mb-[36px]'>
                        <MyInput forId="TeacherName" type="password" placeholder="******" value={password} onChange={(e)=>setPassword(e.target.value)} label="Update Password" labelStyle="font-semibold lg:min-w-[450px] gap-0" />
                    </div>
                    <MyButton variant="primary" text="Save" style="!px-6 !py-4 w-full" onClick={handleUpdate} />
                </div>
            </div>

        </div>

    )
}

export default EditProfile