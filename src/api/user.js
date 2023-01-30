const express = require("express");
const authenticateJWT = require("../middlewares/auth");

const router = express.Router();

router.get("/profile", authenticateJWT, (req, res) => {
  res.json({ email: req.user.email });
});

module.exports = router;
