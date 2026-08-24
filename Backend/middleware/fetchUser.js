const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(401).json({ success: false, error: "Please login first" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid token. Login first" });
  }
};

module.exports = fetchUser;