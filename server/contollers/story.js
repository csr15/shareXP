const storyModel = require("../models/story");
const userModel = require("../models/users");

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
  updateStory: async (req, res) => {
    console.log(req.body.story)
    try {
      const story = await storyModel.findByIdAndUpdate(req.params.storyId, {
        story: req.body.story,
      });

      res.status(200).json(story);
    } catch (error) {
      res.status(409).json(error.message);
    }
  },
  comment: async (req, res) => {
    const {
      storyId,
      uid,
      authorId,
      userName,
      storyTitle,
    } = req.body.notification;

    try {
      if (uid !== authorId) {
        const story = await Promise.all([
          storyModel.findByIdAndUpdate(
            req.params.storyId,
            {
              $addToSet: {
                comments: req.body.comment,
              },
            },
            { new: true }
          ),
          userModel.findByIdAndUpdate(
            authorId,
            {
              //story author ID
              $addToSet: {
                notifications: [
                  {
                    uid: uid, // current user ID
                    userName: userName, // current username
                    authorId: authorId,
                    content: "added a new comment", // content (like / comment)
                    createdAt: new Date(), // creeated at
                    storyId: storyId, // liked story ID
                    storyTitle: storyTitle,
                  },
                ],
              },
            },
            { new: true }
          ),
        ]);

        res.status(200).json(story[0]);
      } else {
        const story = await storyModel.findByIdAndUpdate(
          req.params.storyId,
          {
            $addToSet: {
              comments: req.body.comment,
            },
          },
          { new: true }
        );

        res.status(200).json(story);
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};
