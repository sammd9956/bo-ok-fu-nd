import express from 'express';
const router = express.Router();
import { createDonationBySubDonor, createFunds, fundSignIn, getAllFunds, getFundDetailsById, getMe, sendThankYouEmail} from '../controllers/fundController.js';
import { isAuthenticated } from '../../middleware/auth.js';

router.post("/create-fund", createFunds);
router.post("/sign-in", fundSignIn);
router.get("/get-me", isAuthenticated, getMe);
router.post("/make-donation", createDonationBySubDonor);
router.post("/send-email", sendThankYouEmail);
router.get("/get-all-funds", getAllFunds);
router.get("/get-fund-details/:f_id", getFundDetailsById);

export default router;