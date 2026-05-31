import express from 'express';
import { createNewCompaign, getCampaign, getCampaignByFundCode, getCampByFundCode } from '../controllers/campaignController.js';
import { isAuthenticated } from '../../middleware/auth.js';
const router = express.Router();


router.post("/new-campaign", isAuthenticated, createNewCompaign);
router.get("/my-campaign", isAuthenticated, getCampaign);
router.get("/get-campaign/:fundcode", getCampByFundCode);
// router.post("/update-campaign", updateCampaign);
router.get("/fetch-campaign/:fundCode", getCampaignByFundCode);


export default router;