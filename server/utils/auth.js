const jwt = require("jsonwebtoken");

const { UNAUTHORIZED } = require("./http-status-code");
const { NO_TOKEN, INVALID_TOKEN } = require("../utils/response-message")

require("dotenv").config();

function isLoggined(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
      res.status(UNAUTHORIZED).json({ message: NO_TOKEN })
  }
  // auth
  const isValid = jwt.verify(token, process.env.JWT_SECRET);
  if (!isValid) {
    res.status(UNAUTHORIZED).json({ message: INVALID_TOKEN })
    // res.redirect("/auth/login");
  }
  
  const userId = jwt.decode(token).id;
  res.locals.userId = userId;
  next();
}

module.exports = {
  isLoggined,
};
