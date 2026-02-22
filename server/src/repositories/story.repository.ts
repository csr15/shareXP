import { Story } from '../models/Story';
import { IStoryDocument, IComment } from '../types/story.types';

export const storyRepository = {
  findById: (id: string) => Story.findById(id),

  create: (storyData: Partial<IStoryDocument>) => new Story(storyData).save(),

  deleteById: (id: string) => Story.findByIdAndDelete(id),

  deleteByUserId: (uid: string) => Story.deleteMany({ uid }),

  updateStory: (storyId: string, storyContent: Record<string, unknown>) =>
    Story.findByIdAndUpdate(storyId, { story: storyContent }),

  addComment: (storyId: string, comment: IComment) =>
    Story.findByIdAndUpdate(
      storyId,
      { $addToSet: { comments: comment } },
      { new: true },
    ),

  addLike: (storyId: string, uid: string) =>
    Story.findByIdAndUpdate(
      storyId,
      { $addToSet: { likes: uid } },
      { new: true },
    ),

  removeLike: (storyId: string, uid: string) =>
    Story.findByIdAndUpdate(
      storyId,
      { $pull: { likes: uid } },
      { new: true },
    ),

  incrementView: (storyId: string) =>
    Story.findByIdAndUpdate(storyId, { $inc: { views: 1 } }),

  search: (tag: string) =>
    Story.aggregate([
      { $unwind: '$story.tags' },
      { $match: { 'story.tags': tag } },
      { $group: { _id: '$story.tags', count: { $sum: 1 } } },
    ]),

  topTags: () =>
    Story.aggregate([
      { $unwind: '$story.tags' },
      { $group: { _id: '$story.tags', totalStories: { $sum: 1 } } },
      { $sort: { totalStories: -1 } },
      { $limit: 10 },
    ]),

  findByTag: (tagName: string) =>
    Story.find({ 'story.tags': { $in: [`#${tagName}`] } }),

  topStories: (limit = 20) => Story.find().sort({ views: -1 }).limit(limit),

  latestStories: (limit = 20) => Story.find().sort({ _id: -1 }).limit(limit),

  suggestions: (tags: string[], limit = 4) =>
    Story.aggregate([
      { $match: { 'story.tags': { $in: tags } } },
      { $sort: { views: -1 } },
      { $limit: limit },
    ]),
};
