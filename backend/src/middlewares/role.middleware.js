const roleMiddleware = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Token mungon' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Nuk ke leje për këtë veprim' });
    }

    next();
  };
};

module.exports = roleMiddleware;