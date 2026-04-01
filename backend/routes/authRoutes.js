const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    res.json({ token: 'admin-token', isAdmin: true });
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
});

module.exports = router;
