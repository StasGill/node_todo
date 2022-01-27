const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.body.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Fail of authorization(" });
    }
    const decoded = jwt.verify(token, "jwtSecret");

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Fail of authorization(" });
  }
};
