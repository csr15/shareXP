const storyModel = require("../models/story");

module.exports = suggestion = async (req, res) => {
  try {
    const tagData = await storyModel.aggregate([
      {
        $match: {
          "story.tags": { $in: [...req.body.tags] },
        },
      },
      {
        $sort: {
          views: -1,
        },
      },
      {
        $limit: 4,
      },
    ]);

    res.status(200).json(tagData);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
