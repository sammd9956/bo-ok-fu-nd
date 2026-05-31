import jwt from 'jsonwebtoken';
import { BOOK_FUND_TOKEN } from '../constants/config.js';
import dotenv from 'dotenv';
dotenv.config();

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};
const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ id: user.user_id, name: user.full_name, email: user.email}, process.env.JWT_SECRET);
  return res.status(code).cookie(BOOK_FUND_TOKEN, token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

export {cookieOptions, sendToken}