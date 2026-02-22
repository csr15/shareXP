const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  description: String,
  facebook: String,
  linkedIn: String,
  link: String,
  workingStatus: String,
});

module.exports = mongoose.model("Profile", ProfileSchema);
