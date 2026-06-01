import express from 'express';
const router = express.Router();
import {forgotPassword} from "../controllers/authController.js";

router.post("/forgot-pass", forgotPassword);


export default router;