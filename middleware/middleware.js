const jwt = require("jsonwebtoken");

const middleware = (req, res, next) => {
  const token = req.headers.authorization;
  const user = jwt.decode(token);

  if (!user || !token) {
    return res.status(401).json({ message: `Please login or Register first!` });
  }
  req.payload = user;
  next();
};

module.exports = { middleware };
