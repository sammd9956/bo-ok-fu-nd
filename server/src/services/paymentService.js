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