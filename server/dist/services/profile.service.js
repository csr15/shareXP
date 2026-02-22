"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const story_repository_1 = require("../repositories/story.repository");
const errors_1 = require("../utils/errors");
exports.profileService = {
    getProfile: async (uid) => {
        const profile = await user_repository_1.userRepository.getProfileWithStories(uid);
        if (!profile || profile.length === 0) {
            throw new errors_1.NotFoundError('Profile not found');
        }
        return profile;
    },
    deleteStory: async (storyId) => {
        const deleted = await story_repository_1.storyRepository.deleteById(storyId);
        if (!deleted)
            throw new errors_1.NotFoundError('Story not found');
        return deleted;
    },
    updateProfile: async (uid, data) => {
        return user_repository_1.userRepository.updateProfile(uid, data);
    },
    likeStory: async (dto) => {
        const { storyId, uid, authorId, userName, storyTitle } = dto;
        if (authorId !== uid) {
            const [liked] = await Promise.all([
                story_repository_1.storyRepository.addLike(storyId, uid),
                user_repository_1.userRepository.addNotification(authorId, {
                    uid,
                    userName,
                    authorId,
                    content: 'liked your story',
                    createdAt: new Date(),
                    storyId,
                    storyTitle,
                }),
            ]);
            return liked;
        }
        return story_repository_1.storyRepository.addLike(storyId, uid);
    },
    unlikeStory: async (storyId, uid, authorId) => {
        const [unliked] = await Promise.all([
            story_repository_1.storyRepository.removeLike(storyId, uid),
            user_repository_1.userRepository.removeNotification(authorId, uid),
        ]);
        return unliked;
    },
    updateView: async (storyId) => {
        return story_repository_1.storyRepository.incrementView(storyId);
    },
    followTag: async (uid, tagName) => {
        return user_repository_1.userRepository.followTag(uid, tagName);
    },
    unFollowTag: async (uid, tagName) => {
        return user_repository_1.userRepository.unFollowTag(uid, tagName);
    },
    deleteAvatar: async (uid) => {
        return user_repository_1.userRepository.deleteAvatar(uid);
    },
    getNotifications: async (uid) => {
        return user_repository_1.userRepository.getNotifications(uid);
    },
    clearNotification: async (notificationId, uid) => {
        return user_repository_1.userRepository.removeNotification(uid, notificationId);
    },
};
//# sourceMappingURL=profile.service.js.map