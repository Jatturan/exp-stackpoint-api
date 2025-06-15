import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Please fullname is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please email is required'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please password is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['developer', 'admin'],
      default: 'developer',
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    skills: [{ type: String, trim: true }],
    socialLinks: {
      github: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      twitter: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
