import { pool } from '../../config/db.js';

const makeDonation = async ( campaignId, donorName, donorEmail, amount, notes ) => {

    const [result] = await pool.query( "INSERT INTO tbl_donations (campaign_id, donor_name, donor_email, amount, message) VALUES (?,?, ?, ?, ?)", [campaignId, donorName, donorEmail, amount, notes] );

    return result.insertId;
};

//get all donation against fundID

const getDonationBycampaignId = async (campaignid) => {
    /* const [result] = await pool.query("SELECT donation_id, donor_name, donor_email, amount, message, donated_at, thank_you_sent, transaction_type FROM tbl_donations WHERE  campaign_id = ? ", [campaignid])
   return result; */
    const [result] = await pool.query( `SELECT d.donation_id, d.donation_status, d.donor_name, d.donor_email, d.amount, d.message, d.donated_at, d.thank_you_sent, d.transaction_type, p.payment_status FROM tbl_donations d INNER JOIN tbl_payments p ON d.donation_id = p.donation_id WHERE d.campaign_id = ? AND p.payment_status = 'paid'`, [campaignid] );
    
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