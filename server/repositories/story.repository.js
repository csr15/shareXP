"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyRepository = void 0;
const Story_1 = require("../models/Story");
exports.storyRepository = {
    findById: (id) => Story_1.Story.findById(id),
    create: (storyData) => new Story_1.Story(storyData).save(),
    deleteById: (id) => Story_1.Story.findByIdAndDelete(id),
    deleteByUserId: (uid) => Story_1.Story.deleteMany({ uid }),
    updateStory: (storyId, storyContent) => Story_1.Story.findByIdAndUpdate(storyId, { story: storyContent }),
    addComment: (storyId, comment) => Story_1.Story.findByIdAndUpdate(storyId, { $addToSet: { comments: comment } }, { new: true }),
    addLike: (storyId, uid) => Story_1.Story.findByIdAndUpdate(storyId, { $addToSet: { likes: uid } }, { new: true }),
    removeLike: (storyId, uid) => Story_1.Story.findByIdAndUpdate(storyId, { $pull: { likes: uid } }, { new: true }),
    incrementView: (storyId) => Story_1.Story.findByIdAndUpdate(storyId, { $inc: { views: 1 } }),
    search: (tag) => Story_1.Story.aggregate([
        { $unwind: '$story.tags' },
        { $match: { 'story.tags': tag } },
        { $group: { _id: '$story.tags', count: { $sum: 1 } } },
    ]),
    topTags: () => Story_1.Story.aggregate([
        { $unwind: '$story.tags' },
        { $group: { _id: '$story.tags', totalStories: { $sum: 1 } } },
        { $sort: { totalStories: -1 } },
        { $limit: 10 },
    ]),
    findByTag: (tagName) => Story_1.Story.find({ 'story.tags': { $in: [`#${tagName}`] } }),
    topStories: (limit = 20) => Story_1.Story.find().sort({ views: -1 }).limit(limit),
    latestStories: (limit = 20) => Story_1.Story.find().sort({ _id: -1 }).limit(limit),
    suggestions: (tags, limit = 4) => Story_1.Story.aggregate([
        { $match: { 'story.tags': { $in: tags } } },
        { $sort: { views: -1 } },
        { $limit: limit },
    ]),
};
