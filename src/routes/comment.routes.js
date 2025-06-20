import express from 'express';
import protect from '../middlewares/auth.middleware.js';
import {
  createComment,
  getComment,
  getComments,
} from '../controllers/comment.controller.js';

const router = express.Router();

// Routes
router.route('/').get(protect, getComments);

router.route('/:id').get(protect, getComment).post(protect, createComment);

export default router;
