import { pool } from '../../config/db.js';



const findCampaignByFundCode = async(fundCode)=>{

    const [result] = await pool.query( `SELECT fund_id, fund_name, fund_type, school_name, teacher_name, teacher_email, goal, message, start_date, end_date, fund_code FROM tbl_funds WHERE fund_code = ?`, [fundCode] )

    return result;
}

const getMyCampaignsService = async (userId) => {

    const [campaigns] = await pool.query( ` SELECT campaign_id, fund_code, campaign_name, campaign_type, goal_amount, start_date, end_date, created_at FROM tbl_campaigns WHERE user_id = ? `, [userId] );

    return campaigns;
};
const getCampaignsByFundCodeService = async (fundcode) => {
console.log("fundCode", fundcode);

   try {
     const [campaigns] = await pool.query( `SELECT c.campaign_id, c.fund_code, c.campaign_name, c.goal_amount, c.message, c.start_date, c.end_date, u.full_name, u.email, u.role FROM tbl_campaigns c INNER JOIN tbl_users u ON c.user_id = u.user_id WHERE c.fund_code = ?`,[fundcode] );

    return campaigns[0];
   } catch (error) {
    console.log(error);
    
   }
};


export { findCampaignByFundCode, getMyCampaignsService, getCampaignsByFundCodeService };
