"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
exports.userRepository = {
    findByUserName: (userName) => User_1.User.find({ userName }),
    findByMail: (mail) => User_1.User.find({ mail }),
    findOnByMail: (mail) => User_1.User.findOne({ mail }),
    findById: (id) => User_1.User.findById(id),
    create: (userData) => new User_1.User(userData).save(),
    deleteById: (id) => User_1.User.findByIdAndDelete(id),
    getProfileWithStories: (uid) => User_1.User.aggregate([
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
    updateProfile: (uid, data) => User_1.User.findByIdAndUpdate(uid, {
        $set: {
            workingStatus: data.workingStatus,
            facebook: data.socialLinks.facebook,
            linkedIn: data.socialLinks.linkedIn,
            link: data.socialLinks.link,
            description: data.description,
            avatar: data.avatar,
        },
    }),
    followTag: (uid, tagName) => User_1.User.findByIdAndUpdate(uid, { $addToSet: { following: tagName } }),
    unFollowTag: (uid, tagName) => User_1.User.findByIdAndUpdate(uid, { $pull: { following: tagName } }),
    deleteAvatar: (uid) => User_1.User.findByIdAndUpdate(uid, { $set: { avatar: '' } }),
    getNotifications: async (uid) => {
        const user = await User_1.User.findById(uid);
        return user?.notifications ?? [];
    },
    addNotification: (userId, notification) => User_1.User.findByIdAndUpdate(userId, {
        $addToSet: { notifications: [notification] },
    }),
    removeNotification: (uid, notificationId) => User_1.User.findByIdAndUpdate(uid, {
        $pull: { notifications: { _id: new mongoose_1.default.Types.ObjectId(notificationId) } },
    }),
    getAuthor: (uid) => User_1.User.aggregate([
        { $match: { _id: new mongoose_1.default.Types.ObjectId(uid) } },
        { $project: { password: 0 } },
    ]),
    getFollowingTags: (uid) => User_1.User.aggregate([
        { $match: { _id: new mongoose_1.default.Types.ObjectId(uid) } },
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
