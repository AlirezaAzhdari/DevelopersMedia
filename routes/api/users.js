const express = require("express");
const router = express.Router();

// @Route    Get api/users/test
// @desc     Tests users route
// @access   Public

router.get("/test", (req, res) => res.json({ message: "Users works!" }));

module.exports = router;
