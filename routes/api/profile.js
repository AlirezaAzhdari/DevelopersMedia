const express = require("express");
const passport = require("passport");
const _ = require("lodash");
const { Profile } = require("../../models/Profile");
const { User } = require("../../models/User");
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
const isEmpty = require("../../validation/is-empty");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "پروفایلی برای این کاربر وجود ندارد";
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
        errors.noprofile = "پروفایلی برای این کاربر وجود ندارد";
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
        errors.noprofile = "پروفایلی برای این کاربر وجود ندارد";
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
        errors.noprofile = "پروفایلی برای این کاربر وجود ندارد";
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
            errors.handle = "این هندل وجود دارد";
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
          errors.noprofile = "پروفایلی برای این کاربر وجود ندارد";
          return res.status(404).json(errors);
        }

        var _result = {};
        _result = profile.experience.filter(
          exp =>
            exp.title.toUpperCase() === req.body.title.toUpperCase() &&
            exp.company.toUpperCase() === req.body.company.toUpperCase()
        );

        if (!isEmpty(_result)) {
          errors.duplicateExperience =
            "یک تجربه کار با این عنوان، نام شرکت و تاریخ شروع وجود دارد";
          return res.status(400).json(errors);
        }

        profile.experience.unshift(experienceFields);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    educationFields = {};
    educationFields.school = req.body.school;
    educationFields.degree = req.body.degree;
    educationFields.from = req.body.from;
    educationFields.fieldOfStudy = req.body.fieldOfStudy;
    if (req.body.location) educationFields.fieldOfStudy = req.body.fieldOfStudy;
    if (req.body.to) educationFields.to = req.body.to;
    if (req.body.date) educationFields.description = req.body.description;
    if (req.body.current) educationFields.current = req.body.current;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "پروفایلی برای این کاربر وجود ندارد";
          return res.status(404).json(errors);
        }

        var _result = {};
        _result = profile.education.filter(
          edu =>
            edu.school.toUpperCase() === req.body.school.toUpperCase() &&
            edu.degree.toUpperCase() === req.body.degree.toUpperCase()
        );

        if (!isEmpty(_result)) {
          errors.duplicateEducation =
            "یک تحصیلات با این دانشگاه، مدرک و تاریخ شروع وجود دارد";
          return res.status(400).json(errors);
        }

        profile.education.unshift(educationFields);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "پروفایلی برای این کاربر وجود ندارد";
          return res.status(404).json(errors);
        }

        _.remove(profile.experience, exp => exp.id === req.params.exp_id);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "پروفایلی برای این کاربر وجود ندارد";
          return res.status(404).json(errors);
        }

        _.remove(profile.education, exp => exp.id === req.params.edu_id);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json(err));
  }
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
