const mongoose = require("mongoose");

const storySchema = mongoose.Schema({
  uid: String,
  userName: String,
  avatar: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
  views: {
    type: Number,
    default: 0,
  },
  story: {
    title: String,
    content: String,
    tags: [String],
    img: String,
  },
  comments: [
    {
      userName: String,
      uid: String,
      comment: String,
      commentedAt: Date,
      avatar: String,
    },
  ],
});
module.exports = mongoose.model("Story", storySchema);
