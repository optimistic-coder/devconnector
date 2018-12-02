const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const posts = require("./routes/api/posts");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const app = express();

//DB config
const db = require("./config/keys").mongoURL;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB connect
mongoose
  .connect(db)
  .then(() => console.log("mongodb connected..."))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on ${port}`));
