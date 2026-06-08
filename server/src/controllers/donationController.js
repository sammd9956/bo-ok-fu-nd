import { TryCatch } from "../../middleware/error.js";
import { sendEmail, sendMail } from "../../utils/sendEmail.js";
import { ErrorHandler } from "../../utils/utility.js";
import { getDonationBycampaignId, getDonationById, makeDonation, makeDonationService } from "../models/donationModel.js";

const createDonation = TryCatch(async (req, res, next) => {

    const { campaignId, fundId, donorName, donorEmail, amount, notes } = req.body;

    if (!donorName || !donorEmail || !amount) {
        return next(ErrorHandler("All fields are required", 401));
    }

    const result = await makeDonation(
        campaignId,
        fundId,
        donorName,
        donorEmail,
        amount,
        notes
    );

    res.status(200).json({
        success: true,
        message: "Donation successfully",
        donationId: result.insertId
    });
});

const makeDonations = TryCatch(async(req, res, next) => {
    const { campaignId, donorName, donorEmail, amount, notes } = req.body;
    console.log("reqbody",req.body);
    
    const donation = await makeDonationService({ campaignId, donorName, donorEmail, amount, notes });
    res.status(201).json({ success: true, message: "Donation successful", donation });
})

//get all donation
const getDonation = TryCatch(async (req, res, next) => {
    
    // const fundId = req.user.id;
    const {campaignid} = req.params;
    console.log("campinid", campaignid);
    

    const result = await getDonationBycampaignId(campaignid);
    const totalRaised = result.reduce((acc, item) => {
    return acc + Number(item.amount);
    }, 0);
    const totalDonors = new Set(
    result.map(item => item.donor_email)
  ).size;

    res.status(200).json({
        success: true,
        donation: result,
        totalRaised,
        totalDonors
    });
});

//find donation by id
const findDonationById = TryCatch(async(req, res, next) => {
    const id = req.params.id;
    console.log("ids",id);
    
    const [rows] = await getDonationById(id);

    res.status(200).json({success: true, message: "ok", id, rows})
})

//send thnx mail
const sendThankYouMail = TryCatch(async(req, res, next) => {
    
    const {donationId, donorName, donorEmail, amount, message} = req.body;
    
    if (!donationId || !donorEmail || !donorName) {
        return next(new ErrorHandler("All fields are required!", 400));
    }
    
    const id = donationId;
    const to = donorEmail;
    const subject = `Thank You ${donorName} ❤️`;
    const html = `
        <h2>Hi ${donorName}</h2>
        <p>Thank you for donating ₹${amount || "0"}</p>
        <p>${message || "Thank you for supporting our campaign."}</p>
    `;
    
    await sendMail({id, to, subject, html});
    
    res.status(200).json({success: true, message: "Thank you mail sent"})
})

//update mail flag


export { createDonation, getDonation, findDonationById, sendThankYouMail, makeDonations };