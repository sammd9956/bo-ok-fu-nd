import { pool } from '../../config/db.js';

const findCampaignById = async(id) => {
    
    
     return await pool.query( "SELECT campaign_id, fund_name, goal_amount, message, start_date, end_date from tbl_campaign WHERE campaign_id = ?", [id] )
    .then(([rows]) => {
        return rows.length > 0 ? rows[0] : null;
    });
};

const updateCampaignById = async(fundName, goalAmount, message, startDate, endDate, id) => {
        
     const [result] = await pool.query( "UPDATE tbl_campaign SET fund_name = ?, goal_amount  = ?, message = ?, start_date = ?, end_date = ? WHERE campaign_id = ?", [fundName, goalAmount, message, startDate, endDate, id] );
     return result;
    
};

const findCampaignByFundCode = async(fundCode)=>{

    const [result] = await pool.query( `SELECT fund_id, fund_name, fund_type, school_name, teacher_name, teacher_email, goal, message, start_date, end_date, fund_code FROM tbl_funds WHERE fund_code = ?`, [fundCode] )

    return result;
}

export {findCampaignById, updateCampaignById, findCampaignByFundCode};
