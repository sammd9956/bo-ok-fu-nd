import express from 'express';
const router = express.Router();
import {forgotPassword, resetPassword} from "../controllers/authController.js";

router.post("/forgot-pass", forgotPassword);

router.patch("/reset-pass", resetPassword);

// router.post("/reset-pass", resetPassword);


export default router;