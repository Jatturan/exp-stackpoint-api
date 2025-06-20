import express from 'express';
import protect from '../middlewares/auth.middleware.js';
import {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller.js';

const router = express.Router();

// Routes
router.route('/').get(protect, getComments);
router.route('/add').post(protect, createComment);
router
  .route('/:id')
  .get(protect, getComment)
  .put(protect, updateComment)
  .delete(protect, deleteComment);

export default router;
