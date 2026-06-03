import { server } from "@/constatnts/config";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const params = useParams();
console.log(params.token);

  const resetPasswordHandler = async () => {
    alert("asasasas")
    console.log("passssss", newPassword, confirmPassword)
    const payload = {
      token: params.token,
      newPassword,
      confirmPassword
    }
    console.log("payload", payload);
      try{
        const res = await axios.patch(`${server}/api/v1/auth/reset-pass`, payload, {withCredentials: true});
        console.log(res.data);
        toast.success(res.data?.message);
        setIsSuccess(true)
      }catch(error){
        console.log(error.response);
        toast.error(error.response?.data?.message);
        throw error;
      }
    
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {!isSuccess ? (
          <>
          <h1 className="text-3xl font-bold text-center mb-2">
          Reset Password
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Create a new password for your account.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="button"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            onClick={resetPasswordHandler}
          >
            Reset Password
          </button>
        </form>
          </>
        ) : (
          <div className="mt-5 p-4 bg-green-100 text-green-700 rounded-lg text-center">
              Your password has been reset successfully! You can now log in with your new password.
            </div>
        )
      }
       
      </div>
    </div>
  );
};

export default ResetPassword;