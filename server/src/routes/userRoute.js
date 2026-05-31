import { isAuthenticated } from '../../middleware/auth.js';
import { getMe, userSignIn } from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.post("/sign-in", userSignIn);
router.get("/get-me", isAuthenticated, getMe);



export default router;