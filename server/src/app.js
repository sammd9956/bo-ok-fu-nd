import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
/* import {connectDB} from '../config/db.js';
connectDB(); */
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import fundRoute from './routes/fundRoute.js';
import donationRoute from './routes/donationRoute.js';
import campaignRoute from './routes/campaignRoute.js';
import authRoute from './routes/authRoute.js';
import paymentRoute from './routes/paymentRoutes.js';
import { errorMiddleware } from '../middleware/error.js';
import cors from 'cors';
import { corsOptions } from '../constants/config.js';

dotenv.config();

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use("/api/v1/user", userRoute)
app.use("/api/v1/fund", fundRoute)
app.use("/api/v1/don", donationRoute)
app.use("/api/v1/camp", campaignRoute)
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/raz", paymentRoute);

app.get("/getkey", async(req, res) => res.json({key: process.env.RAZORPAY_API_KEY}))


app.use(errorMiddleware);

export default app;