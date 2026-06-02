import { TryCatch } from "../../middleware/error.js";
import { forgotPasswordService, rsetPasswordService } from "../models/authModel.js";

const forgotPassword = TryCatch(async(req, res, next) => {
    const {email} = req.body;
await forgotPasswordService(email);
    res.status(200).json({success: true, message: "Password reset link sent successfully"})
})

const resetPassword = TryCatch(async(req, res, next) => {
    const {email, token, password} = req.body;
     console.log("Controller Hit");
    await rsetPasswordService(token, password);
    res.status(200).json({success: true, message: "Password changed successfully"})
})


export {forgotPassword, resetPassword}