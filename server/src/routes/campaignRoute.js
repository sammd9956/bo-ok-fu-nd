import express from 'express';
import { createNewCompaign, getCampaignByFundCode, updateCampaign } from '../controllers/campaignController.js';
const router = express.Router();


router.post("/new-campaign", createNewCompaign);
router.post("/update-campaign", updateCampaign);
router.get("/get-campaign/:fundCode", getCampaignByFundCode);


export default router;