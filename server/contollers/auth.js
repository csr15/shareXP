const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "419326780272-n2ti7qe7onojrlmrecfvmj7ll8paa1fk.apps.googleusercontent.com"
);

//Models
const UserModel = require("../models/users");
const StoryModel = require("../models/story");

module.exports = {
  userName: (req, res) => {
    UserModel.find({ userName: req.params.userName })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => console.log(err));
  },
  mailValidation: (req, res) => {
    UserModel.find({
      mail: req.params.mail,
    })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => console.log(err));
  },
  signup: (req, res) => {
    const password = req.body.data.password;
    bcrypt
      .hash(password, 12)
      .then((hashedPw) => {
        const user = new UserModel({
          userName: req.body.data.userName,
          sureName: req.body.data.sureName,
          mail: req.body.data.mail,
          password: hashedPw,
          description: "",
          link: "",
          facebook: "",
          linkedIn: "",
          workingStatus: "",
        });

        user
          .save()
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log("Bcrypt error", err);
      });
  },
  signin: (req, res) => {
    const token = jwt.sign({}, "secretkey", { expiresIn: "30d" });
    let uid = "";

    UserModel.findOne({ mail: req.body.data.mail })
      .then((MongoResult) => {
        uid = MongoResult._id;
        return bcrypt.compare(req.body.data.password, MongoResult.password);
      })
      .then((result) => {
        if (!result) {
          throw Error();
        }

        const userDetails = {
          uid: uid,
        };
        res
          .cookie("token", token, { httpOnly: true })
          .send({ userDetails: userDetails });
      })
      .catch((err) => res.status(404).json({ message: "Mail id wrong" }));
  },
  googleAuth: (req, res) => {
    const { tokenId } = req.body;
    client
      .verifyIdToken({
        idToken: tokenId,
        audience:
          "419326780272-n2ti7qe7onojrlmrecfvmj7ll8paa1fk.apps.googleusercontent.com",
      })
      .then((response) => {
        const {
          email_verified,
          name,
          given_name,
          family_name,
          email,
          picture,
        } = response.getPayload();

        if (email_verified) {
          const token = jwt.sign({}, "secretkey", { expiresIn: "30d" });

          UserModel.find({ mail: email })
            .then((userDoc) => {
              if (userDoc.length > 0) {
                res
                  .cookie("token", token, { httpOnly: true })
                  .send({ userDoc });
              } else if (userDoc.length === 0) {
                const user = new UserModel({
                  userName: name.replace(/ /g, ""),
                  sureName: `${given_name}  ${family_name}`,
                  mail: email,
                  description: "",
                  link: "",
                  facebook: "",
                  linkedIn: "",
                  workingStatus: "",
                  avatar: picture,
                });

                user
                  .save()
                  .then((result) => {
                    res.status(200).json(result);
                  })
                  .catch((err) => res.status(400).json(result));
              }
            })
            .catch((err) => {
              res.status(404).json("Not found");
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  checkAuth: async (req, res) => {
    try {
      const token = jwt.sign({}, "secretkey", { expiresIn: "30d" });
      res.cookie("token", token, { httpOnly: true }).send("New JWT generated");
    } catch (error) {
      res.status(404).json(error.message);
    }
  },
  deleteAccount: async (req, res) => {
    try {
      const deleted = await Promise.all([
        UserModel.findByIdAndDelete(req.params.uid),
        StoryModel.deleteMany({ uid: req.params.uid }),
      ]);

      res.status(200).json(deleted);
    } catch (error) {
      res.status(404).json("Not found");
    }
  },
};
