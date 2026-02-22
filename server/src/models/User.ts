import mongoose, { Schema } from 'mongoose';
import { IUserDocument } from '../types/user.types';

const notificationSchema = new Schema(
  {
    uid: { type: String, required: true },
    userName: { type: String, required: true },
    authorId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    storyId: { type: String, required: true },
    storyTitle: { type: String, required: true },
  },
  { _id: true },
);

const userSchema = new Schema<IUserDocument>(
  {
    userName: { type: String, required: true },
    sureName: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    following: { type: [String], default: [] },
    workingStatus: { type: String, default: '' },
    facebook: { type: String, default: '' },
    linkedIn: { type: String, default: '' },
    link: { type: String, default: '' },
    description: { type: String, default: '' },
    avatar: { type: String, default: '' },
    notifications: { type: [notificationSchema], default: [] },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUserDocument>('User', userSchema);
