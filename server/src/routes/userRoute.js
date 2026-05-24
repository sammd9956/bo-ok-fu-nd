import {isAuthenticated} from '../../middleware/auth.js';
import { getMyProfile, userSignUp } from '../controllers/userController.js';
import express from 'express';
import { getProfile } from '../controllers/userController.js';
const router = express.Router();


router.post("/sign-up", userSignUp);
// router.post("/sign-in", userSignIn);
router.get("/get-me", isAuthenticated, getMyProfile);
router.get("/get-profile/:id", getProfile);

export default router;