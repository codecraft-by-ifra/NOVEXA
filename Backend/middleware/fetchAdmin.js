const jwt = require("jsonwebtoken");

const fetchAdmin = (req, res, next) => {
  const token = req.header("admin-token");

  if (!token) {
    return res.status(401).json({ success: false, error: "Please login as admin" });
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);

    if (!data.admin) {
      return res.status(401).json({ success: false, error: "Not authorized as admin" });
    }

    req.admin = data.admin;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

module.exports = fetchAdmin;