import { pool } from "../../config/db.js";
import crypto from "crypto";
import { sendMailForPasswordReset } from "../../utils/sendEmail.js";
import { resetPasswordTemplate } from "../template/resetPasswordTemplate.js";

const forgotPasswordService = async (email) => {
console.log("User Found:", user.email);
    const [rows] = await pool.query(
        "SELECT * FROM tbl_users WHERE email = ?",
        [email]
    );

    if(rows.length === 0){
        throw new Error("User not found");
    }

    const user = rows[0];

    const token = crypto.randomBytes(32).toString("hex");

    const expiresAt = new Date(
        Date.now() + 2 * 60 * 1000
    );

    await pool.query( ` INSERT INTO tbl_password_reset_tokens ( user_id, token, token_type, expires_at ) VALUES (?, ?, ?, ?) `, [ user.user_id, token, "PASSWORD_RESET", expiresAt ] );

    const resetLink =
        `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendMailForPasswordReset({
        to: user.email,
        subject: "Reset Password",
        html: resetPasswordTemplate(resetLink)
    });
};

export {forgotPasswordService}