import mongoose from 'mongoose';
import { User } from '../models/User';
import { IUserDocument, UpdateProfileDto } from '../types/user.types';
import { INotification } from '../types/user.types';

export const userRepository = {
  findByUserName: (userName: string) => User.find({ userName }),

  findByMail: (mail: string) => User.find({ mail }),

  findOnByMail: (mail: string) => User.findOne({ mail }),

  findById: (id: string) => User.findById(id),

  create: (userData: Partial<IUserDocument>) => new User(userData).save(),

  deleteById: (id: string) => User.findByIdAndDelete(id),

  getProfileWithStories: (uid: string) =>
    User.aggregate([
      {
        $project: {
          _id: { $toString: '$_id' },
          userName: 1,
          sureName: 1,
          following: 1,
          facebook: 1,
          linkedIn: 1,
          link: 1,
          workingStatus: 1,
          description: 1,
          avatar: 1,
          notifications: 1,
        },
      },
      {
        $lookup: {
          from: 'stories',
          localField: '_id',
          foreignField: 'uid',
          as: 'stories',
        },
      },
      { $match: { _id: uid } },
      {
        $project: {
          userDetails: {
            userName: '$userName',
            sureName: '$sureName',
            following: '$following',
            facebook: '$facebook',
            linkedIn: '$linkedIn',
            link: '$link',
            workingStatus: '$workingStatus',
            description: '$description',
            avatar: '$avatar',
            notifications: '$notifications',
          },
          stories: '$stories',
        },
      },
    ]),

  updateProfile: (uid: string, data: UpdateProfileDto) =>
    User.findByIdAndUpdate(uid, {
      $set: {
        workingStatus: data.workingStatus,
        facebook: data.socialLinks.facebook,
        linkedIn: data.socialLinks.linkedIn,
        link: data.socialLinks.link,
        description: data.description,
        avatar: data.avatar,
      },
    }),

  followTag: (uid: string, tagName: string) =>
    User.findByIdAndUpdate(uid, { $addToSet: { following: tagName } }),

  unFollowTag: (uid: string, tagName: string) =>
    User.findByIdAndUpdate(uid, { $pull: { following: tagName } }),

  deleteAvatar: (uid: string) =>
    User.findByIdAndUpdate(uid, { $set: { avatar: '' } }),

  getNotifications: async (uid: string) => {
    const user = await User.findById(uid);
    return user?.notifications ?? [];
  },

  addNotification: (userId: string, notification: INotification) =>
    User.findByIdAndUpdate(userId, {
      $addToSet: { notifications: [notification] },
    }),

  removeNotification: (uid: string, notificationId: string) =>
    User.findByIdAndUpdate(uid, {
      $pull: { notifications: { _id: new mongoose.Types.ObjectId(notificationId) } },
    }),

  getAuthor: (uid: string) =>
    User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(uid) } },
      { $project: { password: 0 } },
    ]),

  getFollowingTags: (uid: string) =>
    User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(uid) } },
      { $unwind: '$following' },
      { $group: { _id: '$following' } },
      {
        $lookup: {
          from: 'stories',
          localField: 'following',
          foreignField: 'tags',
          as: 'docs',
        },
      },
      { $project: { _id: 0 } },
    ]),
};
