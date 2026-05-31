import jwt from 'jsonwebtoken';
import {TryCatch} from './error.js';
import {ErrorHandler} from '../utils/utility.js';
import {BOOK_FUND_TOKEN} from '../constants/config.js';

const isAuthenticated = TryCatch( async (req, res, next) => {
const token = req.cookies[BOOK_FUND_TOKEN];
if(!token)
     return next(new ErrorHandler("Please, login to access this route", 401));
const decodedData = jwt.verify(token, process.env.JWT_SECRET);
console.log("decodedData", decodedData);

req.user = decodedData;
next()

})

export {isAuthenticated}