import { pool } from '../../config/db.js';
import Razorpay from 'razorpay';
import {makeDonation} from '../models/donationModel.js';
import  { create, markPaids } from '../models/paymentModel.js';
import razorpay from '../../config/razorpay.js'

export const createOrder = async (data) => {
    const donationId = await makeDonation(
        Number(data.campaignId),
        data.donorName,
        data.donorEmail,
        Number(data.amount),
        data.notes
    );
    const order = await razorpay.orders.create({
    amount: data.amount * 100,
    currency: "INR"
  });
  await create({
    donation_id: donationId,
    payment_gateway: "razorpay",
    gateway_order_id: order.id,
    amount: data.amount
  });

    // return donationId;
    return order;
};

export const markPaid = async (data) => {

  await markPaids(
    data.razorpay_order_id,
    data.razorpay_payment_id
  );
};


export const getPaymentDetailService = async(paymentid) => {
  console.log("asasasa", paymentid);
  
  const [result] = await pool.query("SELECT p.gateway_order_id, p.gateway_transaction_id, p.amount, p.payment_status, p.payment_method, p.paid_at, d.donation_id, c.campaign_id, c.fund_code FROM tbl_payments p LEFT JOIN tbl_donations d ON p.donation_id = d.donation_id LEFT JOIN tbl_campaigns c ON c.campaign_id = d.campaign_id WHERE gateway_payment_id = ? ", [paymentid] )
  return result[0];
}