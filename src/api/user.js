const express = require("express");
const authenticateJWT = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     description: Get all books
 *     responses:
 *       200:
 *         description: Success
 * 
 */
router.get("/profile", authenticateJWT, (req, res) => {
  res.json({ username: req.user.username });
});

module.exports = router;
