const express = require("express");
const axios = require("axios");

const {
  createHashPassword,
  validatePassword,
  createJWT,
} = require("../controller/auth");
const { createSignature } = require("../controller/binance");
const User = require("../models/user");

const router = express.Router();

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email }, { password: 1 });
  if (!user) {
    res.status(400).json({
      detail: "email or password incorrect",
    });
    return;
  }

  let isPasswordValid = await validatePassword(
    req.body.password,
    user.password
  );
  if (!isPasswordValid) {
    res.status(400).json({
      detail: "email or password incorrect",
    });
    return;
  }

  res.json({
    access_token: await createJWT(user.id),
  });
});

router.post("/register", async (req, res) => {
  try {
    let data = {
      timestamp: Date.now(),
    };
    data.signature = await createSignature(data, req.body.binanceApiSecret);
    const qs = new URLSearchParams(data);
    const responseAccount = await axios.get(
      `${process.env.BINANCE_API_URL}/sapi/v1/account/status?${qs}`,
      {
        headers: {
          "X-MBX-APIKEY": req.body.binanceApiKey,
        },
      }
    );
  } catch (err) {
    return res.status(400).json({ detail: err.response.data });
  }

  let userData = {
    email: req.body.email,
    password: await createHashPassword(req.body.password),
    binanceApiKey: req.body.binanceApiKey,
    binanceApiSecret: req.body.binanceApiSecret,
  };
  User.create(userData, (err, user) => {
    if (err) {
      res.status(400).json({ detail: "user is exists." });
    } else {
      res.json({ message: "ok" });
    }
  });
});

module.exports = router;
