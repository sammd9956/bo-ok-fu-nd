import { pool } from '../../config/db.js';

export const create = async (data) => {
    
  const [result] = await pool.query(
    `
    INSERT INTO tbl_payments
    (
      donation_id,
      payment_gateway,
      gateway_order_id,
      amount
    )
    VALUES (?, ?, ?, ?)
    `,
    [
      data.donation_id,
      data.payment_gateway,
      data.gateway_order_id,
      data.amount
    ]
  );

  return result.insertId;
};

export const markPaids = async (
  orderId,
  paymentId
) => {

  const sql = `
    UPDATE tbl_payments
    SET
      gateway_payment_id = ?,
      payment_status = 'paid',
      paid_at = NOW()
    WHERE gateway_order_id = ?
  `;

  await db.execute(sql, [
    paymentId,
    orderId
  ]);
};