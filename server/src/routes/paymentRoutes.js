import express from 'express';
const router = express.Router();
import {createOrders, paymentVerification, razorpayWebhook, verifyPayment} from '../controllers/paymentController.js'

router.post("/create-order", createOrders)
router.post("/verify", verifyPayment);
router.post("/paymentverification", paymentVerification);
router.post( "/razorpay", razorpayWebhook );


export default router;