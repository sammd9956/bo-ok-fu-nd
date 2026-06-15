import { pool } from '../../../config/db.js';


const checkCampaignExpired = async (campaignId) => {
  const [rows] = await pool.query( `SELECT campaign_id, end_date, status FROM tbl_campaigns WHERE start_date < NOW() AND end_date > NOW() AND campaign_id = ?`, [campaignId] );

  if (!rows.length) {
    throw new Error("Campaign not found");
  }

  const campaign = rows[0];

  /* if (campaign.status !== "active") {
    throw new Error("Campaign is not active");
  }

  if (
    campaign.end_date &&
    new Date(campaign.end_date) < new Date()
  ) {
    throw new Error("Campaign has expired");
  } */

  return campaign;
};
const getCampStatus = async (campaignId) => {
  const [rows] = await pool.query( `SELECT status FROM tbl_campaigns WHERE campaign_id = ?`, [campaignId] );

  if (!rows.length) {
    throw new Error("Campaign not found");
  }

  const status = rows[0].status;

  return status;
};

export {checkCampaignExpired, getCampStatus};