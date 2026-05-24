import { pool } from '../../config/db.js';

const makeDonation = async ( fundId, donorName, donorEmail, amount, notes ) => {

    const [result] = await pool.query(
        "INSERT INTO tbl_donations (fund_id, donor_name, donor_email, amount, notes) VALUES (?, ?, ?, ?, ?)",
        [fundId, donorName, donorEmail, amount, notes]
    );

    return result;
};

//get all donation against fundID

const getDonationByFundId = async (fundId) => {
    const [result] = await pool.query("SELECT donation_id, fund_id, donor_name, donor_email, amount, notes FROM tbl_donations WHERE fund_id = ? ", [fundId])
    return result;
}



export { makeDonation, getDonationByFundId };