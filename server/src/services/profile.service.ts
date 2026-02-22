import { userRepository } from '../repositories/user.repository';
import { storyRepository } from '../repositories/story.repository';
import { NotFoundError } from '../utils/errors';
import { UpdateProfileDto } from '../types/user.types';
import { LikeStoryDto } from '../types/story.types';

export const profileService = {
  getProfile: async (uid: string) => {
    const profile = await userRepository.getProfileWithStories(uid);
    if (!profile || profile.length === 0) {
      throw new NotFoundError('Profile not found');
    }
    return profile;
  },

  deleteStory: async (storyId: string) => {
    const deleted = await storyRepository.deleteById(storyId);
    if (!deleted) throw new NotFoundError('Story not found');
    return deleted;
  },

  updateProfile: async (uid: string, data: UpdateProfileDto) => {
    return userRepository.updateProfile(uid, data);
  },

  likeStory: async (dto: LikeStoryDto) => {
    const { storyId, uid, authorId, userName, storyTitle } = dto;

    if (authorId !== uid) {
      const [liked] = await Promise.all([
        storyRepository.addLike(storyId, uid),
        userRepository.addNotification(authorId, {
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

    return storyRepository.addLike(storyId, uid);
  },

  unlikeStory: async (storyId: string, uid: string, authorId: string) => {
    const [unliked] = await Promise.all([
      storyRepository.removeLike(storyId, uid),
      userRepository.removeNotification(authorId, uid),
    ]);
    return unliked;
  },

  updateView: async (storyId: string) => {
    return storyRepository.incrementView(storyId);
  },

  followTag: async (uid: string, tagName: string) => {
    return userRepository.followTag(uid, tagName);
  },

  unFollowTag: async (uid: string, tagName: string) => {
    return userRepository.unFollowTag(uid, tagName);
  },

  deleteAvatar: async (uid: string) => {
    return userRepository.deleteAvatar(uid);
  },

  getNotifications: async (uid: string) => {
    return userRepository.getNotifications(uid);
  },

  clearNotification: async (notificationId: string, uid: string) => {
    return userRepository.removeNotification(uid, notificationId);
  },
};
