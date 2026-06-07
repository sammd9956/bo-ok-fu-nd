import React, { useState } from 'react'
import book from "@/assets/Book.svg"
import MyInput from '@/components/common/MyInput'
import MyCheckbox from '@/components/common/MyCheckbox'
import MyButton from '@/components/common/MyButton'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { server } from '@/constatnts/config'
import { useDispatch } from 'react-redux'
import { userExist } from '@/redux/slices/authSlices'

const LoginPage = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const dispatch = useDispatch();
    
     const navigate = useNavigate()

     const signinHandler = async() => {
      const config = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }
       try {
         const data = await axios.post(`${server}/api/v1/user/sign-in`, {email: Email, password: Password}, config)
         
         console.log("data",data.data.user);
         
        dispatch(userExist(data.data.user))
        // toast.success(data.message)
         navigate("/dashboard");        
               
       } catch (error) {
        toast.error(error.response?.data?.message)
        console.log(error.response);
        
       }
     }
    return (
        <div className='flex items-center justify-center container mx-auto px-2 lg:px-4'>
            <div className='border border-solid rounded-xl border-black pt-4 px-[24px] lg:px-[42px] pb-4 flex flex-col items-center justify-center bg-card-border shadow-[0_12px_40px_rgba(0,0,0,0.12)] w-full lg:w-fit'>
                <img src={book} alt={book} className='w-25 h-25 mb-[15px]' />
                    <p className='font-poppins text-back text-4xl font-bold mb-[8px] text-center'>Welcome Back!</p>
                    <p className='font-poppins text-black text-[15px] font-normal mb-[24px] text-center'>Log in to manage your book fund.</p>
                   <div className='flex flex-col items-center gap-[12px] w-full mb-[18px]'>
                     <MyInput forId = "Emal" type = "email" placeholder="teacher@school.edu" value={Email} onChange={(e) => setEmail(e.target.value)}  label="Email Address" />
                     <MyInput forId = "password" type = "password" placeholder="Enter Your Password" value={Password} onChange={(e) => setPassword(e.target.value)}  label="Password"/>
                     <div className='flex items-center justify-between w-full'>
                        <MyCheckbox label="Remember me" forId="rememberMe"/>
                        <p><a href="/forgot-pass" className='text-purple-purple-500 text-sm font-bold font-poppins'>Forgot Password?</a></p>
                     </div>

                   </div>
                   {/* <MyButton variant = "primary" text = "Log In" style="bg-primary-color-dark w-full lg:w-[90%]" onClick={()=>navigate("/dashboard")}/> */}
                   <MyButton variant = "primary" text = "Log In" style="bg-primary-color-dark w-full lg:w-[90%]" onClick={signinHandler}/>
            </div>
        </div>
    )
}

export default LoginPage