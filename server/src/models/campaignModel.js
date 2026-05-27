import { pool } from '../../config/db.js';



const findCampaignByFundCode = async(fundCode)=>{

    const [result] = await pool.query( `SELECT fund_id, fund_name, fund_type, school_name, teacher_name, teacher_email, goal, message, start_date, end_date, fund_code FROM tbl_funds WHERE fund_code = ?`, [fundCode] )

    return result;
}

const findCampaignByFundId = async(fundId)=>{

    const [result] = await pool.query( `SELECT id, fund_id, title, start_date, end_date, goal_amount, description FROM tbl_campaigns WHERE fund_id = ?`, [fundId] )

    return result;
}

export { findCampaignByFundCode, findCampaignByFundId };
