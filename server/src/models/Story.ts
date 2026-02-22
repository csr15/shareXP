import mongoose, { Schema } from 'mongoose';
import { IStoryDocument } from '../types/story.types';

const commentSchema = new Schema(
  {
    userName: { type: String, required: true },
    uid: { type: String, required: true },
    comment: { type: String, required: true },
    commentedAt: { type: Date, default: Date.now },
    avatar: { type: String, default: '' },
  },
  { _id: true },
);

const storySchema = new Schema<IStoryDocument>(
  {
    uid: { type: String, required: true },
    userName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: { type: [String], default: [] },
    views: { type: Number, default: 0 },
    story: {
      title: { type: String, required: true },
      content: { type: String, required: true },
      tags: { type: [String], default: [] },
      img: { type: String, default: '' },
    },
    comments: { type: [commentSchema], default: [] },
  },
  { timestamps: true },
);

export const Story = mongoose.model<IStoryDocument>('Story', storySchema);
