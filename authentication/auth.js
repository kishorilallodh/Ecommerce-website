const jwt = require('jsonwebtoken');
const jwt_secret = "yourkey"; // Use process.env.JWT_SECRET in production

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    // Check if request is an API call (AJAX or JSON)
    if (req.xhr || req.headers.accept.includes('json')) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded;
    next();
  } catch (err) {
    if (req.xhr || req.headers.accept.includes('json')) {
      return res.status(401).json({ error: "Invalid token" });
    }
    return res.redirect('/login');
  }
};

module.exports = authMiddleware;
