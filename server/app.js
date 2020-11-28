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
const rateLimit = require("express-rate-limit");

dotenv.config();
//Port
const PORT = process.env.PORT || 8080;

//Cors configuration
app.use(express.json());
app.use(cors({ credentials: true, origin: "https://sharexp.netlify.app" }));
app.use(cookieParser());

//Body-parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Rate limiter (DDOS Attack)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minutes
  max: 10,
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

//Routes
const publishStory = require("./routes/publishStory");
const profile = require("./routes/profile");
const auth = require("./routes/auth");
const search = require("./routes/search");
const author = require("./routes/author");
const userStories = require("./routes/userStories");
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
app.get("/api/v1", limiter, (req, res) => {
  res.send("Hello shareXP");
});

//Publish
app.use("/api/v1/publish", publishStory);

//Auth
app.use("/api/v1/auth", auth);

//Profile
app.use("/api/v1/profile", limiter, profile);

//Search
app.use("/api/v1/search", limiter, search);

//Author
app.use("/api/v1/author", limiter, author);

//User stories
app.use("/api/v1/userStories", limiter, userStories);

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
