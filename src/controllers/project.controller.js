import asyncHandler from 'express-async-handler';
import Project from '../models/project.model.js';

// @desc    Create a project
// @route   POST /api/auth/v1/projects/add
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    visibility,
    tags,
    screenshots,
    repoUrl,
    liveUrl,
  } = req.body;

  const owner = req.user._id;

  if (!title || !description) {
    res.status(400);
    throw new Error('Title and description are required');
  }

  // Sanitize tags
  let cleanTags = [];

  if (Array.isArray(tags)) {
    cleanTags = [...new Set(tags.map((tag) => tag.trim().toLowerCase()))];
  }

  const project = await Project.create({
    title,
    description,
    owner,
    visibility,
    tags: cleanTags,
    screenshots,
    repoUrl,
    liveUrl,
  });

  if (!project) {
    res.status(400);
    throw new Error('Project unsuccessfully created');
  }

  res.status(201).json({
    successful: true,
    message: 'Project successfully created',
    data: project,
  });
});

export { createProject };
