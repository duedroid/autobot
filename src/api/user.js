const express = require("express");
const authenticateJWT = require("../middlewares/auth");

const router = express.Router();

router.get("/profile", authenticateJWT, (req, res) => {
  res.json({ username: req.user.username });
});

module.exports = router;
