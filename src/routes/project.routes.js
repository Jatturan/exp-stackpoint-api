import express from 'express';
import protect from '../middlewares/auth.middleware.js';
import {
  getProjects,
  getProject,
  createProject,
} from '../controllers/project.controller.js';

const router = express.Router();

// Routes
router.route('/').get(protect, getProjects);
router.route('/add').post(protect, createProject);

router.route('/:id').get(protect, getProject);

export default router;
