import { isAuthenticated } from '../../middleware/auth.js';
import { getMe, userSignIn, updateProfile } from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.post("/sign-in", userSignIn);
router.get("/get-me", isAuthenticated, getMe);
router.put("/update-profile", isAuthenticated, updateProfile);



export default router;