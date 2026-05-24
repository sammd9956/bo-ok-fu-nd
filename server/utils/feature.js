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
  const token = jwt.sign({ id: user.fund_id, name: user.teacher_name, email: user.teacher_email, fundCode: user.fund_code}, process.env.JWT_SECRET);
  return res.status(code).cookie(BOOK_FUND_TOKEN, token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

export {cookieOptions, sendToken}