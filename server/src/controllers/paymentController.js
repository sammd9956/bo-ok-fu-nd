import { pool } from "../../config/db.js";
import { TryCatch } from "../../middleware/error.js";
import { createOrder } from "../services/paymentService.js";
import crypto from 'crypto';
import Razorpay from '../../config/razorpay.js';

const createOrders = TryCatch(async(req, res, next) =>{
    console.log("reqqqq",req.body);
    
    const result = await createOrder(req.body);
    console.log("CREATE ORDER HIT");
// console.log("DATA:", data);
    res.status(200).json({success: true, message: "ok", result})
})

const verifyPayment = async (req, res) => {

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const generatedSignature =
    crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id +
        "|" +
        razorpay_payment_id
      )
      .digest("hex");

  if (generatedSignature !== razorpay_signature) {

    return res.status(400).json({
      success: false
    });
  }

  await paymentService.markPaid({
    razorpay_order_id,
    razorpay_payment_id
  });

  res.json({
    success: true
  });
};

const razorpayWebhook = async (
  req,
  res
) => {

  const event = req.body.event;

  const payload = req.body;

  // log save

  // payment update

  res.status(200).send("OK");
};


const paymentVerification = async (req, res) => {

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body)
    .digest("hex");

  /* if (expectedSignature === razorpay_signature) {

    // 🔥 PAYMENT SUCCESS

    // 1. update tbl_payments = paid
    // 2. update tbl_donations = paid

    return res.redirect(`http://localhost:5173/thank-you?reference=${razorpay_payment_id}`);
  } */
 if (expectedSignature !== razorpay_signature) {
      await db.query(
        `UPDATE tbl_payments
         SET payment_status = 'failed'
         WHERE gateway_order_id = ?`,
        [razorpay_order_id]
      );

      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }
    const payment = await Razorpay.payments.fetch(
      razorpay_payment_id
    );
    await pool.query(
      `UPDATE tbl_payments
       SET
         gateway_payment_id = ?,
         gateway_transaction_id = ?,
         payment_method = ?,
         payment_status = 'paid',
         paid_at = NOW()
       WHERE gateway_order_id = ?`,
      [
        payment.id,
        payment.id,
        payment.method,
        razorpay_order_id,
      ]
    );

    return res.redirect(
      `http://localhost:5173/thank-you?reference=${razorpay_payment_id}`
    );

  //failed
  return res.redirect("http://localhost:5173/payment-failed");
};
export {createOrders, verifyPayment, razorpayWebhook, paymentVerification};