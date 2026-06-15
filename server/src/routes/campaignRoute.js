import express from 'express';
import { campaignExpired, createNewCompaign, getCampaign, getCampaignByCampaignId, getCampaignByFundCode, getCampByFundCode, updateCmpaignBycampaignId } from '../controllers/campaignController.js';
import { isAuthenticated } from '../../middleware/auth.js';
const router = express.Router();


router.post("/new-campaign", isAuthenticated, createNewCompaign);
router.get("/my-campaign", isAuthenticated, getCampaign);
router.get("/get-campaign/:fundcode", getCampByFundCode);
// router.post("/update-campaign", updateCampaign);
router.get("/fetch-campaign/:fundCode", getCampaignByFundCode);
router.get("/get-campaigns/:campaignid", getCampaignByCampaignId);
router.put("/update-campaign", updateCmpaignBycampaignId);
router.get("/check-campaign-expires/:campaignid", campaignExpired);


export default router;