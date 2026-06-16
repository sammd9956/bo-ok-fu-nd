import { TryCatch } from "../../middleware/error.js";
import { cookieOptions, sendToken } from "../../utils/feature.js";
import { ErrorHandler } from "../../utils/utility.js";
import { findUserByEmail, getMyProfile, updateProfileServic } from "../models/userModel.js";
import bcrypt from 'bcrypt';

const userSignIn = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;

    
    if (!email || !password) {
        return next(new ErrorHandler("Email and password required", 400));
    }
        
     const user = await findUserByEmail(email);
     console.log("existing",user);
     
    if (!user || user.length == 0) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }
    

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return next (new ErrorHandler ("Invalid Credentials", 404))
    }
   const { password: _, ...safeUser } = user;
   console.log("userrr", user);
   
    sendToken(res, safeUser, 200, `Welcome Back ${user.full_name.toUpperCase()}`)
   
});

const logOut = TryCatch(async(req, res, next) => {
    return res.status(200).cookie("book_fund_token", "", {...cookieOptions, maxAge: 0}).json({success: true, message: "Loged out successfully"})
})

const getMe = TryCatch(async(req, res, next) => {
    console.log("userid",req.user);
    
    const {email} = req.user;
    const myProfile = await getMyProfile(email);
    return res.status(200).json({success: true, user: myProfile})
})

const updateProfile = TryCatch(async(req, res, next) => {
    const {email} = req.user;
    const {fullName, password} = req.body;
    if(!fullName || !password){
        return next(new ErrorHandler("All fields are required", 400));
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const result = await updateProfileServic(fullName, email, hashedPass);
    return res.status(200).json({success: true})
})



export {userSignIn, getMe, updateProfile, logOut}