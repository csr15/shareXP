import { storyRepository } from '../repositories/story.repository';
import { userRepository } from '../repositories/user.repository';
import { NotFoundError } from '../utils/errors';
import { PublishStoryDto, CommentDto, IStoryContent } from '../types/story.types';

export const storyService = {
  publish: async (dto: PublishStoryDto) => {
    return storyRepository.create({
      uid: dto.uid,
      userName: dto.userName,
      story: dto.story,
    });
  },

  update: async (storyId: string, storyContent: IStoryContent) => {
    const story = await storyRepository.updateStory(storyId, storyContent as unknown as Record<string, unknown>);
    if (!story) throw new NotFoundError('Story not found');
    return story;
  },

  addComment: async (storyId: string, dto: CommentDto) => {
    const { uid, authorId, userName, storyTitle } = dto.notification;

    if (uid !== authorId) {
      const [updatedStory] = await Promise.all([
        storyRepository.addComment(storyId, dto.comment),
        userRepository.addNotification(authorId, {
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

    return storyRepository.addComment(storyId, dto.comment);
  },

  getById: async (storyId: string) => {
    const story = await storyRepository.findById(storyId);
    if (!story) throw new NotFoundError('Story not found');
    return story;
  },
};
