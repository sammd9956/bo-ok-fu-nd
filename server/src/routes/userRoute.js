import { isAuthenticated } from '../../middleware/auth.js';
import { getMe, userSignIn, updateProfile, logOut } from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.post("/sign-in", userSignIn);
router.get("/get-me", isAuthenticated, getMe);
router.put("/update-profile", isAuthenticated, updateProfile);
router.get("/log-out", logOut);



export default router;