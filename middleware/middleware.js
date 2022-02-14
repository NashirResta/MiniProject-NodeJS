const jwt = require("jsonwebtoken");

const middleware = (req, res, next) => {
  const token = req.headers.authorization;
  const user = jwt.decode(token, process.env.TOKEN);

  if (!user || !token) {
    return res.status(401).json({ message: `Please login or Register first!` });
  }
  req.payload = user;
  next();
};

module.exports = { middleware };
