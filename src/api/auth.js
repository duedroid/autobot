const express = require("express");
const {
  createHashPassword,
  validatePassword,
  createJWT,
} = require("../controller/auth");
const User = require("../models/user");

const router = express.Router();

router.post("/login", async (req, res) => {
  const user = await User.findOne(
    { username: req.body.username },
    { password: 1 }
  );
  if (!user) {
    res.status(400).json({
      detail: "username or password incorrect",
    });
    return;
  }

  let isPasswordValid = await validatePassword(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    res.status(400).json({
      detail: "username or password incorrect",
    });
    return;
  }

  res.json({
    access_token: await createJWT(user.id),
  });
});

router.post("/register", async (req, res) => {
  let userData = {
    username: req.body.username,
    password: await createHashPassword(req.body.password),
  };
  User.create(userData, (err, user) => {
    if (err) {
      res.status(400).json({ detail: "user is exists" });
    } else {
      res.json({ message: "ok" });
    }
  });
});

module.exports = router;
