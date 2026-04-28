const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');

  if (token !== 'admin-token') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
};

module.exports = adminAuth;
