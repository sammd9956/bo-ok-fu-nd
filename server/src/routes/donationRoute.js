import express from 'express';
import { createDonation, findDonationById, getDonation, sendThankYouMail } from '../controllers/donationController.js';
import { isAuthenticated } from '../../middleware/auth.js';
const router = express.Router();


router.post("/make-donation", createDonation);
router.get("/get-donation", isAuthenticated, getDonation);
router.patch("/send-mail", isAuthenticated, sendThankYouMail);
router.get("/find-donation/:id", findDonationById);


export default router;