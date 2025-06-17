import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Project from '../models/project.model.js';

// @desc    Get all projects
// @route   GET /api/auth/v1/projects
// @access  Private
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();

  res.status(200).json({
    successful: true,
    message: 'Successfully fetched all projects',
    data: projects,
  });
});

// @desc    Get a project
// @route   GET /api/auth/v1/projects/:id
// @access  Private
const getProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid ID');
  }

  const project = await Project.findById(id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  res.status(200).json({
    successful: true,
    message: 'Project successfully fetched',
    data: project,
  });
});

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

// @desc    Update a project
// @route   PUT /api/auth/v1/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    visibility,
    tags,
    screenshots,
    repoUrl,
    liveUrl,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid ID');
  }

  // Sanitize tags
  let cleanTags = [];

  if (Array.isArray(tags)) {
    cleanTags = [...new Set(tags.map((tag) => tag.trim().toLowerCase()))];
  }

  const updateData = {
    ...(title && { title }),
    ...(description && { description }),
    ...(visibility && { visibility }),
    ...(tags && { tags: cleanTags }),
    ...(screenshots && { screenshots }),
    ...(repoUrl && { repoUrl }),
    ...(liveUrl && { liveUrl }),
  };

  const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProject) {
    res.status(400);
    throw new Error('Project unsuccessfully updated');
  }

  res.status(200).json({
    successful: true,
    message: 'Project successfully updated',
    data: updatedProject,
  });
});

export { getProjects, getProject, createProject, updateProject };
