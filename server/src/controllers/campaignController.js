import { pool } from "../../config/db.js";
import { TryCatch } from "../../middleware/error.js";
import { ErrorHandler } from "../../utils/utility.js";
import {findCampaignByFundCode, findCampaignByFundId} from "../models/campaignModel.js";

const createNewCompaign = TryCatch(async (req, res, next) => {
    const {campName, startDate, endDate, goalAmount, message} = req.body;
    const id = req.user.id;
    console.log("funnn", id);
    
    
    if(!campName || !startDate || !endDate || !goalAmount){
        return next ( new ErrorHandler ("All fields are required", 400) )
    }
    const [result] = await pool.query("INSERT INTO tbl_campaigns (title, fund_id, start_date, end_date, goal_amount, description) VALUES (?, ?, ?, ?, ?, ?)", [campName, id, startDate, endDate, goalAmount, message])
    console.log("create campaign");
    res.status(200).json({success:true, message: "Campaign created successfully", campaigID: {id: result.insertId, campName}})
})
//get campaign
const getCampaign = TryCatch(async(req, res, next) => {
    const rows = await findCampaignByFundId(req.user.id)
    res.status(200).json({success: true, message: "ok", campaigns: rows})
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





export { createNewCompaign, getCampaignByFundCode, getCampaign }