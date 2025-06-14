import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import hashPassword from '../utils/hashPassword.js';
import generateToken from '../utils/generateToken.js';
import verifyPassword from '../utils/verifyPassword.js';

// @desc    Create a user
// @route   POST /api/auth/v1/users/register
// @access  Public
const signUpUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    return res
      .status(400)
      .json({ error: 'Full name, email and password are required' });
  }

  const normalizedEmail = email.toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  // Encrypt password
  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    fullname,
    email: normalizedEmail,
    password: hashedPassword,
  });

  if (!user) {
    return res.status(400).json({ error: 'User unsuccessfully created' });
  }

  const token = generateToken(user._id);

  const { password: _, ...userData } = user.toObject();

  return res.status(201).json({
    successful: true,
    message: 'User successfully created',
    token,
    data: userData,
  });
});

// @desc    Login a user
// @route   POST /api/auth/v1/users/login
// @access  Public
const signInUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const normalizedEmail = email.toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Verify password
  const isVerified = await verifyPassword(password, user.password);

  if (!isVerified) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = await generateToken(user._id);

  const { password: _, ...userData } = user.toObject();

  return res.status(200).json({
    successful: true,
    message: 'User successfully logged in',
    token,
    data: userData,
  });
});

export { signUpUser, signInUser };
