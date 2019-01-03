const express = require("express");
const _ = require("lodash");
const passport = require("passport");
const { Post } = require("../../models/Post");
const { Profile } = require("../../models/Profile");
const validatePostInput = require("../../validation/post");
const validateCommentInput = require("../../validation/comment");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    var newPost = new Post({
      text: req.body.text,
      user: req.user.id,
      name: req.body.name,
      avatar: req.body.avatar
    });

    newPost.save().then(post => res.json(post));
  }
);

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noposts: "no posts found" }));
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopost: "no post found with this id" })
    );
});

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ unauthorized: "unauthorized" });
          }

          post.remove().then(() => res.json({ success: "success" }));
        })
        .catch(err => res.status(404).json({ nopostfound: "no post found" }));
    });
  }
);

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "قبلا این پست را لایک کردید" });
          }

          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ nopostfound: "no post found" }));
    });
  }
);

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "شما این پست را لایک نکردید" });
          }

          _.remove(post.likes, like => like.user.toString() === req.user.id);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ nopostfound: "no post found" }));
    });
  }
);

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCommentInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        post.comments.unshift({
          user: req.user.id,
          text: req.body.text,
          name: req.user.name,
          avatar: req.user.avatar
        });

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ nopostfound: "no post found" }));
  }
);

router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res.status(400).json({
            nocomment: "کامنتی برای این پست نگذاشته‌اید"
          });
        }

        _.remove(
          post.comments,
          comment => comment._id.toString() === req.params.comment_id
        );

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ nopostfound: "no post found" }));
  }
);

module.exports = router;
