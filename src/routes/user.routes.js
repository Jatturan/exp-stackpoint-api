import express from 'express';
import {
  getProfile,
  signUpUser,
  signInUser,
  updateProfile,
  logoutUser,
} from '../controllers/user.controller.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

// Routes
router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.route('/register').post(signUpUser);
router.route('/login').post(signInUser);
router.route('/logout').post(protect, logoutUser);

export default router;
