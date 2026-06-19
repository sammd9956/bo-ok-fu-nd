import { pool } from "../../config/db.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4}  from 'uuid';
import { TryCatch } from "../../middleware/error.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { ErrorHandler } from "../../utils/utility.js";
import { creatDonation, findFundByEmail, findMeByEmail, startFundService, updateCampaign, updateMyProfile } from "../models/bookFunModel.js";
import { sendToken } from "../../utils/feature.js";


const createFunds = TryCatch(async (req, res, next) => {
    
      const result = await startFundService(req.body, res);
        res.status(201).json({ success: true, message: 'Fund created successfully', data: result });
    
})

//update profile
const updateProfile = TryCatch(async (req, res, next) => {   
    console.log("reqzzzz", req.body);
    
    const id = req.user.id;
    const {teacherName, teacherEmail, password} = req.body;
    if(!teacherName || !teacherEmail || !password) return next (new ErrorHandler("All fields are required", 400));
    console.log("equser", req.user);
    if(!req.user) return next(new ErrorHandler("Unathorized", 404));
    await updateMyProfile(teacherName, teacherEmail, password, id)
        
    res.status(200).json({success:true, message: "Profile updated successfully", })
})

//sign-in
const fundSignIn = TryCatch(async (req, res, next) => {
    const { teacherEmail, password } = req.body;

    
    console.log("email",teacherEmail);
    console.log("pass",password);
    
    
    if (!teacherEmail || !password) {
        return next(new ErrorHandler("Email and password required", 400));
    }
        
     const rows = await findFundByEmail(teacherEmail);
     console.log("existing",rows);
     
    if (!rows || rows.length == 0) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }
    
    const user = rows[0]
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return next (new ErrorHandler ("Invalid Credentials", 404))
    }
   const { password: _, ...safeUser } = user;
    sendToken(res, safeUser, 200, `Welcome Back ${user.teacher_name.toUpperCase()}`)
   
});
//get me
const getMe = TryCatch( async (req, res, next) => {
    console.log("requser",req.user);
    
       const donorId= req.user.id;
       const teacherEmail= req.user.email;
    const rows = await findMeByEmail(teacherEmail);
    console.log("idd", donorId);
    console.log("user", teacherEmail);
    if(!rows) return next(new ErrorHandler ("User not found", 400));
     const user = rows[0]; 
    res.status(200).json({success: true, user})

})

//get all funds

const getAllFunds = TryCatch(async (req, res, next) => {

    const [allFunds] = await pool.query( `SELECT donor_id, fund_type, school_name, fund_name, start_date, end_date, donor_name, donor_email, goal_amount, message, ac_flag FROM tbl_book_funds` );

    return res.status(200).json({
        success: true,
        count: allFunds.length,
        data: allFunds
    });
});

//get fun details by id
const getFundDetailsById = TryCatch(async (req, res, next) => {
// console.log(req.params.f_id);

    const fund_id = req.params.f_id;
    const [allFunds] = await pool.query( `SELECT book_fund_id, fund_type, school_name, fund_name, start_date, end_date, donor_name, donor_email, goal_amount, ac_flag, message FROM tbl_book_funds WHERE book_fund_id = ?`, [fund_id] );

    return res.status(200).json({
        success: true,
        count: allFunds.length,
        data: allFunds[0] || null
    });
});

//

//subdonor donations

const createDonationBySubDonor = TryCatch(async (req, res, next) => {
    const {donorId, subDonorName, subDonorEmail, amount, notes} = req.body;
    const result = await creatDonation(donorId, subDonorName, subDonorEmail, amount, notes);
    res.status(200).json({success: true, message: "ok", donationId: {donation_id: result.insertId}})
})

//se nd mail
const sendThankYouEmail = TryCatch(async (req, res, next) => {

    const { email, donorName, message, amount, bookFundID } = req.body;
    if (!email || !donorName) {
        return next(new ErrorHandler("All fields are required!", 400));
    }

    await sendEmail({
        id: bookFundID,
        to: email,
        subject: `Thank You ${donorName} ❤️`,
        html: `
          <h2>Hi ${donorName}</h2>
          <p>Thank you for donating ₹${amount || "0"}</p>
          <p>${message || "Thank you for supporting our campaign."}</p>
        `
    });

    return res.status(200).json({
        success: true,
        message: "Thank you mail sent"
    });

});

//edit campaign
const editCampaign = TryCatch(async(req, res, next) => {
    const {id, fundName, startDate, endDate, goalAmount, message} = req.body;
    if(!id || !fundName) return next (new ErrorHandler("Access denied", 400));
    
    console.log(req.body);
    if(req.user.id == req.body.id){
        updateCampaign(id, fundName, startDate, endDate, goalAmount, message)
        
    }
    
    res.status(200).json({success: true, message: "ok"})
})

export { 
    createFunds,
     fundSignIn,
     getMe,
     getAllFunds,
     getFundDetailsById,
     sendThankYouEmail,
     createDonationBySubDonor,
     editCampaign,
     updateProfile 
    }