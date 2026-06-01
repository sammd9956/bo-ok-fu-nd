import { TryCatch } from "../../middleware/error.js";
import crypto from 'crypto';
import { pool } from '../../config/db.js';


const forgotPassword = TryCatch(async(req, res, next) => {
    const otp = Math.floor(Math.random() * 900000 + 100000);
    const token  = crypto.randomBytes(32).toString("hex").slice(0, 6);
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const expires_at = new Date(Date.now() + 2 * 60 * 1000);

    const result = await pool.query("INSERT INTO tbl_password_reset_tokens (user_id, token_hash, expires_at) VALUES (?,?,?)", [req.body.user_id, tokenHash, expires_at]);
    res.status(200).json({success: true, message: "ok", otp, token, tokenHash, expires_at, id: result.insertId})
})

export { forgotPassword }