const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const dbConnector = require("./config/keys").mongoURI;

const users = require("./../routes/api/users");
const profile = require("./../routes/api/profile");
const posts = require("./../routes/api/posts");

var app = express();
var port = process.env.PORT || 3000;

app.use(passport.initialize());
require("./config/passport")(passport);
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

mongoose
  .connect(dbConnector)
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`server is up on port ${port}`));
