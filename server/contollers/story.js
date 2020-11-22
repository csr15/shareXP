const storyModel = require("../models/story");

module.exports = {
  publishStory: async (req, res) => {
    const story = req.body;
    const newStory = new storyModel(story);
    try {
      await newStory.save();
      res.status(200).json(newStory);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
  comment: async (req, res) => {
    try {
      const story = await storyModel.findByIdAndUpdate(req.params.storyId, {
        $addToSet: {
          comments: req.body,
        },
      });
      res.status(200).json(story);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};
