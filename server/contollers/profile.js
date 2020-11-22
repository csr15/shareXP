const storyModel = require("../models/story");
const userModel = require("../models/users");

module.exports = {
  profile: async (req, res) => {
    try {
      const profileDetails = await userModel.aggregate([
        {
          $project: {
            _id: {
              $toString: "$_id",
            },
            userName: "$userName",
            sureName: "$sureName",
            following: "$following",
            facebook: "$facebook",
            linkedIn: "$linkedIn",
            link: "$link",
            workingStatus: "$workingStatus",
            description: "$description",
            avatar: "$avatar",
          },
        },
        {
          $lookup: {
            from: "stories",
            localField: "_id",
            foreignField: "uid",
            as: "stories",
          },
        },
        {
          $match: {
            _id: req.params.uid,
          },
        },
        {
          $project: {
            userDetails: {
              userName: "$userName",
              sureName: "$sureName",
              following: "$following",
              facebook: "$facebook",
              linkedIn: "$linkedIn",
              link: "$link",
              workingStatus: "$workingStatus",
              description: "$description",
              avatar: "$avatar",
            },
            stories: "$stories",
          },
        },
      ]);

      res.status(200).json(profileDetails);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  deleteStory: async (req, res) => {
    try {
      const deletedStory = await storyModel.findByIdAndDelete(
        req.params.storyId
      );
      res.status(200).json(deletedStory);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  updateProfile: async (req, res) => {
    const data = req.body;
    try {
      const userProfile = await userModel.findByIdAndUpdate(req.params.uid, {
        $set: {
          workingStatus: data.workingStatus,
          facebook: data.socialLinks.facebook,
          linkedIn: data.socialLinks.linkedIn,
          link: data.socialLinks.link,
          description: data.description,
          avatar: data.avatar,
        },
      });
      res.status(200).json(userProfile);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  likeStroy: async (req, res) => {
    try {
      const like = await storyModel.findByIdAndUpdate(req.params.storyId, {
        $addToSet: {
          likes: req.params.uid,
        },
      });

      res.status(200).json({ message: "liked" });
    } catch (error) {
      res.status(400).json({ message: "Problrem on updating like" });
    }
  },
  unLikeStory: async (req, res) => {
    try {
      const unlike = await storyModel.findByIdAndUpdate(req.params.storyId, {
        $pull: {
          likes: req.params.uid,
        },
      });
      res.status(200).json({ message: "Like updated" });
    } catch (error) {
      res.status(400).json({ message: "Problrem on updating like" });
    }
  },
  updateView: async (req, res) => {
    try {
      await storyModel.findByIdAndUpdate(req.params.storyId, {
        $inc: { views: 1 },
      });
      res.status(200).json({ message: "View updated" });
    } catch (error) {
      res.status(400).json({ message: "Error" });
    }
  },
  followTag: async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(req.params.uid, {
        $addToSet: {
          following: req.body.tagName,
        },
      });

      res.status(200).json({ message: "Following" });
    } catch (error) {
      res.status(400).json({ message: "Problrem on updating following" });
    }
  },
  unFollowTag: async (req, res) => {
    try {
      await userModel.findByIdAndUpdate(req.params.uid, {
        $pull: {
          following: req.body.tagName,
        },
      });

      res.status(200).json(req.body.tagName);
    } catch (error) {
      res.status(400).json({ message: "Problrem on updating following" });
    }
  },
  deleteAvatar: async (req, res) => {
    try {
      const deleted = await userModel.findByIdAndUpdate(req.params.uid, {
        $set: {
          avatar: "",
        },
      });

      res.status(200).json("Avatar deleted");
    } catch (error) {
      res.status(404).json("Not found");
    }
  },
};
