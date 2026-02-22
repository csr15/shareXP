"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyService = void 0;
const story_repository_1 = require("../repositories/story.repository");
const user_repository_1 = require("../repositories/user.repository");
const errors_1 = require("../utils/errors");
exports.storyService = {
    publish: async (dto) => {
        return story_repository_1.storyRepository.create({
            uid: dto.uid,
            userName: dto.userName,
            story: dto.story,
        });
    },
    update: async (storyId, storyContent) => {
        const story = await story_repository_1.storyRepository.updateStory(storyId, storyContent);
        if (!story)
            throw new errors_1.NotFoundError('Story not found');
        return story;
    },
    addComment: async (storyId, dto) => {
        const { uid, authorId, userName, storyTitle } = dto.notification;
        if (uid !== authorId) {
            const [updatedStory] = await Promise.all([
                story_repository_1.storyRepository.addComment(storyId, dto.comment),
                user_repository_1.userRepository.addNotification(authorId, {
                    uid,
                    userName,
                    authorId,
                    content: 'added a new comment',
                    createdAt: new Date(),
                    storyId,
                    storyTitle,
                }),
            ]);
            return updatedStory;
        }
        return story_repository_1.storyRepository.addComment(storyId, dto.comment);
    },
    getById: async (storyId) => {
        const story = await story_repository_1.storyRepository.findById(storyId);
        if (!story)
            throw new errors_1.NotFoundError('Story not found');
        return story;
    },
};
//# sourceMappingURL=story.service.js.map