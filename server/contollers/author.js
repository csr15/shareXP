const { db } = require("../models/users");
const userModel = require("../models/users");
const mongoose = require("mongoose");

const author = async (req, res) => {
  try {
    const author = await userModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.uid) } },
      {
        $project: {
          password: 0,
        },
      },
    ]);

    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = author;

// db.users.aggregate([
//   { $match: { _id: ObjectId(req.params.uid) } },
//   {
//     $project: {
//       password: 0,
//       mail: 0,
//     },
//   },
// ]);
