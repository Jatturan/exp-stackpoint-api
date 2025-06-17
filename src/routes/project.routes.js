import express from 'express';
import protect from '../middlewares/auth.middleware.js';
import {
  getProjects,
  createProject,
} from '../controllers/project.controller.js';

const router = express.Router();

// Routes
router.route('/').get(protect, getProjects);
router.route('/add').post(protect, createProject);

export default router;
