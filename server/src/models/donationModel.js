import { pool } from '../../config/db.js';

const makeDonation = async ( campaignId, fundId, donorName, donorEmail, amount, notes ) => {

    const [result] = await pool.query( "INSERT INTO tbl_donations (campaign_id, fund_id, donor_name, donor_email, amount, notes) VALUES (?,?, ?, ?, ?, ?)", [campaignId,fundId, donorName, donorEmail, amount, notes] );

    return result;
};

//get all donation against fundID

const getDonationBycampaignId = async (campaignid) => {
    const [result] = await pool.query("SELECT donation_id, donor_name, donor_email, amount, message, donated_at, thank_you_sent, transaction_type FROM tbl_donations WHERE campaign_id = ? ", [campaignid])
    return result;
}

const getDonationById = async(id) => {
     const [result] = await pool.query("SELECT donation_id, donor_name, donor_email, amount, message, thank_you_sent, transaction_type FROM tbl_donations WHERE donation_id = ? ", [id])
    return result;
}

//update mail flag
const updateDonationOnMail = async (id) => {
    try {
        if (!id) return false;

        const [result] = await pool.query( "UPDATE tbl_donations SET thank_you_sent = ? WHERE donation_id = ?", ["1", id] );

        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error updating donation mail flag:", error);
        return false;
    }
};

const makeDonationService = async ({ campaignId, donorName, donorEmail, amount, notes }) => {

  const [result] = await pool.query( ` INSERT INTO tbl_donations ( campaign_id, donor_name, donor_email, amount, message ) VALUES (?, ?, ?, ?, ?) `, [ campaignId, donorName, donorEmail, amount, notes ]
  );

  return { donationId: result.insertId };
};


export { makeDonation, getDonationBycampaignId, getDonationById, updateDonationOnMail, makeDonationService };