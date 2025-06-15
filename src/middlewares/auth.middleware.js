import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { JWT_SECRET } from '../config/index.js';
import User from '../models/user.model.js';

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const throwUnauthorized = (message = 'Not authorized') => {
    const err = new Error(message);
    err.statusCode = 401;
    throw err;
  };

  if (authHeader?.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        const err = new Error('User not found');
        err.statusCode = 404;
        throw err;
      }

      req.user = user;
      next();
    } catch (error) {
      console.error(`[Auth Error] ${error.message}`);
      throwUnauthorized('Invalid token');
    }
  } else {
    throwUnauthorized('Invalid token');
  }
});

export default protect;
