import express from 'express';
import { createDonation, getDonation } from '../controllers/donationController.js';
import { isAuthenticated } from '../../middleware/auth.js';
const router = express.Router();


router.post("/make-donation", createDonation);
router.get("/get-donation", isAuthenticated, getDonation);


export default router;