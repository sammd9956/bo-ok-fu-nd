import { pool } from "../../config/db.js";
import crypto from "crypto";
import bcrypt from 'bcrypt';
import { sendMailForPasswordReset } from "../../utils/sendEmail.js";
import { resetPasswordTemplate } from "../template/resetPasswordTemplate.js";

const forgotPasswordService = async (email) => {

    const [rows] = await pool.query( "SELECT * FROM tbl_users WHERE email = ?", [email] );
   

    if(rows.length === 0){
        throw new Error("User not found");
    }

    const user = rows[0];
console.log("User Found:", user.email);
    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date( Date.now() + 15 * 60 * 1000 );

    await pool.query( ` INSERT INTO tbl_password_reset_tokens ( user_id, token_hash, token_type, expires_at ) VALUES (?, ?, ?, ?) `, [ user.user_id, token, "PASSWORD_RESET", expiresAt ] );

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendMailForPasswordReset({
        to: user.email,
        subject: "Reset Password",
        html: resetPasswordTemplate(resetLink)
    });
};

const rsetPasswordService = async (token, password) => {
    try {
        const [rows] = await pool.query(`SELECT * FROM tbl_password_reset_tokens WHERE token_hash = ? AND token_type = 'PASSWORD_RESET' AND used_at IS NULL AND expires_at > NOW()`, [token]);
        if(rows.length === 0){
        throw new Error("Invalid or expired token");
    }
    const resetToken = rows[0];
    const hashedPass = await bcrypt.hash(password, 10);
    await pool.query("UPDATE tbl_users SET password = ? WHERE user_id = ? ", [hashedPass, resetToken.user_id]);
    await pool.query("UPDATE tbl_password_reset_tokens SET used_at = NOW() WHERE token_id = ? ", [resetToken.token_id])

    } catch (error) {
        console.log(error);
        throw error;
        
    }
}

export {forgotPasswordService, rsetPasswordService}