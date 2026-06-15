import { pool } from "../../config/db.js";
import { generateGiftCard } from "../../constants/config.js";
import { TryCatch } from "../../middleware/error.js";
import { ErrorHandler } from "../../utils/utility.js";
import dotenv from 'dotenv';
dotenv.config();

const redeemFunds = TryCatch(async (req, res, next) => {
  const connection = await pool.getConnection();

  try {
    const userId = req.user?.user_id || 1;
    const { amount, campaignId } = req.body;
    const idempotencyKey = req.headers["idempotency-key"];

    if (!campaignId) {
      return next(new ErrorHandler("Campaign ID required", 400));
    }

    await connection.beginTransaction();

    // 1. Idempotency check (same request retry protection)
    if (idempotencyKey) {
      const [existingRequest] = await connection.query(
        `SELECT redemption_id, gift_card_code
         FROM tbl_redemptions
         WHERE idempotency_key = ?`,
        [idempotencyKey]
      );

      if (existingRequest.length > 0) {
        await connection.rollback();

        return res.status(200).json({
          success: true,
          message: "Already processed",
          redemptionId: existingRequest[0].redemption_id,
          giftCardCode: existingRequest[0].gift_card_code,
        });
      }
    }

    // 2. Lock campaign row (important for race condition)
    const [campaign] = await connection.query(
      `SELECT campaign_id, goal_amount
       FROM tbl_campaigns
       WHERE campaign_id = ?
       FOR UPDATE`,
      [campaignId]
    );

    if (!campaign.length) {
      await connection.rollback();
      return next(new ErrorHandler("Campaign not found", 404));
    }

    // 3. Prevent multiple redemption per campaign (IMPORTANT)
    const [alreadyRedeemed] = await connection.query( `SELECT redemption_id FROM tbl_redemptions WHERE campaign_id = ?`, [campaignId] );

    if (alreadyRedeemed.length > 0) {
      await connection.rollback();

      return res.status(400).json({ success: false, message: "This campaign is already redeemed", });
    }

    // 4. Check user
    const [users] = await connection.query( `SELECT user_id FROM tbl_users WHERE user_id = ? FOR UPDATE`, [userId] );

    if (!users.length) {
      await connection.rollback();
      return next(new ErrorHandler("User not found", 404));
    }

    // 5. Generate gift card
    const giftCardCode = generateGiftCard();

    // 6. Insert redemption
    const [result] = await connection.query( `INSERT INTO tbl_redemptions (campaign_id, user_id, amount, status, gift_card_code, idempotency_key) VALUES (?, ?, ?, 'completed', ?, ?)`, [campaignId, userId, amount, giftCardCode, idempotencyKey || null] );

    // 7. Commit transaction
    await connection.commit();

    return res.status(201).json({
      success: true,
      message: "Redeemed successfully",
      redemptionId: result.insertId,
      giftCardCode,
      redirectUrl: `/e-gift-card/${result.insertId}`,
    });
  } catch (error) {
    await connection.rollback();
    return next(error);
  } finally {
    connection.release();
  }
});

const getRedeemData = TryCatch(async(req, res, next) => {
    const {redemptionId} = req.params;
    const [result] = await pool.query("SELECT redemption_id, user_id, amount, status, gift_card_code, idempotency_key, created_at FROM tbl_redemptions WHERE redemption_id = ?", [redemptionId]);
    res.status(200).json({success: true, redeemData: result[0]})
})

export {redeemFunds, getRedeemData}