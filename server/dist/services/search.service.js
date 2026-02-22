"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchService = void 0;
const story_repository_1 = require("../repositories/story.repository");
const user_repository_1 = require("../repositories/user.repository");
exports.searchService = {
    search: async (query) => {
        return story_repository_1.storyRepository.search(query);
    },
    topTags: async () => {
        return story_repository_1.storyRepository.topTags();
    },
    tagStories: async (tagName) => {
        return story_repository_1.storyRepository.findByTag(tagName);
    },
    suggestions: async (tags) => {
        return story_repository_1.storyRepository.suggestions(tags);
    },
    followingStories: async (uid) => {
        return user_repository_1.userRepository.getFollowingTags(uid);
    },
    topStories: async () => {
        return story_repository_1.storyRepository.topStories();
    },
    latestStories: async () => {
        return story_repository_1.storyRepository.latestStories();
    },
    getAuthor: async (uid) => {
        return user_repository_1.userRepository.getAuthor(uid);
    },
};
//# sourceMappingURL=search.service.js.map