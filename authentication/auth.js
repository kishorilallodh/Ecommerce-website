const jwt = require('jsonwebtoken');
const jwt_secret = "yourkey"; // Use process.env.JWT_SECRET in production

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect('/login');
  }
};

module.exports = authMiddleware;
