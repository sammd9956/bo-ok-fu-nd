import { TryCatch } from "../../middleware/error.js";

import { ErrorHandler } from "../../utils/utility.js";
import {getSocket} from "../../server.js";

import { forgotPasswordService, rsetPasswordService } from "../models/authModel.js";

const forgotPassword = TryCatch(async(req, res, next) => {
    const {email} = req.body;

const resetMeta = await forgotPasswordService(email);
    res.status(200).json({success: true, message: "Password reset link sent successfully", resetMeta})
})

const resetPassword = TryCatch(async(req, res, next) => {
    const {email, token, newPassword, confirmPassword} = req.body;
     console.log(req.body.payload);
     console.log("token", token);
     if(!token || !newPassword || !confirmPassword){
        return next(new ErrorHandler("All feilds are required", 400))
     }
     if(newPassword !== confirmPassword){
        return next (new ErrorHandler("password does not match", 400))
     }
    await rsetPasswordService(token, newPassword);
    const io = getSocket();

    io.emit("PASSWORD_RESET_SUCCESS", {
    message: "Password changed successfully",
  });

    res.status(200).json({success: true, message: "Password reset successfully"})
})

/* const resetPassword = TryCatch(async(req, res, next) => {
    const {email, token, password} = req.body;
     console.log("Controller Hit");
    await rsetPasswordService(token, password);
        const io = getSocket();
    io.emit("PASSWORD_RESET_SUCCESS", {
    message: "Password changed successfully",
  });
    res.status(200).json({success: true, message: "Password changed successfully"})
}) */


export {forgotPassword, resetPassword}