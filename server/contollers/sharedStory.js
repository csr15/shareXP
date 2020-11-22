const storyModel = require("../models/story");

module.exports = {
  sharedStoryHandler: async (req, res) => {
    try {
      const story = await storyModel.findById(req.params.storyId);

      res.status(200).json(story);
    } catch (error) {
      console.log(error);
      res.status(404).json(error.message);
    }
  },
};
