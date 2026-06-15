
import express from 'express';
import { isAuthenticated } from '../../middleware/auth.js';
import { getRedeemData, redeemFunds } from '../controllers/redeemController.js';
const router = express.Router();

router.post("/create-redemption", isAuthenticated, redeemFunds);
router.get("/get-redeem-data/:redemptionId", getRedeemData);



export default router;