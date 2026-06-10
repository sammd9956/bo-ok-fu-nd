import express from "express";
import { processSquarePayment } from "../controllers/squarePaymentController.js";

const router = express.Router();

router.post("/pay", processSquarePayment);

export default router;