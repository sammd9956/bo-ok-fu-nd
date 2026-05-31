import { pool } from '../../config/db.js';
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid'



const startFundService = async (reqBody) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const { role, schoolName, fundName, startDate, endDate, teacherName, teacherEmail, password, goal, message } = reqBody;

    const hashedPass = await bcrypt.hash(password, 10);
    const fundCode = uuidv4();
    // 1. Insert user
    const [userResult] = await connection.query( "INSERT INTO tbl_users (school_name, full_name, email, password, role) VALUES (?,?,?,?,?)", [schoolName, teacherName, teacherEmail, hashedPass, role] );

    const userId = userResult.insertId;
    

    // 2. Insert campaign
    const [campaignResult] = await connection.query( `INSERT INTO tbl_campaigns (user_id, campaign_name, campaign_type, goal_amount, message, start_date, end_date,fund_code) VALUES (?,?,?,?,?,?,?,?)`, [userId, fundName, role, goal, message, startDate, endDate, fundCode] );

    await connection.commit();

    return { success: true, userId, campaignId: campaignResult.insertId };

  } catch (error) {
    await connection.rollback();
    console.log(error);
    throw error;
  }
};



const findByIdAndUpdate = async(id) => {
    
    const [result] = await pool.query( "UPDATE tbl_funds set email_flag = '1' WHERE fund_id = ?", [id] )

    return result.affectedRows > 0;
};

const findFundByEmail = async (teacherEmail) => {

console.log("SELECT fund_id, fund_type, school_name, fund_name, start_date, end_date, teacher_name, teacher_email, password, goal, message, fund_code FROM tbl_funds WHERE teacher_email", teacherEmail);

    const [result] = await pool.query(
        "SELECT fund_id, fund_type, school_name, fund_name, start_date, end_date, teacher_name, teacher_email, password, goal, message, fund_code FROM tbl_funds WHERE teacher_email = ?",
        [teacherEmail]
    );

    return result;
};
const findMeByEmail = async (teacherEmail) => {
console.log("emm", teacherEmail);
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
//update profile
const updateMyProfile = async(teacherName, teacherEmail, password, id) => {
    const hashedPass = await bcrypt.hash(password, 10);
    const [result] = await pool.query( "UPDATE tbl_funds set teacher_name = ?, teacher_email = ?, password = ? WHERE fund_id = ?", [teacherName, teacherEmail, hashedPass, id] )

    return result.affectedRows > 0;

}



export {
    findByIdAndUpdate,
     findFundByEmail,
     findMeByEmail,
     creatDonation,
     updateCampaign,
     updateMyProfile,
     startFundService
    };