import asyncHandler from 'express-async-handler';
import User from '../models/user.model.js';
import hashPassword from '../utils/hashPassword.js';
import generateToken from '../utils/generateToken.js';
import verifyPassword from '../utils/verifyPassword.js';

// @desc    Get a user profile
// @route   GET /api/auth/v1/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    successful: true,
    message: 'User profile successfully fetched',
    data: user,
  });
});

// @desc    Create a user
// @route   POST /api/auth/v1/users/register
// @access  Public
const signUpUser = asyncHandler(async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    res.status(400);
    throw new Error('Full name, email and password are required');
  }

  const normalizedEmail = email?.toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    res.status(400);
    throw new Error('Email already registered');
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    fullname,
    email: normalizedEmail,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error('User unsuccessfully created');
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
    res.status(400);
    throw new Error('Email and password are required');
  }

  const normalizedEmail = email?.toLowerCase();

  const user = await User.findOne({ email: normalizedEmail });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const isVerified = await verifyPassword(password, user.password);

  if (!isVerified) {
    res.status(401);
    throw new Error('Invalid credentials');
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

// @desc    Logout a user
// @route   POST /api/auth/v1/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  return res.status(200).json({
    successful: true,
    message:
      'User successfully logged out. Please delete tokens on the client side',
  });
});

// @desc    Update a user profile
// @route   PUT /api/auth/v1/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const { fullname, email, password, role, bio, avatar, skills, socialLinks } =
    req.body;

  if (fullname) user.fullname = fullname;
  if (email) user.email = email.toLowerCase();
  if (password) user.password = await hashPassword(password);
  if (role && req.user.role === 'admin') user.role = role;
  if (bio) user.bio = bio;
  if (avatar) user.avatar = avatar;
  if (skills) user.skills = skills;
  if (socialLinks) user.socialLinks = socialLinks;

  const updatedUser = await user.save();
  const userWithoutPassword = updatedUser.toObject();
  delete userWithoutPassword.password;

  return res.status(200).json({
    successful: true,
    message: 'User successfully updated',
    updatedUser: userWithoutPassword,
  });
});

export { getProfile, signUpUser, signInUser, logoutUser, updateProfile };
