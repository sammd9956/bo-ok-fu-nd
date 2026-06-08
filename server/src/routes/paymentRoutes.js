import express from 'express';
const router = express.Router();
import {createOrders, paymentVerification, razorpayWebhook, verifyPayment} from '../controllers/paymentController.js'
import { getPaymentDetails } from '../controllers/donationController.js';

router.post("/create-order", createOrders)
router.post("/verify", verifyPayment);
router.post("/paymentverification", paymentVerification);
router.post( "/razorpay", razorpayWebhook );
router.get( "/get-payment-details/:paymentid", getPaymentDetails );


export default router;