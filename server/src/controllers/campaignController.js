import { pool } from "../../config/db.js";
import { TryCatch } from "../../middleware/error.js";
import { ErrorHandler } from "../../utils/utility.js";
import {findCampaignByFundCode, getCampaignsByFundCodeService, getMyCampaignsService, getCampaignByCampainIdService, updateCmpaignBycampaignIdService} from "../models/campaignModel.js";
import {v4 as uuidv4} from 'uuid';
import { checkCampaignExpired } from "../services/campaigns/campaignValidation.js";

const createNewCompaign = TryCatch(async (req, res, next) => {
    const {campName, campType, startDate, endDate, goalAmount, message} = req.body;
    const id = req.user.id;
    console.log("funnn", id);
    const fundCode = uuidv4();
    
    if(!campName || !startDate || !endDate || !goalAmount){
        return next ( new ErrorHandler ("All fields are required", 400) )
    }
    const [result] = await pool.query("INSERT INTO tbl_campaigns (user_id, campaign_name, campaign_type, start_date, end_date, goal_amount, message, fund_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [id, campName, campType, startDate, endDate, goalAmount, message, fundCode])
    console.log("create campaign");
    res.status(200).json({success:true, message: "Campaign created successfully", campaignID: {id: result.insertId, campName}})
})
    //get campaign
    const getCampaign = TryCatch(async(req, res, next) => {
        const rows = await getMyCampaignsService(req.user.id)
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

const getCampByFundCode = TryCatch(async(req, res, next) => {
    console.log("reqp",req.params);
    
    const { fundcode } = req.params;
    const campaign = await getCampaignsByFundCodeService(fundcode);
    res.status(200).json({success: true, campaign})
})

const getCampaignByCampaignId = TryCatch(async(req, res, next) => {
    const {campaignid} = req.params;
    const [campaign] = await getCampaignByCampainIdService(campaignid);
    res.status(200).json({success: true, campaign})
})

const updateCmpaignBycampaignId = TryCatch(async(req, res, next) => {
    console.log("reqp", req.body)
    const {id, campName, startDate, endDate, goalAmount, message} = req.body;
    const result = await updateCmpaignBycampaignIdService(id, campName, startDate, endDate, goalAmount, message);
    res.status(200).json({success: true, message: "Campaign updated successfully"})
})

const campaignExpired = TryCatch(async (req, res) => {
  const { campaignid } = req.params;

  const campaign = await checkCampaignExpired(campaignid);

  return res.status(200).json({
    success: true,
    campaign,
  });
});



export { createNewCompaign,
     getCampaignByFundCode,
     getCampaign,
     getCampByFundCode,
     getCampaignByCampaignId,
     updateCmpaignBycampaignId,
     campaignExpired
    }