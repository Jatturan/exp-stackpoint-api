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
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
