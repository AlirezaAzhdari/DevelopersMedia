const express = require("express");
const router = express.Router();

// @Route    Get api/posts/test
// @desc     Tests posts route
// @access   Public

router.get("/test", (req, res) => res.json({ message: "Posts works!" }));

module.exports = router;