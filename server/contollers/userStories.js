const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//Models
const userModel = require("../models/users");
const storyModel = require("../models/story");

module.exports = {
  followingStories: async (req, res) => {
    try {
      const tagStories = await userModel.aggregate([
        { $match: { _id: ObjectId(req.params.uid) } },
        { $unwind: "$following" },
        {
          $group: {
            _id: "$following",
          },
        },
        {
          $lookup: {
            from: "stories",
            localField: "following",
            foreignField: "tags",
            as: "docs",
          },
        },{
          $project: {
            _id: 0
          }
        }
      ]);
      res.status(200).json(tagStories);
    } catch (error) {
      res.status(404).json(error.message);
    }
  },

  topStories: async (req, res) => {
    try {
      const topStories = await storyModel.find().sort({ views: -1 }).limit(20);

      res.status(200).json(topStories);
    } catch (error) {
      res.status(404).json(error.message);
    }
  },

  latestStories: async (req, res) => {
    try {
      const latestStories = await storyModel.find().sort({ _id: -1 }).limit(20);

      res.status(200).json(latestStories);
    } catch (error) {
      res.status(404).json(error.message);
    }
  },
};
