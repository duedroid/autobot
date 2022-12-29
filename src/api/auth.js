const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  res.json({
    message: 'Login API - 👋🌎🌍🌏',
  });
});

router.post('/register', (req, res) => {
  res.json(req.body);
});

module.exports = router;