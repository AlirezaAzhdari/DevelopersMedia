const express = require("express");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JWT_SECERT = require("../../server/config/keys").JWT_SECRET;
const { User } = require("../../models/User");

const router = express.Router();

// @Route    Get api/users/test
// @desc     Tests users route
// @access   Public

router.get("/test", (req, res) => res.json({ message: "Users works!" }));

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ err: "User Already Exists" });
    }

    const avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm"
    });

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      avatar,
      password: req.body.password
    });

    newUser
      .save()
      .then(user => res.json(user))
      .catch(err => console.log(err));
  });
});

router.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findByCredentials(email, password)
    .then(user => {
      var payLoad = {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      };

      jwt.sign(payLoad, JWT_SECERT, { expiresIn: 86400 }, (err, _token) => {
        res.json({
          success: true,
          token: "Bearer " + _token
        });
      });
    })
    .catch(err => {
      res.status(404).json({ msg: "Email Or Password is wrong" });
    });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
