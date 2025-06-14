import express from 'express';
import { signUpUser, signInUser } from '../controllers/user.controller.js';

const router = express.Router();

// Route
router.route('/register').post(signUpUser);
router.route('/login').post(signInUser);

export default router;
