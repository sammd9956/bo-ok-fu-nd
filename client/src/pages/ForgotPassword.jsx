import { server } from '@/constatnts/config';
import axios from 'axios';
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { GrMail } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    // const [meta, setMeta] = useState();
    const [sent, setSent] = useState(false);
    const [timer, setTimer] = useState(0);
    const navigate =useNavigate();

    // const socket = io("http://localhost:3000", {withCredentials: true});
    const socket = useRef(null);

  /* useEffect(() => {
    socket.current = io("http://localhost:3000", {
      withCredentials: true
    });
  }, []); */
  useEffect(() => {
  socket.current = io("http://localhost:3000", {
    withCredentials: true,
  });

  socket.current.on("PASSWORD_RESET_SUCCESS", (data) => {
    toast.success(data.message);
    navigate("/log-in");
  });

  return () => {
    socket.current?.off("PASSWORD_RESET_SUCCESS");
    socket.current?.disconnect();
  };
}, [navigate]);
    
    
    const sendMailForResetPassword = async() => {
        try{
            
            const res = await axios.post(`${server}/api/v1/auth/forgot-pass`, {email}, {withCredentials: true});
            setTimer(res.data?.resetMeta?.remainingTime);
            setSent(true);
           
        }catch(error){
            // console.log(error.response)
            toast.error(error.response?.data?.message);
        }
    }

     // countdown timer
  useEffect(() => {
    let interval;
    if (sent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [sent, timer]);

  const maskEmail = (email) => {
    const [name, domain] = email.split("@");
    const maskedName = name[0] + name[1] +"****" + name[name.length - 2] + name[name.length - 1];
    return maskedName + "@" + domain;
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Icon */}
        {
            !sent && (
                <>
                <div className="flex justify-center mb-5">
          <div className="bg-blue-100 p-4 rounded-full">
            <GrMail className="text-blue-600 w-8 h-8" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Forgot Password?
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Don't worry! Enter your email address and we'll send you a reset link.
        </p>

        {/* Input */}
        <div className="relative mb-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full border border-gray-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg" onClick={sendMailForResetPassword}>
          Send Reset Link
        </button>

        {/* Back to Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer font-medium">
            Back to Login
          </span>
        </p></>
            )
        }
        {sent && (
          <div className="text-center">
            <div className="flex justify-center mb-5">
              <div className="bg-green-100 p-4 rounded-full">
                <GrMail className="text-green-600 w-8 h-8" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Check Your Email
            </h1>

            <p className="text-gray-600 mb-4">
              Reset link sent to:
            </p>

            <p className="font-semibold text-blue-600 mb-4">
              {maskEmail(email)}
            </p>

            <div className="text-sm text-gray-500 mb-6">
              Link expires in{" "}
              <span className="font-bold text-red-500">
                {timer}s
              </span>
            </div>

            <button
              disabled={timer > 0}
              onClick={sendMailForResetPassword}
              className={`w-full py-3 rounded-xl text-white ${
                timer > 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Resend Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
