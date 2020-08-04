const express = require("express");
const router = express.Router();

// auth login
router.get("/login", (req, res, next) => {
  res.json({ message: "login page" });
});

// auth logout
router.get("/logout", (req, res, next) => {
  // handle with passport
  res.json({ messsage: "logging out" });
});

// google auth
router.get("/google", (req, res, next) => {
  // handle with passport
  res.json({ messsage: "oauth with google" });
});

module.exports = router;
