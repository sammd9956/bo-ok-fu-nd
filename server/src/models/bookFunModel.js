import { pool } from '../../config/db.js';

const findByIdAndUpdate = async(id) => {
    
    const [result] = await pool.query( "UPDATE tbl_funds set email_flag = '1' WHERE fund_id = ?", [id] )

    return result.affectedRows > 0;
};

const findFundByEmail = async (teacherEmail) => {

    const [result] = await pool.query(
        "SELECT fund_id, fund_type, school_name, fund_name, start_date, end_date, teacher_name, teacher_email, password, goal, message, fund_code FROM tbl_funds WHERE teacher_email = ?",
        [teacherEmail]
    );

    return result;
};
const findMeByEmail = async (teacherEmail) => {

    const [result] = await pool.query(
        "SELECT fund_id, fund_type, school_name, fund_name, start_date, end_date, teacher_name, teacher_email, goal, message, fund_code FROM tbl_funds WHERE teacher_email = ?",
        [teacherEmail]
    );

    return result;
};

const creatDonation = async ( fundId, donorName, donorEmail, amount, notes) => {
    
    const [result] = await pool.query(
        "INSERT INTO tbl_donations (fund_id, donor_name, donor_email, amount, notes) VALUES (?, ?, ?, ?, ?)",
        [fundId, donorName, donorEmail, amount, notes]
    );

    return result;
};

//update fund
const updateCampaign = async(id, fundName, startDate, endDate, goalAmount, message) => {
    const [result] = await pool.query( "UPDATE tbl_funds set fund_name = ?, start_date = ?, end_date = ?, goal = ?, message = ? WHERE fund_id = ?", [fundName, startDate, endDate, goalAmount, message, id] )

    return result.affectedRows > 0;

}



export {findByIdAndUpdate, findFundByEmail, findMeByEmail, creatDonation, updateCampaign};