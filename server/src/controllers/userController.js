import {TryCatch} from '../../middleware/error.js';
import { sendToken } from '../../utils/feature.js';
import { ErrorHandler } from '../../utils/utility.js';
import {findUserByEmail, getProfileById} from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../../config/db.js';
// import { findDonorByEmail } from '../models/bookFunModel.js';


// signup 
const userSignUp = TryCatch( async (req, res, next) => {
    const {name, email, password} = req.body;
    
    if(!name || !email || !password) {
        return next(new ErrorHandler("All fields are required", 400))
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const [result] = await pool.query("INSERT INTO tbl_users (user_name, user_email, user_password) VALUES (?, ?, ?)",[name, email, hashedPass]);

    return res.status(200).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: result.insertId,
            name,
            email
        }
    })

}) 

/* const userSignIn = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;

    
    console.log("email",email);
    console.log("pass",password);
    
    
    if (!email) {
        return next(new ErrorHandler("Email is required", 400));
    }
        
     const [existingUser] = await findDonorByEmail(email);
     console.log("existing",existingUser);
     
    if (!existingUser) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }
    
    const isMatch = await bcrypt.compare(password, existingUser.donor_password);
    if(!isMatch) {
        return next (new ErrorHandler ("Invalid Credentials", 404))
    }
   console.log("wqwqwqw");
   
    sendToken(res, existingUser, 200, `Welcome Back ${existingUser.donor_name.toUpperCase()}`)
   
});
 */
//get my profile
const getMyProfile = TryCatch( async (req, res, next) => {
       const donorId= req.user.id;
       const donorEmail= req.user.email;
    const user = await findUserByEmail(req.user.email);
    console.log("idd", donorId);
    console.log("user", donorEmail);
    
    if(!user) return next(new ErrorHandler ("User not found", 400));
    res.status(200).json({success: true, user})

})

//get profile by shared link
const getProfile = TryCatch(async(req, res, next) => {
        
    const {id} = req.params;
    console.log("idddd", id);
    
    const profile = await getProfileById(id);
    
    res.status(200).json({success: true, message: "ok", profile})
})



// send thank you

/* const sendThankYouEmail = async (req, res) => {
  const { email, name, amount } = req.body;
  await sendEmail({
    to: email,
    subject: "Thank you for your donation",
    html: `
      <h2>Hi ${name}</h2>
      <p>Thank you for donating ₹${amount}</p>
    `,
  });

  res.json({ success: true, message: "Email sent" });
}; */
export { userSignUp, getMyProfile, getProfile };