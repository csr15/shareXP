import { storyRepository } from '../repositories/story.repository';
import { userRepository } from '../repositories/user.repository';

export const searchService = {
  search: async (query: string) => {
    return storyRepository.search(query);
  },

  topTags: async () => {
    return storyRepository.topTags();
  },

  tagStories: async (tagName: string) => {
    return storyRepository.findByTag(tagName);
  },

  suggestions: async (tags: string[]) => {
    return storyRepository.suggestions(tags);
  },

  followingStories: async (uid: string) => {
    return userRepository.getFollowingTags(uid);
  },

  topStories: async () => {
    return storyRepository.topStories();
  },

  latestStories: async () => {
    return storyRepository.latestStories();
  },

  getAuthor: async (uid: string) => {
    return userRepository.getAuthor(uid);
  },
};
