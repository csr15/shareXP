const express = require("express");
const cors = require("cors");
const app = express();
const mongoURL =
  "mongodb+srv://ragulcs:shadow_dev15@sharexp.cnh5p.mongodb.net/shareXP?retryWrites=true&w=majority";
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

dotenv.config();
//Port
const PORT = process.env.PORT || 8080;

//Cors configuration
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://sharexp.netlify.app" }));
app.use(cookieParser());

//Body-parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
const publishStory = require("./routes/publishStory");
const profile = require("./routes/profile");
const auth = require("./routes/auth");
const search = require("./routes/search");
const author = require("./routes/author");
const userStories = require("./routes/userStories");
const sharedStory = require("./routes/sharedStory");
const suggestions = require("./routes/suggestions");
const storyData = require("./routes/storyData");

//Connecting mongodb
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //App is running
    app.listen(PORT, () => console.log(`App is running  on PORT ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set("useFindAndModify", false);

//----------- API -----------

//Initial response
app.get("/api/v1", (req, res) => {
  res.send("Hello shareXP");
});

//Publish
app.use("/api/v1/publish", publishStory);

//Auth
app.use("/api/v1/auth", auth);

//Profile
app.use("/api/v1/profile", profile);

//Search
app.use("/api/v1/search", search);

//Author
app.use("/api/v1/author", author);

//User stories
app.use("/api/v1/userStories", userStories);

//Shared Stories
app.use("/api/v1/sharedStory", sharedStory);

//Suggestion Stories for reader
app.use("/api/v1/suggestions", suggestions);

//Single story
app.use("/api/v1/storyData", storyData);

//VerifyToken
function verifyCookieToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).send("Forbidden");
  } else {
    try {
      jwt.verify(req.cookies.token, "secretkey", (err) => {
        if (err) {
          throw Error();
        }
        next();
      });
    } catch (error) {
      res.clearCookie("token");
      return res.status(400).send(error.message);
    }
  }
}
