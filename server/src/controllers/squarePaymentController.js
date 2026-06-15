import crypto from "crypto";
import client from "../../config/square.js";
import { pool } from "../../config/db.js";
import { isCampaignActive } from "../shared/helper.js";

export const processSquarePayment = async (req, res) => {
    console.log("wewwe", req.body);
    
  try {
    const {      
      campaignId,
      donorName,
      donorEmail,
      amount,
      notes,
      sourceId
    } = req.body;

    if (!sourceId) {
      return res.status(400).json({
        success: false,
        message: "Payment token missing",
      });
    }
    const isActive = await isCampaignActive(campaignId);
    console.log("isaxtiiii", isActive);
    

  if(!isActive) return res.status(500).json({success: false, message: "Expired Campaign"})
  
  const [donationResult] = await pool.query(
  `INSERT INTO tbl_donations 
  (campaign_id, donor_name, donor_email, amount, message, donated_at)
  VALUES (?, ?, ?, ?, ?, NOW())`,
  [campaignId, donorName, donorEmail, amount, notes]
);

const donationId = donationResult.insertId;

    const { payment } = await client.payments.create({
      sourceId,

      idempotencyKey: crypto.randomUUID(),

      amountMoney: {
        amount: BigInt(Math.round(Number(amount) * 100)),
        currency: "USD",
      },

      locationId: process.env.SQUARE_LOCATION_ID,

      note: notes || "Donation",
    });
    await pool.query(
      `
      INSERT INTO tbl_payments ( donation_id, payment_gateway, gateway_payment_id, gateway_transaction_id, amount, payment_status, payment_method, paid_at )
      VALUES
      (?, 'square', ?, ?, ?, 'paid', ?, NOW()) `, [ donationId, payment.id, payment.id, amount, payment.sourceType || "CARD", ]
    );
    return res.status(200).json({ success: true, paymentId: payment.id, status: payment.status, });
  } catch (err) {
    console.error("Square Error:", err);

    return res.status(500).json({
      success: false,
      message:
        err?.body?.errors?.[0]?.detail ||
        err?.errors?.[0]?.detail ||
        err.message ||
        "Payment failed",
    });
  }
};