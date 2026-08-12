import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },

    bio: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },

    // ADD THIS
    isAdmin: {
      type: Boolean,
      default: false,
    },

    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);