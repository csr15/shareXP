const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: String,
  sureName: String,
  mail: String,
  password: String,
  following: { type: [String], default: [] },
  workingStatus: { type: String, default: "" },
  facebook: { type: String, default: "" },
  linkedIn: { type: String, default: "" },
  link: { type: String, default: "" },
  description: { type: String, default: "" },
  avatar: String,
});

module.exports = mongoose.model("User", userSchema);
