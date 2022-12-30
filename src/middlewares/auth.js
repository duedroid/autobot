const jwt = require("jsonwebtoken");
const User = require("../models/user");

function authenticateJWT(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.status(401).json({ detail: "Unauthorized" });

  jwt.verify(token, process.env.SECRET_KEY, async (err, payload) => {
    if (err) return res.status(403).json({ detail: err.message });

    const user = await User.findById(payload.sub);
    if (!user) return res.status(401).json({ detail: "Unauthorized" });
    req.user = user;

    next();
  });
}

module.exports = authenticateJWT;
