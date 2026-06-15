import { pool } from "../../config/db.js";

export const isCampaignActive = async (campaignId) => {
    
  const [rows] = await pool.query( ` SELECT campaign_id FROM tbl_campaigns WHERE campaign_id = ? AND NOW() BETWEEN start_date AND end_date `, [campaignId] );

  return rows.length > 0;
};

