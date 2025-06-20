import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import Comment from '../models/comment.model.js';

// @desc    Get all comments
// @route   GET /api/auth/v1/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find();

  res.status(200).json({
    successful: true,
    message: 'Successfully retrieved all comments',
    data: comments,
  });
});

// @desc    Get a comment
// @route   GET /api/auth/v1/comments/:id
// @access  Private
const getComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid ID');
  }

  const comment = await Comment.findById(id);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  res.status(200).json({
    successful: true,
    message: 'Successfully retrieved comment',
    data: comment,
  });
});

// @desc    Create a comment
// @route   POST /api/auth/v1/comments/add
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  const { project, content, parentComment } = req.body;

  if (!project || !content) {
    res.status(400);
    throw new Error('Project ID and content are required');
  }

  if (mongoose.Types.ObjectId.isValid(project)) {
    res.status(400);
    throw new Error('Invalid project ID');
  }

  const trimmedContent = content.trim();

  const newComment = await Comment.create({
    project,
    user: req.user._id,
    content: trimmedContent,
    parentComment: parentComment || null,
  });

  if (!newComment) {
    res.status(400);
    throw new Error('Comment unsuccessfully created');
  }

  res.status(200).json({
    successful: true,
    message: 'Comment successfully created',
    data: newContent,
  });
});

// @desc    Update a comment
// @route   PUT /api/auth/v1/comments/:id
// @access  Private
const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content, parentComment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Invalid comment id');
  }

  if (!content) {
    res.status(400);
    throw new Error('Content is required');
  }

  const comment = await Comment.findById(id);

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  }

  if (req.user._id.toString() != comment._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to make update this comment');
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    id,
    {
      content: content.trim(),
      ...(parentComment && { parentComment }),
      isEdited: true,
    },
    { new: true, runValidators: true }
  );

  if (!updatedComment) {
    res.status(400);
    throw new Error('Comment unsuccessfully updated');
  }

  return res.status(200).json({
    successful: true,
    message: 'Comment successfully updated',
    data: updatedComment,
  });
});

// @desc    Delete a comment
// @route   DELETE /api/auth/v1/comments/:id
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
});

export { getComments, getComment, createComment, updateComment, deleteComment };
