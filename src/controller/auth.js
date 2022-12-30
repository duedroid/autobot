const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createHashPassword(plainPassword) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainPassword, salt);
}

async function validatePassword(plainPassword, hashPassword) {
  return await bcrypt.compare(plainPassword, hashPassword);
}

async function createJWT(userId) {
  let payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000)
  };
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
}

module.exports = { createHashPassword, validatePassword, createJWT };
