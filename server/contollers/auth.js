const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "419326780272-n2ti7qe7onojrlmrecfvmj7ll8paa1fk.apps.googleusercontent.com"
);
const nodemailer = require("nodemailer");

//Models
const UserModel = require("../models/users");
const StoryModel = require("../models/story");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sharexp24@gmail.com",
    pass: "$ngr@csr15",
  },
});

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
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash("B4c0//", salt, function (err, hash) {
        // Store hash in your password DB.

        const user = new UserModel({
          userName: req.body.data.userName,
          sureName: req.body.data.sureName,
          mail: req.body.data.mail,
          password: hash,
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

            const mailOptions = {
              from: "sharexp24@gmail.com",
              to: req.body.data.mail,
              subject: "Account created successfully",
              html: `
                <h1 style="color: #8e27f6; text-align: center; margin: 10px auto 0px auto; font-weight: 700; font-size: 32px;"><span style="font-size: 16px; color: #000000; margin: 0px;">welcome
                    to</span><br />shareXP</h1>
                    <h5 style="font-style: italic; margin: 10px auto 15px auto; text-align: center; font-size: 16px">Account created successfully!</h5>
                    <p style="color: #000000; font-size: 14px; text-align: center; margin: 0px auto;">Share your experience with others and motivate them towards success!</p>
                <a href="https://sharexp.netlify.app">
                <div style="display: flex; justify-content: center; align-items: center">
                <button
                style="padding: 10px 30px; font-family: sans-serif; font-size: 14px; font-weight: bold; border: none; background-color: #8e27f6; color: #FFFFFF; border-radius: 50px; margin: 15px auto; width: auto; text-decoration: none; width: 200px;">Let's
                Inspire</button></a>
                </div>
            `,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                res.status(200).json("Email sent");
              }
            });
          })
          .catch((err) => console.log(err));
      });
    });
  },
  signin: (req, res) => {
    const token = jwt.sign({}, "secretkey", { expiresIn: "30d" });
    let uid = "";

    UserModel.findOne({ mail: req.body.data.mail })
      .then((MongoResult) => {
        uid = MongoResult._id;
        bcrypt.compare(
          req.body.data.password,
          MongoResult.password,
          function (err, result) {
            // res === true
            if (result === false) {
              throw Error();
            }

            const userDetails = {
              uid: uid,
            };
            res
              .cookie("token", token, { httpOnly: true })
              .send({ userDetails: userDetails });
          }
        );
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
                  password: "$ngr@dev15_shadow@15_csrIsADev",
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

                    const mailOptions = {
                      from: "sharexp24@gmail.com",
                      to: email,
                      subject: "Account created successfully",
                      html: `
                        <h1 style="color: #8e27f6; text-align: center; margin: 10px auto 0px auto; font-weight: 700; font-size: 32px;"><span style="font-size: 16px; color: #000000; margin: 0px;">welcome
                            to</span><br />shareXP</h1>
                            <h5 style="font-style: italic; margin: 10px auto 15px auto; text-align: center; font-size: 16px">Account created successfully!</h5>
                            <p style="color: #000000; font-size: 14px; text-align: center; margin: 0px auto;">Share your experience with others and motivate them towards success!</p>
                        <a href="https://sharexp.netlify.app">
                        <div style="display: flex; justify-content: center; align-items: center">
                        <button
                        style="padding: 10px 30px; font-family: sans-serif; font-size: 14px; font-weight: bold; border: none; background-color: #8e27f6; color: #FFFFFF; border-radius: 50px; margin: 15px auto; width: auto; text-decoration: none; width: 200px;">Let's
                        Inspire</button></a>
                        </div>
                    `,
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                      if (error) {
                        console.log(error);
                      } else {
                        res.status(200).json("Email sent");
                      }
                    });
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
