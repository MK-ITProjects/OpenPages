import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    coverImage: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    readTimeMinutes: { type: Number, default: 1 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    claps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

postSchema.index({ title: 'text', content: 'text' });

export const Post = mongoose.model('Post', postSchema);
