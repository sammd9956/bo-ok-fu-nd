import { pool } from "../../config/db.js";
import { TryCatch } from "../../middleware/error.js";
import { ErrorHandler } from "../../utils/utility.js";
import {findCampaignByFundCode, findCampaignById, updateCampaignById} from "../models/campaignModel.js";

const createNewCompaign = TryCatch(async (req, res, next) => {
    const {fundName, startDate, endDate, goalAmount, message} = req.body;
  
    
    if(!fundName || !startDate || !endDate || !goalAmount){
        return next ( new ErrorHandler ("All fields are required", 400) )
    }
    const [result] = await pool.query("INSERT INTO tbl_campaign (fund_name, start_date,	end_date, goal_amount, message) VALUES (?, ?, ?, ?, ?)", [fundName, startDate, endDate, goalAmount, message])
    console.log("create campaign");
    res.status(200).json({success:true, message: "Campaign created successfully", campaigID: {id: result.insertId, fundName}})
})

//find campaign by id
const getCampaignByFundCode = TryCatch(async(req, res, next) => {
    
    const {fundCode} = req.params;
    
    const rows = await findCampaignByFundCode(fundCode);
    if(rows.length === 0){
        return next(new ErrorHandler("Campaign not found",404))
    }

    res.status(200).json({success: true, campaign: rows[0]})
})

const updateCampaign = TryCatch(async(req, res, next) => {
    const {fundName, goalAmount, message, startDate, endDate, id} = req.body;
    await updateCampaignById(fundName, goalAmount, message, startDate, endDate, id);
    res.status(200).json({success: true, message: "Updated successfully"})
})


export { createNewCompaign, getCampaignByFundCode, updateCampaign }