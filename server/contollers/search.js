//Models
const storyModel = require("../models/story");

module.exports = {
  search: async (req, res) => {
    try {
      const search = await storyModel.aggregate([
        { $unwind: "$story.tags" },
        {
          $match: {
            "story.tags": req.query.search,
          },
        },
        {
          $group: {
            _id: "$story.tags",
            count: {
              $sum: 1,
            },
          },
        },
      ]);
      
      res.status(200).json(search);
    } catch (error) {
      console.log(error)
      res.status(400).json(error.messgae);
    }
  },
  topTags: async (req, res) => {
    try {
      const topTags = await storyModel.aggregate([
        { $unwind: "$story.tags" },
        {
          $group: {
            _id: "$story.tags",
            totalStories: {
              $sum: 1,
            },
          },
        },
        {
          $sort: {
            totalStories: -1,
          },
        },
        {
          $limit: 10,
        },
      ]);

      res.status(200).json(topTags);
    } catch (error) {
      res.status(404).json({ messgae: "Not found" });
    }
  },
  tagStories: async (req, res) => {
    try {
      const tagStories = await storyModel.find({
        "story.tags": { $in: [`#${req.params.tagName}`] },
      });

      res.status(200).json(tagStories);
    } catch (error) {
      res.status(404).json({ messgae: "Not found" });
    }
  },
};
