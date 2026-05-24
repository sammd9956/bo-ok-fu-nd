import { TryCatch } from "../../middleware/error.js";
import { ErrorHandler } from "../../utils/utility.js";
import { getDonationByFundId, makeDonation } from "../models/donationModel.js";

const createDonation = TryCatch(async (req, res, next) => {

    const { fundId, donorName, donorEmail, amount, notes } = req.body;

    if (!donorName || !donorEmail || !amount) {
        return next(ErrorHandler("All fields are required", 401));
    }

    const result = await makeDonation(
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

//get all donation
const getDonation = TryCatch(async (req, res, next) => {
    console.log("reqqqq",req.user);
    
    const fundId = req.user.id;

    const result = await getDonationByFundId(fundId);
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

export { createDonation, getDonation };