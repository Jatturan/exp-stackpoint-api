import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    visibility: {
      type: String,
      required: true,
      enum: ['public', 'private'],
      default: 'public',
    },
    tags: [{ type: String }],
    screenshots: [{ type: String }],
    repoUrl: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
