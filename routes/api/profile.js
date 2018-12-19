const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const { Profile } = require("../../models/Profile");
const { User } = require("../../models/User");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");

const router = express.Router();

// @Route    Get api/profile/test
// @desc     Tests profile route
// @access   Public

router.get("/test", (req, res) => res.json({ message: "profile works!" }));

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "there is no profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(400).json(err));
  }
);

//GET user's profile by id
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "no profile for this user";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

//GET user's profile by handle
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "no profile for this user";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

//GET all profiles of users
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "there is not any profile.";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(400).json(err));
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    var profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUsername)
      profileFields.githubUsername = req.body.githubUsername;
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.date) profileFields.date = req.body.date;
    profileFields.social = {};
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "this handle already exists";
            return res.status(400).json(errors);
          }
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    experienceFields = {};
    experienceFields.title = req.body.title;
    experienceFields.company = req.body.company;
    experienceFields.from = req.body.from;
    if (req.body.location) experienceFields.location = req.body.location;
    if (req.body.to) experienceFields.to = req.body.to;
    if (req.body.date) experienceFields.date = req.body.date;
    if (req.body.current) experienceFields.current = req.body.current;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "there is no profile for this user";
          return res.status(404).json(errors);
        }

        var result = profile.experience.filter(
          exp =>
            exp.title === req.body.title &&
            exp.company === req.body.company &&
            exp.from === req.body.from
        );

        console.log(result.title);

        if (result.title) {
          errors.duplicateExperience =
            "an experience with this title, company name and start date, already exists";
          return res.status(400).json(errors);
        }

        profile.experience.push(experienceFields);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

module.exports = router;
