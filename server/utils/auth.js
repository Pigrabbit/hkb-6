const jwt = require("jsonwebtoken");
const User = require("../model/user");
require("dotenv").config();

function isLoggined(req, res, next) {
  const token = req.headers["x-access-token"];
  // auth
  const isValid = jwt.verify(token, process.env.JWT_SECRET);
  if (!isValid) {
    res.redirect("/auth/login");
  }
  console.log("valid token!");
  next();
}

module.exports = {
  isLoggined,
};
