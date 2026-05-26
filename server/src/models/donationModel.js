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
    const [result] = await pool.query("SELECT donation_id, fund_id, donor_name, donor_email, amount, notes, a_flag, transaction_type, created_at FROM tbl_donations WHERE fund_id = ? ", [fundId])
    return result;
}

const getDonationById = async(id) => {
     const [result] = await pool.query("SELECT donation_id, donor_name, donor_email, amount, notes, a_flag FROM tbl_donations WHERE donation_id = ? ", [id])
    return result;
}

//update mail flag
const updateDonationOnMail = async (id) => {
    try {
        if (!id) return false;

        const [result] = await pool.query(
            "UPDATE tbl_donations SET a_flag = ? WHERE donation_id = ?",
            ["1", id]
        );

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating donation mail flag:", error);
        return false;
    }
};



export { makeDonation, getDonationByFundId, getDonationById, updateDonationOnMail };