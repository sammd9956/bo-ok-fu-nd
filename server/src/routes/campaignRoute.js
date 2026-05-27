import express from 'express';
import { createNewCompaign, getCampaign, getCampaignByFundCode } from '../controllers/campaignController.js';
import { isAuthenticated } from '../../middleware/auth.js';
const router = express.Router();


router.post("/new-campaign", isAuthenticated, createNewCompaign);
router.get("/find-campaign", isAuthenticated, getCampaign);
// router.post("/update-campaign", updateCampaign);
router.get("/get-campaign/:fundCode", getCampaignByFundCode);


export default router;