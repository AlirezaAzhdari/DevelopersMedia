const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const dbConnector = require("./config/keys").mongoURI;

const users = require("./../routes/api/users");
const profile = require("./../routes/api/profile");
const posts = require("./../routes/api/posts");

var app = express();
var port = process.env.PORT || 5000;

app.use(passport.initialize());
require("./config/passport")(passport);
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose
  .connect(dbConnector)
  .then(() => console.log("mongodb connected"))
  .catch(err => console.log(err));

app.listen(port, () => console.log(`server is up on port ${port}`));
